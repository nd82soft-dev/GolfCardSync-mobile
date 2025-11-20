# Quick Reference: Manual Steps Required

Due to GitHub authentication limitations, please execute these commands locally:

## Option 1: Use the Combined Script

See `SETUP_INSTRUCTIONS.md` for the complete shell script.

## Option 2: Manual Commands

### 1. Update Workflow on Main
```bash
cd /path/to/GolfCardSync-mobile
git checkout main
git pull origin main

# Update the workflow file to include push trigger
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
```

### 2. Create Feature Branch
```bash
# Check if branch exists and create it
BRANCH_NAME="feature/add-9-hole-support"
if git ls-remote --heads origin | grep -q "refs/heads/${BRANCH_NAME}"; then
  BRANCH_NAME="feature/add-9-hole-support-1"
fi

git checkout main
git pull origin main
git checkout -b ${BRANCH_NAME}
git push origin ${BRANCH_NAME}
```

### 3. Create Pull Request
```bash
gh pr create \
  --base main \
  --head ${BRANCH_NAME} \
  --title "feat: add 9-hole support (migration, AI prompt, UI, utils, tests)" \
  --body-file PR_DESCRIPTION.md \
  --label "enhancement" \
  --assignee "nd82soft-dev"
```

## Files Included
All files are already on main branch:
- migrations (3 SQL files)
- ai/ai_scorecard_prompt.txt
- src/components/HoleSelector.tsx
- lib/score-utils.js
- tests/score-utils.test.js
- PR_DESCRIPTION.md
- .github/workflows/pr-preview.yml

## For More Details
- See `SETUP_INSTRUCTIONS.md` for complete documentation
- See `TASK_SUMMARY.md` for implementation details
