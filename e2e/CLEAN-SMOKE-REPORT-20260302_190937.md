<!-- @format -->

# Clean Smoke Test Report

- Source JSON: C:\Users\Dhanush\Desktop\Digibot\digibot - Copy - Copy - Copy\e2e\full-smoke-report-20260302_190937.json
- Run start: 2026-03-02T13:39:40.527Z
- Total testcases: 1793
- Passed: 785
- Failed: 137
- Skipped: 871

## Failed Testcases

### 1. DELETE /admin/users/{userId} - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)

- File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
- Why it failed: Error: expect(received).toContain(expected) // indexOf
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: [200, 400, 401, 403, 404, 408, 500, 401]

### 2. GET /admin/users/{userId} - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/admin_users_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).not.toContain(expected) // indexOf
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 3. GET /app-data - Comprehensive Tests > 200 Success Responses > should fetch application data successfully

- File: smoke-tests/specs/app_data_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBeDefined()
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: undefined

### 4. POST /auth/email/check - Comprehensive Tests > 400 Bad Request Responses > should return 400 when email is missing

- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "bad_request"
- Backend provided: undefined

### 5. POST /auth/email/check - Comprehensive Tests > 400 Bad Request Responses > should return 400 when email is empty string

- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "bad_request"
- Backend provided: undefined

### 6. POST /auth/email/check - Comprehensive Tests > 400 Bad Request Responses > should return 400 when email is null

- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "bad_request"
- Backend provided: undefined

### 7. POST /auth/email/check - Comprehensive Tests > 400 Bad Request Responses > should return 400 when email is undefined

- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "bad_request"
- Backend provided: undefined

### 8. POST /auth/email/check - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method

- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: []
- Backend provided: undefined

### 9. POST /auth/email/check - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after multiple rapid email checks

- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: true
- Backend provided: false

### 10. POST /auth/password/forgot - Comprehensive Tests > 400 Bad Request Responses > should return 400 when email is missing

- File: smoke-tests/specs/auth_password_forgot_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 11. POST /auth/password/forgot - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid email format

- File: smoke-tests/specs/auth_password_forgot_comprehensive.spec.ts
- Why it failed: Error: expect(received).toMatch(expected)
- Smoke test expected: /Invalid or missing email|Invalid or missing input/i
- Backend provided: Not explicitly present in assertion output

### 12. POST /auth/password/reset - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid reset token

- File: smoke-tests/specs/auth_password_reset_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 13. POST /auth/password/reset - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 for password without uppercase letter

- File: smoke-tests/specs/auth_password_reset_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 14. GET /auth/payment/status - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when token is missing

- File: smoke-tests/specs/auth_payment_status_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "missing_access_token"
- Backend provided: undefined

### 15. GET /auth/payment/status - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST request

- File: smoke-tests/specs/auth_payment_status_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "method_not_allowed"
- Backend provided: undefined

### 16. GET /auth/payment/status - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for PUT request

- File: smoke-tests/specs/auth_payment_status_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "method_not_allowed"
- Backend provided: undefined

### 17. GET /auth/payment/status - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for DELETE request

- File: smoke-tests/specs/auth_payment_status_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "method_not_allowed"
- Backend provided: undefined

### 18. GET /auth/providers/{provider} - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST request

- File: smoke-tests/specs/auth_providers_provider_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "method_not_allowed"
- Backend provided: undefined

### 19. POST /auth/refresh - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid refresh token format

- File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: []
- Backend provided: undefined

### 20. POST /auth/refresh - Comprehensive Tests > 403 Forbidden - Token Reuse Detection (Backend doesn't implement) > should revoke all sessions when token reuse is detected (backend doesn't implement)

- File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
- Why it failed: Error: expect(received).toContain(expected) // indexOf
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: [200, 400, 401]

### 21. POST /auth/refresh - Comprehensive Tests > 403 Forbidden - Token Reuse Detection (Backend doesn't implement) > should detect token reuse across multiple refresh attempts

- File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "forbidden"
- Backend provided: "auth_invalid_refresh_token"

### 22. POST /auth/refresh - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET request to /auth/refresh

- File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: []
- Backend provided: undefined

### 23. POST /auth/refresh - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for PUT request to /auth/refresh

- File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: []
- Backend provided: undefined

### 24. POST /auth/register - Comprehensive Tests > 409 Conflict Responses > should return 409 when email already registered - solo account

- File: smoke-tests/specs/auth_register_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "conflict"
- Backend provided: undefined

### 25. POST /auth/register - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET request to /auth/register

- File: smoke-tests/specs/auth_register_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: []
- Backend provided: undefined

### 26. POST /auth/sign-out - Comprehensive Tests > 200 Success Responses > should successfully sign out with valid access token

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
- Why it failed: Error: browserType.launch: Executable doesn't exist at C:\Users\Dhanush\AppData\Local\ms-playwright\chromium-1140\chrome-win\chrome.exe
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 27. POST /auth/verify-account - Comprehensive Tests > 401 Invalid Verification Token Responses > should return 401 for invalid token

- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "bad_request"
- Backend provided: undefined

### 28. POST /auth/verify-account - Comprehensive Tests > 401 Invalid Verification Token Responses > should return 401 for malformed token

- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "unauthorized"
- Backend provided: undefined

### 29. POST /auth/verify-account - Comprehensive Tests > Edge Cases > should handle concurrent verification attempts

- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: SyntaxError: Unexpected token 'I', "Internal S"... is not valid JSON
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 30. POST /auth/verify-account - Comprehensive Tests > Response Format Tests > should return consistent response structure for success

- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: Error: expect(received).toHaveProperty(path)
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: {}

### 31. POST /auth/verify-account - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBeDefined()
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: undefined

### 32. POST /auth/verify-account - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: Error: expect(received).toContain(expected) // indexOf
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 33. POST /auth/verify-otp - Comprehensive Tests > 400 Bad Request Responses > should return 400 when otp is missing

- File: smoke-tests/specs/auth_verify_otp_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 34. POST /auth/verify-otp - Comprehensive Tests > 401 Invalid OTP Responses > should return 401 for invalid OTP

- File: smoke-tests/specs/auth_verify_otp_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 35. POST /companies/{companyId}/avatar - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
- Why it failed: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 36. POST /companies/{companyId}/avatar - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
- Why it failed: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 37. POST /companies/{companyId}/2fa - Comprehensive Tests > 403 Invalid Access Token Responses > should return 403 for invalid token

- File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
- Why it failed: TypeError: Cannot read properties of undefined (reading 'length')
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 38. POST /companies/{companyId}/2fa - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method

- File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "method_not_allowed"
- Backend provided: undefined

### 39. POST /companies/{companyId}/2fa - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is incorrect

- File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
- Why it failed: Error: expect(received).toMatch(expected)
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 40. POST /companies/{companyId}/profile - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided

- File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
- Why it failed: Error: expect(received).toMatch(expected)
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 41. POST /companies/{companyId}/profile - Comprehensive Tests > 401 Invalid Access Token Responses > should return 401 for invalid token

- File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
- Why it failed: Error: expect(received).toContain(expected) // indexOf
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: ["Invalid authentication token provided", "invalid authentication token provided"]

### 42. POST /companies/{companyId}/profile - Comprehensive Tests > 401 Expired Access Token Responses > should return 401 for expired token

- File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
- Why it failed: Error: expect(received).toContain(expected) // indexOf
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: ["access_token_expired", "invalid_access_token", "unauthorized"]

### 43. POST /companies/{companyId}/profile - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is missing

- File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
- Why it failed: Error: expect(received).toContain(expected) // indexOf
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: ["unsupported_media_type", "invalid_access_token", "unauthorized"]

### 44. POST /companies/{companyId}/profile - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is incorrect

- File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
- Why it failed: Error: expect(received).toContain(expected) // indexOf
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: ["unsupported_media_type", "invalid_access_token", "unauthorized"]

### 45. GET /companies/{companyId}/profile - Comprehensive Tests > 201 Success Responses > should fetch company profile successfully

- File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBeDefined()
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: undefined

### 46. GET /companies/{companyId}/profile - Comprehensive Tests > 400 Bad Request Responses > should return 400 when companyId is invalid

- File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "Missing parameters, fill all the required fields"
- Backend provided: "Invalid or missing fields"

### 47. GET /companies/{companyId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "Missing authentication token provided"
- Backend provided: "Missing authentication token"

### 48. GET /companies/{companyId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token provided

- File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "invalid authentication token provided"
- Backend provided: "Invalid authentication token provided"

### 49. GET /companies/{companyId}/profile - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST request

- File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
- Why it failed: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 50. GET /companies/{companyId}/profile - Comprehensive Tests > Format & Performance > response should have all required success fields

- File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBeDefined()
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: undefined

### 51. GET /companies/{companyId}/usage - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST method

- File: smoke-tests/specs/companies_usage_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "method_not_allowed"
- Backend provided: undefined

### 52. POST /integrations/auth/google/callback - Comprehensive Tests > 400 Bad Request Responses > should return 400 when auth code is missing

- File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "bad_request"
- Backend provided: undefined

### 53. POST /integrations/auth/google/callback - Comprehensive Tests > 400 Bad Request Responses > should return 400 when state is missing

- File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "bad_request"
- Backend provided: undefined

### 54. POST /integrations/auth/google/callback - Comprehensive Tests > 400 Bad Request Responses > should return 400 when auth code is invalid

- File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "bad_request"
- Backend provided: undefined

### 55. POST /integrations/auth/google/callback - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "unauthorized"
- Backend provided: undefined

### 56. POST /integrations/auth/google/callback - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "unauthorized"
- Backend provided: undefined

### 57. GET /integrations - Comprehensive Tests > 200 Success Responses > should get user integration settings

- File: smoke-tests/specs/integrations_get_comprehensive.spec.ts
- Why it failed: Test timeout of 30000ms exceeded.
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 58. GET /integrations - Comprehensive Tests > 403 Forbidden Responses > should return 403 when integrations access is forbidden

- File: smoke-tests/specs/integrations_get_comprehensive.spec.ts
- Why it failed: Test timeout of 30000ms exceeded.
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 59. GET /integrations - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded

- File: smoke-tests/specs/integrations_get_comprehensive.spec.ts
- Why it failed: Test timeout of 30000ms exceeded.
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 60. POST /me/2fa - Comprehensive Tests > 400 Bad Request Responses > should return 400 when password is missing

- File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "This field is required"
- Backend provided: "Password is required"

