# Clean Smoke Test Report

- Source JSON: C:\Users\Dhanush\Desktop\Digibot\digibot - Copy - Copy - Copy\e2e\full-smoke-report-20260302_185608.json
- Run start: 2026-03-02T13:26:10.869Z
- Total testcases: 1793
- Passed: 213
- Failed: 138
- Skipped: 1442

## Failed Testcases

### 1. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > 415 Unsupported Media Type > should return 415 for missing Content-Type
- File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 2. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > 415 Unsupported Media Type > should return 415 for missing Content-Type
- File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 3. PUT /admin/users/{userId}/profile/avatar - Comprehensive Tests > 200 Success Responses > should upload avatar successfully
- File: smoke-tests/specs/admin_users_avatar_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 4. DELETE /admin/users/{userId} - Comprehensive Tests > 405 Method Not Allowed > should return 405 for GET method
- File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 5. GET /admin/users/{userId} - Comprehensive Tests > Edge Cases > should handle UUID format userId
- File: smoke-tests/specs/admin_users_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 6. PATCH /admin/users/{userId}/password - Comprehensive Tests > 415 Unsupported Media Type > should return 415 for missing Content-Type
- File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 7. PATCH /admin/users/{userId}/profile - Comprehensive Tests > 200 Success Responses > should update profile successfully
- File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 8. POST /admin/users/{userId}/verify - Comprehensive Tests > Edge Cases > should handle UUID format userId
- File: smoke-tests/specs/admin_users_verify_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 9. GET /app-data - Comprehensive Tests > 200 Success Responses > should fetch application data successfully
- File: smoke-tests/specs/app_data_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBeDefined()
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: undefined

### 10. POST /auth/email/check - Comprehensive Tests > 200 Success Responses > should handle multiple existing users correctly
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: true
- Backend provided: false

### 11. POST /auth/email/check - Comprehensive Tests > 400 Bad Request Responses > should return 400 when email is missing
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "bad_request"
- Backend provided: undefined

### 12. POST /auth/email/check - Comprehensive Tests > 400 Bad Request Responses > should return 400 when email is empty string
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "bad_request"
- Backend provided: undefined

### 13. POST /auth/email/check - Comprehensive Tests > 400 Bad Request Responses > should return 400 when email is null
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "bad_request"
- Backend provided: undefined

### 14. POST /auth/email/check - Comprehensive Tests > 400 Bad Request Responses > should return 400 when email is undefined
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "bad_request"
- Backend provided: undefined

### 15. POST /auth/email/check - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: []
- Backend provided: undefined

### 16. POST /auth/email/check - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after multiple rapid email checks
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: true
- Backend provided: false

### 17. POST /auth/email/check - Comprehensive Tests > Edge Cases > should handle concurrent requests for different emails
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: true
- Backend provided: false

### 18. POST /auth/password/forgot - Comprehensive Tests > 400 Bad Request Responses > should return 400 when email is missing
- File: smoke-tests/specs/auth_password_forgot_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 19. POST /auth/password/forgot - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid email format
- File: smoke-tests/specs/auth_password_forgot_comprehensive.spec.ts
- Why it failed: Error: expect(received).toMatch(expected)
- Smoke test expected: /Invalid or missing email|Invalid or missing input/i
- Backend provided: Not explicitly present in assertion output

### 20. POST /auth/password/reset - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid reset token
- File: smoke-tests/specs/auth_password_reset_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 21. POST /auth/password/reset - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 for password without uppercase letter
- File: smoke-tests/specs/auth_password_reset_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 22. GET /auth/payment/status - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when token is missing
- File: smoke-tests/specs/auth_payment_status_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "missing_access_token"
- Backend provided: undefined

### 23. GET /auth/payment/status - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST request
- File: smoke-tests/specs/auth_payment_status_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "method_not_allowed"
- Backend provided: undefined

### 24. GET /auth/payment/status - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for PUT request
- File: smoke-tests/specs/auth_payment_status_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "method_not_allowed"
- Backend provided: undefined

### 25. GET /auth/payment/status - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for DELETE request
- File: smoke-tests/specs/auth_payment_status_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "method_not_allowed"
- Backend provided: undefined

### 26. GET /auth/providers/{provider} - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST request
- File: smoke-tests/specs/auth_providers_provider_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "method_not_allowed"
- Backend provided: undefined

### 27. POST /auth/refresh - Comprehensive Tests > 200 Success Responses > should refresh token successfully with valid refreshToken - 200
- File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 28. POST /auth/register - Comprehensive Tests > 409 Conflict Responses > should return 409 when email already registered - solo account
- File: smoke-tests/specs/auth_register_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "conflict"
- Backend provided: undefined

### 29. POST /auth/register - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET request to /auth/register
- File: smoke-tests/specs/auth_register_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: []
- Backend provided: undefined

### 30. POST /auth/sign-out - Comprehensive Tests > 200 Success Responses > should successfully sign out with valid access token
- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
- Why it failed: Error: browserType.launch: Executable doesn't exist at C:\Users\Dhanush\AppData\Local\ms-playwright\chromium-1140\chrome-win\chrome.exe
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 31. POST /auth/verify-account - Comprehensive Tests > 401 Invalid Verification Token Responses > should return 401 for invalid token
- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "bad_request"
- Backend provided: undefined

### 32. POST /auth/verify-account - Comprehensive Tests > 401 Invalid Verification Token Responses > should return 401 for malformed token
- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "unauthorized"
- Backend provided: undefined

### 33. POST /auth/verify-account - Comprehensive Tests > Edge Cases > should handle concurrent verification attempts
- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: SyntaxError: Unexpected token 'I', "Internal S"... is not valid JSON
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 34. POST /auth/verify-account - Comprehensive Tests > Response Format Tests > should return consistent response structure for success
- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: Error: expect(received).toHaveProperty(path)
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: {}

### 35. POST /auth/verify-account - Comprehensive Tests > Response Format Tests > should return consistent error structure
- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBeDefined()
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: undefined

### 36. POST /auth/verify-account - Comprehensive Tests > Response Format Tests > should return proper content type
- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: Error: expect(received).toContain(expected) // indexOf
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 37. POST /auth/verify-otp - Comprehensive Tests > 400 Bad Request Responses > should return 400 when otp is missing
- File: smoke-tests/specs/auth_verify_otp_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 38. POST /auth/verify-otp - Comprehensive Tests > 401 Invalid OTP Responses > should return 401 for invalid OTP
- File: smoke-tests/specs/auth_verify_otp_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 39. POST /companies/{companyId}/avatar - Comprehensive Tests > 200 Success Responses > should upload company logo successfully
- File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 40. PUT /companies/{companyId}/avatar - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid companyId
- File: smoke-tests/specs/companies_avatar_put_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 41. POST /companies/{companyId}/2fa - Comprehensive Tests > 200 Success Responses > should enable 2FA for company user
- File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 42. PUT /companies/{companyId}/avatar - Comprehensive Tests > 200 Success Responses > should update company avatar successfully
- File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 43. POST /companies/{companyId}/profile - Comprehensive Tests > 200 Success Responses > should fetch company profile successfully
- File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 44. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > 405 Method Not Allowed > should return 405 for GET method
- File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 45. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > 405 Method Not Allowed > should return 405 for GET method
- File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 46. GET /companies/{companyId}/profile - Comprehensive Tests > 201 Success Responses > should fetch company profile successfully
- File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 47. PATCH /companies/{companyId}/profile - Comprehensive Tests > 200 Success Responses > should update company profile successfully - 200
- File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 48. GET /companies/{companyId}/usage - Comprehensive Tests > 200 Success Responses > should retrieve company usage data successfully
- File: smoke-tests/specs/companies_usage_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 49. DELETE /files/:fileId - Comprehensive Tests > 404 Not Found Responses > should return 404 for non-existent file
- File: smoke-tests/specs/files_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 50. POST /files/jobs/{id}/retry - Comprehensive Tests > 200 Success Responses > should retry job successfully when request is valid
- File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 51. GET /files/jobs/{id}/status - Comprehensive Tests > 200 Success Responses > should fetch job status for valid request
- File: smoke-tests/specs/files_jobs_status_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 52. PATCH /files/:fileId/name - Comprehensive Tests > 404 Not Found Responses > should return 404 for non-existent file
- File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 53. POST /files/upload/audio/{teamId} - Comprehensive Tests > 200 Success Responses > should upload audio file successfully
- File: smoke-tests/specs/files_upload_audio_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 54. POST /files/upload/{teamId} - Comprehensive Tests > 200/201 Success Responses > should accept upload request with valid team id
- File: smoke-tests/specs/files_upload_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 55. POST /files/upload - Comprehensive Tests > 409 Conflict Responses > should return 409 when file already exists
- File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 56. POST /integrations/auth/dropbox/callback - Comprehensive Tests > 200 Success Responses > should process Dropbox OAuth callback successfully
- File: smoke-tests/specs/integrations_auth_dropbox_callback_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 57. POST /integrations/auth/google/callback - Comprehensive Tests > 200 Success Responses > should process Google OAuth callback successfully
- File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 58. GET /integrations - Comprehensive Tests > 200 Success Responses > should get user integration settings
- File: smoke-tests/specs/integrations_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 59. POST /integrations/{integrationId}/files/{fileId}/import/{teamId} - Comprehensive Tests > 200/201 Success Responses > should import file from integration into team
- File: smoke-tests/specs/integrations_integrationId_files_fileId_import_teamId_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 60. GET /integrations/{integrationId}/files - Comprehensive Tests > 200 Success Responses > should fetch integration files/resources
- File: smoke-tests/specs/integrations_integrationId_files_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 61. PATCH /integrations/{integrationId} - Comprehensive Tests > 200 Success Responses > should update integration settings
- File: smoke-tests/specs/integrations_integrationId_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 62. POST /invitations/accept - Comprehensive Tests > 200 Success Responses > should accept invitation successfully
- File: smoke-tests/specs/invitations_accept_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 63. GET /invitations - Comprehensive Tests > 200 Success Responses > should retrieve invitations list - 200
- File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 64. POST /invitations/decline - Comprehensive Tests > 200 Success Responses > should decline invitation successfully
- File: smoke-tests/specs/invitations_decline_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 65. GET /invitations - Comprehensive Tests > 200 Success Responses > should return invitation list successfully
- File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 66. POST /invitations - Comprehensive Tests > 200 Success Responses > should send invitation successfully
- File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 67. POST /me/2fa - Comprehensive Tests > 200 Success Responses > should enable 2FA successfully
- File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 68. POST /me/avatar - Comprehensive Tests > 200 Success Responses > should upload profile picture successfully
- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
- Why it failed: Error: ENOENT: no such file or directory, open 'C:\Users\Dhanush\Desktop\Digibot\digibot - Copy - Copy - Copy\e2e\e2e\smoke-tests\specs\test-avatar-temp.png'
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 69. GET /me/profile - Comprehensive Tests > 200 Success Responses > should return authenticated user profile with all expected fields
- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: 200
- Backend provided: 401

### 70. GET /me/profile - Comprehensive Tests > 200 Success Responses > should return profile for admin2 user
- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: 200
- Backend provided: 404

### 71. GET /me/profile - Comprehensive Tests > 200 Success Responses > should return profile for superadmin user
- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: 200
- Backend provided: 500

### 72. GET /me/profile - Comprehensive Tests > 401 Unauthorized Responses > should reject request with missing Authorization header
- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toEqual(expected) // deep equality
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 73. GET /me/profile - Comprehensive Tests > 401 Unauthorized Responses > should reject request with invalid token
- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toMatch(expected)
- Smoke test expected: /Missing authentication token provided|Missing authentication token/i
- Backend provided: Not explicitly present in assertion output

### 74. GET /me/profile - Comprehensive Tests > 405 Method Not Allowed > should reject POST request to GET-only endpoint
- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toBe(expected) // Object.is equality
- Smoke test expected: "method_not_allowed"
- Backend provided: undefined

### 75. GET /me/profile - Comprehensive Tests > Edge Cases > should return consistent data across multiple calls
- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: expect(received).toContain(expected) // indexOf
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: [200, 500]

### 76. POST /me/email - Comprehensive Tests > 200 Success Responses > should update email and return success response
- File: smoke-tests/specs/me_email_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 77. POST /me/password - Comprehensive Tests > 200 Success Responses > should return success when password is updated
- File: smoke-tests/specs/me_password_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 78. POST /me/password/set - Comprehensive Tests > 200 Success Responses > should return success when password is set
- File: smoke-tests/specs/me_password_set_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 79. POST /me/profile - Comprehensive Tests > 200 Success Responses > should update profile successfully
- File: smoke-tests/specs/me_profile_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 80. GET /me/subscription - Comprehensive Tests > 200 Success Responses > should return 200 for authenticated user
- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 81. GET /me/usage - Comprehensive Tests > 200 Success Responses > should return usage data for valid token
- File: smoke-tests/specs/me_usage_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 82. POST /me/verification/resend - Comprehensive Tests > 200 Success Responses > should resend verification email successfully
- File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 83. GET /notifications - Comprehensive Tests > 200 Success Responses > should return notifications for authenticated user
- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 84. DELETE /notifications/view/{id} - Comprehensive Tests > 200 Success Responses > should delete notification successfully
- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 85. PATCH /notifications/viewed - Comprehensive Tests > 200 Success Responses > should mark all notifications as viewed
- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 86. GET /settings/max-uploads - Comprehensive Tests > 200 Success Responses > should return max upload limit for authenticated user
- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 87. GET /settings/recording-limit - Comprehensive Tests > 200 Success Responses > should return recording limit for authenticated user
- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 88. GET /settings/recording-prompt-time - Comprehensive Tests > 200 Success Responses > should return prompt time duration for authenticated user
- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 89. GET /super-admin/clients - Comprehensive Tests > Edge Cases > should handle page 0
- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 90. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Edge Cases > should handle very long companyId
- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 91. GET /super-admin/companies/{companyId} - Comprehensive Tests > 200 Success Responses > should fetch company details successfully
- File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 92. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > 400 Bad Request Responses > should return 400 when image is missing
- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 93. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 200 Success Responses > should fetch company profile successfully
- File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 94. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Edge Cases > should handle very long company name
- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 95. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle companyId as 0
- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 96. GET /super-admin/companies - Comprehensive Tests > 200 Success Responses > should fetch all companies successfully
- File: smoke-tests/specs/super_admin_companies_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 97. GET /super-admin/email/templates - Comprehensive Tests > Edge Cases > should handle query parameters gracefully
- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 98. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Edge Cases > should handle very long template name
- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 99. GET /super-admin/environment - Comprehensive Tests > Edge Cases > should handle query parameters gracefully
- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 100. PATCH /super-admin/environment - Comprehensive Tests > Edge Cases > should handle very long environment value
- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 101. GET /super-admin/integrations - Comprehensive Tests > 200 Success Responses > should fetch integrations successfully
- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 102. PATCH /super-admin/integrations - Comprehensive Tests > 200 Success Responses for Company > should update company integrations successfully
- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 103. POST /super-admin/usage/last-month - Comprehensive Tests > Edge Cases > should handle month as 1 (January)
- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 104. DELETE /super-admin/users/{userId} - Comprehensive Tests > Edge Cases > should handle very long userId
- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 105. GET /super-admin/users/{userId} - Comprehensive Tests > 200 Success Responses > should fetch user details successfully
- File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 106. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > 400 Bad Request Responses > should return 400 when image is missing
- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 107. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 200 Success Responses > should fetch user profile successfully
- File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 108. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Edge Cases > should handle very long firstname
- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 109. GET /super-admin/users/{userId}/role - Comprehensive Tests > Edge Cases > should handle userId as 0
- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 110. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle userId as 0
- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 111. GET /teams/active - Comprehensive Tests > 200 Success Responses > should fetch active teams successfully
- File: smoke-tests/specs/teams_active_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 112. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 200 Success Responses > should fetch messages from chat
- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 113. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 201 Created Responses > should send message successfully
- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 114. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 200 Success Responses > should rename chat successfully
- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 115. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 200 Success Responses > should delete chat successfully
- File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 116. GET /teams/{teamId}/chats - Comprehensive Tests > 200 Success Responses > should fetch all chats for team
- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 117. POST /teams/{teamId}/chats - Comprehensive Tests > 201 Created Responses > should create chat successfully
- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 118. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 200 Success Responses > should accept delete request for existing file
- File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 119. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 200 Success Responses > should allow file download request for valid inputs
- File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 120. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 200 Success Responses > should accept valid file rename request
- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 121. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 200 Success Responses > should accept valid file update payload
- File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 122. POST /teams/{teamId}/files - Comprehensive Tests > 200/201 Success Responses > should accept valid file create/upload request
- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 123. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 200 Success Responses > should fetch summary for a valid file request
- File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 124. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 200 Success Responses > should permanently delete folder by default
- File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 125. GET /teams/{teamId}/folders - Comprehensive Tests > 200 Success Responses > should fetch root items successfully
- File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 126. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 200 Success Responses > should update folder name successfully
- File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 127. POST /teams/{teamId}/folders - Comprehensive Tests > 201 Created Success Responses > should create folder at root level successfully
- File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 128. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 200 Success Responses > should fetch folder breadcrumb tree successfully
- File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 129. GET /teams - Comprehensive Tests > 200 Success Responses > should fetch team list successfully
- File: smoke-tests/specs/teams_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 130. GET /teams/{teamId}/items - Comprehensive Tests > 200 Success Responses > should fetch all items successfully
- File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 131. GET /teams - Comprehensive Tests > 200 Success Responses > should fetch team list successfully
- File: smoke-tests/specs/teams_list_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 132. POST /teams - Comprehensive Tests > 201 Success Responses > should create a new team successfully
- File: smoke-tests/specs/teams_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 133. PUT /teams/{teamId} - Comprehensive Tests > Security Tests > should prevent SQL injection in teamId
- File: smoke-tests/specs/teams_put_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 134. POST /teams/{teamId}/share - Comprehensive Tests > 200/201 Success Responses > should share team with existing user successfully
- File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 135. GET /teams/shared - Comprehensive Tests > Edge Cases > should handle very large page number
- File: smoke-tests/specs/teams_shared_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 136. GET /teams/shared - Comprehensive Tests > 200 Success Responses > should fetch shared teams successfully
- File: smoke-tests/specs/teams_shared_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 137. PATCH /teams/{teamId}/status - Comprehensive Tests > 200 Success Responses > should activate team successfully
- File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

