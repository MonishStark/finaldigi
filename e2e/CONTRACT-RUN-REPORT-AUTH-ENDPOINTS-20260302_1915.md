<!-- @format -->

# Contract Validation Run Report (Provided Auth Endpoints)

## Scope Applied

Configured smoke assertions according to the endpoint contracts you provided for:

- POST /auth/register
- POST /auth/refresh
- POST /auth/email/check
- POST /auth/verify-account

## Test Command

- `npx playwright test smoke-tests/specs/auth_register_comprehensive.spec.ts smoke-tests/specs/auth_refresh_comprehensive.spec.ts smoke-tests/specs/auth_email_check_comprehensive.spec.ts smoke-tests/specs/auth_verify_account_comprehensive.spec.ts --project=chromium --workers=1 --reporter=line`

## Result Summary

- Passed: 60
- Failed: 36
- Did not run: 28
- Total in selected 4 specs: 124

## What This Means

The test expectations were tightened to match your contract. Failures now indicate backend behavior diverging from the contract (or missing fields), not loose smoke-assertion tolerance.

## Top Contract Mismatches Observed

### 1) Unexpected 500 status where contract allows only 200/201/400/405/409/422/429

- Endpoint: `/auth/register`
- Example failure:
  - Expected status in: `[200, 201, 400, 405, 409, 422, 429]`
  - Backend returned: `500`

### 2) Missing required error fields in contract responses

- Endpoint: `/auth/register` and `/auth/email/check`
- Example failure:
  - Expected: `error: "conflict"` for 409
  - Received: `error: undefined`
- Example failure:
  - Expected: `details: []` for 405
  - Received: `details: undefined`

### 3) Refresh contract mismatch around success path

- Endpoint: `/auth/refresh`
- Example failure:
  - `should refresh token successfully with valid refreshToken - 200` failed
  - Indicates backend response did not satisfy contract-required success shape/flow

### 4) Verify-account contract mismatch on error taxonomy

- Endpoint: `/auth/verify-account`
- Contract expects combinations of:
  - `bad_request`
  - `auth_invalid_verification_token`
  - `not_found`
  - `expired`
- Multiple tests failed because backend returned different error/message/shape than contract definition.

## Files Updated for Contract Alignment

- `e2e/smoke-tests/specs/auth_register_comprehensive.spec.ts`
- `e2e/smoke-tests/specs/auth_refresh_comprehensive.spec.ts`
- `e2e/smoke-tests/specs/auth_email_check_comprehensive.spec.ts`
- `e2e/smoke-tests/specs/auth_verify_account_comprehensive.spec.ts`

## Note

This is expected when backend implementation is not yet fully aligned with the provided contract. The suite is now serving as a strict contract validator for these endpoints.
