import { Octokit } from '@octokit/rest';
import { execSync } from 'child_process';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function syncToGitHub() {
  try {
    console.log('🔄 Starting automatic Git sync...');

    // Check if there are any changes
    const status = execSync('git status --porcelain', { encoding: 'utf-8' });
    
    if (!status.trim()) {
      console.log('✅ No changes to commit');
      return;
    }

    console.log('📝 Changes detected:');
    console.log(status);

    // Add all changes
    execSync('git add -A', { stdio: 'inherit' });

    // Create commit with timestamp
    const timestamp = new Date().toISOString();
    const commitMessage = `Auto-commit: ${timestamp}`;
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

    console.log(`✅ Committed changes: ${commitMessage}`);

    // Get GitHub client
    const octokit = await getGitHubClient();
    
    // Get current user
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`👤 Authenticated as: ${user.login}`);

    // Push to GitHub
    // Note: Replit manages the remote, so we use the configured remote
    try {
      execSync('git push origin main', { stdio: 'inherit' });
      console.log('✅ Successfully pushed to GitHub');
    } catch (pushError: any) {
      console.error('❌ Push failed:', pushError.message);
      console.log('💡 Trying to set up GitHub remote...');
      
      // Get user's repositories to find the right one
      const { data: repos } = await octokit.repos.listForAuthenticatedUser({
        sort: 'updated',
        per_page: 100
      });

      console.log(`Found ${repos.length} repositories`);
      
      // You may need to configure the correct repository
      console.log('Please manually set up the GitHub remote with:');
      console.log('git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git');
    }

  } catch (error: any) {
    console.error('❌ Sync failed:', error.message);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  syncToGitHub().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { syncToGitHub };