### 138. PUT /teams/{teamId} - Comprehensive Tests > 201 Success Responses > should update team name successfully
- File: smoke-tests/specs/teams_update_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly present in assertion output
- Backend provided: Not explicitly present in assertion output

## Skipped Testcases

1. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > 415 Unsupported Media Type > should return 415 for wrong Content-Type
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
2. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > 200 Success Responses > should enable 2FA successfully
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
3. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > 400 Bad Request Responses > should return 400 for missing enabled field
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
4. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for missing token
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
5. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > 403 Forbidden Responses > should return 403 for insufficient privileges
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
6. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > 404 Not Found Responses > should return 404 for unknown user
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
7. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > 409 Conflict Responses > should handle conflict when state cannot be updated
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
8. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
9. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > Edge Cases > should handle toggling 2FA multiple times
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
10. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > Edge Cases > should handle null value for enabled
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
11. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > Edge Cases > should handle extra fields in request body
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
12. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > Security Tests > should prevent SQL injection in userId
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
13. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
14. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
15. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
16. PATCH /admin/users/{userId}/2fa - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/admin_users_2fa_comprehensive.spec.ts
17. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > 415 Unsupported Media Type > should return 415 for wrong Content-Type
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
18. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > 200 Success Responses > should update account status successfully
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
19. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid status
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
20. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for missing token
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
21. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > 403 Forbidden Responses > should return 403 for insufficient privileges
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
22. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > 404 Not Found Responses > should return 404 for unknown user
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
23. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > 409 Conflict Responses > should handle conflict when status cannot be updated
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
24. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
25. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > Edge Cases > should handle all valid status values
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
26. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > Edge Cases > should handle case sensitivity in status
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
27. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > Edge Cases > should handle null value for status
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
28. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > Edge Cases > should handle extra fields in request body
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
29. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > Security Tests > should prevent SQL injection in userId
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
30. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
31. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
32. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
33. PATCH /admin/users/{userId}/account-status - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/admin_users_account_status_comprehensive.spec.ts
34. PUT /admin/users/{userId}/profile/avatar - Comprehensive Tests > 400 Bad Request Responses > should return 400 when image is missing
   - File: smoke-tests/specs/admin_users_avatar_comprehensive.spec.ts
35. PUT /admin/users/{userId}/profile/avatar - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for missing token
   - File: smoke-tests/specs/admin_users_avatar_comprehensive.spec.ts
36. PUT /admin/users/{userId}/profile/avatar - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 for non-multipart content
   - File: smoke-tests/specs/admin_users_avatar_comprehensive.spec.ts
37. PUT /admin/users/{userId}/profile/avatar - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 for invalid file type
   - File: smoke-tests/specs/admin_users_avatar_comprehensive.spec.ts
38. PUT /admin/users/{userId}/profile/avatar - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/admin_users_avatar_comprehensive.spec.ts
39. PUT /admin/users/{userId}/profile/avatar - Comprehensive Tests > Security Tests > should prevent SQL injection in userId
   - File: smoke-tests/specs/admin_users_avatar_comprehensive.spec.ts
40. PUT /admin/users/{userId}/profile/avatar - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/admin_users_avatar_comprehensive.spec.ts
41. PUT /admin/users/{userId}/profile/avatar - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/admin_users_avatar_comprehensive.spec.ts
42. PUT /admin/users/{userId}/profile/avatar - Comprehensive Tests > Performance Tests > should respond quickly (< 2000ms)
   - File: smoke-tests/specs/admin_users_avatar_comprehensive.spec.ts