### 61. POST /me/2fa - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided

- File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 62. POST /me/2fa - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method

- File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "method_not_allowed"
- Backend provided: undefined

### 63. POST /me/avatar - Comprehensive Tests > 200 Success Responses > should upload profile picture successfully

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
- Why it failed: Error: ENOENT: no such file or directory, open 'C:\Users\Dhanush\Desktop\Digibot\digibot - Copy - Copy - Copy\e2e\e2e\smoke-tests\specs\test-avatar-temp.png'
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 64. GET /me/profile - Comprehensive Tests > 200 Success Responses > should return authenticated user profile with all expected fields

- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: 200
- Backend provided: 500

### 65. GET /me/profile - Comprehensive Tests > 200 Success Responses > should return profile for admin2 user

- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: 200
- Backend provided: 401

### 66. GET /me/profile - Comprehensive Tests > 200 Success Responses > should return profile for superadmin user

- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: 200
- Backend provided: 500

### 67. GET /me/profile - Comprehensive Tests > 401 Unauthorized Responses > should reject request with missing Authorization header

- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 68. GET /me/profile - Comprehensive Tests > 401 Unauthorized Responses > should reject request with invalid token

- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toMatch(expected)
- Smoke test expected: /Missing authentication token provided|Missing authentication token/i
- Backend provided: Not explicitly present in assertion output

### 69. GET /me/profile - Comprehensive Tests > 405 Method Not Allowed > should reject POST request to GET-only endpoint

- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "method_not_allowed"
- Backend provided: undefined

### 70. GET /me/profile - Comprehensive Tests > Edge Cases > should return consistent data across multiple calls

- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toContain(expected) // indexOf
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: [200, 500]

### 71. POST /me/email - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided

- File: smoke-tests/specs/me_email_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 72. POST /me/email - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method

- File: smoke-tests/specs/me_email_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "method_not_allowed"
- Backend provided: undefined

### 73. POST /me/email - Comprehensive Tests > 409 Conflict Responses > should return 409 when conflict occurs

- File: smoke-tests/specs/me_email_comprehensive.spec.ts
- Why it failed: Error: expect(received).toMatch(expected)
- Smoke test expected: /Email already (exists|in use)/
- Backend provided: Not explicitly present in assertion output

### 74. POST /me/email - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is incorrect

- File: smoke-tests/specs/me_email_comprehensive.spec.ts
- Why it failed: Error: expect(received).toMatch(expected)
- Smoke test expected: /unsupported_media_type|bad_request/i
- Backend provided: Not explicitly present in assertion output

### 75. POST /me/password - Comprehensive Tests > 400 Bad Request Responses > should return 400 when currentPassword is missing

- File: smoke-tests/specs/me_password_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "password"
- Backend provided: "currentPassword"

### 76. POST /me/password - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when current password is incorrect

- File: smoke-tests/specs/me_password_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 77. POST /me/password/set - Comprehensive Tests > 200 Success Responses > should return success when password is set

- File: smoke-tests/specs/me_password_set_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 78. POST /me/profile - Comprehensive Tests > 200 Success Responses > should update profile successfully

- File: smoke-tests/specs/me_profile_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 79. GET /me/subscription - Comprehensive Tests > 200 Success Responses > should return 200 for authenticated user

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 80. GET /me/usage - Comprehensive Tests > 200 Success Responses > should return usage data for valid token

- File: smoke-tests/specs/me_usage_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 81. POST /me/verification/resend - Comprehensive Tests > 200 Success Responses > should resend verification email successfully

- File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 82. GET /notifications - Comprehensive Tests > 200 Success Responses > should return notifications for authenticated user

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 83. DELETE /notifications/view/{id} - Comprehensive Tests > 200 Success Responses > should delete notification successfully

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 84. PATCH /notifications/viewed - Comprehensive Tests > 200 Success Responses > should mark all notifications as viewed

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 85. GET /settings/max-uploads - Comprehensive Tests > 200 Success Responses > should return max upload limit for authenticated user

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 86. GET /settings/recording-limit - Comprehensive Tests > 200 Success Responses > should return recording limit for authenticated user

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 87. GET /settings/recording-prompt-time - Comprehensive Tests > 200 Success Responses > should return prompt time duration for authenticated user

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 88. GET /super-admin/clients - Comprehensive Tests > Edge Cases > should handle page 0

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 89. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Edge Cases > should handle very long companyId

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 90. GET /super-admin/companies/{companyId} - Comprehensive Tests > 200 Success Responses > should fetch company details successfully

- File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 91. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > 400 Bad Request Responses > should return 400 when image is missing

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 92. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 200 Success Responses > should fetch company profile successfully

- File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 93. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Edge Cases > should handle very long company name

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 94. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle companyId as 0

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 95. GET /super-admin/companies - Comprehensive Tests > 200 Success Responses > should fetch all companies successfully

- File: smoke-tests/specs/super_admin_companies_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 96. GET /super-admin/email/templates - Comprehensive Tests > Edge Cases > should handle query parameters gracefully

- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 97. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Edge Cases > should handle very long template name

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 98. GET /super-admin/environment - Comprehensive Tests > Edge Cases > should handle query parameters gracefully

- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 99. PATCH /super-admin/environment - Comprehensive Tests > Edge Cases > should handle very long environment value

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 100. GET /super-admin/integrations - Comprehensive Tests > 200 Success Responses > should fetch integrations successfully

- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 101. PATCH /super-admin/integrations - Comprehensive Tests > 200 Success Responses for Company > should update company integrations successfully

- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 102. POST /super-admin/usage/last-month - Comprehensive Tests > Edge Cases > should handle month as 1 (January)

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 103. DELETE /super-admin/users/{userId} - Comprehensive Tests > Edge Cases > should handle very long userId

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 104. GET /super-admin/users/{userId} - Comprehensive Tests > 200 Success Responses > should fetch user details successfully

- File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 105. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > 400 Bad Request Responses > should return 400 when image is missing

- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 106. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 200 Success Responses > should fetch user profile successfully

- File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 107. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Edge Cases > should handle very long firstname

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 108. GET /super-admin/users/{userId}/role - Comprehensive Tests > Edge Cases > should handle userId as 0

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 109. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle userId as 0

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 110. GET /teams/active - Comprehensive Tests > 200 Success Responses > should fetch active teams successfully

- File: smoke-tests/specs/teams_active_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 111. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 200 Success Responses > should fetch messages from chat

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 112. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 201 Created Responses > should send message successfully

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 113. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 200 Success Responses > should rename chat successfully

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 114. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 200 Success Responses > should delete chat successfully

- File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 115. GET /teams/{teamId}/chats - Comprehensive Tests > 200 Success Responses > should fetch all chats for team

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 116. POST /teams/{teamId}/chats - Comprehensive Tests > 201 Created Responses > should create chat successfully

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 117. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 200 Success Responses > should accept delete request for existing file

- File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 118. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 200 Success Responses > should allow file download request for valid inputs

- File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 119. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 200 Success Responses > should accept valid file rename request

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 120. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 200 Success Responses > should accept valid file update payload

- File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 121. POST /teams/{teamId}/files - Comprehensive Tests > 200/201 Success Responses > should accept valid file create/upload request

- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 122. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 200 Success Responses > should fetch summary for a valid file request

- File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 123. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 200 Success Responses > should permanently delete folder by default

- File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 124. GET /teams/{teamId}/folders - Comprehensive Tests > 200 Success Responses > should fetch root items successfully

- File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 125. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 200 Success Responses > should update folder name successfully

- File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 126. POST /teams/{teamId}/folders - Comprehensive Tests > 201 Created Success Responses > should create folder at root level successfully

- File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 127. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 200 Success Responses > should fetch folder breadcrumb tree successfully

- File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 128. GET /teams - Comprehensive Tests > 200 Success Responses > should fetch team list successfully

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 129. GET /teams/{teamId}/items - Comprehensive Tests > 200 Success Responses > should fetch all items successfully

- File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 130. GET /teams - Comprehensive Tests > 200 Success Responses > should fetch team list successfully

- File: smoke-tests/specs/teams_list_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 131. POST /teams - Comprehensive Tests > 201 Success Responses > should create a new team successfully

- File: smoke-tests/specs/teams_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 132. PUT /teams/{teamId} - Comprehensive Tests > Security Tests > should prevent SQL injection in teamId

- File: smoke-tests/specs/teams_put_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 133. POST /teams/{teamId}/share - Comprehensive Tests > 200/201 Success Responses > should share team with existing user successfully

- File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 134. GET /teams/shared - Comprehensive Tests > Edge Cases > should handle very large page number

- File: smoke-tests/specs/teams_shared_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 135. GET /teams/shared - Comprehensive Tests > 200 Success Responses > should fetch shared teams successfully

- File: smoke-tests/specs/teams_shared_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 136. PATCH /teams/{teamId}/status - Comprehensive Tests > 200 Success Responses > should activate team successfully

- File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 137. PUT /teams/{teamId} - Comprehensive Tests > 201 Success Responses > should update team name successfully

- File: smoke-tests/specs/teams_update_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

## Skipped Testcases

1. POST /auth/login - Comprehensive Tests > 409 Conflict Responses > should return 409 if account is in conflict state (if implemented)
   - File: smoke-tests/specs/auth_login_comprehensive.spec.ts
2. POST /auth/login - Comprehensive Tests > 423 Account Locked Responses > should return 423 after multiple failed login attempts
   - File: smoke-tests/specs/auth_login_comprehensive.spec.ts
3. POST /auth/login - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after multiple rapid login attempts
   - File: smoke-tests/specs/auth_login_comprehensive.spec.ts
4. POST /auth/sign-out - Comprehensive Tests > 200 Success Responses > should clear session on successful sign-out
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
5. POST /auth/sign-out - Comprehensive Tests > 200 Success Responses > should return success message in proper format
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
6. POST /auth/sign-out - Comprehensive Tests > 200 Success Responses > should handle sign-out for different users independently
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
7. POST /auth/sign-out - Comprehensive Tests > 400 Bad Request Responses > should return 400 when request body is invalid
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
8. POST /auth/sign-out - Comprehensive Tests > 400 Bad Request Responses > should handle malformed JSON request body
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
9. POST /auth/sign-out - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when authorization header is missing
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
10. POST /auth/sign-out - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when token is empty

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

11. POST /auth/sign-out - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when authorization format is invalid

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

12. POST /auth/sign-out - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when only Bearer is provided

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

