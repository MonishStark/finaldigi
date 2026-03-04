<!-- @format -->

# Full Smoke Suite Onboarding (Actions-Only)

This document is for backend teams who will import the full smoke-suite package into their own backend repository and run everything through **GitHub Actions only** (no local execution required).

## Goal

You will receive these folders from QA:

- `.github/`
- `e2e/`
- `redis-binaries/`
- `scripts/`
- `sql/`

You will merge them into your backend repo, connect required secrets, and run the workflow in Actions.

---

## 1) Target repo structure (must match)

Your backend repo should end up with this root-level layout:

- `.github/workflows/pr-tests.yml`
- `docker-compose.ci.yml`
- `backend/` (your backend code, must include `Dockerfile.ci`)
- `e2e/`
- `sql/`
- `scripts/`
- `redis-binaries/`

### Critical compatibility requirements

1. `docker-compose.ci.yml` builds backend from:
   - `./backend`
   - `Dockerfile.ci`
2. Backend must expose health endpoint:
   - `GET /health` returns 2xx when ready
3. Backend must listen on port:
   - `5050` in CI container
4. SQL files referenced in `docker-compose.ci.yml` must exist in `sql/`:
   - `ddl.sql`
   - `ddl-missing-tables.sql`
   - `dml-roles.sql`
   - `seed-test-users.sql`

If your repo uses a different backend path/port, update `docker-compose.ci.yml` and workflow health-check steps consistently.

---

## 2) What backend team needs to configure

## A) Required GitHub repository secrets

Set these secrets in the target repo:

- `GOOGLE_PROJECT_ID`
- `BIGQUERY_DATASET_ID`
- `BIGQUERY_TABLE`
- `BIGQUERY_CONNECTION_ID`
- `BIGQUERY_AI_MODEL_ID`
- `BIGQUERY_MAX_OUTPUT_TOKEN`
- `BIGQUERY_LOCATION`
- `UUID_NAMESPACE`

These are written into `.env` during workflow run.

## B) Optional secrets (workflow supports fallbacks)

These have defaults in CI and can be added later:

- `STRIPE_SECRET_KEY`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `MICROSOFT_CLIENT_ID`
- `MICROSOFT_CLIENT_SECRET`
- `MICROSOFT_TENANT_ID`
- `MICROSOFT_OAUTH_REDIRECT_URL`
- `MICROSOFT_OAUTH_MOBILE_REDIRECT_URL`

## C) Optional integrations (disable if not needed)

### Google Drive upload block (optional)

If you want report upload to Drive, add:

- `GDRIVE_CLIENT_ID`
- `GDRIVE_CLIENT_SECRET`
- `GDRIVE_REFRESH_TOKEN`

If not needed, remove or comment out these workflow steps:

- `Zip Playwright Report`
- `Upload Report to Google Drive`
- `Prepare Report Message` section that depends on Drive link

### Email notification block (optional)

If you want mail notifications, add:

- `REPORT_FROM_MAIL`
- `REPORT_FROM_PASSWORD`
- `REPORT_TO_MAILS`

If not needed, remove or comment out `Send Email Notification` step.

---

## 3) How to onboard in the backend repo

1. Create integration branch in backend repo.
2. Copy/merge the suite package folders into repo root:
   - `.github`, `e2e`, `redis-binaries`, `scripts`, `sql`
3. Ensure backend contains `backend/Dockerfile.ci` compatible with your app startup.
4. Ensure `docker-compose.ci.yml` service names/paths/ports match your backend.
5. Add required repository secrets.
6. Open PR to trigger workflow:
   - **DigiBot: PR Smoke Tests** (`.github/workflows/pr-tests.yml`)
7. Validate Action run outputs:
   - backend service healthy
   - Playwright runs all smoke specs
   - artifact uploaded (`playwright-report`)

---

## 4) Actions execution flow (what CI does)

The workflow performs these stages:

1. Checkout + Node 20 setup
2. Build runtime `.env` from repo secrets
3. Start Docker services via `docker-compose.ci.yml`
   - MySQL
   - Redis
   - Backend
4. Wait for health checks (`/health` on backend)
5. Install `e2e` dependencies + Playwright browser
6. Run smoke suite (serial):
   - `npx playwright test smoke-tests/specs/*_comprehensive.spec.ts --reporter=html,json --workers=1`
7. Move and process report outputs
8. (Optional) Upload report to Drive
9. (Optional) Send email summary
10. Always stop Docker and upload artifact

---

## 5) Common failure points and fixes

## Backend never becomes healthy

- Check backend container logs from workflow output
- Confirm backend listens on `5050`
- Confirm `/health` exists and returns 2xx
- Confirm `backend/Dockerfile.ci` starts the app correctly

## DB-related test failures

- Ensure SQL seed files are present and loaded
- Ensure schema/tables expected by backend are included in SQL scripts
- Ensure backend DB env variables map to compose MySQL service

## Auth/permission failures (401/403)

- Validate test users/roles in `seed-test-users.sql`
- Validate token secrets and auth middleware behavior in CI mode

## Workflow fails in optional notification/upload steps

- Add missing optional secrets, or disable those steps in workflow

---

## 6) Recommended first-run policy

For first integration PR in backend repo:

1. Keep only core smoke execution + artifact upload enabled
2. Temporarily disable Drive upload + email steps
3. Get 1 clean green run
4. Re-enable optional integrations if required by your org

---

## 7) Handover contract between QA and backend team

QA provides:

- Test suite (`e2e`) and CI workflow template (`.github/workflows/pr-tests.yml`)
- Supporting SQL/scripts/redis-binaries package

Backend team provides:

- Compatible backend build/start in `backend/Dockerfile.ci`
- CI secrets and environment ownership
- Data/seeding reliability for smoke scenarios
- Ongoing endpoint compatibility with suite

---

This onboarding is intentionally **CI-first** and does not require local test execution.
