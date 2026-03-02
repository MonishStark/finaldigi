# E2E Smoke Tests (GitHub Actions)

This folder contains Playwright smoke tests executed in CI through GitHub Actions.

## Run smoke tests in GitHub (recommended)

### Option 1: Run automatically on PR
1. Push your branch to GitHub.
2. Open a Pull Request targeting `main`.
3. GitHub Actions will automatically run the workflow: **DigiBot: PR Smoke Tests**.
4. Check progress in the PR **Checks** tab.

### Option 2: Run manually from GitHub
1. Go to the repository **Actions** tab.
2. Open workflow: **DigiBot: PR Smoke Tests**.
3. Click **Run workflow**.
4. Select the branch and start the run.

## Required GitHub setup
- Repository secrets must be configured for CI.
- If secrets are missing, workflow steps that depend on them may fail.

## Where to see results
- PR **Checks** tab
- Workflow run summary in **Actions**
- PR comment posted by the workflow (pass/fail summary)
