#!/bin/bash

# Git Auto-Sync Script
# This script commits all changes and attempts to push to GitHub

echo "🔄 Starting Git sync..."

# Check if there are any changes
if [[ -z $(git status --porcelain) ]]; then
  echo "✅ No changes to commit"
  exit 0
fi

echo "📝 Changes detected:"
git status --short

# Add all changes
git add -A

# Create commit with timestamp
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
COMMIT_MSG="Auto-commit: $TIMESTAMP"

git commit -m "$COMMIT_MSG"
echo "✅ Committed: $COMMIT_MSG"

# Try to push
echo "⬆️  Pushing to remote..."
if git push; then
  echo "✅ Successfully pushed to GitHub"
else
  echo "❌ Push failed. You may need to:"
  echo "   1. Set up GitHub remote: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
  echo "   2. Or check your GitHub connection in Replit"
  exit 1
fi