13. POST /auth/sign-out - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when token is invalid

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

14. POST /auth/sign-out - Comprehensive Tests > 403 Forbidden - Token Already Revoked > should return 403 when token is already revoked

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

15. POST /auth/sign-out - Comprehensive Tests > 403 Forbidden - Token Already Revoked > should reject already revoked token with proper message

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

16. POST /auth/sign-out - Comprehensive Tests > 404 Session Not Found Responses > should return 404 when session is not found

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

17. POST /auth/sign-out - Comprehensive Tests > 404 Session Not Found Responses > should handle non-existent session gracefully

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

18. POST /auth/sign-out - Comprehensive Tests > 403 Forbidden Responses > should return 403 when token is already revoked

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

19. POST /auth/sign-out - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

20. POST /auth/sign-out - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after multiple rapid sign-out attempts

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

21. POST /auth/sign-out - Comprehensive Tests > Edge Cases > should handle sign-out with custom headers

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

22. POST /auth/sign-out - Comprehensive Tests > Edge Cases > should handle token with whitespace

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

23. POST /auth/sign-out - Comprehensive Tests > Edge Cases > should handle very long token

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

24. POST /auth/sign-out - Comprehensive Tests > Edge Cases > should handle concurrent sign-out attempts

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

25. POST /auth/sign-out - Comprehensive Tests > Edge Cases > should not be affected by request body content

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

26. POST /auth/sign-out - Comprehensive Tests > Security Tests > should not expose sensitive information in error responses

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

27. POST /auth/sign-out - Comprehensive Tests > Security Tests > should not allow token manipulation in header

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

28. POST /auth/sign-out - Comprehensive Tests > Security Tests > should validate token signature

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

29. POST /auth/sign-out - Comprehensive Tests > Security Tests > should properly clear tokens from server storage

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

30. POST /auth/sign-out - Comprehensive Tests > Response Format Tests > should return consistent success response structure

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

31. POST /auth/sign-out - Comprehensive Tests > Response Format Tests > should return consistent error response structure

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

32. POST /auth/sign-out - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

33. POST /auth/sign-out - Comprehensive Tests > Response Format Tests > should not include unnecessary fields in response

- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts

34. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > 405 Method Not Allowed > should return 405 for GET method

- File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts

35. POST /me/avatar - Comprehensive Tests > 400 Bad Request Responses > should return 400 for image too large

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

36. POST /me/avatar - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

37. POST /me/avatar - Comprehensive Tests > 403 Invalid Access Token Responses > should return 403 for invalid token

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

38. POST /me/avatar - Comprehensive Tests > 404 Not Found Responses > should return 404 when user is not found

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

39. POST /me/avatar - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

40. POST /me/avatar - Comprehensive Tests > 409 Conflict Responses > should return 409 when conflict occurs

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

41. POST /me/avatar - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 for unsupported file format

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

42. POST /me/avatar - Comprehensive Tests > 422 Validation Error Responses > should return 422 for invalid payload

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

43. POST /me/avatar - Comprehensive Tests > 423 Locked Responses > should return 423 when account is locked

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

44. POST /me/avatar - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit is exceeded

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

45. POST /me/avatar - Comprehensive Tests > Edge Cases > should handle concurrent avatar uploads

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

46. POST /me/avatar - Comprehensive Tests > Edge Cases > should handle replacing existing avatar

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

47. POST /me/avatar - Comprehensive Tests > Edge Cases > should handle filename with special characters

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

48. POST /me/avatar - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

49. POST /me/avatar - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

50. POST /me/avatar - Comprehensive Tests > Security Tests > should prevent path traversal in filename

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

51. POST /me/avatar - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

52. POST /me/avatar - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

53. POST /me/avatar - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

54. POST /me/avatar - Comprehensive Tests > Performance Tests > should respond quickly (< 2000ms)

- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts

55. POST /me/password - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when no token is provided

- File: smoke-tests/specs/me_password_comprehensive.spec.ts

56. POST /me/password - Comprehensive Tests > 403 Invalid Access Token Responses > should return 403 for invalid token

- File: smoke-tests/specs/me_password_comprehensive.spec.ts

57. POST /me/password - Comprehensive Tests > 404 Not Found Responses > should return 404 when user is not found

- File: smoke-tests/specs/me_password_comprehensive.spec.ts

58. POST /me/password - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method

- File: smoke-tests/specs/me_password_comprehensive.spec.ts

59. POST /me/password - Comprehensive Tests > 409 Conflict Responses > should return 409 when new password matches current

- File: smoke-tests/specs/me_password_comprehensive.spec.ts

60. POST /me/password - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is missing

- File: smoke-tests/specs/me_password_comprehensive.spec.ts

61. POST /me/password - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is incorrect

- File: smoke-tests/specs/me_password_comprehensive.spec.ts

62. POST /me/password - Comprehensive Tests > 422 Validation Error Responses > should return 422 for invalid new password

- File: smoke-tests/specs/me_password_comprehensive.spec.ts

63. POST /me/password - Comprehensive Tests > 423 Locked Responses > should return 423 when account is locked

- File: smoke-tests/specs/me_password_comprehensive.spec.ts

64. POST /me/password - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit is exceeded

- File: smoke-tests/specs/me_password_comprehensive.spec.ts

65. POST /me/password/set - Comprehensive Tests > should return 400 when password is already set

- File: smoke-tests/specs/me_password_set_comprehensive.spec.ts

66. POST /me/password/set - Comprehensive Tests > 200 Success Responses > should return correct success response structure

- File: smoke-tests/specs/me_password_set_comprehensive.spec.ts

67. POST /me/password/set - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided

- File: smoke-tests/specs/me_password_set_comprehensive.spec.ts

68. POST /me/password/set - Comprehensive Tests > 403 Invalid Access Token Responses > should return 403 for invalid token

- File: smoke-tests/specs/me_password_set_comprehensive.spec.ts

69. POST /me/password/set - Comprehensive Tests > 404 Not Found Responses > should return 404 when user is not found

- File: smoke-tests/specs/me_password_set_comprehensive.spec.ts

70. POST /me/password/set - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method

- File: smoke-tests/specs/me_password_set_comprehensive.spec.ts

71. POST /me/password/set - Comprehensive Tests > 409 Conflict Responses > should return 409 when new password matches current

- File: smoke-tests/specs/me_password_set_comprehensive.spec.ts

72. POST /me/password/set - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is missing

- File: smoke-tests/specs/me_password_set_comprehensive.spec.ts

73. POST /me/password/set - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is incorrect

- File: smoke-tests/specs/me_password_set_comprehensive.spec.ts

74. POST /me/password/set - Comprehensive Tests > 422 Validation Error Responses > should return 422 for invalid password

- File: smoke-tests/specs/me_password_set_comprehensive.spec.ts

75. POST /me/password/set - Comprehensive Tests > 423 Locked Responses > should return 423 when account is locked

- File: smoke-tests/specs/me_password_set_comprehensive.spec.ts

76. POST /me/password/set - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit is exceeded

- File: smoke-tests/specs/me_password_set_comprehensive.spec.ts

77. POST /me/profile - Comprehensive Tests > 200 Success Responses > should return correct success response structure

- File: smoke-tests/specs/me_profile_comprehensive.spec.ts

78. POST /me/profile - Comprehensive Tests > 400 Bad Request Responses > should return 400 when no fields are provided

- File: smoke-tests/specs/me_profile_comprehensive.spec.ts

79. POST /me/profile - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided

- File: smoke-tests/specs/me_profile_comprehensive.spec.ts

80. POST /me/profile - Comprehensive Tests > 403 Invalid Access Token Responses > should return 403 for invalid token

- File: smoke-tests/specs/me_profile_comprehensive.spec.ts

81. POST /me/profile - Comprehensive Tests > 404 Not Found Responses > should return 404 when user is not found

- File: smoke-tests/specs/me_profile_comprehensive.spec.ts

82. POST /me/profile - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST method

- File: smoke-tests/specs/me_profile_comprehensive.spec.ts

83. POST /me/profile - Comprehensive Tests > 409 Conflict Responses > should return 409 when conflict occurs

- File: smoke-tests/specs/me_profile_comprehensive.spec.ts

84. POST /me/profile - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is missing

- File: smoke-tests/specs/me_profile_comprehensive.spec.ts

85. POST /me/profile - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is incorrect

- File: smoke-tests/specs/me_profile_comprehensive.spec.ts

86. POST /me/profile - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 for invalid profile data

- File: smoke-tests/specs/me_profile_comprehensive.spec.ts

87. POST /me/profile - Comprehensive Tests > 423 Locked Responses > should return 423 when account is locked

- File: smoke-tests/specs/me_profile_comprehensive.spec.ts

88. POST /me/profile - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after excessive requests

- File: smoke-tests/specs/me_profile_comprehensive.spec.ts

89. POST /me/profile - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/me_profile_comprehensive.spec.ts

90. POST /me/profile - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/me_profile_comprehensive.spec.ts

91. GET /me/subscription - Comprehensive Tests > 200 Success Responses > should return subscription data for solo account

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

92. GET /me/subscription - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no auth token is provided

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

93. GET /me/subscription - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 for invalid token format

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

94. GET /me/subscription - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

95. GET /me/subscription - Comprehensive Tests > 404 Not Found Responses > should return 404 when subscription is missing

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

96. GET /me/subscription - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST request

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

97. GET /me/subscription - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after excessive requests

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

98. GET /me/subscription - Comprehensive Tests > Edge Cases > should handle very long authorization header

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

99. GET /me/subscription - Comprehensive Tests > Edge Cases > should handle special characters in header

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

100. GET /me/subscription - Comprehensive Tests > Edge Cases > should handle case-insensitive Bearer prefix

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

101. GET /me/subscription - Comprehensive Tests > Edge Cases > should handle whitespace in header

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

102. GET /me/subscription - Comprehensive Tests > Edge Cases > should handle invalid query parameters

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

103. GET /me/subscription - Comprehensive Tests > Edge Cases > should return fresh data on each request

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

104. GET /me/subscription - Comprehensive Tests > Security Tests > should not expose sensitive payment data

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

105. GET /me/subscription - Comprehensive Tests > Security Tests > should not expose database structure

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

106. GET /me/subscription - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

107. GET /me/subscription - Comprehensive Tests > Security Tests > should return only logged-in user subscription

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

108. GET /me/subscription - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

109. GET /me/subscription - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

110. GET /me/subscription - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