43. DELETE /admin/users/{userId} - Comprehensive Tests > 405 Method Not Allowed > should return 405 for POST method
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
44. DELETE /admin/users/{userId} - Comprehensive Tests > 200 Success Responses > should delete user successfully
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
45. DELETE /admin/users/{userId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid userId format
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
46. DELETE /admin/users/{userId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for missing token
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
47. DELETE /admin/users/{userId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 for insufficient privileges
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
48. DELETE /admin/users/{userId} - Comprehensive Tests > 404 Not Found Responses > should return 404 for unknown user
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
49. DELETE /admin/users/{userId} - Comprehensive Tests > 409 Conflict Responses > should handle conflict while deleting user
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
50. DELETE /admin/users/{userId} - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 when deletion cannot be processed
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
51. DELETE /admin/users/{userId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
52. DELETE /admin/users/{userId} - Comprehensive Tests > Edge Cases > should handle UUID format userId
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
53. DELETE /admin/users/{userId} - Comprehensive Tests > Edge Cases > should handle very long userId
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
54. DELETE /admin/users/{userId} - Comprehensive Tests > Edge Cases > should handle special characters in userId
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
55. DELETE /admin/users/{userId} - Comprehensive Tests > Security Tests > should prevent SQL injection in userId
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
56. DELETE /admin/users/{userId} - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
57. DELETE /admin/users/{userId} - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
58. DELETE /admin/users/{userId} - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
59. DELETE /admin/users/{userId} - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)
   - File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
60. GET /admin/users/{userId} - Comprehensive Tests > Edge Cases > should handle very long userId
   - File: smoke-tests/specs/admin_users_get_comprehensive.spec.ts
61. GET /admin/users/{userId} - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/admin_users_get_comprehensive.spec.ts
62. GET /admin/users/{userId} - Comprehensive Tests > Security Tests > should prevent SQL injection in userId
   - File: smoke-tests/specs/admin_users_get_comprehensive.spec.ts
63. GET /admin/users/{userId} - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/admin_users_get_comprehensive.spec.ts
64. GET /admin/users/{userId} - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/admin_users_get_comprehensive.spec.ts
65. GET /admin/users/{userId} - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/admin_users_get_comprehensive.spec.ts
66. GET /admin/users/{userId} - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/admin_users_get_comprehensive.spec.ts
67. GET /admin/users/{userId} - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/admin_users_get_comprehensive.spec.ts
68. PATCH /admin/users/{userId}/password - Comprehensive Tests > 415 Unsupported Media Type > should return 415 for wrong Content-Type
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
69. PATCH /admin/users/{userId}/password - Comprehensive Tests > 200 Success Responses > should update password successfully
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
70. PATCH /admin/users/{userId}/password - Comprehensive Tests > 400 Bad Request Responses > should return 400 for missing newPassword
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
71. PATCH /admin/users/{userId}/password - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for missing token
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
72. PATCH /admin/users/{userId}/password - Comprehensive Tests > 403 Forbidden Responses > should return 403 for insufficient privileges
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
73. PATCH /admin/users/{userId}/password - Comprehensive Tests > 404 Not Found Responses > should return 404 for unknown user
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
74. PATCH /admin/users/{userId}/password - Comprehensive Tests > 409 Conflict Responses > should handle conflict cases
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
75. PATCH /admin/users/{userId}/password - Comprehensive Tests > 422 Validation Responses > should return 422 for weak password
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
76. PATCH /admin/users/{userId}/password - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
77. PATCH /admin/users/{userId}/password - Comprehensive Tests > Edge Cases > should handle very long password
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
78. PATCH /admin/users/{userId}/password - Comprehensive Tests > Edge Cases > should handle special characters in password
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
79. PATCH /admin/users/{userId}/password - Comprehensive Tests > Edge Cases > should handle Unicode characters in password
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
80. PATCH /admin/users/{userId}/password - Comprehensive Tests > Security Tests > should prevent SQL injection in userId
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
81. PATCH /admin/users/{userId}/password - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
82. PATCH /admin/users/{userId}/password - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
83. PATCH /admin/users/{userId}/password - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
84. PATCH /admin/users/{userId}/password - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)
   - File: smoke-tests/specs/admin_users_password_comprehensive.spec.ts
85. PATCH /admin/users/{userId}/profile - Comprehensive Tests > 400 Bad Request Responses > should return 400 for missing required fields
   - File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
86. PATCH /admin/users/{userId}/profile - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for missing token
   - File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
87. PATCH /admin/users/{userId}/profile - Comprehensive Tests > 403 Forbidden Responses > should return 403 for insufficient privileges
   - File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
88. PATCH /admin/users/{userId}/profile - Comprehensive Tests > 404 Not Found Responses > should return 404 for unknown user
   - File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
89. PATCH /admin/users/{userId}/profile - Comprehensive Tests > 409 Conflict Responses > should return 409 for email conflict
   - File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
90. PATCH /admin/users/{userId}/profile - Comprehensive Tests > 422 Validation Responses > should return 422 for invalid email/role
   - File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
91. PATCH /admin/users/{userId}/profile - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
92. PATCH /admin/users/{userId}/profile - Comprehensive Tests > Edge Cases > should handle very long names
   - File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
93. PATCH /admin/users/{userId}/profile - Comprehensive Tests > Edge Cases > should handle special characters in names
   - File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
94. PATCH /admin/users/{userId}/profile - Comprehensive Tests > Edge Cases > should handle Unicode characters
   - File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
95. PATCH /admin/users/{userId}/profile - Comprehensive Tests > Security Tests > should prevent SQL injection in userId
   - File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
96. PATCH /admin/users/{userId}/profile - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
97. PATCH /admin/users/{userId}/profile - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
98. PATCH /admin/users/{userId}/profile - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
99. PATCH /admin/users/{userId}/profile - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)
   - File: smoke-tests/specs/admin_users_profile_comprehensive.spec.ts
100. POST /admin/users/{userId}/verify - Comprehensive Tests > Edge Cases > should handle very long userId
   - File: smoke-tests/specs/admin_users_verify_comprehensive.spec.ts
101. POST /admin/users/{userId}/verify - Comprehensive Tests > Edge Cases > should handle concurrent verification attempts
   - File: smoke-tests/specs/admin_users_verify_comprehensive.spec.ts
102. POST /admin/users/{userId}/verify - Comprehensive Tests > Security Tests > should prevent SQL injection in userId
   - File: smoke-tests/specs/admin_users_verify_comprehensive.spec.ts
103. POST /admin/users/{userId}/verify - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/admin_users_verify_comprehensive.spec.ts
104. POST /admin/users/{userId}/verify - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/admin_users_verify_comprehensive.spec.ts
105. POST /admin/users/{userId}/verify - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/admin_users_verify_comprehensive.spec.ts
106. POST /admin/users/{userId}/verify - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/admin_users_verify_comprehensive.spec.ts
107. POST /auth/login - Comprehensive Tests > 409 Conflict Responses > should return 409 if account is in conflict state (if implemented)
   - File: smoke-tests/specs/auth_login_comprehensive.spec.ts
108. POST /auth/login - Comprehensive Tests > 423 Account Locked Responses > should return 423 after multiple failed login attempts
   - File: smoke-tests/specs/auth_login_comprehensive.spec.ts
109. POST /auth/login - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after multiple rapid login attempts
   - File: smoke-tests/specs/auth_login_comprehensive.spec.ts
110. POST /auth/refresh - Comprehensive Tests > 200 Success Responses > should provide new access token that works for authenticated requests
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
111. POST /auth/refresh - Comprehensive Tests > 200 Success Responses > should rotate refresh token on each refresh
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
112. POST /auth/refresh - Comprehensive Tests > 400 Bad Request Responses > should return 400 when refreshToken is missing
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
113. POST /auth/refresh - Comprehensive Tests > 400 Bad Request Responses > should return 400 when refreshToken is null
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
114. POST /auth/refresh - Comprehensive Tests > 400 Bad Request Responses > should return 400 when refreshToken is empty string
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
115. POST /auth/refresh - Comprehensive Tests > 400 Bad Request Responses > should return 400 when refreshToken is not a string
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
116. POST /auth/refresh - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired refresh token
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
117. POST /auth/refresh - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid refresh token format
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
118. POST /auth/refresh - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed JWT token
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
119. POST /auth/refresh - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for token with invalid signature
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
120. POST /auth/refresh - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when using access token instead of refresh token
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
121. POST /auth/refresh - Comprehensive Tests > 403 Forbidden - Token Reuse Detection (Backend doesn't implement) > should return 403 when reusing old refresh token (but backend returns 200)
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
122. POST /auth/refresh - Comprehensive Tests > 403 Forbidden - Token Reuse Detection (Backend doesn't implement) > should revoke all sessions when token reuse is detected (backend doesn't implement)
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
123. POST /auth/refresh - Comprehensive Tests > 403 Forbidden - Token Reuse Detection (Backend doesn't implement) > should detect token reuse across multiple refresh attempts
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
124. POST /auth/refresh - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET request to /auth/refresh
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
125. POST /auth/refresh - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for PUT request to /auth/refresh
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
126. POST /auth/refresh - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for DELETE request to /auth/refresh
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
127. POST /auth/refresh - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for PATCH request to /auth/refresh
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
128. POST /auth/refresh - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after multiple rapid refresh attempts
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
129. POST /auth/refresh - Comprehensive Tests > 429 Rate Limit Responses > should return 429 with proper error structure
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
130. POST /auth/refresh - Comprehensive Tests > 500 Server Error Responses > should return 500 on unexpected server error
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
131. POST /auth/refresh - Comprehensive Tests > 500 Server Error Responses > should handle malformed JSON gracefully
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
132. POST /auth/refresh - Comprehensive Tests > Edge Cases > should handle concurrent refresh requests safely
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
133. POST /auth/refresh - Comprehensive Tests > Edge Cases > should handle very long refresh token strings
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
134. POST /auth/refresh - Comprehensive Tests > Edge Cases > should handle special characters in refresh token
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
135. POST /auth/refresh - Comprehensive Tests > Security Tests > should not reveal sensitive information in error messages
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
136. POST /auth/refresh - Comprehensive Tests > Security Tests > should use Bearer token type in response
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
137. POST /auth/refresh - Comprehensive Tests > Security Tests > should set appropriate token expiry times
   - File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
138. POST /auth/sign-out - Comprehensive Tests > 200 Success Responses > should clear session on successful sign-out
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
139. POST /auth/sign-out - Comprehensive Tests > 200 Success Responses > should return success message in proper format
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
140. POST /auth/sign-out - Comprehensive Tests > 200 Success Responses > should handle sign-out for different users independently
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
141. POST /auth/sign-out - Comprehensive Tests > 400 Bad Request Responses > should return 400 when request body is invalid
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
142. POST /auth/sign-out - Comprehensive Tests > 400 Bad Request Responses > should handle malformed JSON request body
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
143. POST /auth/sign-out - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when authorization header is missing
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
144. POST /auth/sign-out - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when token is empty
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
145. POST /auth/sign-out - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when authorization format is invalid
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
146. POST /auth/sign-out - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when only Bearer is provided
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
147. POST /auth/sign-out - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when token is invalid
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
148. POST /auth/sign-out - Comprehensive Tests > 403 Forbidden - Token Already Revoked > should return 403 when token is already revoked
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
149. POST /auth/sign-out - Comprehensive Tests > 403 Forbidden - Token Already Revoked > should reject already revoked token with proper message
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
150. POST /auth/sign-out - Comprehensive Tests > 404 Session Not Found Responses > should return 404 when session is not found
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
151. POST /auth/sign-out - Comprehensive Tests > 404 Session Not Found Responses > should handle non-existent session gracefully
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
152. POST /auth/sign-out - Comprehensive Tests > 403 Forbidden Responses > should return 403 when token is already revoked
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
153. POST /auth/sign-out - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
154. POST /auth/sign-out - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after multiple rapid sign-out attempts
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
155. POST /auth/sign-out - Comprehensive Tests > Edge Cases > should handle sign-out with custom headers
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
156. POST /auth/sign-out - Comprehensive Tests > Edge Cases > should handle token with whitespace
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
157. POST /auth/sign-out - Comprehensive Tests > Edge Cases > should handle very long token
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
158. POST /auth/sign-out - Comprehensive Tests > Edge Cases > should handle concurrent sign-out attempts
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
159. POST /auth/sign-out - Comprehensive Tests > Edge Cases > should not be affected by request body content
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
160. POST /auth/sign-out - Comprehensive Tests > Security Tests > should not expose sensitive information in error responses
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
161. POST /auth/sign-out - Comprehensive Tests > Security Tests > should not allow token manipulation in header
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
162. POST /auth/sign-out - Comprehensive Tests > Security Tests > should validate token signature
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
163. POST /auth/sign-out - Comprehensive Tests > Security Tests > should properly clear tokens from server storage
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
164. POST /auth/sign-out - Comprehensive Tests > Response Format Tests > should return consistent success response structure
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
165. POST /auth/sign-out - Comprehensive Tests > Response Format Tests > should return consistent error response structure
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
166. POST /auth/sign-out - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
167. POST /auth/sign-out - Comprehensive Tests > Response Format Tests > should not include unnecessary fields in response
   - File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
168. POST /companies/{companyId}/avatar - Comprehensive Tests > 200 Success Responses > should update existing company avatar with new image
   - File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
169. POST /companies/{companyId}/avatar - Comprehensive Tests > 400 Bad Request Responses > should return 400 when no image file provided
   - File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
170. POST /companies/{companyId}/avatar - Comprehensive Tests > 400 Bad Request Responses > should return 400 when invalid companyId in path
   - File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
171. POST /companies/{companyId}/avatar - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
172. POST /companies/{companyId}/avatar - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
173. POST /companies/{companyId}/avatar - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired
   - File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
174. POST /companies/{companyId}/avatar - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user not allowed to update company avatar
   - File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
175. POST /companies/{companyId}/avatar - Comprehensive Tests > 404 Not Found Responses > should return 404 when company does not exist
   - File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
176. POST /companies/{companyId}/avatar - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET request
   - File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
177. POST /companies/{companyId}/avatar - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for PATCH request
   - File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
178. POST /companies/{companyId}/avatar - Comprehensive Tests > Response Format Tests > should return proper content-type header for success response
   - File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
179. POST /companies/{companyId}/avatar - Comprehensive Tests > Response Format Tests > response should have all required success fields
   - File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
180. PUT /companies/{companyId}/avatar - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing
   - File: smoke-tests/specs/companies_avatar_put_comprehensive.spec.ts
181. PUT /companies/{companyId}/avatar - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token
   - File: smoke-tests/specs/companies_avatar_put_comprehensive.spec.ts
182. PUT /companies/{companyId}/avatar - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token
   - File: smoke-tests/specs/companies_avatar_put_comprehensive.spec.ts
183. PUT /companies/{companyId}/avatar - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token
   - File: smoke-tests/specs/companies_avatar_put_comprehensive.spec.ts
184. PUT /companies/{companyId}/avatar - Comprehensive Tests > 404 Not Found > should return 404 for non-existent company
   - File: smoke-tests/specs/companies_avatar_put_comprehensive.spec.ts
185. PUT /companies/{companyId}/avatar - Comprehensive Tests > Security Tests > should handle SQL injection in companyId
   - File: smoke-tests/specs/companies_avatar_put_comprehensive.spec.ts
186. PUT /companies/{companyId}/avatar - Comprehensive Tests > Security Tests > should validate authorization token
   - File: smoke-tests/specs/companies_avatar_put_comprehensive.spec.ts
187. POST /companies/{companyId}/2fa - Comprehensive Tests > 400 Bad Request Responses > should return 400 when required fields are missing
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
188. POST /companies/{companyId}/2fa - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
189. POST /companies/{companyId}/2fa - Comprehensive Tests > 403 Invalid Access Token Responses > should return 403 for invalid token
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
190. POST /companies/{companyId}/2fa - Comprehensive Tests > 404 Not Found Responses > should return 404 when user is not found
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
191. POST /companies/{companyId}/2fa - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
192. POST /companies/{companyId}/2fa - Comprehensive Tests > 409 Conflict Responses > should return 409 when conflict occurs
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
193. POST /companies/{companyId}/2fa - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is missing
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
194. POST /companies/{companyId}/2fa - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is incorrect
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
195. POST /companies/{companyId}/2fa - Comprehensive Tests > 422 Validation Error Responses > should return 422 for invalid payload
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
196. POST /companies/{companyId}/2fa - Comprehensive Tests > 423 Locked Responses > should return 423 when account is locked
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
197. POST /companies/{companyId}/2fa - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit is exceeded
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
198. POST /companies/{companyId}/2fa - Comprehensive Tests > Edge Cases > should handle concurrent 2FA updates
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
199. POST /companies/{companyId}/2fa - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
200. POST /companies/{companyId}/2fa - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
201. POST /companies/{companyId}/2fa - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
202. POST /companies/{companyId}/2fa - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
203. PUT /companies/{companyId}/avatar - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid companyId
   - File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
204. PUT /companies/{companyId}/avatar - Comprehensive Tests > 400 Bad Request Responses > should return 400 when no image file is provided
   - File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
205. PUT /companies/{companyId}/avatar - Comprehensive Tests > Edge Cases > should handle special characters in filename
   - File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
206. PUT /companies/{companyId}/avatar - Comprehensive Tests > Edge Cases > should handle unicode in filename
   - File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
207. PUT /companies/{companyId}/avatar - Comprehensive Tests > Edge Cases > should handle concurrent avatar uploads
   - File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
208. PUT /companies/{companyId}/avatar - Comprehensive Tests > Edge Cases > should handle very long filename
   - File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
209. PUT /companies/{companyId}/avatar - Comprehensive Tests > Edge Cases > should handle filename without extension
   - File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
210. PUT /companies/{companyId}/avatar - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
211. PUT /companies/{companyId}/avatar - Comprehensive Tests > Security Tests > should prevent path traversal in filename
   - File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
212. PUT /companies/{companyId}/avatar - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
213. PUT /companies/{companyId}/avatar - Comprehensive Tests > Security Tests > should require proper authorization
   - File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
214. PUT /companies/{companyId}/avatar - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
215. PUT /companies/{companyId}/avatar - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
216. PUT /companies/{companyId}/avatar - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
217. PUT /companies/{companyId}/avatar - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)
   - File: smoke-tests/specs/companies_companyId_avatar_put_comprehensive.spec.ts
218. POST /companies/{companyId}/profile - Comprehensive Tests > 400 Bad Request Responses > should return 400 when no fields provided for update
   - File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
219. POST /companies/{companyId}/profile - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided
   - File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
220. POST /companies/{companyId}/profile - Comprehensive Tests > 401 Invalid Access Token Responses > should return 401 for invalid token
   - File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
221. POST /companies/{companyId}/profile - Comprehensive Tests > 401 Expired Access Token Responses > should return 401 for expired token
   - File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
222. POST /companies/{companyId}/profile - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user is not allowed to update
   - File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
223. POST /companies/{companyId}/profile - Comprehensive Tests > 404 Not Found Responses > should return 404 when company is not found
   - File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
224. POST /companies/{companyId}/profile - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method
   - File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
225. POST /companies/{companyId}/profile - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is missing
   - File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
226. POST /companies/{companyId}/profile - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is incorrect
   - File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
227. POST /companies/{companyId}/profile - Comprehensive Tests > 422 Validation Error Responses > should return 400 or 422 for invalid payload
   - File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
228. POST /companies/{companyId}/profile - Comprehensive Tests > 423 Locked Responses > should return 423 when account is locked
   - File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
229. POST /companies/{companyId}/profile - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit is exceeded
   - File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
230. POST /companies/{companyId}/profile - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
231. POST /companies/{companyId}/profile - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
232. POST /companies/{companyId}/profile - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
233. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > 405 Method Not Allowed > should return 405 for POST method
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
234. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > 405 Method Not Allowed > should return 405 for PUT method
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
235. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > 200 Success Responses > should delete invitation successfully
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
236. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid companyId/invitationId
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
237. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for missing token
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
238. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > 403 Forbidden Responses > should return 403 for insufficient privileges
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
239. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > 404 Not Found Responses > should return 404 when invitation not found
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
240. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > 409 Conflict Responses > should return 409 when invitation cannot be deleted
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
241. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when too many delete requests are sent
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
242. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > Edge Cases > should handle UUID format invitationId
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
243. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > Edge Cases > should handle very long invitationId
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
244. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > Edge Cases > should handle concurrent deletion attempts
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
245. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > Edge Cases > should handle special characters in IDs
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
246. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > Security Tests > should prevent SQL injection in invitationId
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
247. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
248. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
249. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
250. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
251. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
252. DELETE /companies/:companyId/invitations/:invitationId - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/companies_invitations_delete_comprehensive.spec.ts
253. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > 405 Method Not Allowed > should return 405 for PUT method
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
254. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > 405 Method Not Allowed > should return 405 for DELETE method
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
255. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > 200 Success Responses > should resend invitation successfully
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
256. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid ids
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
257. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for missing token
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
258. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > 403 Forbidden Responses > should return 403 for insufficient privileges
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
259. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > 404 Not Found Responses > should return 404 for missing invitation
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
260. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > 409 Conflict Responses > should return 409 for expired/already registered/max reached cases
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
261. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when too many resend requests are sent
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
262. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > Edge Cases > should handle UUID format invitationId
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
263. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > Edge Cases > should handle very long invitationId
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
264. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > Edge Cases > should handle concurrent resend attempts
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
265. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > Edge Cases > should handle special characters in IDs
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
266. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > Edge Cases > should handle multiple resends of same invitation
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
267. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > Security Tests > should prevent SQL injection in invitationId
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
268. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
269. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
270. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
271. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
272. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
273. POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)
   - File: smoke-tests/specs/companies_invitations_resend_comprehensive.spec.ts
274. GET /companies/{companyId}/profile - Comprehensive Tests > 400 Bad Request Responses > should return 400 when companyId is invalid
   - File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
275. GET /companies/{companyId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
276. GET /companies/{companyId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token provided
   - File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
277. GET /companies/{companyId}/profile - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user not allowed to access company profile
   - File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
278. GET /companies/{companyId}/profile - Comprehensive Tests > 401 Invalid Company ID Responses > should return 401 when company does not exist
   - File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
279. GET /companies/{companyId}/profile - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST request
   - File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
280. GET /companies/{companyId}/profile - Comprehensive Tests > Format & Performance > should return proper content-type header
   - File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
281. GET /companies/{companyId}/profile - Comprehensive Tests > Format & Performance > response should have all required success fields
   - File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
282. PATCH /companies/{companyId}/profile - Comprehensive Tests > 200 Success Responses > should update multiple profile fields simultaneously
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
283. PATCH /companies/{companyId}/profile - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid companyId
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
284. PATCH /companies/{companyId}/profile - Comprehensive Tests > 400 Bad Request Responses > should return 400 for empty request body
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
285. PATCH /companies/{companyId}/profile - Comprehensive Tests > 400 Bad Request Responses > should return 400 for malformed JSON
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
286. PATCH /companies/{companyId}/profile - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
287. PATCH /companies/{companyId}/profile - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
288. PATCH /companies/{companyId}/profile - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
289. PATCH /companies/{companyId}/profile - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
290. PATCH /companies/{companyId}/profile - Comprehensive Tests > 401 Invalid Company ID Responses > should return 401 for non-existent company
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
291. PATCH /companies/{companyId}/profile - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permissions
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
292. PATCH /companies/{companyId}/profile - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
293. PATCH /companies/{companyId}/profile - Comprehensive Tests > 422 Validation Error Responses > should return 422 for invalid field values
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
294. PATCH /companies/{companyId}/profile - Comprehensive Tests > 423 Locked Responses > should return 423 when account is locked
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
295. PATCH /companies/{companyId}/profile - Comprehensive Tests > Edge Cases > should handle very long company name
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
296. PATCH /companies/{companyId}/profile - Comprehensive Tests > Edge Cases > should handle special characters in company name
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
297. PATCH /companies/{companyId}/profile - Comprehensive Tests > Edge Cases > should handle Unicode characters
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
298. PATCH /companies/{companyId}/profile - Comprehensive Tests > Security Tests > should handle SQL injection in companyId
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
299. PATCH /companies/{companyId}/profile - Comprehensive Tests > Security Tests > should reject SQL injection in profile fields
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
300. PATCH /companies/{companyId}/profile - Comprehensive Tests > Security Tests > should validate authorization token
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
301. PATCH /companies/{companyId}/profile - Comprehensive Tests > Response Format Validation > should return correct response structure
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
302. PATCH /companies/{companyId}/profile - Comprehensive Tests > Response Format Validation > should return application/json content type
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
303. PATCH /companies/{companyId}/profile - Comprehensive Tests > Performance > should update profile within acceptable time
   - File: smoke-tests/specs/companies_profile_patch_comprehensive.spec.ts
304. GET /companies/{companyId}/usage - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid query params (day > 31)
   - File: smoke-tests/specs/companies_usage_comprehensive.spec.ts
305. GET /companies/{companyId}/usage - Comprehensive Tests > 400 Bad Request Responses > should return 400 when Year provided without Month
   - File: smoke-tests/specs/companies_usage_comprehensive.spec.ts
306. GET /companies/{companyId}/usage - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided
   - File: smoke-tests/specs/companies_usage_comprehensive.spec.ts
307. GET /companies/{companyId}/usage - Comprehensive Tests > 403 Invalid Access Token Responses > should return 403 for invalid token
   - File: smoke-tests/specs/companies_usage_comprehensive.spec.ts
308. GET /companies/{companyId}/usage - Comprehensive Tests > 404 Not Found Responses > should return 404 when company is not found
   - File: smoke-tests/specs/companies_usage_comprehensive.spec.ts
309. GET /companies/{companyId}/usage - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST method
   - File: smoke-tests/specs/companies_usage_comprehensive.spec.ts
310. GET /companies/{companyId}/usage - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit is exceeded
   - File: smoke-tests/specs/companies_usage_comprehensive.spec.ts
311. DELETE /files/:fileId - Comprehensive Tests > 404 Not Found Responses > should return 404 for non-existent team
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
312. DELETE /files/:fileId - Comprehensive Tests > 405 Method Not Allowed > should return 405 for GET method
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
313. DELETE /files/:fileId - Comprehensive Tests > 405 Method Not Allowed > should return 405 for POST method
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
314. DELETE /files/:fileId - Comprehensive Tests > 405 Method Not Allowed > should return 405 for PUT method
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
315. DELETE /files/:fileId - Comprehensive Tests > Edge Cases > should handle UUID format fileId
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
316. DELETE /files/:fileId - Comprehensive Tests > Edge Cases > should handle very long fileId
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
317. DELETE /files/:fileId - Comprehensive Tests > Edge Cases > should handle concurrent deletion attempts
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
318. DELETE /files/:fileId - Comprehensive Tests > Edge Cases > should handle special characters in fileId
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
319. DELETE /files/:fileId - Comprehensive Tests > Edge Cases > should handle empty parentFolder
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
320. DELETE /files/:fileId - Comprehensive Tests > Edge Cases > should handle null values in request
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
321. DELETE /files/:fileId - Comprehensive Tests > Security Tests > should prevent SQL injection in fileId
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
322. DELETE /files/:fileId - Comprehensive Tests > Security Tests > should prevent SQL injection in teamId
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
323. DELETE /files/:fileId - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
324. DELETE /files/:fileId - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
325. DELETE /files/:fileId - Comprehensive Tests > Security Tests > should only allow deletion of own team files
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
326. DELETE /files/:fileId - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
327. DELETE /files/:fileId - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
328. DELETE /files/:fileId - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
329. DELETE /files/:fileId - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/files_delete_comprehensive.spec.ts
330. POST /files/jobs/{id}/retry - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid job id format
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
331. POST /files/jobs/{id}/retry - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when token is missing
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
332. POST /files/jobs/{id}/retry - Comprehensive Tests > 403 Forbidden Responses > should return 403 for unauthorized retry attempt
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
333. POST /files/jobs/{id}/retry - Comprehensive Tests > 404 Not Found Responses > should return 404 when job id does not exist
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
334. POST /files/jobs/{id}/retry - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated retry attempts
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
335. POST /files/jobs/{id}/retry - Comprehensive Tests > Edge Cases > should handle very long jobId
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
336. POST /files/jobs/{id}/retry - Comprehensive Tests > Edge Cases > should handle jobId with hyphens
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
337. POST /files/jobs/{id}/retry - Comprehensive Tests > Edge Cases > should handle jobId with underscores
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
338. POST /files/jobs/{id}/retry - Comprehensive Tests > Edge Cases > should prevent concurrent retry of same job
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
339. POST /files/jobs/{id}/retry - Comprehensive Tests > Edge Cases > should only retry failed jobs
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
340. POST /files/jobs/{id}/retry - Comprehensive Tests > Edge Cases > should handle retry of already processing job
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
341. POST /files/jobs/{id}/retry - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
342. POST /files/jobs/{id}/retry - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
343. POST /files/jobs/{id}/retry - Comprehensive Tests > Security Tests > should prevent SQL injection in jobId
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
344. POST /files/jobs/{id}/retry - Comprehensive Tests > Security Tests > should require authentication
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
345. POST /files/jobs/{id}/retry - Comprehensive Tests > Security Tests > should prevent unauthorized retry
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
346. POST /files/jobs/{id}/retry - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
347. POST /files/jobs/{id}/retry - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
348. POST /files/jobs/{id}/retry - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
349. POST /files/jobs/{id}/retry - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
350. POST /files/jobs/{id}/retry - Comprehensive Tests > Performance Tests > should handle retry efficiently
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
351. POST /files/jobs/{id}/retry - Comprehensive Tests > Performance Tests > should restart job processing quickly
   - File: smoke-tests/specs/files_jobs_id_retry_post_comprehensive.spec.ts
352. GET /files/jobs/{id}/status - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid job id
   - File: smoke-tests/specs/files_jobs_status_comprehensive.spec.ts
353. GET /files/jobs/{id}/status - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing
   - File: smoke-tests/specs/files_jobs_status_comprehensive.spec.ts
354. GET /files/jobs/{id}/status - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token
   - File: smoke-tests/specs/files_jobs_status_comprehensive.spec.ts
355. GET /files/jobs/{id}/status - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token
   - File: smoke-tests/specs/files_jobs_status_comprehensive.spec.ts
356. GET /files/jobs/{id}/status - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token
   - File: smoke-tests/specs/files_jobs_status_comprehensive.spec.ts
357. GET /files/jobs/{id}/status - Comprehensive Tests > 404 Not Found > should return 404 for non-existent job
   - File: smoke-tests/specs/files_jobs_status_comprehensive.spec.ts
358. GET /files/jobs/{id}/status - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated job status checks
   - File: smoke-tests/specs/files_jobs_status_comprehensive.spec.ts
359. GET /files/jobs/{id}/status - Comprehensive Tests > Security Tests > should validate authorization token
   - File: smoke-tests/specs/files_jobs_status_comprehensive.spec.ts
360. GET /files/jobs/{id}/status - Comprehensive Tests > Security Tests > should handle SQL injection in job id
   - File: smoke-tests/specs/files_jobs_status_comprehensive.spec.ts
361. PATCH /files/:fileId/name - Comprehensive Tests > 415 Unsupported Media Type > should return 415 when Content-Type is missing
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
362. PATCH /files/:fileId/name - Comprehensive Tests > 415 Unsupported Media Type > should return 415 for wrong Content-Type
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
363. PATCH /files/:fileId/name - Comprehensive Tests > 405 Method Not Allowed > should return 405 for GET method
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
364. PATCH /files/:fileId/name - Comprehensive Tests > 405 Method Not Allowed > should return 405 for POST method
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
365. PATCH /files/:fileId/name - Comprehensive Tests > 405 Method Not Allowed > should return 405 for DELETE method
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
366. PATCH /files/:fileId/name - Comprehensive Tests > Edge Cases > should handle very long filename
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
367. PATCH /files/:fileId/name - Comprehensive Tests > Edge Cases > should handle special characters in filename
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
368. PATCH /files/:fileId/name - Comprehensive Tests > Edge Cases > should trim whitespace from filename
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
369. PATCH /files/:fileId/name - Comprehensive Tests > Edge Cases > should handle unicode characters in filename
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
370. PATCH /files/:fileId/name - Comprehensive Tests > Edge Cases > should handle concurrent update attempts
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
371. PATCH /files/:fileId/name - Comprehensive Tests > Edge Cases > should handle filename without extension
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
372. PATCH /files/:fileId/name - Comprehensive Tests > Edge Cases > should handle multiple dots in filename
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
373. PATCH /files/:fileId/name - Comprehensive Tests > Security Tests > should sanitize XSS attempts in filename
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
374. PATCH /files/:fileId/name - Comprehensive Tests > Security Tests > should prevent path traversal in filename
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
375. PATCH /files/:fileId/name - Comprehensive Tests > Security Tests > should prevent SQL injection in filename
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
376. PATCH /files/:fileId/name - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
377. PATCH /files/:fileId/name - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
378. PATCH /files/:fileId/name - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
379. PATCH /files/:fileId/name - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
380. PATCH /files/:fileId/name - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
381. PATCH /files/:fileId/name - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/files_name_patch_comprehensive.spec.ts
382. POST /files/upload/audio/{teamId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid teamId
   - File: smoke-tests/specs/files_upload_audio_comprehensive.spec.ts
383. POST /files/upload/audio/{teamId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 when no audio file provided
   - File: smoke-tests/specs/files_upload_audio_comprehensive.spec.ts
384. POST /files/upload/audio/{teamId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing
   - File: smoke-tests/specs/files_upload_audio_comprehensive.spec.ts
385. POST /files/upload/audio/{teamId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token
   - File: smoke-tests/specs/files_upload_audio_comprehensive.spec.ts
386. POST /files/upload/audio/{teamId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token
   - File: smoke-tests/specs/files_upload_audio_comprehensive.spec.ts
387. POST /files/upload/audio/{teamId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token
   - File: smoke-tests/specs/files_upload_audio_comprehensive.spec.ts
388. POST /files/upload/audio/{teamId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks team access
   - File: smoke-tests/specs/files_upload_audio_comprehensive.spec.ts
389. POST /files/upload/audio/{teamId} - Comprehensive Tests > 404 Not Found > should return 404 for non-existent team
   - File: smoke-tests/specs/files_upload_audio_comprehensive.spec.ts
390. POST /files/upload/audio/{teamId} - Comprehensive Tests > 409 Conflict Responses > should return 409 on concurrent upload attempts
   - File: smoke-tests/specs/files_upload_audio_comprehensive.spec.ts
391. POST /files/upload/audio/{teamId} - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 for unsupported audio format
   - File: smoke-tests/specs/files_upload_audio_comprehensive.spec.ts
392. POST /files/upload/audio/{teamId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/files_upload_audio_comprehensive.spec.ts
393. POST /files/upload/audio/{teamId} - Comprehensive Tests > Security Tests > should validate authorization token
   - File: smoke-tests/specs/files_upload_audio_comprehensive.spec.ts
394. POST /files/upload/{teamId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid teamId
   - File: smoke-tests/specs/files_upload_comprehensive.spec.ts
395. POST /files/upload/{teamId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing
   - File: smoke-tests/specs/files_upload_comprehensive.spec.ts
396. POST /files/upload/{teamId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token
   - File: smoke-tests/specs/files_upload_comprehensive.spec.ts
397. POST /files/upload/{teamId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token
   - File: smoke-tests/specs/files_upload_comprehensive.spec.ts
398. POST /files/upload/{teamId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token
   - File: smoke-tests/specs/files_upload_comprehensive.spec.ts
399. POST /files/upload/{teamId} - Comprehensive Tests > 404 Not Found > should return 404 for non-existent team
   - File: smoke-tests/specs/files_upload_comprehensive.spec.ts
400. POST /files/upload/{teamId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user cannot upload for target team
   - File: smoke-tests/specs/files_upload_comprehensive.spec.ts
401. POST /files/upload/{teamId} - Comprehensive Tests > 409 Conflict Responses > should handle duplicate upload conflict responses
   - File: smoke-tests/specs/files_upload_comprehensive.spec.ts
402. POST /files/upload/{teamId} - Comprehensive Tests > 422 Validation Error Responses > should return 422 for malformed upload request
   - File: smoke-tests/specs/files_upload_comprehensive.spec.ts
403. POST /files/upload/{teamId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for burst upload requests
   - File: smoke-tests/specs/files_upload_comprehensive.spec.ts
404. POST /files/upload/{teamId} - Comprehensive Tests > Security Tests > should validate authorization token
   - File: smoke-tests/specs/files_upload_comprehensive.spec.ts
405. POST /files/upload - Comprehensive Tests > 405 Method Not Allowed > should return 405 for GET method
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
406. POST /files/upload - Comprehensive Tests > 405 Method Not Allowed > should return 405 for PATCH method
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
407. POST /files/upload - Comprehensive Tests > 405 Method Not Allowed > should return 405 for DELETE method
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
408. POST /files/upload - Comprehensive Tests > Edge Cases > should handle very long filename
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
409. POST /files/upload - Comprehensive Tests > Edge Cases > should handle special characters in filename
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
410. POST /files/upload - Comprehensive Tests > Edge Cases > should handle unicode characters in filename
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
411. POST /files/upload - Comprehensive Tests > Edge Cases > should handle large file upload
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
412. POST /files/upload - Comprehensive Tests > Edge Cases > should handle concurrent uploads
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
413. POST /files/upload - Comprehensive Tests > Edge Cases > should handle different source values
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
414. POST /files/upload - Comprehensive Tests > Edge Cases > should handle nested parent folders
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
415. POST /files/upload - Comprehensive Tests > Security Tests > should sanitize XSS attempts in filename
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
416. POST /files/upload - Comprehensive Tests > Security Tests > should prevent path traversal in filename
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
417. POST /files/upload - Comprehensive Tests > Security Tests > should prevent SQL injection in parameters
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
418. POST /files/upload - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
419. POST /files/upload - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
420. POST /files/upload - Comprehensive Tests > Security Tests > should enforce file type restrictions
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
421. POST /files/upload - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
422. POST /files/upload - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
423. POST /files/upload - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
424. POST /files/upload - Comprehensive Tests > Performance Tests > should respond within reasonable time (< 2000ms)
   - File: smoke-tests/specs/files_upload_query_comprehensive.spec.ts
425. POST /integrations/auth/dropbox/callback - Comprehensive Tests > 200 Success Responses > should return integration details after successful callback
   - File: smoke-tests/specs/integrations_auth_dropbox_callback_post_comprehensive.spec.ts
426. POST /integrations/auth/dropbox/callback - Comprehensive Tests > 400 Bad Request Responses > should return 400 when auth code is missing
   - File: smoke-tests/specs/integrations_auth_dropbox_callback_post_comprehensive.spec.ts
427. POST /integrations/auth/dropbox/callback - Comprehensive Tests > 400 Bad Request Responses > should return 400 when state is missing
   - File: smoke-tests/specs/integrations_auth_dropbox_callback_post_comprehensive.spec.ts
428. POST /integrations/auth/dropbox/callback - Comprehensive Tests > 400 Bad Request Responses > should return 400 when auth code is invalid
   - File: smoke-tests/specs/integrations_auth_dropbox_callback_post_comprehensive.spec.ts
429. POST /integrations/auth/dropbox/callback - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/integrations_auth_dropbox_callback_post_comprehensive.spec.ts
430. POST /integrations/auth/dropbox/callback - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/integrations_auth_dropbox_callback_post_comprehensive.spec.ts
431. POST /integrations/auth/dropbox/callback - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user does not have permission
   - File: smoke-tests/specs/integrations_auth_dropbox_callback_post_comprehensive.spec.ts
432. POST /integrations/auth/dropbox/callback - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/integrations_auth_dropbox_callback_post_comprehensive.spec.ts
433. POST /integrations/auth/google/callback - Comprehensive Tests > 200 Success Responses > should return integration details after successful callback
   - File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
434. POST /integrations/auth/google/callback - Comprehensive Tests > 400 Bad Request Responses > should return 400 when auth code is missing
   - File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
435. POST /integrations/auth/google/callback - Comprehensive Tests > 400 Bad Request Responses > should return 400 when state is missing
   - File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
436. POST /integrations/auth/google/callback - Comprehensive Tests > 400 Bad Request Responses > should return 400 when auth code is invalid
   - File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
437. POST /integrations/auth/google/callback - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
438. POST /integrations/auth/google/callback - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
439. POST /integrations/auth/google/callback - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user does not have permission
   - File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
440. POST /integrations/auth/google/callback - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
441. GET /integrations - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token
   - File: smoke-tests/specs/integrations_get_comprehensive.spec.ts
442. GET /integrations - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/integrations_get_comprehensive.spec.ts
443. GET /integrations - Comprehensive Tests > 403 Forbidden Responses > should return 403 when integrations access is forbidden
   - File: smoke-tests/specs/integrations_get_comprehensive.spec.ts
444. GET /integrations - Comprehensive Tests > 404 Not Found Responses > should return 404 for invalid route variant
   - File: smoke-tests/specs/integrations_get_comprehensive.spec.ts
445. GET /integrations - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/integrations_get_comprehensive.spec.ts
446. POST /integrations/{integrationId}/files/{fileId}/import/{teamId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid team id
   - File: smoke-tests/specs/integrations_integrationId_files_fileId_import_teamId_post_comprehensive.spec.ts
447. POST /integrations/{integrationId}/files/{fileId}/import/{teamId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token
   - File: smoke-tests/specs/integrations_integrationId_files_fileId_import_teamId_post_comprehensive.spec.ts
448. POST /integrations/{integrationId}/files/{fileId}/import/{teamId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/integrations_integrationId_files_fileId_import_teamId_post_comprehensive.spec.ts
449. POST /integrations/{integrationId}/files/{fileId}/import/{teamId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user cannot import to target team
   - File: smoke-tests/specs/integrations_integrationId_files_fileId_import_teamId_post_comprehensive.spec.ts
450. POST /integrations/{integrationId}/files/{fileId}/import/{teamId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when integration does not exist
   - File: smoke-tests/specs/integrations_integrationId_files_fileId_import_teamId_post_comprehensive.spec.ts
451. POST /integrations/{integrationId}/files/{fileId}/import/{teamId} - Comprehensive Tests > 409 Conflict Responses > should return 409 when import conflicts with existing file/process
   - File: smoke-tests/specs/integrations_integrationId_files_fileId_import_teamId_post_comprehensive.spec.ts
452. POST /integrations/{integrationId}/files/{fileId}/import/{teamId} - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 for invalid import payload
   - File: smoke-tests/specs/integrations_integrationId_files_fileId_import_teamId_post_comprehensive.spec.ts
453. POST /integrations/{integrationId}/files/{fileId}/import/{teamId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/integrations_integrationId_files_fileId_import_teamId_post_comprehensive.spec.ts
454. GET /integrations/{integrationId}/files - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid integration id format
   - File: smoke-tests/specs/integrations_integrationId_files_get_comprehensive.spec.ts
455. GET /integrations/{integrationId}/files - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token
   - File: smoke-tests/specs/integrations_integrationId_files_get_comprehensive.spec.ts
456. GET /integrations/{integrationId}/files - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/integrations_integrationId_files_get_comprehensive.spec.ts
457. GET /integrations/{integrationId}/files - Comprehensive Tests > 403 Forbidden Responses > should return 403 when no permission to access integration files
   - File: smoke-tests/specs/integrations_integrationId_files_get_comprehensive.spec.ts
458. GET /integrations/{integrationId}/files - Comprehensive Tests > 404 Not Found Responses > should return 404 when integration does not exist
   - File: smoke-tests/specs/integrations_integrationId_files_get_comprehensive.spec.ts
459. GET /integrations/{integrationId}/files - Comprehensive Tests > 409 Conflict Responses > should return 409 when integration login is required
   - File: smoke-tests/specs/integrations_integrationId_files_get_comprehensive.spec.ts
460. GET /integrations/{integrationId}/files - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 when provider denies resource access
   - File: smoke-tests/specs/integrations_integrationId_files_get_comprehensive.spec.ts
461. GET /integrations/{integrationId}/files - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/integrations_integrationId_files_get_comprehensive.spec.ts
462. PATCH /integrations/{integrationId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid integration id
   - File: smoke-tests/specs/integrations_integrationId_patch_comprehensive.spec.ts
463. PATCH /integrations/{integrationId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token
   - File: smoke-tests/specs/integrations_integrationId_patch_comprehensive.spec.ts
464. PATCH /integrations/{integrationId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/integrations_integrationId_patch_comprehensive.spec.ts
465. PATCH /integrations/{integrationId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user cannot update integration
   - File: smoke-tests/specs/integrations_integrationId_patch_comprehensive.spec.ts
466. PATCH /integrations/{integrationId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when integration does not exist
   - File: smoke-tests/specs/integrations_integrationId_patch_comprehensive.spec.ts
467. PATCH /integrations/{integrationId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/integrations_integrationId_patch_comprehensive.spec.ts
468. POST /invitations/accept - Comprehensive Tests > 400 Bad Request Responses > should return 400 when invitation ID is missing
   - File: smoke-tests/specs/invitations_accept_post_comprehensive.spec.ts
469. POST /invitations/accept - Comprehensive Tests > 400 Bad Request Responses > should return 400 when token is missing
   - File: smoke-tests/specs/invitations_accept_post_comprehensive.spec.ts
470. POST /invitations/accept - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/invitations_accept_post_comprehensive.spec.ts
471. POST /invitations/accept - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/invitations_accept_post_comprehensive.spec.ts
472. POST /invitations/accept - Comprehensive Tests > 404 Not Found Responses > should return 404 when invitation not found
   - File: smoke-tests/specs/invitations_accept_post_comprehensive.spec.ts
473. POST /invitations/accept - Comprehensive Tests > 409 Conflict Responses > should return 409 when invitation already accepted
   - File: smoke-tests/specs/invitations_accept_post_comprehensive.spec.ts
474. POST /invitations/accept - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/invitations_accept_post_comprehensive.spec.ts
475. GET /invitations - Comprehensive Tests > 200 Success Responses > should support pagination with limit parameter
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
476. GET /invitations - Comprehensive Tests > 200 Success Responses > should support pagination with offset parameter
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
477. GET /invitations - Comprehensive Tests > 200 Success Responses > should support search by email
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
478. GET /invitations - Comprehensive Tests > 200 Success Responses > should return pagination metadata
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
479. GET /invitations - Comprehensive Tests > 200 Success Responses > should return empty array when no invitations
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
480. GET /invitations - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid limit value
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
481. GET /invitations - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid offset value
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
482. GET /invitations - Comprehensive Tests > 400 Bad Request Responses > should return 400 for non-numeric limit
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
483. GET /invitations - Comprehensive Tests > 400 Bad Request Responses > should return 400 for very large limit
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
484. GET /invitations - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when Authorization header is missing
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
485. GET /invitations - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
486. GET /invitations - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
487. GET /invitations - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed JWT
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
488. GET /invitations - Comprehensive Tests > 403 Forbidden Responses > should return 403 for insufficient permissions - PLACEHOLDER
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
489. GET /invitations - Comprehensive Tests > 404 Not Found Responses > should return 404 for invalid companyId - PLACEHOLDER
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
490. GET /invitations - Comprehensive Tests > 423 Account Locked Responses > should return 423 for locked account - PLACEHOLDER
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
491. GET /invitations - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after excessive requests - PLACEHOLDER
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
492. GET /invitations - Comprehensive Tests > 500 Server Error Responses > should handle server errors gracefully - PLACEHOLDER
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
493. GET /invitations - Comprehensive Tests > 503 Service Unavailable Responses > should handle service unavailable - PLACEHOLDER
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
494. GET /invitations - Comprehensive Tests > Edge Cases > should handle very long search query
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
495. GET /invitations - Comprehensive Tests > Edge Cases > should handle special characters in search
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
496. GET /invitations - Comprehensive Tests > Edge Cases > should handle multiple query parameters
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
497. GET /invitations - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
498. GET /invitations - Comprehensive Tests > Security Tests > should not expose sensitive data
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
499. GET /invitations - Comprehensive Tests > Security Tests > should prevent SQL injection in search
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
500. GET /invitations - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
501. GET /invitations - Comprehensive Tests > Security Tests > should only return invitations for logged-in user's company
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
502. GET /invitations - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
503. GET /invitations - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
504. GET /invitations - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
505. GET /invitations - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
506. GET /invitations - Comprehensive Tests > Performance Tests > should handle large result sets efficiently
   - File: smoke-tests/specs/invitations_decline_comprehensive_backup.spec.ts
507. POST /invitations/decline - Comprehensive Tests > 400 Bad Request Responses > should return 400 when invitation ID is missing
   - File: smoke-tests/specs/invitations_decline_post_comprehensive.spec.ts
508. POST /invitations/decline - Comprehensive Tests > 400 Bad Request Responses > should return 400 when token is missing
   - File: smoke-tests/specs/invitations_decline_post_comprehensive.spec.ts
509. POST /invitations/decline - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/invitations_decline_post_comprehensive.spec.ts
510. POST /invitations/decline - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/invitations_decline_post_comprehensive.spec.ts
511. POST /invitations/decline - Comprehensive Tests > 404 Not Found Responses > should return 404 when invitation not found
   - File: smoke-tests/specs/invitations_decline_post_comprehensive.spec.ts
512. POST /invitations/decline - Comprehensive Tests > 409 Conflict Responses > should return 409 when invitation is already used/declined
   - File: smoke-tests/specs/invitations_decline_post_comprehensive.spec.ts
513. POST /invitations/decline - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when too many decline requests are sent
   - File: smoke-tests/specs/invitations_decline_post_comprehensive.spec.ts
514. POST /invitations/decline - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/invitations_decline_post_comprehensive.spec.ts
515. GET /invitations - Comprehensive Tests > 400 Bad Request Responses > should return 400 when companyId is missing
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
516. GET /invitations - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when token is missing
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
517. GET /invitations - Comprehensive Tests > 403 Forbidden Responses > should return 403 when accessing another company invitations
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
518. GET /invitations - Comprehensive Tests > 404 Not Found Responses > should return 404 for invalid company id
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
519. GET /invitations - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 when invitation list cannot be processed
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
520. GET /invitations - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when too many list requests are sent
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
521. GET /invitations - Comprehensive Tests > Edge Cases > should handle very long search query
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
522. GET /invitations - Comprehensive Tests > Edge Cases > should handle special characters in search
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
523. GET /invitations - Comprehensive Tests > Edge Cases > should handle multiple query parameters
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
524. GET /invitations - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
525. GET /invitations - Comprehensive Tests > Security Tests > should not expose sensitive data
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
526. GET /invitations - Comprehensive Tests > Security Tests > should prevent SQL injection in search
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
527. GET /invitations - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
528. GET /invitations - Comprehensive Tests > Security Tests > should only return invitations for logged-in user's company
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
529. GET /invitations - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
530. GET /invitations - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
531. GET /invitations - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
532. GET /invitations - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
533. GET /invitations - Comprehensive Tests > Performance Tests > should handle large result sets efficiently
   - File: smoke-tests/specs/invitations_get_comprehensive.spec.ts
534. POST /invitations - Comprehensive Tests > 400 Bad Request Responses > should return 400 when required fields are missing
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
535. POST /invitations - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when access token is missing
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
536. POST /invitations - Comprehensive Tests > 403 Forbidden Responses > should return 403 for invalid privileges
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
537. POST /invitations - Comprehensive Tests > 404 Not Found Responses > should return 404 when team context is invalid
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
538. POST /invitations - Comprehensive Tests > 409 Conflict Responses > should return 409 when invitation already exists
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
539. POST /invitations - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 for invalid role/content payload
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
540. POST /invitations - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 when invitation send fails validation
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
541. POST /invitations - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when too many invitation requests are sent
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
542. POST /invitations - Comprehensive Tests > Edge Cases > should handle email with plus addressing
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
543. POST /invitations - Comprehensive Tests > Edge Cases > should handle email with subdomain
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
544. POST /invitations - Comprehensive Tests > Edge Cases > should trim whitespace from email
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
545. POST /invitations - Comprehensive Tests > Edge Cases > should handle concurrent invitations
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
546. POST /invitations - Comprehensive Tests > Security Tests > should sanitize XSS attempts
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
547. POST /invitations - Comprehensive Tests > Security Tests > should prevent SQL injection
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
548. POST /invitations - Comprehensive Tests > Security Tests > should not expose sensitive data
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
549. POST /invitations - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
550. POST /invitations - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
551. POST /invitations - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
552. POST /invitations - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
553. POST /invitations - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/invitations_post_comprehensive.spec.ts
554. POST /me/2fa - Comprehensive Tests > 200 Success Responses > should return correct success response structure
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
555. POST /me/2fa - Comprehensive Tests > 400 Bad Request Responses > should return 400 when password is missing
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
556. POST /me/2fa - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
557. POST /me/2fa - Comprehensive Tests > 403 Invalid Access Token Responses > should return 403 for invalid token
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
558. POST /me/2fa - Comprehensive Tests > 404 Not Found Responses > should return 404 when user is not found
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
559. POST /me/2fa - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
560. POST /me/2fa - Comprehensive Tests > 409 Conflict Responses > should return 409 when conflict occurs
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
561. POST /me/2fa - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is missing
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
562. POST /me/2fa - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is incorrect
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
563. POST /me/2fa - Comprehensive Tests > 422 Validation Error Responses > should return 422 for invalid enable2FA value
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
564. POST /me/2fa - Comprehensive Tests > 423 Locked Responses > should return 423 when account is locked
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
565. POST /me/2fa - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit is exceeded
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
566. POST /me/2fa - Comprehensive Tests > Edge Cases > should handle rapid enable/disable toggles
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
567. POST /me/2fa - Comprehensive Tests > Edge Cases > should handle concurrent 2FA requests
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
568. POST /me/2fa - Comprehensive Tests > Edge Cases > should handle very large request body
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
569. POST /me/2fa - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
570. POST /me/2fa - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
571. POST /me/2fa - Comprehensive Tests > Security Tests > should prevent XSS in request data
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
572. POST /me/2fa - Comprehensive Tests > Security Tests > should not allow SQL injection attempts
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
573. POST /me/2fa - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
574. POST /me/2fa - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
575. POST /me/2fa - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
576. POST /me/2fa - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
577. POST /me/avatar - Comprehensive Tests > 400 Bad Request Responses > should return 400 for image too large
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
578. POST /me/avatar - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
579. POST /me/avatar - Comprehensive Tests > 403 Invalid Access Token Responses > should return 403 for invalid token
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
580. POST /me/avatar - Comprehensive Tests > 404 Not Found Responses > should return 404 when user is not found
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
581. POST /me/avatar - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
582. POST /me/avatar - Comprehensive Tests > 409 Conflict Responses > should return 409 when conflict occurs
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
583. POST /me/avatar - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 for unsupported file format
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
584. POST /me/avatar - Comprehensive Tests > 422 Validation Error Responses > should return 422 for invalid payload
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
585. POST /me/avatar - Comprehensive Tests > 423 Locked Responses > should return 423 when account is locked
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
586. POST /me/avatar - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit is exceeded
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
587. POST /me/avatar - Comprehensive Tests > Edge Cases > should handle concurrent avatar uploads
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
588. POST /me/avatar - Comprehensive Tests > Edge Cases > should handle replacing existing avatar
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
589. POST /me/avatar - Comprehensive Tests > Edge Cases > should handle filename with special characters
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
590. POST /me/avatar - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
591. POST /me/avatar - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
592. POST /me/avatar - Comprehensive Tests > Security Tests > should prevent path traversal in filename
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
593. POST /me/avatar - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
594. POST /me/avatar - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
595. POST /me/avatar - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
596. POST /me/avatar - Comprehensive Tests > Performance Tests > should respond quickly (< 2000ms)
   - File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
597. POST /me/email - Comprehensive Tests > should return 400 when email already exists
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
598. POST /me/email - Comprehensive Tests > 200 Success Responses > should return correct success response structure
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
599. POST /me/email - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
600. POST /me/email - Comprehensive Tests > 403 Invalid Access Token Responses > should return 403 for invalid token
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
601. POST /me/email - Comprehensive Tests > 404 Not Found Responses > should return 404 when user is not found
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
602. POST /me/email - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
603. POST /me/email - Comprehensive Tests > 409 Conflict Responses > should return 409 when conflict occurs
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
604. POST /me/email - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is missing
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
605. POST /me/email - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is incorrect
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
606. POST /me/email - Comprehensive Tests > 422 Validation Error Responses > should return 422 for invalid email
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
607. POST /me/email - Comprehensive Tests > 423 Locked Responses > should return 423 when account is locked
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
608. POST /me/email - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit is exceeded
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
609. POST /me/email - Comprehensive Tests > Edge Cases > should handle email with unicode characters
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
610. POST /me/email - Comprehensive Tests > Edge Cases > should handle email with plus addressing
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
611. POST /me/email - Comprehensive Tests > Edge Cases > should handle email with subdomain
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
612. POST /me/email - Comprehensive Tests > Edge Cases > should trim whitespace from email
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
613. POST /me/email - Comprehensive Tests > Edge Cases > should handle case-insensitive email
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
614. POST /me/email - Comprehensive Tests > Edge Cases > should handle concurrent email update requests
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
615. POST /me/email - Comprehensive Tests > Security Tests > should sanitize XSS attempts in email
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
616. POST /me/email - Comprehensive Tests > Security Tests > should prevent SQL injection attempts
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
617. POST /me/email - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
618. POST /me/email - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
619. POST /me/email - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
620. POST /me/email - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
621. POST /me/email - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
622. POST /me/email - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/me_email_comprehensive.spec.ts
623. POST /me/password - Comprehensive Tests > 200 Success Responses > should return correct success response structure
   - File: smoke-tests/specs/me_password_comprehensive.spec.ts
624. POST /me/password - Comprehensive Tests > 400 Bad Request Responses > should return 400 when currentPassword is missing
   - File: smoke-tests/specs/me_password_comprehensive.spec.ts
625. POST /me/password - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when current password is incorrect
   - File: smoke-tests/specs/me_password_comprehensive.spec.ts
626. POST /me/password - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when no token is provided
   - File: smoke-tests/specs/me_password_comprehensive.spec.ts
627. POST /me/password - Comprehensive Tests > 403 Invalid Access Token Responses > should return 403 for invalid token
   - File: smoke-tests/specs/me_password_comprehensive.spec.ts
628. POST /me/password - Comprehensive Tests > 404 Not Found Responses > should return 404 when user is not found
   - File: smoke-tests/specs/me_password_comprehensive.spec.ts
629. POST /me/password - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method
   - File: smoke-tests/specs/me_password_comprehensive.spec.ts
630. POST /me/password - Comprehensive Tests > 409 Conflict Responses > should return 409 when new password matches current
   - File: smoke-tests/specs/me_password_comprehensive.spec.ts
631. POST /me/password - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is missing
   - File: smoke-tests/specs/me_password_comprehensive.spec.ts
632. POST /me/password - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is incorrect
   - File: smoke-tests/specs/me_password_comprehensive.spec.ts
633. POST /me/password - Comprehensive Tests > 422 Validation Error Responses > should return 422 for invalid new password
   - File: smoke-tests/specs/me_password_comprehensive.spec.ts
634. POST /me/password - Comprehensive Tests > 423 Locked Responses > should return 423 when account is locked
   - File: smoke-tests/specs/me_password_comprehensive.spec.ts
635. POST /me/password - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit is exceeded
   - File: smoke-tests/specs/me_password_comprehensive.spec.ts
636. POST /me/password/set - Comprehensive Tests > should return 400 when password is already set
   - File: smoke-tests/specs/me_password_set_comprehensive.spec.ts
637. POST /me/password/set - Comprehensive Tests > 200 Success Responses > should return correct success response structure
   - File: smoke-tests/specs/me_password_set_comprehensive.spec.ts
638. POST /me/password/set - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided
   - File: smoke-tests/specs/me_password_set_comprehensive.spec.ts
639. POST /me/password/set - Comprehensive Tests > 403 Invalid Access Token Responses > should return 403 for invalid token
   - File: smoke-tests/specs/me_password_set_comprehensive.spec.ts
640. POST /me/password/set - Comprehensive Tests > 404 Not Found Responses > should return 404 when user is not found
   - File: smoke-tests/specs/me_password_set_comprehensive.spec.ts
641. POST /me/password/set - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET method
   - File: smoke-tests/specs/me_password_set_comprehensive.spec.ts
642. POST /me/password/set - Comprehensive Tests > 409 Conflict Responses > should return 409 when new password matches current
   - File: smoke-tests/specs/me_password_set_comprehensive.spec.ts
643. POST /me/password/set - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is missing
   - File: smoke-tests/specs/me_password_set_comprehensive.spec.ts
644. POST /me/password/set - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is incorrect
   - File: smoke-tests/specs/me_password_set_comprehensive.spec.ts
645. POST /me/password/set - Comprehensive Tests > 422 Validation Error Responses > should return 422 for invalid password
   - File: smoke-tests/specs/me_password_set_comprehensive.spec.ts
646. POST /me/password/set - Comprehensive Tests > 423 Locked Responses > should return 423 when account is locked
   - File: smoke-tests/specs/me_password_set_comprehensive.spec.ts
647. POST /me/password/set - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit is exceeded
   - File: smoke-tests/specs/me_password_set_comprehensive.spec.ts
648. POST /me/profile - Comprehensive Tests > 200 Success Responses > should return correct success response structure
   - File: smoke-tests/specs/me_profile_comprehensive.spec.ts
649. POST /me/profile - Comprehensive Tests > 400 Bad Request Responses > should return 400 when no fields are provided
   - File: smoke-tests/specs/me_profile_comprehensive.spec.ts
650. POST /me/profile - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided
   - File: smoke-tests/specs/me_profile_comprehensive.spec.ts
651. POST /me/profile - Comprehensive Tests > 403 Invalid Access Token Responses > should return 403 for invalid token
   - File: smoke-tests/specs/me_profile_comprehensive.spec.ts
652. POST /me/profile - Comprehensive Tests > 404 Not Found Responses > should return 404 when user is not found
   - File: smoke-tests/specs/me_profile_comprehensive.spec.ts
653. POST /me/profile - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST method
   - File: smoke-tests/specs/me_profile_comprehensive.spec.ts
654. POST /me/profile - Comprehensive Tests > 409 Conflict Responses > should return 409 when conflict occurs
   - File: smoke-tests/specs/me_profile_comprehensive.spec.ts
655. POST /me/profile - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is missing
   - File: smoke-tests/specs/me_profile_comprehensive.spec.ts
656. POST /me/profile - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 when Content-Type is incorrect
   - File: smoke-tests/specs/me_profile_comprehensive.spec.ts
657. POST /me/profile - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 for invalid profile data
   - File: smoke-tests/specs/me_profile_comprehensive.spec.ts
658. POST /me/profile - Comprehensive Tests > 423 Locked Responses > should return 423 when account is locked
   - File: smoke-tests/specs/me_profile_comprehensive.spec.ts
659. POST /me/profile - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after excessive requests
   - File: smoke-tests/specs/me_profile_comprehensive.spec.ts
660. POST /me/profile - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/me_profile_comprehensive.spec.ts
661. POST /me/profile - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/me_profile_comprehensive.spec.ts
662. GET /me/subscription - Comprehensive Tests > 200 Success Responses > should return subscription data for solo account
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
663. GET /me/subscription - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no auth token is provided
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
664. GET /me/subscription - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 for invalid token format
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
665. GET /me/subscription - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
666. GET /me/subscription - Comprehensive Tests > 404 Not Found Responses > should return 404 when subscription is missing
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
667. GET /me/subscription - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST request
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
668. GET /me/subscription - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after excessive requests
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
669. GET /me/subscription - Comprehensive Tests > Edge Cases > should handle very long authorization header
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
670. GET /me/subscription - Comprehensive Tests > Edge Cases > should handle special characters in header
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
671. GET /me/subscription - Comprehensive Tests > Edge Cases > should handle case-insensitive Bearer prefix
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
672. GET /me/subscription - Comprehensive Tests > Edge Cases > should handle whitespace in header
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
673. GET /me/subscription - Comprehensive Tests > Edge Cases > should handle invalid query parameters
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
674. GET /me/subscription - Comprehensive Tests > Edge Cases > should return fresh data on each request
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
675. GET /me/subscription - Comprehensive Tests > Security Tests > should not expose sensitive payment data
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
676. GET /me/subscription - Comprehensive Tests > Security Tests > should not expose database structure
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
677. GET /me/subscription - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
678. GET /me/subscription - Comprehensive Tests > Security Tests > should return only logged-in user subscription
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
679. GET /me/subscription - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
680. GET /me/subscription - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
681. GET /me/subscription - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
682. GET /me/subscription - Comprehensive Tests > Response Format Tests > should handle null subscription gracefully
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
683. GET /me/subscription - Comprehensive Tests > Response Format Tests > should format dates consistently
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
684. GET /me/subscription - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
685. GET /me/subscription - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently
   - File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
686. GET /me/usage - Comprehensive Tests > 200 Success Responses > should return correct usage structure
   - File: smoke-tests/specs/me_usage_comprehensive.spec.ts
687. GET /me/usage - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when no token is provided
   - File: smoke-tests/specs/me_usage_comprehensive.spec.ts
688. GET /me/usage - Comprehensive Tests > 403 Forbidden Responses > should return 403 when access is forbidden
   - File: smoke-tests/specs/me_usage_comprehensive.spec.ts
689. GET /me/usage - Comprehensive Tests > 404 Not Found Responses > should return 404 when user is not found
   - File: smoke-tests/specs/me_usage_comprehensive.spec.ts
690. GET /me/usage - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST method
   - File: smoke-tests/specs/me_usage_comprehensive.spec.ts
691. GET /me/usage - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for PUT method
   - File: smoke-tests/specs/me_usage_comprehensive.spec.ts
692. GET /me/usage - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for DELETE method
   - File: smoke-tests/specs/me_usage_comprehensive.spec.ts
693. GET /me/usage - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for PATCH method
   - File: smoke-tests/specs/me_usage_comprehensive.spec.ts
694. GET /me/usage - Comprehensive Tests > 423 Locked Responses > should return 423 when account is locked
   - File: smoke-tests/specs/me_usage_comprehensive.spec.ts
695. GET /me/usage - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after excessive requests
   - File: smoke-tests/specs/me_usage_comprehensive.spec.ts
696. GET /me/usage - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/me_usage_comprehensive.spec.ts
697. GET /me/usage - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/me_usage_comprehensive.spec.ts
698. POST /me/verification/resend - Comprehensive Tests > 401 Missing Access Token Responses > should return 401 when token is missing
   - File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts
699. POST /me/verification/resend - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission
   - File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts
700. POST /me/verification/resend - Comprehensive Tests > 404 Not Found Responses > should return 404 when user is not found
   - File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts
701. POST /me/verification/resend - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET
   - File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts
702. POST /me/verification/resend - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for PUT
   - File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts
703. POST /me/verification/resend - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for DELETE
   - File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts
704. POST /me/verification/resend - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for PATCH
   - File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts
705. POST /me/verification/resend - Comprehensive Tests > 409 Conflict Responses > should return 409 when user is already verified
   - File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts
706. POST /me/verification/resend - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 when verification email cannot be processed
   - File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts
707. POST /me/verification/resend - Comprehensive Tests > 429 Rate Limit Responses > should return 429 after excessive requests
   - File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts
708. POST /me/verification/resend - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts
709. POST /me/verification/resend - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts
710. GET /notifications - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
711. GET /notifications - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
712. GET /notifications - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
713. GET /notifications - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
714. GET /notifications - Comprehensive Tests > Edge Cases > should handle empty notification list
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
715. GET /notifications - Comprehensive Tests > Edge Cases > should handle different user tokens
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
716. GET /notifications - Comprehensive Tests > Edge Cases > should handle query parameters gracefully
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
717. GET /notifications - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
718. GET /notifications - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
719. GET /notifications - Comprehensive Tests > Security Tests > should prevent SQL injection attempts
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
720. GET /notifications - Comprehensive Tests > Security Tests > should require proper authorization
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
721. GET /notifications - Comprehensive Tests > Security Tests > should only return notifications for authenticated user
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
722. GET /notifications - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
723. GET /notifications - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
724. GET /notifications - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
725. GET /notifications - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
726. GET /notifications - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently
   - File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
727. DELETE /notifications/view/{id} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
728. DELETE /notifications/view/{id} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
729. DELETE /notifications/view/{id} - Comprehensive Tests > 404 Not Found Responses > should return 404 for non-existent notification id
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
730. DELETE /notifications/view/{id} - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST method
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
731. DELETE /notifications/view/{id} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
732. DELETE /notifications/view/{id} - Comprehensive Tests > Edge Cases > should handle negative notification ID
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
733. DELETE /notifications/view/{id} - Comprehensive Tests > Edge Cases > should handle zero notification ID
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
734. DELETE /notifications/view/{id} - Comprehensive Tests > Edge Cases > should handle very large notification ID
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
735. DELETE /notifications/view/{id} - Comprehensive Tests > Edge Cases > should handle special characters in ID
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
736. DELETE /notifications/view/{id} - Comprehensive Tests > Edge Cases > should handle URL encoded ID
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
737. DELETE /notifications/view/{id} - Comprehensive Tests > Edge Cases > should handle double deletion attempt
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
738. DELETE /notifications/view/{id} - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
739. DELETE /notifications/view/{id} - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
740. DELETE /notifications/view/{id} - Comprehensive Tests > Security Tests > should prevent SQL injection in ID
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
741. DELETE /notifications/view/{id} - Comprehensive Tests > Security Tests > should require proper authorization
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
742. DELETE /notifications/view/{id} - Comprehensive Tests > Security Tests > should only delete notifications owned by user
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
743. DELETE /notifications/view/{id} - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
744. DELETE /notifications/view/{id} - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
745. DELETE /notifications/view/{id} - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
746. DELETE /notifications/view/{id} - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
747. DELETE /notifications/view/{id} - Comprehensive Tests > Performance Tests > should handle multiple deletions efficiently
   - File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
748. PATCH /notifications/viewed - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
749. PATCH /notifications/viewed - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
750. PATCH /notifications/viewed - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for POST method
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
751. PATCH /notifications/viewed - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
752. PATCH /notifications/viewed - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
753. PATCH /notifications/viewed - Comprehensive Tests > Edge Cases > should handle request with body
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
754. PATCH /notifications/viewed - Comprehensive Tests > Edge Cases > should handle request with query parameters
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
755. PATCH /notifications/viewed - Comprehensive Tests > Edge Cases > should work when no notifications exist
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
756. PATCH /notifications/viewed - Comprehensive Tests > Edge Cases > should work when all notifications already viewed
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
757. PATCH /notifications/viewed - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
758. PATCH /notifications/viewed - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
759. PATCH /notifications/viewed - Comprehensive Tests > Security Tests > should prevent SQL injection in headers
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
760. PATCH /notifications/viewed - Comprehensive Tests > Security Tests > should require proper authorization
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
761. PATCH /notifications/viewed - Comprehensive Tests > Security Tests > should only update notifications for authenticated user
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
762. PATCH /notifications/viewed - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
763. PATCH /notifications/viewed - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
764. PATCH /notifications/viewed - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
765. PATCH /notifications/viewed - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
766. PATCH /notifications/viewed - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
767. PATCH /notifications/viewed - Comprehensive Tests > Performance Tests > should handle bulk update efficiently
   - File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
768. GET /settings/max-uploads - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token
   - File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
769. GET /settings/max-uploads - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
770. GET /settings/max-uploads - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
771. GET /settings/max-uploads - Comprehensive Tests > Edge Cases > should handle requests with extra parameters
   - File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
772. GET /settings/max-uploads - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
773. GET /settings/max-uploads - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
774. GET /settings/max-uploads - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
775. GET /settings/max-uploads - Comprehensive Tests > Security Tests > should require authentication
   - File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
776. GET /settings/max-uploads - Comprehensive Tests > Security Tests > should enforce UI-level limits
   - File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
777. GET /settings/max-uploads - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
778. GET /settings/max-uploads - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
779. GET /settings/max-uploads - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
780. GET /settings/max-uploads - Comprehensive Tests > Performance Tests > should respond quickly (< 300ms)
   - File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
781. GET /settings/max-uploads - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently
   - File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
782. GET /settings/max-uploads - Comprehensive Tests > Performance Tests > should retrieve setting efficiently
   - File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
783. GET /settings/recording-limit - Comprehensive Tests > 400 Bad Request Responses > should return 400 with malformed query params
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
784. GET /settings/recording-limit - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
785. GET /settings/recording-limit - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
786. GET /settings/recording-limit - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
787. GET /settings/recording-limit - Comprehensive Tests > Edge Cases > should handle query parameters gracefully
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
788. GET /settings/recording-limit - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
789. GET /settings/recording-limit - Comprehensive Tests > Edge Cases > should be accessible to authenticated users
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
790. GET /settings/recording-limit - Comprehensive Tests > Edge Cases > should display usage for account
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
791. GET /settings/recording-limit - Comprehensive Tests > Edge Cases > should allow usage bars display
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
792. GET /settings/recording-limit - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
793. GET /settings/recording-limit - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
794. GET /settings/recording-limit - Comprehensive Tests > Security Tests > should require authentication
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
795. GET /settings/recording-limit - Comprehensive Tests > Security Tests > should restrict when limits reached
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
796. GET /settings/recording-limit - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
797. GET /settings/recording-limit - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
798. GET /settings/recording-limit - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
799. GET /settings/recording-limit - Comprehensive Tests > Performance Tests > should respond quickly (< 400ms)
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
800. GET /settings/recording-limit - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
801. GET /settings/recording-limit - Comprehensive Tests > Performance Tests > should retrieve limit efficiently
   - File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
802. GET /settings/recording-prompt-time - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
803. GET /settings/recording-prompt-time - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
804. GET /settings/recording-prompt-time - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
805. GET /settings/recording-prompt-time - Comprehensive Tests > 404 Not Found Responses > should return 404 when setting not found
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
806. GET /settings/recording-prompt-time - Comprehensive Tests > 409 Conflict Responses > should return 409 on concurrent update attempts
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
807. GET /settings/recording-prompt-time - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 when validation fails
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
808. GET /settings/recording-prompt-time - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
809. GET /settings/recording-prompt-time - Comprehensive Tests > Edge Cases > should handle query parameters gracefully
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
810. GET /settings/recording-prompt-time - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
811. GET /settings/recording-prompt-time - Comprehensive Tests > Edge Cases > should be accessible to authenticated users
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
812. GET /settings/recording-prompt-time - Comprehensive Tests > Edge Cases > should return duration in minutes
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
813. GET /settings/recording-prompt-time - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
814. GET /settings/recording-prompt-time - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
815. GET /settings/recording-prompt-time - Comprehensive Tests > Security Tests > should require authentication
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
816. GET /settings/recording-prompt-time - Comprehensive Tests > Security Tests > should provide prompt time for session management
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
817. GET /settings/recording-prompt-time - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
818. GET /settings/recording-prompt-time - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
819. GET /settings/recording-prompt-time - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
820. GET /settings/recording-prompt-time - Comprehensive Tests > Performance Tests > should respond quickly (< 300ms)
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
821. GET /settings/recording-prompt-time - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
822. GET /settings/recording-prompt-time - Comprehensive Tests > Performance Tests > should retrieve setting efficiently
   - File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
823. GET /super-admin/clients - Comprehensive Tests > Edge Cases > should handle negative page number
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
824. GET /super-admin/clients - Comprehensive Tests > Edge Cases > should handle very large limit
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
825. GET /super-admin/clients - Comprehensive Tests > Edge Cases > should handle empty search query
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
826. GET /super-admin/clients - Comprehensive Tests > Edge Cases > should handle search with special characters
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
827. GET /super-admin/clients - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
828. GET /super-admin/clients - Comprehensive Tests > Edge Cases > should handle invalid query parameter names
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
829. GET /super-admin/clients - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
830. GET /super-admin/clients - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
831. GET /super-admin/clients - Comprehensive Tests > Security Tests > should prevent SQL injection in search
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
832. GET /super-admin/clients - Comprehensive Tests > Security Tests > should require super admin authorization
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
833. GET /super-admin/clients - Comprehensive Tests > Security Tests > should only return accessible client list
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
834. GET /super-admin/clients - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
835. GET /super-admin/clients - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
836. GET /super-admin/clients - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
837. GET /super-admin/clients - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
838. GET /super-admin/clients - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
839. GET /super-admin/clients - Comprehensive Tests > Performance Tests > should handle pagination efficiently
   - File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
840. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Edge Cases > should handle companyId with hyphens
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
841. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Edge Cases > should handle companyId with underscores
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
842. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Edge Cases > should prevent concurrent deletion of same company
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
843. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Edge Cases > should delete all associated resources
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
844. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Edge Cases > should delete company with active subscriptions
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
845. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Edge Cases > should handle deletion of company with many documents
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
846. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
847. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
848. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Security Tests > should prevent SQL injection in companyId
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
849. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Security Tests > should require super admin authorization
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
850. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Security Tests > should prevent unauthorized deletion
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
851. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Security Tests > should log deletion audit trail
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
852. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Security Tests > should require extreme caution confirmation
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
853. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
854. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
855. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
856. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Performance Tests > should respond quickly for simple deletions (< 2000ms)
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
857. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Performance Tests > should handle large resource deletions efficiently
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
858. DELETE /super-admin/companies/{companyId} - Comprehensive Tests > Performance Tests > should process cascading deletion efficiently
   - File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
859. GET /super-admin/companies/{companyId} - Comprehensive Tests > 200 Success Responses > should return company with required fields
   - File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts
860. GET /super-admin/companies/{companyId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts
861. GET /super-admin/companies/{companyId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts
862. GET /super-admin/companies/{companyId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired
   - File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts
863. GET /super-admin/companies/{companyId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user is not super-admin
   - File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts
864. GET /super-admin/companies/{companyId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when company not found
   - File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts
865. GET /super-admin/companies/{companyId} - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts
866. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for missing token
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
867. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > 404 Not Found Responses > should return 404 when company is not found
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
868. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > 415 Unsupported Media Type Responses > should return 415 for non-multipart request
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
869. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
870. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Edge Cases > should handle special characters in filename
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
871. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Edge Cases > should handle corrupted image
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
872. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Edge Cases > should handle very large file
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
873. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Edge Cases > should not modify other company fields
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
874. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Edge Cases > should allow only one file per request
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
875. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
876. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Security Tests > should prevent path traversal in filename
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
877. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
878. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Security Tests > should require super admin authorization
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
879. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
880. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
881. PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
882. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 200 Success Responses > should return company profile with required fields
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts
883. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 400 Bad Request Responses > should return 400 when companyId is invalid
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts
884. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts
885. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts
886. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts
887. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user is not super-admin
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts
888. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > 404 Not Found Responses > should return 404 when company not found
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts
889. GET /super-admin/companies/{companyId}/profile - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts
890. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Edge Cases > should handle special characters in company name
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
891. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Edge Cases > should handle null values in optional fields
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
892. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Edge Cases > should handle concurrent updates
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
893. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Edge Cases > should not handle image uploads
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
894. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Edge Cases > should handle address updates
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
895. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
896. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
897. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Security Tests > should prevent SQL injection in companyName
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
898. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Security Tests > should require super admin authorization
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
899. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Security Tests > should prevent XSS in company name
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
900. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
901. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
902. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
903. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
904. PATCH /super-admin/companies/{companyId}/profile - Comprehensive Tests > Performance Tests > should handle partial updates efficiently
   - File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
905. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle negative companyId
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
906. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle very large companyId
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
907. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle query parameters gracefully
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
908. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
909. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Edge Cases > should return aggregated data not individual usage
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
910. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
911. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
912. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Security Tests > should prevent SQL injection in companyId
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
913. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Security Tests > should require super admin authorization
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
914. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Security Tests > should only access authorized company usage
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
915. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
916. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
917. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
918. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
919. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
920. GET /super-admin/companies/{companyId}/usage/last-month - Comprehensive Tests > Performance Tests > should retrieve aggregated data efficiently
   - File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
921. GET /super-admin/companies - Comprehensive Tests > 200 Success Responses > should return companies with expected structure
   - File: smoke-tests/specs/super_admin_companies_get_comprehensive.spec.ts
922. GET /super-admin/companies - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/super_admin_companies_get_comprehensive.spec.ts
923. GET /super-admin/companies - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/super_admin_companies_get_comprehensive.spec.ts
924. GET /super-admin/companies - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired
   - File: smoke-tests/specs/super_admin_companies_get_comprehensive.spec.ts
925. GET /super-admin/companies - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user is not super-admin
   - File: smoke-tests/specs/super_admin_companies_get_comprehensive.spec.ts
926. GET /super-admin/companies - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/super_admin_companies_get_comprehensive.spec.ts
927. GET /super-admin/email/templates - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
928. GET /super-admin/email/templates - Comprehensive Tests > Edge Cases > should be accessible only by Super Admins
   - File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
929. GET /super-admin/email/templates - Comprehensive Tests > Edge Cases > should return all stored templates
   - File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
930. GET /super-admin/email/templates - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
931. GET /super-admin/email/templates - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
932. GET /super-admin/email/templates - Comprehensive Tests > Security Tests > should require super admin authorization
   - File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
933. GET /super-admin/email/templates - Comprehensive Tests > Security Tests > should only allow Super Admins to view templates
   - File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
934. GET /super-admin/email/templates - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
935. GET /super-admin/email/templates - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
936. GET /super-admin/email/templates - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
937. GET /super-admin/email/templates - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
938. GET /super-admin/email/templates - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently
   - File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
939. GET /super-admin/email/templates - Comprehensive Tests > Performance Tests > should retrieve templates efficiently
   - File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
940. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Edge Cases > should handle special characters in fields
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
941. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Edge Cases > should handle null values
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
942. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Edge Cases > should handle concurrent updates
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
943. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Edge Cases > should only update provided fields
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
944. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Edge Cases > should handle very large HTML content
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
945. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
946. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
947. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Security Tests > should prevent SQL injection in template fields
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
948. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Security Tests > should require super admin authorization
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
949. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Security Tests > should prevent XSS in template content
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
950. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
951. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
952. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
953. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
954. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Performance Tests > should handle multiple field updates efficiently
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
955. PATCH /super-admin/email/templates/{templateId} - Comprehensive Tests > Performance Tests > should process partial updates efficiently
   - File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
956. GET /super-admin/environment - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
957. GET /super-admin/environment - Comprehensive Tests > Edge Cases > should return read-only configuration
   - File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
958. GET /super-admin/environment - Comprehensive Tests > Edge Cases > should be accessible only by Super Admins
   - File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
959. GET /super-admin/environment - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
960. GET /super-admin/environment - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
961. GET /super-admin/environment - Comprehensive Tests > Security Tests > should require super admin authorization
   - File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
962. GET /super-admin/environment - Comprehensive Tests > Security Tests > should only allow Super Admins to view environment settings
   - File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
963. GET /super-admin/environment - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
964. GET /super-admin/environment - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
965. GET /super-admin/environment - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
966. GET /super-admin/environment - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
967. GET /super-admin/environment - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently
   - File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
968. GET /super-admin/environment - Comprehensive Tests > Performance Tests > should retrieve environment data efficiently
   - File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
969. PATCH /super-admin/environment - Comprehensive Tests > Edge Cases > should handle special characters in values
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
970. PATCH /super-admin/environment - Comprehensive Tests > Edge Cases > should handle null values
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
971. PATCH /super-admin/environment - Comprehensive Tests > Edge Cases > should handle concurrent updates
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
972. PATCH /super-admin/environment - Comprehensive Tests > Edge Cases > should only update provided fields
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
973. PATCH /super-admin/environment - Comprehensive Tests > Edge Cases > should handle numeric string values
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
974. PATCH /super-admin/environment - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
975. PATCH /super-admin/environment - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
976. PATCH /super-admin/environment - Comprehensive Tests > Security Tests > should prevent SQL injection in values
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
977. PATCH /super-admin/environment - Comprehensive Tests > Security Tests > should require super admin authorization
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
978. PATCH /super-admin/environment - Comprehensive Tests > Security Tests > should prevent XSS in environment values
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
979. PATCH /super-admin/environment - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
980. PATCH /super-admin/environment - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
981. PATCH /super-admin/environment - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
982. PATCH /super-admin/environment - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
983. PATCH /super-admin/environment - Comprehensive Tests > Performance Tests > should handle multiple field updates efficiently
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
984. PATCH /super-admin/environment - Comprehensive Tests > Performance Tests > should process partial updates efficiently
   - File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
985. GET /super-admin/integrations - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
986. GET /super-admin/integrations - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
987. GET /super-admin/integrations - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired
   - File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
988. GET /super-admin/integrations - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user is not super-admin
   - File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
989. GET /super-admin/integrations - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
990. PATCH /super-admin/integrations - Comprehensive Tests > 200 Success Responses for User > should update user integrations successfully
   - File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
991. PATCH /super-admin/integrations - Comprehensive Tests > 400 Bad Request Responses > should return 400 when both userId and companyId are missing
   - File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
992. PATCH /super-admin/integrations - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
993. PATCH /super-admin/integrations - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
994. PATCH /super-admin/integrations - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired
   - File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
995. PATCH /super-admin/integrations - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user is not super-admin
   - File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
996. PATCH /super-admin/integrations - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
997. POST /super-admin/usage/last-month - Comprehensive Tests > Edge Cases > should handle zero values for usage
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
998. POST /super-admin/usage/last-month - Comprehensive Tests > Edge Cases > should handle very large usage values
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
999. POST /super-admin/usage/last-month - Comprehensive Tests > Edge Cases > should handle special characters in company name
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
1000. POST /super-admin/usage/last-month - Comprehensive Tests > Edge Cases > should handle future year
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
1001. POST /super-admin/usage/last-month - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
1002. POST /super-admin/usage/last-month - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
1003. POST /super-admin/usage/last-month - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
1004. POST /super-admin/usage/last-month - Comprehensive Tests > Security Tests > should prevent SQL injection in data fields
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
1005. POST /super-admin/usage/last-month - Comprehensive Tests > Security Tests > should require super admin authorization
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
1006. POST /super-admin/usage/last-month - Comprehensive Tests > Security Tests > should validate request content type
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
1007. POST /super-admin/usage/last-month - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
1008. POST /super-admin/usage/last-month - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
1009. POST /super-admin/usage/last-month - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
1010. POST /super-admin/usage/last-month - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
1011. POST /super-admin/usage/last-month - Comprehensive Tests > Performance Tests > should handle concurrent inserts efficiently
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
1012. POST /super-admin/usage/last-month - Comprehensive Tests > Performance Tests > should insert large dataset efficiently
   - File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
1013. DELETE /super-admin/users/{userId} - Comprehensive Tests > Edge Cases > should handle userId with hyphens
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1014. DELETE /super-admin/users/{userId} - Comprehensive Tests > Edge Cases > should handle userId with underscores
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1015. DELETE /super-admin/users/{userId} - Comprehensive Tests > Edge Cases > should prevent concurrent deletion of same user
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1016. DELETE /super-admin/users/{userId} - Comprehensive Tests > Edge Cases > should delete all associated resources
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1017. DELETE /super-admin/users/{userId} - Comprehensive Tests > Edge Cases > should handle deletion of user with active sessions
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1018. DELETE /super-admin/users/{userId} - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1019. DELETE /super-admin/users/{userId} - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1020. DELETE /super-admin/users/{userId} - Comprehensive Tests > Security Tests > should prevent SQL injection in userId
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1021. DELETE /super-admin/users/{userId} - Comprehensive Tests > Security Tests > should require super admin authorization
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1022. DELETE /super-admin/users/{userId} - Comprehensive Tests > Security Tests > should prevent unauthorized deletion
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1023. DELETE /super-admin/users/{userId} - Comprehensive Tests > Security Tests > should log deletion audit trail
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1024. DELETE /super-admin/users/{userId} - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1025. DELETE /super-admin/users/{userId} - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1026. DELETE /super-admin/users/{userId} - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1027. DELETE /super-admin/users/{userId} - Comprehensive Tests > Performance Tests > should respond quickly for simple deletions (< 1000ms)
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1028. DELETE /super-admin/users/{userId} - Comprehensive Tests > Performance Tests > should handle large resource deletions efficiently
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1029. DELETE /super-admin/users/{userId} - Comprehensive Tests > Performance Tests > should process deletion efficiently
   - File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
1030. GET /super-admin/users/{userId} - Comprehensive Tests > 200 Success Responses > should return user with required fields
   - File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts
1031. GET /super-admin/users/{userId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts
1032. GET /super-admin/users/{userId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts
1033. GET /super-admin/users/{userId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired
   - File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts
1034. GET /super-admin/users/{userId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user is not super-admin
   - File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts
1035. GET /super-admin/users/{userId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when user not found
   - File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts
1036. GET /super-admin/users/{userId} - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts
1037. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for missing token
   - File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
1038. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
1039. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Edge Cases > should handle special characters in filename
   - File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
1040. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Edge Cases > should handle corrupted image
   - File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
1041. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Edge Cases > should handle very large file
   - File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
1042. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Edge Cases > should not modify other user fields
   - File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
1043. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
1044. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Security Tests > should prevent path traversal in filename
   - File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
1045. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
1046. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Security Tests > should require super admin authorization
   - File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
1047. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
1048. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
1049. PUT /super-admin/users/{userId}/profile/avatar - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)
   - File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
1050. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 200 Success Responses > should return user profile with required fields
   - File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts
1051. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 400 Bad Request Responses > should return 400 when userId is invalid
   - File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts
1052. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts
1053. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts
1054. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired
   - File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts
1055. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user is not super-admin
   - File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts
1056. GET /super-admin/users/{userId}/profile - Comprehensive Tests > 404 Not Found Responses > should return 404 when user not found
   - File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts
1057. GET /super-admin/users/{userId}/profile - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts
1058. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Edge Cases > should handle special characters in name
   - File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
1059. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Edge Cases > should handle null values in optional fields
   - File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
1060. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Edge Cases > should handle password update
   - File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
1061. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Edge Cases > should handle weak password
   - File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
1062. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Edge Cases > should handle concurrent updates
   - File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
1063. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
1064. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
1065. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Security Tests > should prevent SQL injection in firstname
   - File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
1066. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Security Tests > should require super admin authorization
   - File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
1067. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Security Tests > should hash passwords before storing
   - File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
1068. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
1069. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
1070. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
1071. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
1072. PATCH /super-admin/users/{userId}/profile - Comprehensive Tests > Performance Tests > should handle multiple field updates efficiently
   - File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
1073. GET /super-admin/users/{userId}/role - Comprehensive Tests > Edge Cases > should handle negative userId
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1074. GET /super-admin/users/{userId}/role - Comprehensive Tests > Edge Cases > should handle very large userId
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1075. GET /super-admin/users/{userId}/role - Comprehensive Tests > Edge Cases > should handle query parameters gracefully
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1076. GET /super-admin/users/{userId}/role - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1077. GET /super-admin/users/{userId}/role - Comprehensive Tests > Edge Cases > should return isSuperAdmin as boolean not string
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1078. GET /super-admin/users/{userId}/role - Comprehensive Tests > Edge Cases > should check role for specific user ID
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1079. GET /super-admin/users/{userId}/role - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1080. GET /super-admin/users/{userId}/role - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1081. GET /super-admin/users/{userId}/role - Comprehensive Tests > Security Tests > should prevent SQL injection in userId
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1082. GET /super-admin/users/{userId}/role - Comprehensive Tests > Security Tests > should require super admin authorization
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1083. GET /super-admin/users/{userId}/role - Comprehensive Tests > Security Tests > should only check roles for authorized access
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1084. GET /super-admin/users/{userId}/role - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1085. GET /super-admin/users/{userId}/role - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1086. GET /super-admin/users/{userId}/role - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1087. GET /super-admin/users/{userId}/role - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1088. GET /super-admin/users/{userId}/role - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1089. GET /super-admin/users/{userId}/role - Comprehensive Tests > Performance Tests > should check role efficiently
   - File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
1090. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle negative userId
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1091. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle very large userId
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1092. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle query parameters gracefully
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1093. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1094. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Edge Cases > should return only user usage not company aggregated
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1095. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Edge Cases > should auto-detect month and year
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1096. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1097. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1098. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Security Tests > should prevent SQL injection in userId
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1099. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Security Tests > should require super admin authorization
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1100. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Security Tests > should only access authorized user usage
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1101. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1102. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1103. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1104. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1105. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Performance Tests > should handle concurrent requests efficiently
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1106. GET /super-admin/users/{userId}/usage/last-month - Comprehensive Tests > Performance Tests > should retrieve individual usage data efficiently
   - File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
1107. GET /teams/active - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_active_comprehensive.spec.ts
1108. GET /teams/active - Comprehensive Tests > 403 Forbidden Responses > should return 403 when access denied
   - File: smoke-tests/specs/teams_active_comprehensive.spec.ts
1109. GET /teams/active - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid query parameters
   - File: smoke-tests/specs/teams_active_comprehensive.spec.ts
1110. GET /teams/active - Comprehensive Tests > 404 Not Found Responses > should return 404 for invalid active endpoint path
   - File: smoke-tests/specs/teams_active_comprehensive.spec.ts
1111. GET /teams/active - Comprehensive Tests > 409 Conflict Responses > should handle conflict state when fetching active teams
   - File: smoke-tests/specs/teams_active_comprehensive.spec.ts
1112. GET /teams/active - Comprehensive Tests > 422 Validation Error Responses > should handle 422 for malformed active team filters
   - File: smoke-tests/specs/teams_active_comprehensive.spec.ts
1113. GET /teams/active - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for too many active team requests
   - File: smoke-tests/specs/teams_active_comprehensive.spec.ts
1114. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 200 Success Responses > should support pagination in messages
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1115. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 400 Bad Request Responses > should return 400 with invalid limit
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1116. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 400 Bad Request Responses > should return 400 with negative limit
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1117. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1118. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1119. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks access
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1120. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 404 Not Found Responses > should return 404 when chat not found
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1121. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1122. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1123. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle zero limit
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1124. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle special characters in cursor
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1125. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle very long cursor
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1126. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle concurrent requests
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1127. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle empty cursor values
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1128. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should prevent XSS in cursor parameter
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1129. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should prevent SQL injection in cursor
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1130. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1131. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should not expose sensitive data in messages
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1132. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1133. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1134. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1135. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1136. GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Performance Tests > should handle large limit efficiently
   - File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
1137. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 400 Bad Request Responses > should return 400 when message is empty
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1138. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 400 Bad Request Responses > should return 400 when role is missing
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1139. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1140. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1141. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks access
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1142. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 404 Not Found Responses > should return 404 when chat not found
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1143. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1144. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1145. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle special characters in message
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1146. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle unicode in message
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1147. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle newlines in message
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1148. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle concurrent message submissions
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1149. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle whitespace-only message
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1150. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Edge Cases > should handle extremely long message
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1151. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should prevent XSS in message content
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1152. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should prevent SQL injection
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1153. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1154. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1155. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1156. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1157. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1158. POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
1159. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 when name is empty
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1160. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1161. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1162. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks access
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1163. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when chat not found
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1164. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1165. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 when name is too long
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1166. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1167. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Edge Cases > should handle special characters in name
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1168. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Edge Cases > should handle unicode characters in name
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1169. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Edge Cases > should trim whitespace from name
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1170. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Edge Cases > should handle concurrent rename attempts
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1171. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Edge Cases > should handle newlines in name
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1172. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Security Tests > should prevent XSS in chat name
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1173. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Security Tests > should prevent SQL injection
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1174. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1175. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1176. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1177. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1178. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1179. PATCH /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
1180. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 when chat ID is invalid format
   - File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts
1181. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts
1182. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts
1183. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission
   - File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts
1184. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when chat not found
   - File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts
1185. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 409 Conflict Responses > should return 409 on concurrent delete attempts
   - File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts
1186. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts
1187. DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts
1188. GET /teams/{teamId}/chats - Comprehensive Tests > 200 Success Responses > should support pagination
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1189. GET /teams/{teamId}/chats - Comprehensive Tests > 400 Bad Request Responses > should return 400 with invalid limit parameter
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1190. GET /teams/{teamId}/chats - Comprehensive Tests > 400 Bad Request Responses > should return 400 with negative offset
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1191. GET /teams/{teamId}/chats - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1192. GET /teams/{teamId}/chats - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1193. GET /teams/{teamId}/chats - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks team access
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1194. GET /teams/{teamId}/chats - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1195. GET /teams/{teamId}/chats - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1196. GET /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle special characters in search
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1197. GET /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle unicode in search
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1198. GET /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle empty scope parameter
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1199. GET /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle multiple scope values
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1200. GET /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle case sensitivity in search
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1201. GET /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should prevent XSS in search parameter
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1202. GET /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should prevent SQL injection in search
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1203. GET /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1204. GET /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1205. GET /teams/{teamId}/chats - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1206. GET /teams/{teamId}/chats - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1207. GET /teams/{teamId}/chats - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1208. GET /teams/{teamId}/chats - Comprehensive Tests > Performance Tests > should respond quickly (< 500ms)
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1209. GET /teams/{teamId}/chats - Comprehensive Tests > Performance Tests > should handle large result sets efficiently
   - File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
1210. POST /teams/{teamId}/chats - Comprehensive Tests > 400 Bad Request Responses > should return 400 when name is missing
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1211. POST /teams/{teamId}/chats - Comprehensive Tests > 400 Bad Request Responses > should return 400 when scope is invalid
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1212. POST /teams/{teamId}/chats - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1213. POST /teams/{teamId}/chats - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1214. POST /teams/{teamId}/chats - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks team access
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1215. POST /teams/{teamId}/chats - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1216. POST /teams/{teamId}/chats - Comprehensive Tests > 409 Conflict Responses > should return 409 when chat name already exists
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1217. POST /teams/{teamId}/chats - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 when chat name is too long
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1218. POST /teams/{teamId}/chats - Comprehensive Tests > 422 Unprocessable Entity Responses > should return 422 when resourceId validation fails
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1219. POST /teams/{teamId}/chats - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when rate limit exceeded
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1220. POST /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle very long resourceId
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1221. POST /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle special characters in resourceId
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1222. POST /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle unicode characters
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1223. POST /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle concurrent chat creation
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1224. POST /teams/{teamId}/chats - Comprehensive Tests > Edge Cases > should handle empty resourceId
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1225. POST /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should prevent XSS in resourceId
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1226. POST /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should prevent SQL injection
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1227. POST /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1228. POST /teams/{teamId}/chats - Comprehensive Tests > Security Tests > should not expose sensitive data in response
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1229. POST /teams/{teamId}/chats - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1230. POST /teams/{teamId}/chats - Comprehensive Tests > Response Format Tests > should return consistent error structure
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1231. POST /teams/{teamId}/chats - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1232. POST /teams/{teamId}/chats - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)
   - File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
1233. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid teamId
   - File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts
1234. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid fileId
   - File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts
1235. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing
   - File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts
1236. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token
   - File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts
1237. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token
   - File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts
1238. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token
   - File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts
1239. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 404 Not Found > should return 404 for non-existent file
   - File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts
1240. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user cannot delete file
   - File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts
1241. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 422 Validation Error Responses > should return 422 for malformed delete parameters
   - File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts
1242. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated delete requests
   - File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts
1243. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > Security Tests > should validate authorization token
   - File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts
1244. DELETE /teams/{teamId}/files/{fileId} - Comprehensive Tests > Security Tests > should handle SQL injection in fileId
   - File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts
1245. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid teamId
   - File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts
1246. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid fileId
   - File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts
1247. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing
   - File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts
1248. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token
   - File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts
1249. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token
   - File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts
1250. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token
   - File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts
1251. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 404 Not Found > should return 404 for non-existent file
   - File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts
1252. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user has no access to target team/file
   - File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts
1253. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 422 Validation Error Responses > should return 422 for malformed file identifier
   - File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts
1254. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated file download requests
   - File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts
1255. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > Security Tests > should validate authorization token
   - File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts
1256. GET /teams/{teamId}/files/{fileId} - Comprehensive Tests > Security Tests > should handle SQL injection in fileId
   - File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts
1257. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid teamId
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1258. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid fileId
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1259. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 400 Bad Request Responses > should return 400 for missing new name
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1260. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1261. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1262. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1263. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1264. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 404 Not Found > should return 404 for non-existent file
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1265. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user cannot rename file
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1266. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 409 Conflict Responses > should return 409 when target filename already exists
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1267. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 422 Validation Error Responses > should return 422 for invalid rename payload
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1268. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated rename requests
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1269. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > Edge Cases > should handle very long file name
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1270. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > Edge Cases > should handle special characters in file name
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1271. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > Security Tests > should reject SQL injection attempts
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1272. PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests > Security Tests > should validate authorization token
   - File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
1273. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid teamId
   - File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts
1274. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid fileId
   - File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts
1275. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 for empty request body
   - File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts
1276. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing
   - File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts
1277. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token
   - File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts
1278. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token
   - File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts
1279. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token
   - File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts
1280. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 404 Not Found > should return 404 for non-existent file
   - File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts
1281. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission
   - File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts
1282. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated file update requests
   - File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts
1283. PATCH /teams/{teamId}/files/{fileId} - Comprehensive Tests > Security Tests > should validate authorization token
   - File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts
1284. POST /teams/{teamId}/files - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid teamId
   - File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
1285. POST /teams/{teamId}/files - Comprehensive Tests > 400 Bad Request Responses > should return 400 for missing required parameters
   - File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
1286. POST /teams/{teamId}/files - Comprehensive Tests > 400 Bad Request Responses > should return 400 for malformed JSON
   - File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
1287. POST /teams/{teamId}/files - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing
   - File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
1288. POST /teams/{teamId}/files - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token
   - File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
1289. POST /teams/{teamId}/files - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token
   - File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
1290. POST /teams/{teamId}/files - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token
   - File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
1291. POST /teams/{teamId}/files - Comprehensive Tests > 404 Not Found > should return 404 for non-existent team
   - File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
1292. POST /teams/{teamId}/files - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission
   - File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
1293. POST /teams/{teamId}/files - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated file create requests
   - File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
1294. POST /teams/{teamId}/files - Comprehensive Tests > Edge Cases > should handle very long file name
   - File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
1295. POST /teams/{teamId}/files - Comprehensive Tests > Edge Cases > should handle special characters in file name
   - File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
1296. POST /teams/{teamId}/files - Comprehensive Tests > Security Tests > should reject SQL injection attempts
   - File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
1297. POST /teams/{teamId}/files - Comprehensive Tests > Security Tests > should validate authorization token
   - File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
1298. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid teamId
   - File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts
1299. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid fileId
   - File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts
1300. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 401 Unauthorized Responses > should return 401 when authorization token is missing
   - File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts
1301. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for invalid token
   - File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts
1302. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for expired token
   - File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts
1303. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for malformed Bearer token
   - File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts
1304. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 404 Not Found > should return 404 for non-existent file
   - File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts
1305. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks access to summary
   - File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts
1306. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated summary requests
   - File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts
1307. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > Security Tests > should validate authorization token
   - File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts
1308. GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests > Security Tests > should handle SQL injection in fileId
   - File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts
1309. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 200 Success Responses > should soft delete folder to trash
   - File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts
1310. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 when folder ID is invalid format
   - File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts
1311. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts
1312. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts
1313. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission
   - File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts
1314. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when folder not found
   - File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts
1315. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 409 Conflict Responses > should handle 409 when deleting protected/default folder
   - File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts
1316. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated delete attempts
   - File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts
1317. DELETE /teams/{teamId}/folders/{folderId} - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts
1318. GET /teams/{teamId}/folders - Comprehensive Tests > 200 Success Responses > should fetch items with pagination
   - File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts
1319. GET /teams/{teamId}/folders - Comprehensive Tests > 200 Success Responses > should search items by name
   - File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts
1320. GET /teams/{teamId}/folders - Comprehensive Tests > 200 Success Responses > should return item structure with type field
   - File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts
1321. GET /teams/{teamId}/folders - Comprehensive Tests > 400 Bad Request Responses > should return 400 when team ID is invalid
   - File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts
1322. GET /teams/{teamId}/folders - Comprehensive Tests > 400 Bad Request Responses > should return 400 when parentId is invalid number
   - File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts
1323. GET /teams/{teamId}/folders - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts
1324. GET /teams/{teamId}/folders - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts
1325. GET /teams/{teamId}/folders - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks access
   - File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts
1326. GET /teams/{teamId}/folders - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found
   - File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts
1327. GET /teams/{teamId}/folders - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when listing folders too frequently
   - File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts
1328. GET /teams/{teamId}/folders - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts
1329. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 200 Success Responses > should update folder with tooltip/description
   - File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts
1330. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 when team ID is invalid
   - File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts
1331. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 when folder ID is invalid
   - File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts
1332. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts
1333. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts
1334. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission
   - File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts
1335. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when folder not found
   - File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts
1336. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 409 Conflict Responses > should handle 409 when folder name conflicts in same level
   - File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts
1337. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated folder update requests
   - File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts
1338. PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts
1339. POST /teams/{teamId}/folders - Comprehensive Tests > 201 Created Success Responses > should create subfolder with valid parentId
   - File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts
1340. POST /teams/{teamId}/folders - Comprehensive Tests > 400 Bad Request Responses > should return 400 when folder name is missing
   - File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts
1341. POST /teams/{teamId}/folders - Comprehensive Tests > 400 Bad Request Responses > should return 400 when team ID is invalid
   - File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts
1342. POST /teams/{teamId}/folders - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts
1343. POST /teams/{teamId}/folders - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts
1344. POST /teams/{teamId}/folders - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission
   - File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts
1345. POST /teams/{teamId}/folders - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found
   - File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts
1346. POST /teams/{teamId}/folders - Comprehensive Tests > 404 Not Found Responses > should return 404 when parent folder not found
   - File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts
1347. POST /teams/{teamId}/folders - Comprehensive Tests > 409 Conflict Responses > should handle 409 when folder already exists
   - File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts
1348. POST /teams/{teamId}/folders - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for repeated folder create requests
   - File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts
1349. POST /teams/{teamId}/folders - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts
1350. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 200 Success Responses > should return empty predecessors for root folder
   - File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts
1351. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 400 Bad Request Responses > should return 400 when folder ID is invalid format
   - File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts
1352. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts
1353. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts
1354. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission
   - File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts
1355. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 404 Not Found Responses > should return 404 when folder not found
   - File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts
1356. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when tree endpoint is repeatedly requested
   - File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts
1357. GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts
1358. GET /teams - Comprehensive Tests > 400 Bad Request Responses > should return 400 for invalid query parameters
   - File: smoke-tests/specs/teams_get_comprehensive.spec.ts
1359. GET /teams - Comprehensive Tests > 401 Unauthorized Responses > should return 401 for missing access token
   - File: smoke-tests/specs/teams_get_comprehensive.spec.ts
1360. GET /teams - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user has no access to requested company
   - File: smoke-tests/specs/teams_get_comprehensive.spec.ts
1361. GET /teams - Comprehensive Tests > 404 Not Found Responses > should return 404 for non-existent teams path
   - File: smoke-tests/specs/teams_get_comprehensive.spec.ts
1362. GET /teams - Comprehensive Tests > 409 Conflict Responses > should handle 409 conflict scenario for teams list
   - File: smoke-tests/specs/teams_get_comprehensive.spec.ts
1363. GET /teams - Comprehensive Tests > 422 Validation Error Responses > should return 422 for malformed pagination values
   - File: smoke-tests/specs/teams_get_comprehensive.spec.ts
1364. GET /teams - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for burst requests to teams list
   - File: smoke-tests/specs/teams_get_comprehensive.spec.ts
1365. GET /teams - Comprehensive Tests > Edge Cases > should handle very large page number
   - File: smoke-tests/specs/teams_get_comprehensive.spec.ts
1366. GET /teams - Comprehensive Tests > Edge Cases > should handle very large limit
   - File: smoke-tests/specs/teams_get_comprehensive.spec.ts
1367. GET /teams - Comprehensive Tests > Edge Cases > should handle special characters in searchString
   - File: smoke-tests/specs/teams_get_comprehensive.spec.ts
1368. GET /teams - Comprehensive Tests > Security Tests > should prevent SQL injection in searchString
   - File: smoke-tests/specs/teams_get_comprehensive.spec.ts
1369. GET /teams - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/teams_get_comprehensive.spec.ts
1370. GET /teams - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/teams_get_comprehensive.spec.ts
1371. GET /teams - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/teams_get_comprehensive.spec.ts
1372. GET /teams - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)
   - File: smoke-tests/specs/teams_get_comprehensive.spec.ts
1373. GET /teams/{teamId}/items - Comprehensive Tests > 200 Success Responses > should return items with correct parent relationships
   - File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts
1374. GET /teams/{teamId}/items - Comprehensive Tests > 400 Bad Request Responses > should return 400 when team ID is invalid format
   - File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts
1375. GET /teams/{teamId}/items - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts
1376. GET /teams/{teamId}/items - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts
1377. GET /teams/{teamId}/items - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission
   - File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts
1378. GET /teams/{teamId}/items - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found
   - File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts
1379. GET /teams/{teamId}/items - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when item list endpoint is requested excessively
   - File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts
1380. GET /teams/{teamId}/items - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts
1381. GET /teams - Comprehensive Tests > 200 Success Responses > should support pagination parameters
   - File: smoke-tests/specs/teams_list_comprehensive.spec.ts
1382. GET /teams - Comprehensive Tests > 400 Bad Request Responses > should return 400 when companyId invalid for company users
   - File: smoke-tests/specs/teams_list_comprehensive.spec.ts
1383. GET /teams - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_list_comprehensive.spec.ts
1384. GET /teams - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_list_comprehensive.spec.ts
1385. GET /teams - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when access token expired
   - File: smoke-tests/specs/teams_list_comprehensive.spec.ts
1386. GET /teams - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user does not have access
   - File: smoke-tests/specs/teams_list_comprehensive.spec.ts
1387. GET /teams - Comprehensive Tests > 409 Conflict Responses > should return 409 when failed to fetch team list
   - File: smoke-tests/specs/teams_list_comprehensive.spec.ts
1388. GET /teams - Comprehensive Tests > 404 Not Found Responses > should handle invalid route parameters with not found response
   - File: smoke-tests/specs/teams_list_comprehensive.spec.ts
1389. GET /teams - Comprehensive Tests > 422 Validation Error Responses > should handle invalid query format for filter params
   - File: smoke-tests/specs/teams_list_comprehensive.spec.ts
1390. GET /teams - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when team list endpoint is heavily requested
   - File: smoke-tests/specs/teams_list_comprehensive.spec.ts
1391. GET /teams - Comprehensive Tests > Response Format Tests > should return proper content-type
   - File: smoke-tests/specs/teams_list_comprehensive.spec.ts
1392. POST /teams - Comprehensive Tests > Edge Cases > should handle very long team name
   - File: smoke-tests/specs/teams_post_comprehensive.spec.ts
1393. POST /teams - Comprehensive Tests > Edge Cases > should handle special characters in name
   - File: smoke-tests/specs/teams_post_comprehensive.spec.ts
1394. POST /teams - Comprehensive Tests > Edge Cases > should handle Unicode characters
   - File: smoke-tests/specs/teams_post_comprehensive.spec.ts
1395. POST /teams - Comprehensive Tests > Security Tests > should prevent SQL injection in name
   - File: smoke-tests/specs/teams_post_comprehensive.spec.ts
1396. POST /teams - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/teams_post_comprehensive.spec.ts
1397. POST /teams - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/teams_post_comprehensive.spec.ts
1398. POST /teams - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/teams_post_comprehensive.spec.ts
1399. POST /teams - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)
   - File: smoke-tests/specs/teams_post_comprehensive.spec.ts
1400. PUT /teams/{teamId} - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/teams_put_comprehensive.spec.ts
1401. PUT /teams/{teamId} - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/teams_put_comprehensive.spec.ts
1402. PUT /teams/{teamId} - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)
   - File: smoke-tests/specs/teams_put_comprehensive.spec.ts
1403. POST /teams/{teamId}/share - Comprehensive Tests > 200/201 Success Responses > should return success if user already has access
   - File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts
1404. POST /teams/{teamId}/share - Comprehensive Tests > 400 Bad Request Responses > should return 400 when email is missing
   - File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts
1405. POST /teams/{teamId}/share - Comprehensive Tests > 400 Bad Request Responses > should return 400 when email format is invalid
   - File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts
1406. POST /teams/{teamId}/share - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts
1407. POST /teams/{teamId}/share - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts
1408. POST /teams/{teamId}/share - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission
   - File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts
1409. POST /teams/{teamId}/share - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found
   - File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts
1410. POST /teams/{teamId}/share - Comprehensive Tests > 409 Conflict Responses > should handle 409 when user is already shared to the team
   - File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts
1411. POST /teams/{teamId}/share - Comprehensive Tests > 422 Validation Error Responses > should return 422 for invalid share payload
   - File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts
1412. POST /teams/{teamId}/share - Comprehensive Tests > 429 Rate Limit Responses > should return 429 for too many team share attempts
   - File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts
1413. GET /teams/shared - Comprehensive Tests > Edge Cases > should handle very large limit
   - File: smoke-tests/specs/teams_shared_comprehensive.spec.ts
1414. GET /teams/shared - Comprehensive Tests > Edge Cases > should handle special characters in searchString
   - File: smoke-tests/specs/teams_shared_comprehensive.spec.ts
1415. GET /teams/shared - Comprehensive Tests > Security Tests > should prevent SQL injection in searchString
   - File: smoke-tests/specs/teams_shared_comprehensive.spec.ts
1416. GET /teams/shared - Comprehensive Tests > Security Tests > should validate token on every request
   - File: smoke-tests/specs/teams_shared_comprehensive.spec.ts
1417. GET /teams/shared - Comprehensive Tests > Response Format Tests > should return consistent success structure
   - File: smoke-tests/specs/teams_shared_comprehensive.spec.ts
1418. GET /teams/shared - Comprehensive Tests > Response Format Tests > should return proper content type
   - File: smoke-tests/specs/teams_shared_comprehensive.spec.ts
1419. GET /teams/shared - Comprehensive Tests > Performance Tests > should respond quickly (< 1000ms)
   - File: smoke-tests/specs/teams_shared_comprehensive.spec.ts
1420. GET /teams/shared - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_shared_get_comprehensive.spec.ts
1421. GET /teams/shared - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_shared_get_comprehensive.spec.ts
1422. GET /teams/shared - Comprehensive Tests > 403 Forbidden Responses > should return 403 when access denied
   - File: smoke-tests/specs/teams_shared_get_comprehensive.spec.ts
1423. GET /teams/shared - Comprehensive Tests > 409 Conflict Responses > should handle 409 when shared team state conflicts
   - File: smoke-tests/specs/teams_shared_get_comprehensive.spec.ts
1424. GET /teams/shared - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when shared teams endpoint is spammed
   - File: smoke-tests/specs/teams_shared_get_comprehensive.spec.ts
1425. PATCH /teams/{teamId}/status - Comprehensive Tests > 200 Success Responses > should deactivate team successfully
   - File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts
1426. PATCH /teams/{teamId}/status - Comprehensive Tests > 400 Bad Request Responses > should return 400 when active field is missing
   - File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts
1427. PATCH /teams/{teamId}/status - Comprehensive Tests > 400 Bad Request Responses > should return 400 when active is invalid value
   - File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts
1428. PATCH /teams/{teamId}/status - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts
1429. PATCH /teams/{teamId}/status - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts
1430. PATCH /teams/{teamId}/status - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user lacks permission
   - File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts
1431. PATCH /teams/{teamId}/status - Comprehensive Tests > 404 Not Found Responses > should return 404 when team not found
   - File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts
1432. PATCH /teams/{teamId}/status - Comprehensive Tests > 409 Conflict Responses > should handle 409 when team status has conflicting state
   - File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts
1433. PATCH /teams/{teamId}/status - Comprehensive Tests > 429 Rate Limit Responses > should return 429 when status endpoint exceeds request limits
   - File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts
1434. PATCH /teams/{teamId}/status - Comprehensive Tests > Response Format Validation > should include required headers in response
   - File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts
1435. PUT /teams/{teamId} - Comprehensive Tests > 201 Success Responses > should update team alias successfully
   - File: smoke-tests/specs/teams_update_comprehensive.spec.ts
1436. PUT /teams/{teamId} - Comprehensive Tests > 400 Bad Request Responses > should return 400 when no fields provided for update
   - File: smoke-tests/specs/teams_update_comprehensive.spec.ts
1437. PUT /teams/{teamId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when missing access token
   - File: smoke-tests/specs/teams_update_comprehensive.spec.ts
1438. PUT /teams/{teamId} - Comprehensive Tests > 401 Authentication Error Responses > should return 401 when invalid access token
   - File: smoke-tests/specs/teams_update_comprehensive.spec.ts
1439. PUT /teams/{teamId} - Comprehensive Tests > 403 Forbidden Responses > should return 403 when user not allowed to update team
   - File: smoke-tests/specs/teams_update_comprehensive.spec.ts
1440. PUT /teams/{teamId} - Comprehensive Tests > 404 Not Found Responses > should return 404 when team does not exist
   - File: smoke-tests/specs/teams_update_comprehensive.spec.ts
1441. PUT /teams/{teamId} - Comprehensive Tests > 405 Method Not Allowed Responses > should return 405 for GET request
   - File: smoke-tests/specs/teams_update_comprehensive.spec.ts
1442. PUT /teams/{teamId} - Comprehensive Tests > 409 Conflict Responses > should return 409 when teamAlias already in use
   - File: smoke-tests/specs/teams_update_comprehensive.spec.ts
