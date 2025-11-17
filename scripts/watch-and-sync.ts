import { syncToGitHub } from './git-sync';

const SYNC_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

async function watchAndSync() {
  console.log('👀 Git auto-sync watcher started');
  console.log(`⏰ Will sync every ${SYNC_INTERVAL_MS / 1000 / 60} minutes`);

  // Run initial sync
  try {
    await syncToGitHub();
  } catch (error) {
    console.error('Initial sync failed:', error);
  }

  // Set up periodic sync
  setInterval(async () => {
    try {
      await syncToGitHub();
    } catch (error) {
      console.error('Scheduled sync failed:', error);
    }
  }, SYNC_INTERVAL_MS);

  // Keep process alive
  process.stdin.resume();
}

watchAndSync().catch(error => {
  console.error('Watcher failed:', error);
  process.exit(1);
});
