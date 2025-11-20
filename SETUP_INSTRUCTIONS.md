# Setup Instructions for 9-Hole Support PR

Due to GitHub authentication limitations in the automated environment, the following steps need to be executed manually to complete the setup.

## Overview

This will:
1. Update the workflow file on the `main` branch to run on push events
2. Create a `feature/add-9-hole-support` branch from `main`
3. Create a PR from `feature/add-9-hole-support` to `main`

## Prerequisites

- Git installed and configured
- GitHub CLI (`gh`) installed and authenticated
- Appropriate permissions to push to `main` and create branches/PRs

## Files Included

The following files are already present on the `main` branch and will be included in the feature branch:

- `migrations/20251116_add_hole_count.sql`
- `migrations/20251116_backfill_hole_count.sql`
- `migrations/20251116_rollback_remove_hole_count.sql`
- `ai/ai_scorecard_prompt.txt`
- `src/components/HoleSelector.tsx`
- `lib/score-utils.js`
- `tests/score-utils.test.js`
- `PR_DESCRIPTION.md`
- `.github/workflows/pr-preview.yml`

## Step-by-Step Instructions

### 1. Update Workflow on Main Branch

First, update the workflow file to run on push to main:

```bash
# Navigate to your repository
cd /path/to/GolfCardSync-mobile

# Ensure you're on the main branch and it's up to date
git checkout main
git pull origin main

# Update the workflow file
cat > .github/workflows/pr-preview.yml << 'EOF'
name: PR Preview Build

on:
  pull_request:
    types: [opened, synchronize, reopened]
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          if [ -f package-lock.json ]; then npm ci; else npm install; fi
      - name: Build
        run: |
          if npm run | grep -q "build"; then npm run build; else echo "No build script found"; fi
      - name: Run tests
        run: |
          if npm run | grep -q "test"; then npm test -- --coverage; else echo "No test script found"; fi
EOF

# Commit and push to main
git add .github/workflows/pr-preview.yml
git commit -m "feat: update workflow to run on push to main"
git push origin main
```

### 2. Create Feature Branch

Check if the branch already exists and create it:

```bash
# Check if feature/add-9-hole-support already exists
BRANCH_NAME="feature/add-9-hole-support"
if git ls-remote --heads origin | grep -q "refs/heads/${BRANCH_NAME}"; then
  BRANCH_NAME="feature/add-9-hole-support-1"
  echo "Branch feature/add-9-hole-support exists, using ${BRANCH_NAME} instead"
fi

# Ensure you're on main with latest changes
git checkout main
git pull origin main

# Create and push the feature branch
git checkout -b ${BRANCH_NAME}
git push origin ${BRANCH_NAME}
```

### 3. Create Pull Request

Create the PR using GitHub CLI:

```bash
# Create PR with all required settings
gh pr create \
  --base main \
  --head ${BRANCH_NAME} \
  --title "feat: add 9-hole support (migration, AI prompt, UI, utils, tests)" \
  --body-file PR_DESCRIPTION.md \
  --label "enhancement" \
  --assignee "nd82soft-dev"

# Note: --no-draft flag was omitted as it's not needed (PRs are non-draft by default)
# Note: No reviewers are set as requested
```

### Alternative: Combined Script

You can also run this as a single script:

```bash
#!/bin/bash
set -e

# Navigate to repository
cd /path/to/GolfCardSync-mobile

# Step 1: Update workflow on main
echo "Step 1: Updating workflow on main branch..."
git checkout main
git pull origin main

cat > .github/workflows/pr-preview.yml << 'EOF'
name: PR Preview Build

on:
  pull_request:
    types: [opened, synchronize, reopened]
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          if [ -f package-lock.json ]; then npm ci; else npm install; fi
      - name: Build
        run: |
          if npm run | grep -q "build"; then npm run build; else echo "No build script found"; fi
      - name: Run tests
        run: |
          if npm run | grep -q "test"; then npm test -- --coverage; else echo "No test script found"; fi
EOF

git add .github/workflows/pr-preview.yml
git commit -m "feat: update workflow to run on push to main"
git push origin main

# Step 2: Create feature branch
echo "Step 2: Creating feature branch..."
BRANCH_NAME="feature/add-9-hole-support"
if git ls-remote --heads origin | grep -q "refs/heads/${BRANCH_NAME}"; then
  BRANCH_NAME="feature/add-9-hole-support-1"
  echo "Using ${BRANCH_NAME} instead"
fi

git checkout -b ${BRANCH_NAME}
git push origin ${BRANCH_NAME}

# Step 3: Create PR
echo "Step 3: Creating pull request..."
gh pr create \
  --base main \
  --head ${BRANCH_NAME} \
  --title "feat: add 9-hole support (migration, AI prompt, UI, utils, tests)" \
  --body-file PR_DESCRIPTION.md \
  --label "enhancement" \
  --assignee "nd82soft-dev"

echo "Setup complete!"
echo "PR created from ${BRANCH_NAME} to main"
```

Save this as `setup.sh`, make it executable with `chmod +x setup.sh`, and run it with `./setup.sh`.

## Verification

After running the commands, verify:

1. The workflow file on `main` includes the push trigger
2. The feature branch exists and contains all required files
3. The PR is created with:
   - Title: "feat: add 9-hole support (migration, AI prompt, UI, utils, tests)"
   - Label: "enhancement"
   - Assignee: "nd82soft-dev"
   - Draft status: false
   - No reviewers

## Troubleshooting

If you encounter authentication issues:
- Ensure you're logged in with `gh auth login`
- Check your Git credentials with `git config --list | grep user`

If the label doesn't exist:
- Create it first with: `gh label create enhancement --description "New feature or request" --color 0e8a16`

If you need to assign but the user doesn't have access:
- You may need to skip the `--assignee` flag or use a different user