111. GET /me/subscription - Comprehensive Tests > Response Format Tests > should handle null subscription gracefully

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

112. GET /me/subscription - Comprehensive Tests > Response Format Tests > should format dates consistently

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

113. GET /me/subscription - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

114. GET /me/subscription - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently

- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts

115. GET /me/usage - Comprehensive Tests > 200 Success Responses > should return correct usage structure

- File: smoke-tests/specs/me_usage_comprehensive.spec.ts

116. GET /me/usage - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided

- File: smoke-tests/specs/me_usage_comprehensive.spec.ts

117. GET /me/usage - Comprehensive Tests > 403 Forbidden Responses > should return 403 when access is forbidden

- File: smoke-tests/specs/me_usage_comprehensive.spec.ts

118. GET /me/usage - Comprehensive Tests > 404 Not Found Responses > should return 404 when user is not found

- File: smoke-tests/specs/me_usage_comprehensive.spec.ts

119. GET /me/usage - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST method

- File: smoke-tests/specs/me_usage_comprehensive.spec.ts

120. GET /me/usage - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for PUT method

- File: smoke-tests/specs/me_usage_comprehensive.spec.ts

121. GET /me/usage - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for DELETE method

- File: smoke-tests/specs/me_usage_comprehensive.spec.ts

122. GET /me/usage - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for PATCH method

- File: smoke-tests/specs/me_usage_comprehensive.spec.ts

123. GET /me/usage - Comprehensive Tests > 423 Locked Responses > should return 423 when account is locked

- File: smoke-tests/specs/me_usage_comprehensive.spec.ts

124. GET /me/usage - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after excessive requests

- File: smoke-tests/specs/me_usage_comprehensive.spec.ts

125. GET /me/usage - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/me_usage_comprehensive.spec.ts

126. GET /me/usage - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/me_usage_comprehensive.spec.ts

127. POST /me/verification/resend - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when token is missing

- File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts

128. POST /me/verification/resend - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission

- File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts

129. POST /me/verification/resend - Comprehensive Tests > 404 Not Found Responses > should return 404 when user is not found

- File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts

130. POST /me/verification/resend - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET

- File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts

131. POST /me/verification/resend - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for PUT

- File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts

132. POST /me/verification/resend - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for DELETE

- File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts

133. POST /me/verification/resend - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for PATCH

- File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts

134. POST /me/verification/resend - Comprehensive Tests > 409 Conflict Responses > should return 409 when user is already verified

- File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts

135. POST /me/verification/resend - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 when verification email cannot be processed

- File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts

136. POST /me/verification/resend - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after excessive requests

- File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts

137. POST /me/verification/resend - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts

138. POST /me/verification/resend - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts

139. GET /notifications - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

140. GET /notifications - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

141. GET /notifications - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

142. GET /notifications - Comprehensive Tests > Edge Cases > should handle concurrent requests

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

143. GET /notifications - Comprehensive Tests > Edge Cases > should handle empty notification list

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

144. GET /notifications - Comprehensive Tests > Edge Cases > should handle different user tokens

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

145. GET /notifications - Comprehensive Tests > Edge Cases > should handle query parameters gracefully

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

146. GET /notifications - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

147. GET /notifications - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

148. GET /notifications - Comprehensive Tests > Security Tests > should prevent SQL injection attempts

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

149. GET /notifications - Comprehensive Tests > Security Tests > should require proper authorization

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

150. GET /notifications - Comprehensive Tests > Security Tests > should only return notifications for authenticated user

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

151. GET /notifications - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

152. GET /notifications - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

153. GET /notifications - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

154. GET /notifications - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

155. GET /notifications - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently

- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts

156. DELETE /notifications/view/{id} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

157. DELETE /notifications/view/{id} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

158. DELETE /notifications/view/{id} - Comprehensive Tests > 404 Not Found Responses > should return 404 for non-existent notification id

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

159. DELETE /notifications/view/{id} - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST method

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

160. DELETE /notifications/view/{id} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

161. DELETE /notifications/view/{id} - Comprehensive Tests > Edge Cases > should handle negative notification ID

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

162. DELETE /notifications/view/{id} - Comprehensive Tests > Edge Cases > should handle zero notification ID

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

163. DELETE /notifications/view/{id} - Comprehensive Tests > Edge Cases > should handle very large notification ID

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

164. DELETE /notifications/view/{id} - Comprehensive Tests > Edge Cases > should handle special characters in ID

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

165. DELETE /notifications/view/{id} - Comprehensive Tests > Edge Cases > should handle URL encoded ID

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

166. DELETE /notifications/view/{id} - Comprehensive Tests > Edge Cases > should handle double deletion attempt

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

167. DELETE /notifications/view/{id} - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

168. DELETE /notifications/view/{id} - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

169. DELETE /notifications/view/{id} - Comprehensive Tests > Security Tests > should prevent SQL injection in ID

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

170. DELETE /notifications/view/{id} - Comprehensive Tests > Security Tests > should require proper authorization

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

171. DELETE /notifications/view/{id} - Comprehensive Tests > Security Tests > should only delete notifications owned by user

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

172. DELETE /notifications/view/{id} - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

173. DELETE /notifications/view/{id} - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

174. DELETE /notifications/view/{id} - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

175. DELETE /notifications/view/{id} - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

176. DELETE /notifications/view/{id} - Comprehensive Tests > Performance Tests > should handle multiple deletions efficiently

- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts

177. PATCH /notifications/viewed - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

178. PATCH /notifications/viewed - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

179. PATCH /notifications/viewed - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST method

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

180. PATCH /notifications/viewed - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

181. PATCH /notifications/viewed - Comprehensive Tests > Edge Cases > should handle concurrent requests

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

182. PATCH /notifications/viewed - Comprehensive Tests > Edge Cases > should handle request with body

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

183. PATCH /notifications/viewed - Comprehensive Tests > Edge Cases > should handle request with query parameters

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

184. PATCH /notifications/viewed - Comprehensive Tests > Edge Cases > should work when no notifications exist

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

185. PATCH /notifications/viewed - Comprehensive Tests > Edge Cases > should work when all notifications already viewed

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

186. PATCH /notifications/viewed - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

187. PATCH /notifications/viewed - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

188. PATCH /notifications/viewed - Comprehensive Tests > Security Tests > should prevent SQL injection in headers

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

189. PATCH /notifications/viewed - Comprehensive Tests > Security Tests > should require proper authorization

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

190. PATCH /notifications/viewed - Comprehensive Tests > Security Tests > should only update notifications for authenticated user

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

191. PATCH /notifications/viewed - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

192. PATCH /notifications/viewed - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

193. PATCH /notifications/viewed - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

194. PATCH /notifications/viewed - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

195. PATCH /notifications/viewed - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

196. PATCH /notifications/viewed - Comprehensive Tests > Performance Tests > should handle bulk update efficiently

- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts

197. GET /settings/max-uploads - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts

198. GET /settings/max-uploads - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts

199. GET /settings/max-uploads - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts

200. GET /settings/max-uploads - Comprehensive Tests > Edge Cases > should handle requests with extra parameters

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts

201. GET /settings/max-uploads - Comprehensive Tests > Edge Cases > should handle concurrent requests

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts

202. GET /settings/max-uploads - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts

203. GET /settings/max-uploads - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts

204. GET /settings/max-uploads - Comprehensive Tests > Security Tests > should require authentication

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts

205. GET /settings/max-uploads - Comprehensive Tests > Security Tests > should enforce UI-level limits

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts

206. GET /settings/max-uploads - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts

207. GET /settings/max-uploads - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts

208. GET /settings/max-uploads - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts

209. GET /settings/max-uploads - Comprehensive Tests > Performance Tests > should respond quickly (< 300ms)

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts

210. GET /settings/max-uploads - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts

211. GET /settings/max-uploads - Comprehensive Tests > Performance Tests > should retrieve setting efficiently

- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts

212. GET /settings/recording-limit - Comprehensive Tests > 400 Bad Request Responses > should return 400 with malformed query params

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

213. GET /settings/recording-limit - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

214. GET /settings/recording-limit - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

215. GET /settings/recording-limit - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

216. GET /settings/recording-limit - Comprehensive Tests > Edge Cases > should handle query parameters gracefully

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

217. GET /settings/recording-limit - Comprehensive Tests > Edge Cases > should handle concurrent requests

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

218. GET /settings/recording-limit - Comprehensive Tests > Edge Cases > should be accessible to authenticated users

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

219. GET /settings/recording-limit - Comprehensive Tests > Edge Cases > should display usage for account

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

220. GET /settings/recording-limit - Comprehensive Tests > Edge Cases > should allow usage bars display

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

221. GET /settings/recording-limit - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

222. GET /settings/recording-limit - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

223. GET /settings/recording-limit - Comprehensive Tests > Security Tests > should require authentication

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

224. GET /settings/recording-limit - Comprehensive Tests > Security Tests > should restrict when limits reached

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

225. GET /settings/recording-limit - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

226. GET /settings/recording-limit - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

227. GET /settings/recording-limit - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

228. GET /settings/recording-limit - Comprehensive Tests > Performance Tests > should respond quickly (< 400ms)

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

229. GET /settings/recording-limit - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

230. GET /settings/recording-limit - Comprehensive Tests > Performance Tests > should retrieve limit efficiently

- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts

231. GET /settings/recording-prompt-time - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

232. GET /settings/recording-prompt-time - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

233. GET /settings/recording-prompt-time - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

234. GET /settings/recording-prompt-time - Comprehensive Tests > 404 Not Found Responses > should return 404 when setting not found

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

235. GET /settings/recording-prompt-time - Comprehensive Tests > 409 Conflict Responses > should return 409 on concurrent update attempts

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

236. GET /settings/recording-prompt-time - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 when validation fails

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

237. GET /settings/recording-prompt-time - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

238. GET /settings/recording-prompt-time - Comprehensive Tests > Edge Cases > should handle query parameters gracefully

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

239. GET /settings/recording-prompt-time - Comprehensive Tests > Edge Cases > should handle concurrent requests

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

240. GET /settings/recording-prompt-time - Comprehensive Tests > Edge Cases > should be accessible to authenticated users

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

241. GET /settings/recording-prompt-time - Comprehensive Tests > Edge Cases > should return duration in minutes

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

242. GET /settings/recording-prompt-time - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

243. GET /settings/recording-prompt-time - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

