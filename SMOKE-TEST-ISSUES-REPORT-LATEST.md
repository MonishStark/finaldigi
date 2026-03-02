<!-- @format -->

# Smoke Test Issues Report (Latest)

Date: 2026-03-01
Run mode: `scripts/run-local-smoke.ps1` (Docker + backend + Playwright smoke)

## Run Outcome

- Backend container status after run: **healthy/running**
- Smoke result summary from latest run:
  - **1358 passed**
  - **1 skipped**
  - **36 did not run**
  - Exit code: **1** (suite still failing)

## What was fixed in this cycle

- Prevented backend hard-crash from `UpdateUserAccountStatus` by adding safe status/body handling and `try/catch`.
- Refactored user deletion service (`removeUser`) to transaction form with proper error propagation.
- Added conflict-safe handling (`409`) in `removeUserPermanently` for FK-protected users.
- Fixed `sendResetPasswordLink` double response path to avoid `ERR_HTTP_HEADERS_SENT` crash behavior.
- Added null-safe defaults in `appData` controller for missing settings rows.
- Added process-level guards in `server.js` for uncaught rejection/exception logging so tests can continue collecting failures.

## Remaining blocking issues observed

1. **Database schema mismatch**
   - Error repeatedly seen in backend logs:
     - `ER_NO_SUCH_TABLE: Table 'team_ai.user_integrations' doesn't exist`
   - Impact:
     - Integration-related endpoints and dependent smoke cases fail.

2. **Middleware null-safety bug**
   - Error seen in backend logs:
     - `TypeError: Cannot read properties of undefined (reading 'role')`
     - Location: `backend/app/middleware/authenticate.js` (`isValidRole` path)
   - Impact:
     - Invitation/admin flows fail where role validation assumes DB row exists.

3. **API contract mismatches vs strict smoke expectations**
   - Many failing specs are now functional assertions (status/message/schema mismatch), not container crashes.
   - Dominant failing groups include:
     - `companies_*`
     - `me_*`
     - `super_admin_*`
     - `files_*` / `integrations_*`
   - Typical mismatch patterns:
     - expected `401/403/404/405/409/415/422/429` but API returns different status/body.

4. **Residual non-executed tests**
   - `36 did not run` remains in final summary.
   - Usually follows earlier failures in serial smoke flow and strict category dependencies.

## Next recommended fixes (priority order)

1. Add missing SQL objects for integration features (at minimum `user_integrations` and any dependent tables/indexes) in CI seed/DDL scripts.
2. Harden `authenticate.isValidRole` and adjacent middleware to handle missing role rows safely (return structured `400/404`, no TypeError).
3. Normalize response contracts endpoint-by-endpoint to match smoke expectations for:
   - method not allowed (`405`)
   - content type validation (`415`)
   - validation failures (`422`)
   - rate limit (`429`)
4. Re-run smoke and iterate on failing endpoint clusters until failures reach zero and no skipped/non-run tests remain.

## Artifacts

- Playwright output directory: `e2e/playwright-report`
- Playwright test result traces: `e2e/test-results`
- Latest backend crash/non-crash logs collected from container `digibot-backend-ci`.
