# How to Connect GitHub for Automatic Sync

Based on your screenshot, the Git pane is visible but not connected to GitHub yet.

## Step 1: Connect GitHub Provider

1. In the **Git tab** (already open in your screenshot), click on "settings view" link
2. Or go to your Replit workspace settings
3. Look for **Git Provider** or **Version Control** settings
4. Click **"Connect to GitHub"** or **"Add Git Provider"**
5. Authorize Replit to access your GitHub account

## Step 2: Link Your Repository

You have two options:

### Option A: Create a New GitHub Repository
1. Go to https://github.com/new
2. Name your repository (e.g., "total-authority-nextjs")
3. Choose Public or Private
4. **Do NOT** initialize with README (your code already exists)
5. Click "Create repository"
6. Copy the repository URL (e.g., `https://github.com/yourusername/total-authority-nextjs.git`)

### Option B: Use an Existing Repository
1. Go to your GitHub repository
2. Click the green "Code" button
3. Copy the HTTPS URL

## Step 3: Add Remote in Replit

Once you have your GitHub repository URL:

1. In the Git pane, look for "Add remote" or settings
2. Paste your repository URL
3. Or use the Shell:

```bash
# Replace with your actual repository URL
git remote add origin https://github.com/yourusername/your-repo.git
```

## Step 4: Push Your Changes

After connecting:

1. In the Git pane, you should see all your changes listed
2. Click **"Stage All"** (or select individual files)
3. Write a commit message like: "Initial Next.js migration with all features"
4. Click **"Commit"**
5. Click **"Push"** to send to GitHub

## Current State

Looking at your checkpoints, you have recent work including:
- ✅ Admin blog post fixes (sitemap removal, Link fixes)
- ✅ New Git sync documentation
- ✅ Minor replit configuration cleanup

All of this is ready to be pushed once you connect GitHub!

## Troubleshooting

If you see "Authentication failed":
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name like "Replit Access"
4. Select scopes: `repo` (all repo permissions)
5. Generate and copy the token
6. Store in Replit Secrets as `GITHUB_TOKEN`
7. Use: `git push https://YOUR_USERNAME:YOUR_TOKEN@github.com/USERNAME/REPO.git`

## Quick Command Reference

```bash
# Check current status
git remote -v

# Add GitHub remote (replace URL)
git remote add origin https://github.com/USERNAME/REPO.git

# Push all branches
git push -u origin main

# For future pushes
git push
```

Once you complete these steps, the Git pane will show your GitHub repository and you'll be able to push with one click!