244. GET /settings/recording-prompt-time - Comprehensive Tests > Security Tests > should require authentication

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

245. GET /settings/recording-prompt-time - Comprehensive Tests > Security Tests > should provide prompt time for session management

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

246. GET /settings/recording-prompt-time - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

247. GET /settings/recording-prompt-time - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

248. GET /settings/recording-prompt-time - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

249. GET /settings/recording-prompt-time - Comprehensive Tests > Performance Tests > should respond quickly (< 300ms)

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

250. GET /settings/recording-prompt-time - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

251. GET /settings/recording-prompt-time - Comprehensive Tests > Performance Tests > should retrieve setting efficiently

- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts

252. GET /super-admin/clients - Comprehensive Tests > Edge Cases > should handle negative page number

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

253. GET /super-admin/clients - Comprehensive Tests > Edge Cases > should handle very large limit

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

254. GET /super-admin/clients - Comprehensive Tests > Edge Cases > should handle empty search query

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

255. GET /super-admin/clients - Comprehensive Tests > Edge Cases > should handle search with special characters

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

256. GET /super-admin/clients - Comprehensive Tests > Edge Cases > should handle concurrent requests

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

257. GET /super-admin/clients - Comprehensive Tests > Edge Cases > should handle invalid query parameter names

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

258. GET /super-admin/clients - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

259. GET /super-admin/clients - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

260. GET /super-admin/clients - Comprehensive Tests > Security Tests > should prevent SQL injection in search

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

261. GET /super-admin/clients - Comprehensive Tests > Security Tests > should require super admin authorization

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

262. GET /super-admin/clients - Comprehensive Tests > Security Tests > should only return accessible client list

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

263. GET /super-admin/clients - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

264. GET /super-admin/clients - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

265. GET /super-admin/clients - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

266. GET /super-admin/clients - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

267. GET /super-admin/clients - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

268. GET /super-admin/clients - Comprehensive Tests > Performance Tests > should handle pagination efficiently

- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts

269. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Edge Cases > should handle companyId with hyphens

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

270. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Edge Cases > should handle companyId with underscores

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

271. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Edge Cases > should prevent concurrent deletion of same company

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

272. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Edge Cases > should delete all associated resources

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

273. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Edge Cases > should delete company with active subscriptions

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

274. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Edge Cases > should handle deletion of company with many documents

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

275. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

276. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

277. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Security Tests > should prevent SQL injection in companyId

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

278. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Security Tests > should require super admin authorization

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

279. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Security Tests > should prevent unauthorized deletion

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

280. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Security Tests > should log deletion audit trail

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

281. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Security Tests > should require extreme caution confirmation

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

282. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

283. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

284. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

285. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Performance Tests > should respond quickly for simple deletions (< 2000ms)

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

286. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Performance Tests > should handle large resource deletions efficiently

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

287. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Performance Tests > should process cascading deletion efficiently

- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts

288. GET /super-admin/companies/{companyId} - Comprehensive Tests > 200 Success Responses > should return company with required fields

- File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts

289. GET /super-admin/companies/{companyId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts

290. GET /super-admin/companies/{companyId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts

291. GET /super-admin/companies/{companyId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired

- File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts

292. GET /super-admin/companies/{companyId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user is not super-admin

- File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts

293. GET /super-admin/companies/{companyId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when company not found

- File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts

294. GET /super-admin/companies/{companyId} - Comprehensive Tests > Response Format Validation > should include required headers in response

- File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts

295. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for missing token

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

296. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > 404 Not Found Responses > should return 404 when company is not found

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

297. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 for non-multipart request

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

298. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

299. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Edge Cases > should handle special characters in filename

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

300. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Edge Cases > should handle corrupted image

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

301. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Edge Cases > should handle very large file

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

302. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Edge Cases > should not modify other company fields

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

303. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Edge Cases > should allow only one file per request

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

304. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

305. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Security Tests > should prevent path traversal in filename

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

306. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

307. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Security Tests > should require super admin authorization

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

308. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

309. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

310. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)

- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts

311. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 200 Success Responses > should return company profile with required fields

- File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts

312. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 400 Bad Request Responses > should return 400 when companyId is invalid

- File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts

313. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts

314. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts

315. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired

- File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts

316. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user is not super-admin

- File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts

317. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 404 Not Found Responses > should return 404 when company not found

- File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts

318. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > Response Format Validation > should include required headers in response

- File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts

319. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Edge Cases > should handle special characters in company name

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts

320. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Edge Cases > should handle null values in optional fields

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts

321. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Edge Cases > should handle concurrent updates

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts

322. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Edge Cases > should not handle image uploads

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts

323. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Edge Cases > should handle address updates

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts

324. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts

325. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts

326. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Security Tests > should prevent SQL injection in companyName

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts

327. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Security Tests > should require super admin authorization

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts

328. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Security Tests > should prevent XSS in company name

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts

329. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts

330. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts

331. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts

332. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts

333. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Performance Tests > should handle partial updates efficiently

- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts

334. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle negative companyId

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

335. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle very large companyId

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

336. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle query parameters gracefully

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

337. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle concurrent requests

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

338. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Edge Cases > should return aggregated data not individual usage

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

339. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

340. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

341. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Security Tests > should prevent SQL injection in companyId

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

342. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Security Tests > should require super admin authorization

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

343. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Security Tests > should only access authorized company usage

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

344. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

345. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

346. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

347. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

348. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

349. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Performance Tests > should retrieve aggregated data efficiently

- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts

350. GET /super-admin/companies - Comprehensive Tests > 200 Success Responses > should return companies with expected structure

- File: smoke-tests/specs/super_admin_companies_get_comprehensive.spec.ts

351. GET /super-admin/companies - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/super_admin_companies_get_comprehensive.spec.ts

352. GET /super-admin/companies - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/super_admin_companies_get_comprehensive.spec.ts

353. GET /super-admin/companies - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired

- File: smoke-tests/specs/super_admin_companies_get_comprehensive.spec.ts

354. GET /super-admin/companies - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user is not super-admin

- File: smoke-tests/specs/super_admin_companies_get_comprehensive.spec.ts

355. GET /super-admin/companies - Comprehensive Tests > Response Format Validation > should include required headers in response

- File: smoke-tests/specs/super_admin_companies_get_comprehensive.spec.ts

356. GET /super-admin/email/templates - Comprehensive Tests > Edge Cases > should handle concurrent requests

- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts

357. GET /super-admin/email/templates - Comprehensive Tests > Edge Cases > should be accessible only by Super Admins

- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts

358. GET /super-admin/email/templates - Comprehensive Tests > Edge Cases > should return all stored templates

- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts

359. GET /super-admin/email/templates - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts

360. GET /super-admin/email/templates - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts

361. GET /super-admin/email/templates - Comprehensive Tests > Security Tests > should require super admin authorization

- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts

362. GET /super-admin/email/templates - Comprehensive Tests > Security Tests > should only allow Super Admins to view templates

- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts

363. GET /super-admin/email/templates - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts

364. GET /super-admin/email/templates - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts

365. GET /super-admin/email/templates - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts

366. GET /super-admin/email/templates - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts

367. GET /super-admin/email/templates - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently

- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts

368. GET /super-admin/email/templates - Comprehensive Tests > Performance Tests > should retrieve templates efficiently

- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts

369. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Edge Cases > should handle special characters in fields

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

370. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Edge Cases > should handle null values

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

371. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Edge Cases > should handle concurrent updates

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

372. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Edge Cases > should only update provided fields

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

373. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Edge Cases > should handle very large HTML content

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

374. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

375. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

376. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Security Tests > should prevent SQL injection in template fields

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

377. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Security Tests > should require super admin authorization

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

378. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Security Tests > should prevent XSS in template content

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

379. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

380. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

381. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

382. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

383. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Performance Tests > should handle multiple field updates efficiently

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

384. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Performance Tests > should process partial updates efficiently

- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts

385. GET /super-admin/environment - Comprehensive Tests > Edge Cases > should handle concurrent requests

- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts

386. GET /super-admin/environment - Comprehensive Tests > Edge Cases > should return read-only configuration

- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts

387. GET /super-admin/environment - Comprehensive Tests > Edge Cases > should be accessible only by Super Admins

- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts

388. GET /super-admin/environment - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts

389. GET /super-admin/environment - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts

390. GET /super-admin/environment - Comprehensive Tests > Security Tests > should require super admin authorization

- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts

391. GET /super-admin/environment - Comprehensive Tests > Security Tests > should only allow Super Admins to view environment settings

- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts

392. GET /super-admin/environment - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts

393. GET /super-admin/environment - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts

394. GET /super-admin/environment - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts

395. GET /super-admin/environment - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts

396. GET /super-admin/environment - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently

- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts

397. GET /super-admin/environment - Comprehensive Tests > Performance Tests > should retrieve environment data efficiently

- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts

398. PATCH /super-admin/environment - Comprehensive Tests > Edge Cases > should handle special characters in values

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

399. PATCH /super-admin/environment - Comprehensive Tests > Edge Cases > should handle null values

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

400. PATCH /super-admin/environment - Comprehensive Tests > Edge Cases > should handle concurrent updates

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

401. PATCH /super-admin/environment - Comprehensive Tests > Edge Cases > should only update provided fields

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

402. PATCH /super-admin/environment - Comprehensive Tests > Edge Cases > should handle numeric string values

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

403. PATCH /super-admin/environment - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

404. PATCH /super-admin/environment - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

405. PATCH /super-admin/environment - Comprehensive Tests > Security Tests > should prevent SQL injection in values

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

406. PATCH /super-admin/environment - Comprehensive Tests > Security Tests > should require super admin authorization

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

407. PATCH /super-admin/environment - Comprehensive Tests > Security Tests > should prevent XSS in environment values

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

408. PATCH /super-admin/environment - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

409. PATCH /super-admin/environment - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

410. PATCH /super-admin/environment - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

411. PATCH /super-admin/environment - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

412. PATCH /super-admin/environment - Comprehensive Tests > Performance Tests > should handle multiple field updates efficiently

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

413. PATCH /super-admin/environment - Comprehensive Tests > Performance Tests > should process partial updates efficiently

- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts

414. GET /super-admin/integrations - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts

415. GET /super-admin/integrations - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts

416. GET /super-admin/integrations - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired

- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts

417. GET /super-admin/integrations - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user is not super-admin

- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts

418. GET /super-admin/integrations - Comprehensive Tests > Response Format Validation > should include required headers in response

- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts

419. PATCH /super-admin/integrations - Comprehensive Tests > 200 Success Responses for User > should update user integrations successfully

- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts

420. PATCH /super-admin/integrations - Comprehensive Tests > 400 Bad Request Responses > should return 400 when both userId and companyId are missing

- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts

421. PATCH /super-admin/integrations - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts

422. PATCH /super-admin/integrations - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts

423. PATCH /super-admin/integrations - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired

- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts

424. PATCH /super-admin/integrations - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user is not super-admin

- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts

425. PATCH /super-admin/integrations - Comprehensive Tests > Response Format Validation > should include required headers in response

- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts

426. POST /super-admin/usage/last-month - Comprehensive Tests > Edge Cases > should handle zero values for usage

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

427. POST /super-admin/usage/last-month - Comprehensive Tests > Edge Cases > should handle very large usage values

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

428. POST /super-admin/usage/last-month - Comprehensive Tests > Edge Cases > should handle special characters in company name

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

429. POST /super-admin/usage/last-month - Comprehensive Tests > Edge Cases > should handle future year

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

430. POST /super-admin/usage/last-month - Comprehensive Tests > Edge Cases > should handle concurrent requests

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

431. POST /super-admin/usage/last-month - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

432. POST /super-admin/usage/last-month - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

433. POST /super-admin/usage/last-month - Comprehensive Tests > Security Tests > should prevent SQL injection in data fields

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

434. POST /super-admin/usage/last-month - Comprehensive Tests > Security Tests > should require super admin authorization

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

435. POST /super-admin/usage/last-month - Comprehensive Tests > Security Tests > should validate request content type

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

436. POST /super-admin/usage/last-month - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

437. POST /super-admin/usage/last-month - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

438. POST /super-admin/usage/last-month - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

439. POST /super-admin/usage/last-month - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

440. POST /super-admin/usage/last-month - Comprehensive Tests > Performance Tests > should handle concurrent inserts efficiently

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

441. POST /super-admin/usage/last-month - Comprehensive Tests > Performance Tests > should insert large dataset efficiently

- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts

442. DELETE /super-admin/users/{userId} - Comprehensive Tests > Edge Cases > should handle userId with hyphens

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

443. DELETE /super-admin/users/{userId} - Comprehensive Tests > Edge Cases > should handle userId with underscores

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

444. DELETE /super-admin/users/{userId} - Comprehensive Tests > Edge Cases > should prevent concurrent deletion of same user

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

445. DELETE /super-admin/users/{userId} - Comprehensive Tests > Edge Cases > should delete all associated resources

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

446. DELETE /super-admin/users/{userId} - Comprehensive Tests > Edge Cases > should handle deletion of user with active sessions

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

447. DELETE /super-admin/users/{userId} - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

448. DELETE /super-admin/users/{userId} - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

449. DELETE /super-admin/users/{userId} - Comprehensive Tests > Security Tests > should prevent SQL injection in userId

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

450. DELETE /super-admin/users/{userId} - Comprehensive Tests > Security Tests > should require super admin authorization

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

451. DELETE /super-admin/users/{userId} - Comprehensive Tests > Security Tests > should prevent unauthorized deletion

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

452. DELETE /super-admin/users/{userId} - Comprehensive Tests > Security Tests > should log deletion audit trail

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

453. DELETE /super-admin/users/{userId} - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

454. DELETE /super-admin/users/{userId} - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

455. DELETE /super-admin/users/{userId} - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

456. DELETE /super-admin/users/{userId} - Comprehensive Tests > Performance Tests > should respond quickly for simple deletions (< 1000ms)

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

457. DELETE /super-admin/users/{userId} - Comprehensive Tests > Performance Tests > should handle large resource deletions efficiently

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

458. DELETE /super-admin/users/{userId} - Comprehensive Tests > Performance Tests > should process deletion efficiently

- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts

459. GET /super-admin/users/{userId} - Comprehensive Tests > 200 Success Responses > should return user with required fields

- File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts

460. GET /super-admin/users/{userId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts

461. GET /super-admin/users/{userId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts

462. GET /super-admin/users/{userId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired

- File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts

463. GET /super-admin/users/{userId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user is not super-admin

- File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts

464. GET /super-admin/users/{userId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when user not found

- File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts

465. GET /super-admin/users/{userId} - Comprehensive Tests > Response Format Validation > should include required headers in response

- File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts

466. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for missing token

- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts

467. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded

- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts

468. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Edge Cases > should handle special characters in filename

- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts

469. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Edge Cases > should handle corrupted image

- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts

470. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Edge Cases > should handle very large file

- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts

471. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Edge Cases > should not modify other user fields

- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts

472. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts

473. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Security Tests > should prevent path traversal in filename

- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts

474. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts

475. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Security Tests > should require super admin authorization

- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts

476. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts

477. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts

478. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)

- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts

479. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 200 Success Responses > should return user profile with required fields

- File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts

480. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 400 Bad Request Responses > should return 400 when userId is invalid

- File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts

481. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts

482. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts

483. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired

- File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts

484. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user is not super-admin

- File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts

485. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 404 Not Found Responses > should return 404 when user not found

- File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts

486. GET /super-admin/users/{userId}/profile - Comprehensive Tests > Response Format Validation > should include required headers in response

- File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts

487. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Edge Cases > should handle special characters in name

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts

488. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Edge Cases > should handle null values in optional fields

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts

489. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Edge Cases > should handle password update

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts

490. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Edge Cases > should handle weak password

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts

491. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Edge Cases > should handle concurrent updates

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts

492. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts

493. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts

494. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Security Tests > should prevent SQL injection in firstname

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts

495. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Security Tests > should require super admin authorization

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts

496. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Security Tests > should hash passwords before storing

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts

497. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts

498. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts

499. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts

500. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts

501. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Performance Tests > should handle multiple field updates efficiently

- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts

502. GET /super-admin/users/{userId}/role - Comprehensive Tests > Edge Cases > should handle negative userId

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

503. GET /super-admin/users/{userId}/role - Comprehensive Tests > Edge Cases > should handle very large userId

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

504. GET /super-admin/users/{userId}/role - Comprehensive Tests > Edge Cases > should handle query parameters gracefully

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

505. GET /super-admin/users/{userId}/role - Comprehensive Tests > Edge Cases > should handle concurrent requests

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

506. GET /super-admin/users/{userId}/role - Comprehensive Tests > Edge Cases > should return isSuperAdmin as boolean not string

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

507. GET /super-admin/users/{userId}/role - Comprehensive Tests > Edge Cases > should check role for specific user ID

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

508. GET /super-admin/users/{userId}/role - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

509. GET /super-admin/users/{userId}/role - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

510. GET /super-admin/users/{userId}/role - Comprehensive Tests > Security Tests > should prevent SQL injection in userId

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

511. GET /super-admin/users/{userId}/role - Comprehensive Tests > Security Tests > should require super admin authorization

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

512. GET /super-admin/users/{userId}/role - Comprehensive Tests > Security Tests > should only check roles for authorized access

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

513. GET /super-admin/users/{userId}/role - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

514. GET /super-admin/users/{userId}/role - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

515. GET /super-admin/users/{userId}/role - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

516. GET /super-admin/users/{userId}/role - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

517. GET /super-admin/users/{userId}/role - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

518. GET /super-admin/users/{userId}/role - Comprehensive Tests > Performance Tests > should check role efficiently

- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts

519. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle negative userId

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

520. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle very large userId

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

521. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle query parameters gracefully

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

522. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle concurrent requests

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

523. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Edge Cases > should return only user usage not company aggregated

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

524. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Edge Cases > should auto-detect month and year

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

525. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

526. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

527. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Security Tests > should prevent SQL injection in userId

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

528. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Security Tests > should require super admin authorization

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

529. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Security Tests > should only access authorized user usage

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

530. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

531. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

532. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

533. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

534. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

535. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Performance Tests > should retrieve individual usage data efficiently

- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts

536. GET /teams/active - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_active_comprehensive.spec.ts

537. GET /teams/active - Comprehensive Tests > 403 Forbidden Responses > should return 403 when access denied

- File: smoke-tests/specs/teams_active_comprehensive.spec.ts

538. GET /teams/active - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid query parameters

- File: smoke-tests/specs/teams_active_comprehensive.spec.ts

539. GET /teams/active - Comprehensive Tests > 404 Not Found Responses > should return 404 for invalid active endpoint path

- File: smoke-tests/specs/teams_active_comprehensive.spec.ts

540. GET /teams/active - Comprehensive Tests > 409 Conflict Responses > should handle conflict state when fetching active teams

- File: smoke-tests/specs/teams_active_comprehensive.spec.ts

541. GET /teams/active - Comprehensive Tests > 422 Validation Error Responses > should handle 422 for malformed active team filters

- File: smoke-tests/specs/teams_active_comprehensive.spec.ts

542. GET /teams/active - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for too many active team requests

- File: smoke-tests/specs/teams_active_comprehensive.spec.ts

543. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 200 Success Responses > should support pagination in messages

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

544. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 400 Bad Request Responses > should return 400 with invalid limit

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

545. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 400 Bad Request Responses > should return 400 with negative limit

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

546. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

547. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

548. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks access

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

549. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 404 Not Found Responses > should return 404 when chat not found

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

550. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

551. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

552. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle zero limit

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

553. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle special characters in cursor

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

554. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle very long cursor

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

555. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle concurrent requests

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

556. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle empty cursor values

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

557. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should prevent XSS in cursor parameter

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

558. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should prevent SQL injection in cursor

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

559. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

560. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should not expose sensitive data in messages

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

561. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

562. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

563. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

564. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

565. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Performance Tests > should handle large limit efficiently

- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts

566. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 400 Bad Request Responses > should return 400 when message is empty

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

567. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 400 Bad Request Responses > should return 400 when role is missing

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

568. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

569. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

570. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks access

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

571. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 404 Not Found Responses > should return 404 when chat not found

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

572. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

573. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

574. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle special characters in message

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

575. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle unicode in message

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

576. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle newlines in message

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

577. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle concurrent message submissions

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

578. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle whitespace-only message

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

579. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle extremely long message

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

580. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should prevent XSS in message content

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

581. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should prevent SQL injection

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

582. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

583. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

584. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

585. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

586. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

587. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts

588. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 when name is empty

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

589. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

590. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

591. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks access

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

592. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when chat not found

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

593. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

594. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 when name is too long

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

595. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

596. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Edge Cases > should handle special characters in name

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

597. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Edge Cases > should handle unicode characters in name

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

598. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Edge Cases > should trim whitespace from name

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

599. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Edge Cases > should handle concurrent rename attempts

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

600. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Edge Cases > should handle newlines in name

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

601. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Security Tests > should prevent XSS in chat name

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

602. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Security Tests > should prevent SQL injection

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

603. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

604. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

605. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

606. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

607. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

608. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts

609. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 when chat ID is invalid format

- File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts

610. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts

611. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts

612. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission

- File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts

613. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when chat not found

- File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts

614. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 409 Conflict Responses > should return 409 on concurrent delete attempts

- File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts

615. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded

- File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts

616. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Response Format Validation > should include required headers in response

- File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts

617. GET /teams/{teamId}/chats - Comprehensive Tests > 200 Success Responses > should support pagination

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

618. GET /teams/{teamId}/chats - Comprehensive Tests > 400 Bad Request Responses > should return 400 with invalid limit parameter

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

619. GET /teams/{teamId}/chats - Comprehensive Tests > 400 Bad Request Responses > should return 400 with negative offset

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

620. GET /teams/{teamId}/chats - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

621. GET /teams/{teamId}/chats - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

622. GET /teams/{teamId}/chats - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks team access

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

623. GET /teams/{teamId}/chats - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

624. GET /teams/{teamId}/chats - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

625. GET /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle special characters in search

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

626. GET /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle unicode in search

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

627. GET /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle empty scope parameter

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

628. GET /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle multiple scope values

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

629. GET /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle case sensitivity in search

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

630. GET /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should prevent XSS in search parameter

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

631. GET /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should prevent SQL injection in search

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

632. GET /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

633. GET /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

634. GET /teams/{teamId}/chats - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

635. GET /teams/{teamId}/chats - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

636. GET /teams/{teamId}/chats - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

637. GET /teams/{teamId}/chats - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

638. GET /teams/{teamId}/chats - Comprehensive Tests > Performance Tests > should handle large result sets efficiently

- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts

639. POST /teams/{teamId}/chats - Comprehensive Tests > 400 Bad Request Responses > should return 400 when name is missing

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

640. POST /teams/{teamId}/chats - Comprehensive Tests > 400 Bad Request Responses > should return 400 when scope is invalid

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

641. POST /teams/{teamId}/chats - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

642. POST /teams/{teamId}/chats - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

643. POST /teams/{teamId}/chats - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks team access

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

644. POST /teams/{teamId}/chats - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

645. POST /teams/{teamId}/chats - Comprehensive Tests > 409 Conflict Responses > should return 409 when chat name already exists

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

646. POST /teams/{teamId}/chats - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 when chat name is too long

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

647. POST /teams/{teamId}/chats - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 when resourceId validation fails

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

648. POST /teams/{teamId}/chats - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

649. POST /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle very long resourceId

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

650. POST /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle special characters in resourceId

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

651. POST /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle unicode characters

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

652. POST /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle concurrent chat creation

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

653. POST /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle empty resourceId

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

654. POST /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should prevent XSS in resourceId

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

655. POST /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should prevent SQL injection

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

656. POST /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

657. POST /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should not expose sensitive data in response

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

658. POST /teams/{teamId}/chats - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

659. POST /teams/{teamId}/chats - Comprehensive Tests > Response Format Tests > should return consistent error structure

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

660. POST /teams/{teamId}/chats - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

661. POST /teams/{teamId}/chats - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)

- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts

662. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid teamId

- File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts

663. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid fileId

- File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts

664. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing

- File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts

665. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token

- File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts

666. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token

- File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts

667. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token

- File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts

668. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 404 Not Found > should return 404 for non-existent file

- File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts

669. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user cannot delete file

- File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts

670. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 422 Validation Error Responses > should return 422 for malformed delete parameters

- File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts

671. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated delete requests

- File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts

672. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > Security Tests > should validate authorization token

- File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts

673. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > Security Tests > should handle SQL injection in fileId

- File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts

674. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid teamId

- File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts

675. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid fileId

- File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts

676. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing

- File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts

677. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token

- File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts

678. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token

- File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts

679. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token

- File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts

680. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 404 Not Found > should return 404 for non-existent file

- File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts

681. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user has no access to target team/file

- File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts

682. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 422 Validation Error Responses > should return 422 for malformed file identifier

- File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts

683. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated file download requests

- File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts

684. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > Security Tests > should validate authorization token

- File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts

685. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > Security Tests > should handle SQL injection in fileId

- File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts

686. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid teamId

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

687. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid fileId

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

688. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 400 Bad Request Responses > should return 400 for missing new name

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

689. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

690. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

691. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

692. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

693. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 404 Not Found > should return 404 for non-existent file

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

694. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user cannot rename file

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

695. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 409 Conflict Responses > should return 409 when target filename already exists

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

696. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 422 Validation Error Responses > should return 422 for invalid rename payload

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

697. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated rename requests

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

698. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > Edge Cases > should handle very long file name

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

699. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > Edge Cases > should handle special characters in file name

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

700. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > Security Tests > should reject SQL injection attempts

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

701. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > Security Tests > should validate authorization token

- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts

702. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid teamId

- File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts

703. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid fileId

- File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts

704. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for empty request body

- File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts

705. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing

- File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts

706. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token

- File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts

707. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token

- File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts

708. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token

- File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts

709. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 404 Not Found > should return 404 for non-existent file

- File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts

710. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission

- File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts

711. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated file update requests

- File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts

712. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > Security Tests > should validate authorization token

- File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts

713. POST /teams/{teamId}/files - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid teamId

- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts

714. POST /teams/{teamId}/files - Comprehensive Tests > 400 Bad Request Responses > should return 400 for missing required parameters

- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts

715. POST /teams/{teamId}/files - Comprehensive Tests > 400 Bad Request Responses > should return 400 for malformed JSON

- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts

716. POST /teams/{teamId}/files - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing

- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts

717. POST /teams/{teamId}/files - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token

- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts

718. POST /teams/{teamId}/files - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token

- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts

719. POST /teams/{teamId}/files - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token

- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts

720. POST /teams/{teamId}/files - Comprehensive Tests > 404 Not Found > should return 404 for non-existent team

- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts

721. POST /teams/{teamId}/files - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission

- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts

722. POST /teams/{teamId}/files - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated file create requests

- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts

723. POST /teams/{teamId}/files - Comprehensive Tests > Edge Cases > should handle very long file name

- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts

724. POST /teams/{teamId}/files - Comprehensive Tests > Edge Cases > should handle special characters in file name

- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts

725. POST /teams/{teamId}/files - Comprehensive Tests > Security Tests > should reject SQL injection attempts

- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts

726. POST /teams/{teamId}/files - Comprehensive Tests > Security Tests > should validate authorization token

- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts

727. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid teamId

- File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts

728. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid fileId

- File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts

729. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing

- File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts

730. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token

- File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts

731. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token

- File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts

732. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token

- File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts

733. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 404 Not Found > should return 404 for non-existent file

- File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts

734. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks access to summary

- File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts

735. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated summary requests

- File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts

736. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > Security Tests > should validate authorization token

- File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts

737. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > Security Tests > should handle SQL injection in fileId

- File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts

738. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 200 Success Responses > should soft delete folder to trash

- File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts

739. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 when folder ID is invalid format

- File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts

740. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts

741. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts

742. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission

- File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts

743. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when folder not found

- File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts

744. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 409 Conflict Responses > should handle 409 when deleting protected/default folder

- File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts

745. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated delete attempts

- File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts

746. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > Response Format Validation > should include required headers in response

- File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts

747. GET /teams/{teamId}/folders - Comprehensive Tests > 200 Success Responses > should fetch items with pagination

- File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts

748. GET /teams/{teamId}/folders - Comprehensive Tests > 200 Success Responses > should search items by name

- File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts

749. GET /teams/{teamId}/folders - Comprehensive Tests > 200 Success Responses > should return item structure with type field

- File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts

750. GET /teams/{teamId}/folders - Comprehensive Tests > 400 Bad Request Responses > should return 400 when team ID is invalid

- File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts

751. GET /teams/{teamId}/folders - Comprehensive Tests > 400 Bad Request Responses > should return 400 when parentId is invalid number

- File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts

752. GET /teams/{teamId}/folders - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts

753. GET /teams/{teamId}/folders - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts

754. GET /teams/{teamId}/folders - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks access

- File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts

755. GET /teams/{teamId}/folders - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found

- File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts

756. GET /teams/{teamId}/folders - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when listing folders too frequently

- File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts

757. GET /teams/{teamId}/folders - Comprehensive Tests > Response Format Validation > should include required headers in response

- File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts

758. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 200 Success Responses > should update folder with tooltip/description

- File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts

759. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 when team ID is invalid

- File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts

760. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 when folder ID is invalid

- File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts

761. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts

762. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts

763. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission

- File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts

764. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when folder not found

- File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts

765. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 409 Conflict Responses > should handle 409 when folder name conflicts in same level

- File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts

766. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated folder update requests

- File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts

767. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > Response Format Validation > should include required headers in response

- File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts

768. POST /teams/{teamId}/folders - Comprehensive Tests > 201 Created Success Responses > should create subfolder with valid parentId

- File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts

769. POST /teams/{teamId}/folders - Comprehensive Tests > 400 Bad Request Responses > should return 400 when folder name is missing

- File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts

770. POST /teams/{teamId}/folders - Comprehensive Tests > 400 Bad Request Responses > should return 400 when team ID is invalid

- File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts

771. POST /teams/{teamId}/folders - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts

772. POST /teams/{teamId}/folders - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts

773. POST /teams/{teamId}/folders - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission

- File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts

774. POST /teams/{teamId}/folders - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found

- File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts

775. POST /teams/{teamId}/folders - Comprehensive Tests > 404 Not Found Responses > should return 404 when parent folder not found

- File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts

776. POST /teams/{teamId}/folders - Comprehensive Tests > 409 Conflict Responses > should handle 409 when folder already exists

- File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts

777. POST /teams/{teamId}/folders - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated folder create requests

- File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts

778. POST /teams/{teamId}/folders - Comprehensive Tests > Response Format Validation > should include required headers in response

- File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts

779. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 200 Success Responses > should return empty predecessors for root folder

- File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts

780. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 400 Bad Request Responses > should return 400 when folder ID is invalid format

- File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts

781. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts

782. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts

783. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission

- File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts

784. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 404 Not Found Responses > should return 404 when folder not found

- File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts

785. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when tree endpoint is repeatedly requested

- File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts

786. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > Response Format Validation > should include required headers in response

- File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts

787. GET /teams - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid query parameters

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts

788. GET /teams - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for missing access token

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts

789. GET /teams - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user has no access to requested company

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts

790. GET /teams - Comprehensive Tests > 404 Not Found Responses > should return 404 for non-existent teams path

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts

791. GET /teams - Comprehensive Tests > 409 Conflict Responses > should handle 409 conflict scenario for teams list

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts

792. GET /teams - Comprehensive Tests > 422 Validation Error Responses > should return 422 for malformed pagination values

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts

793. GET /teams - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for burst requests to teams list

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts

794. GET /teams - Comprehensive Tests > Edge Cases > should handle very large page number

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts

795. GET /teams - Comprehensive Tests > Edge Cases > should handle very large limit

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts

796. GET /teams - Comprehensive Tests > Edge Cases > should handle special characters in searchString

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts

797. GET /teams - Comprehensive Tests > Security Tests > should prevent SQL injection in searchString

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts

798. GET /teams - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts

799. GET /teams - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts

800. GET /teams - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts

801. GET /teams - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)

- File: smoke-tests/specs/teams_get_comprehensive.spec.ts

802. GET /teams/{teamId}/items - Comprehensive Tests > 200 Success Responses > should return items with correct parent relationships

- File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts

803. GET /teams/{teamId}/items - Comprehensive Tests > 400 Bad Request Responses > should return 400 when team ID is invalid format

- File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts

804. GET /teams/{teamId}/items - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts

805. GET /teams/{teamId}/items - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts

806. GET /teams/{teamId}/items - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission

- File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts

807. GET /teams/{teamId}/items - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found

- File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts

808. GET /teams/{teamId}/items - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when item list endpoint is requested excessively

- File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts

809. GET /teams/{teamId}/items - Comprehensive Tests > Response Format Validation > should include required headers in response

- File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts

810. GET /teams - Comprehensive Tests > 200 Success Responses > should support pagination parameters

- File: smoke-tests/specs/teams_list_comprehensive.spec.ts

811. GET /teams - Comprehensive Tests > 400 Bad Request Responses > should return 400 when companyId invalid for company users

- File: smoke-tests/specs/teams_list_comprehensive.spec.ts

812. GET /teams - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_list_comprehensive.spec.ts

813. GET /teams - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_list_comprehensive.spec.ts

814. GET /teams - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired

- File: smoke-tests/specs/teams_list_comprehensive.spec.ts

815. GET /teams - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user does not have access

- File: smoke-tests/specs/teams_list_comprehensive.spec.ts

816. GET /teams - Comprehensive Tests > 409 Conflict Responses > should return 409 when failed to fetch team list

- File: smoke-tests/specs/teams_list_comprehensive.spec.ts

817. GET /teams - Comprehensive Tests > 404 Not Found Responses > should handle invalid route parameters with not found response

- File: smoke-tests/specs/teams_list_comprehensive.spec.ts

818. GET /teams - Comprehensive Tests > 422 Validation Error Responses > should handle invalid query format for filter params

- File: smoke-tests/specs/teams_list_comprehensive.spec.ts

819. GET /teams - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when team list endpoint is heavily requested

- File: smoke-tests/specs/teams_list_comprehensive.spec.ts

820. GET /teams - Comprehensive Tests > Response Format Tests > should return proper content-type

- File: smoke-tests/specs/teams_list_comprehensive.spec.ts

821. POST /teams - Comprehensive Tests > Edge Cases > should handle very long team name

- File: smoke-tests/specs/teams_post_comprehensive.spec.ts

822. POST /teams - Comprehensive Tests > Edge Cases > should handle special characters in name

- File: smoke-tests/specs/teams_post_comprehensive.spec.ts

823. POST /teams - Comprehensive Tests > Edge Cases > should handle Unicode characters

- File: smoke-tests/specs/teams_post_comprehensive.spec.ts

824. POST /teams - Comprehensive Tests > Security Tests > should prevent SQL injection in name

- File: smoke-tests/specs/teams_post_comprehensive.spec.ts

825. POST /teams - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/teams_post_comprehensive.spec.ts

826. POST /teams - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/teams_post_comprehensive.spec.ts

827. POST /teams - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/teams_post_comprehensive.spec.ts

828. POST /teams - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)

- File: smoke-tests/specs/teams_post_comprehensive.spec.ts

829. PUT /teams/{teamId} - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/teams_put_comprehensive.spec.ts

830. PUT /teams/{teamId} - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/teams_put_comprehensive.spec.ts

831. PUT /teams/{teamId} - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)

- File: smoke-tests/specs/teams_put_comprehensive.spec.ts

832. POST /teams/{teamId}/share - Comprehensive Tests > 200/201 Success Responses > should return success if user already has access

- File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts

833. POST /teams/{teamId}/share - Comprehensive Tests > 400 Bad Request Responses > should return 400 when email is missing

- File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts

834. POST /teams/{teamId}/share - Comprehensive Tests > 400 Bad Request Responses > should return 400 when email format is invalid

- File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts

835. POST /teams/{teamId}/share - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts

836. POST /teams/{teamId}/share - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts

837. POST /teams/{teamId}/share - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission

- File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts

838. POST /teams/{teamId}/share - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found

- File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts

839. POST /teams/{teamId}/share - Comprehensive Tests > 409 Conflict Responses > should handle 409 when user is already shared to the team

- File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts

840. POST /teams/{teamId}/share - Comprehensive Tests > 422 Validation Error Responses > should return 422 for invalid share payload

- File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts

841. POST /teams/{teamId}/share - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for too many team share attempts

- File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts

842. GET /teams/shared - Comprehensive Tests > Edge Cases > should handle very large limit

- File: smoke-tests/specs/teams_shared_comprehensive.spec.ts

843. GET /teams/shared - Comprehensive Tests > Edge Cases > should handle special characters in searchString

- File: smoke-tests/specs/teams_shared_comprehensive.spec.ts

844. GET /teams/shared - Comprehensive Tests > Security Tests > should prevent SQL injection in searchString

- File: smoke-tests/specs/teams_shared_comprehensive.spec.ts

845. GET /teams/shared - Comprehensive Tests > Security Tests > should validate token on every request

- File: smoke-tests/specs/teams_shared_comprehensive.spec.ts

846. GET /teams/shared - Comprehensive Tests > Response Format Tests > should return consistent success structure

- File: smoke-tests/specs/teams_shared_comprehensive.spec.ts

847. GET /teams/shared - Comprehensive Tests > Response Format Tests > should return proper content type

- File: smoke-tests/specs/teams_shared_comprehensive.spec.ts

848. GET /teams/shared - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)

- File: smoke-tests/specs/teams_shared_comprehensive.spec.ts

849. GET /teams/shared - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_shared_get_comprehensive.spec.ts

850. GET /teams/shared - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_shared_get_comprehensive.spec.ts

851. GET /teams/shared - Comprehensive Tests > 403 Forbidden Responses > should return 403 when access denied

- File: smoke-tests/specs/teams_shared_get_comprehensive.spec.ts

852. GET /teams/shared - Comprehensive Tests > 409 Conflict Responses > should handle 409 when shared team state conflicts

- File: smoke-tests/specs/teams_shared_get_comprehensive.spec.ts

853. GET /teams/shared - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when shared teams endpoint is spammed

- File: smoke-tests/specs/teams_shared_get_comprehensive.spec.ts

854. PATCH /teams/{teamId}/status - Comprehensive Tests > 200 Success Responses > should deactivate team successfully

- File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts

855. PATCH /teams/{teamId}/status - Comprehensive Tests > 400 Bad Request Responses > should return 400 when active field is missing

- File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts

856. PATCH /teams/{teamId}/status - Comprehensive Tests > 400 Bad Request Responses > should return 400 when active is invalid value

- File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts

857. PATCH /teams/{teamId}/status - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts

858. PATCH /teams/{teamId}/status - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts

859. PATCH /teams/{teamId}/status - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission

- File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts

860. PATCH /teams/{teamId}/status - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found

- File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts

861. PATCH /teams/{teamId}/status - Comprehensive Tests > 409 Conflict Responses > should handle 409 when team status has conflicting state

- File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts

862. PATCH /teams/{teamId}/status - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when status endpoint exceeds request limits

- File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts

863. PATCH /teams/{teamId}/status - Comprehensive Tests > Response Format Validation > should include required headers in response

- File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts

864. PUT /teams/{teamId} - Comprehensive Tests > 201 Success Responses > should update team alias successfully

- File: smoke-tests/specs/teams_update_comprehensive.spec.ts

865. PUT /teams/{teamId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 when no fields provided for update

- File: smoke-tests/specs/teams_update_comprehensive.spec.ts

866. PUT /teams/{teamId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token

- File: smoke-tests/specs/teams_update_comprehensive.spec.ts

867. PUT /teams/{teamId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token

- File: smoke-tests/specs/teams_update_comprehensive.spec.ts

868. PUT /teams/{teamId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user not allowed to update team

- File: smoke-tests/specs/teams_update_comprehensive.spec.ts

869. PUT /teams/{teamId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when team does not exist

- File: smoke-tests/specs/teams_update_comprehensive.spec.ts

870. PUT /teams/{teamId} - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET request

- File: smoke-tests/specs/teams_update_comprehensive.spec.ts

871. PUT /teams/{teamId} - Comprehensive Tests > 409 Conflict Responses > should return 409 when teamAlias already in use

- File: smoke-tests/specs/teams_update_comprehensive.spec.ts
