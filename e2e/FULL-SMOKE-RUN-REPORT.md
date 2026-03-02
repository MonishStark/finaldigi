# Full Smoke Test Run Report

- Total tests: 1793
- Passed: 783
- Failed: 139
- Skipped: 871
- Timed out results: 3
- Interrupted results: 0

## Failed test details

### 1. 
- File: smoke-tests/specs/admin_users_delete_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m
- Smoke test expected: 
 [90m     |[39m 			                                                 [31m[1m^[22m[39m
 [90m 366 |[39m 				response[33m.[39mstatus(
- Backend provided: [31m[200, 400, 401, 403, 404, 408, 500, 401][39m

### 2. 
- File: smoke-tests/specs/admin_users_get_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mnot[2m.[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m
- Smoke test expected: [32m"password"[39m
- Backend provided: Not explicitly parsed from assertion message

### 3. 
- File: smoke-tests/specs/app_data_get_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeDefined[2m()[22m
- Smoke test expected: [32m"boolean"[39m
- Backend provided: [31mundefined[39m

### 4. 
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32mtrue[39m
- Backend provided: [31mfalse[39m

### 5. 
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"bad_request"[39m
- Backend provided: [31mundefined[39m

### 6. 
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"bad_request"[39m
- Backend provided: [31mundefined[39m

### 7. 
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"bad_request"[39m
- Backend provided: [31mundefined[39m

### 8. 
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"bad_request"[39m
- Backend provided: [31mundefined[39m

### 9. 
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- Smoke test expected: [32m[][39m
- Backend provided: [31mundefined[39m

### 10. 
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32mtrue[39m
- Backend provided: [31mfalse[39m

### 11. 
- File: smoke-tests/specs/auth_email_check_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32mtrue[39m
- Backend provided: [31mfalse[39m

### 12. 
- File: smoke-tests/specs/auth_password_forgot_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- Smoke test expected: [35m/bad_request|not_found/i[39m
- Backend provided: Not explicitly parsed from assertion message

### 13. 
- File: smoke-tests/specs/auth_password_forgot_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m
- Smoke test expected: [32m/Invalid or missing email|Invalid or missing input/i[39m
- Backend provided: Not explicitly parsed from assertion message

### 14. 
- File: smoke-tests/specs/auth_password_reset_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- Smoke test expected: [32m"bad_request"[39m
- Backend provided: Not explicitly parsed from assertion message

### 15. 
- File: smoke-tests/specs/auth_password_reset_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- Smoke test expected: [35m/validation_error|bad_request/i[39m
- Backend provided: Not explicitly parsed from assertion message

### 16. 
- File: smoke-tests/specs/auth_payment_status_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"missing_access_token"[39m
- Backend provided: [31mundefined[39m

### 17. 
- File: smoke-tests/specs/auth_payment_status_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"method_not_allowed"[39m
- Backend provided: [31mundefined[39m

### 18. 
- File: smoke-tests/specs/auth_payment_status_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"method_not_allowed"[39m
- Backend provided: [31mundefined[39m

### 19. 
- File: smoke-tests/specs/auth_payment_status_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"method_not_allowed"[39m
- Backend provided: [31mundefined[39m

### 20. 
- File: smoke-tests/specs/auth_providers_provider_get_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"method_not_allowed"[39m
- Backend provided: [31mundefined[39m

### 21. 
- File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- Smoke test expected: [32m[][39m
- Backend provided: [31mundefined[39m

### 22. 
- File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m
- Smoke test expected: firstRefresh[33m.[39mstatus(
- Backend provided: [31m[200, 400, 401][39m

### 23. 
- File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"[7mforbidd[27men"[39m
- Backend provided: [31m"[7mauth_invalid_refresh_tok[27men"[39m

### 24. 
- File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- Smoke test expected: [32m[][39m
- Backend provided: [31mundefined[39m

### 25. 
- File: smoke-tests/specs/auth_refresh_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- Smoke test expected: [32m[][39m
- Backend provided: [31mundefined[39m

### 26. 
- File: smoke-tests/specs/auth_register_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"conflict"[39m
- Backend provided: [31mundefined[39m

### 27. 
- File: smoke-tests/specs/auth_register_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- Smoke test expected: [32m[][39m
- Backend provided: [31mundefined[39m

### 28. 
- File: smoke-tests/specs/auth_sign_out_comprehensive.spec.ts
- Why it failed: Error: browserType.launch: Executable doesn't exist at C:\Users\Dhanush\AppData\Local\ms-playwright\chromium-1140\chrome-win\chrome.exe
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 29. 
- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"bad_request"[39m
- Backend provided: [31mundefined[39m

### 30. 
- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"unauthorized"[39m
- Backend provided: [31mundefined[39m

### 31. 
- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: SyntaxError: Unexpected token 'I', "Internal S"... is not valid JSON
- Smoke test expected: [36mtrue[39m
- Backend provided: Not explicitly parsed from assertion message

### 32. 
- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoHaveProperty[2m([22m[32mpath[39m[2m)[22m
- Smoke test expected: [32m"boolean"[39m
- Backend provided: [31m{}[39m

### 33. 
- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeDefined[2m()[22m
- Smoke test expected: [32m"string"[39m
- Backend provided: [31mundefined[39m

### 34. 
- File: smoke-tests/specs/auth_verify_account_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m
- Smoke test expected: [32m"application/json"[39m
- Backend provided: Not explicitly parsed from assertion message

### 35. 
- File: smoke-tests/specs/auth_verify_otp_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- Smoke test expected: [32m"bad_request"[39m
- Backend provided: Not explicitly parsed from assertion message

### 36. 
- File: smoke-tests/specs/auth_verify_otp_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- Smoke test expected: [32m"bad_request"[39m
- Backend provided: Not explicitly parsed from assertion message

### 37. 
- File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
- Why it failed: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
- Smoke test expected: [36mfalse[39m
- Backend provided: Not explicitly parsed from assertion message

### 38. 
- File: smoke-tests/specs/companies_avatar_post_comprehensive.spec.ts
- Why it failed: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
- Smoke test expected: [36mfalse[39m
- Backend provided: Not explicitly parsed from assertion message

### 39. 
- File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
- Why it failed: TypeError: Cannot read properties of undefined (reading 'length')
- Smoke test expected: [35m/invalid authentication token provided|Invalid authentication token provided/i[39m
- Backend provided: Not explicitly parsed from assertion message

### 40. 
- File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"method_not_allowed"[39m
- Backend provided: [31mundefined[39m

### 41. 
- File: smoke-tests/specs/companies_companyId_2fa_post_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m
- Smoke test expected: [32m"boolean"[39m
- Backend provided: Not explicitly parsed from assertion message

### 42. 
- File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m
- Smoke test expected: [32m"boolean"[39m
- Backend provided: Not explicitly parsed from assertion message

### 43. 
- File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m
- Smoke test expected: data[33m.[39mmessage [33m||[39m [32m""[39m
- Backend provided: [31m["Invalid authentication token provided", "invalid authentication token provided"][39m

### 44. 
- File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m
- Smoke test expected: data[33m.[39merror [33m||[39m [32m""[39m
- Backend provided: [31m["access_token_expired", "invalid_access_token", "unauthorized"][39m

### 45. 
- File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m
- Smoke test expected: data[33m.[39merror [33m||[39m [32m""[39m
- Backend provided: [31m["unsupported_media_type", "invalid_access_token", "unauthorized"][39m

### 46. 
- File: smoke-tests/specs/companies_companyId_profile_post_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m
- Smoke test expected: data[33m.[39merror [33m||[39m [32m""[39m
- Backend provided: [31m["unsupported_media_type", "invalid_access_token", "unauthorized"][39m

### 47. 
- File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeDefined[2m()[22m
- Smoke test expected: [32m"boolean"[39m
- Backend provided: [31mundefined[39m

### 48. 
- File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"[7mMissing parameters, fill all the required[27m fields"[39m
- Backend provided: [31m"[7mInvalid or missing[27m fields"[39m

### 49. 
- File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"Missing authentication token[7m provided[27m"[39m
- Backend provided: [31m"Missing authentication token"[39m

### 50. 
- File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"[7mi[27mnvalid authentication token provided"[39m
- Backend provided: [31m"[7mI[27mnvalid authentication token provided"[39m

### 51. 
- File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
- Why it failed: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
- Smoke test expected: [36mfalse[39m
- Backend provided: Not explicitly parsed from assertion message

### 52. 
- File: smoke-tests/specs/companies_profile_get_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBeDefined[2m()[22m
- Smoke test expected: [36mtrue[39m
- Backend provided: [31mundefined[39m

### 53. 
- File: smoke-tests/specs/companies_usage_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"method_not_allowed"[39m
- Backend provided: [31mundefined[39m

### 54. 
- File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"bad_request"[39m
- Backend provided: [31mundefined[39m

### 55. 
- File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"bad_request"[39m
- Backend provided: [31mundefined[39m

### 56. 
- File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"bad_request"[39m
- Backend provided: [31mundefined[39m

### 57. 
- File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"unauthorized"[39m
- Backend provided: [31mundefined[39m

### 58. 
- File: smoke-tests/specs/integrations_auth_google_callback_post_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"unauthorized"[39m
- Backend provided: [31mundefined[39m

### 59. 
- File: smoke-tests/specs/integrations_get_comprehensive.spec.ts
- Why it failed: [31mTest timeout of 30000ms exceeded.[39m
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 60. 
- File: smoke-tests/specs/integrations_get_comprehensive.spec.ts
- Why it failed: [31mTest timeout of 30000ms exceeded.[39m
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 61. 
- File: smoke-tests/specs/integrations_get_comprehensive.spec.ts
- Why it failed: [31mTest timeout of 30000ms exceeded.[39m
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 62. 
- File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"[7mThis fiel[27md is required"[39m
- Backend provided: [31m"[7mPasswor[27md is required"[39m

### 63. 
- File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- Smoke test expected: [32m"missing_access_token"[39m
- Backend provided: Not explicitly parsed from assertion message

### 64. 
- File: smoke-tests/specs/me_2fa_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"method_not_allowed"[39m
- Backend provided: [31mundefined[39m

### 65. 
- File: smoke-tests/specs/me_avatar_comprehensive.spec.ts
- Why it failed: Error: ENOENT: no such file or directory, open 'C:\Users\Dhanush\Desktop\Digibot\digibot - Copy - Copy - Copy\e2e\e2e\smoke-tests\specs\test-avatar-temp.png'
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 66. 
- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m200[39m
- Backend provided: [31m500[39m

### 67. 
- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m200[39m
- Backend provided: [31m404[39m

### 68. 
- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m200[39m
- Backend provided: [31m500[39m

### 69. 
- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- Smoke test expected: [35m/missing_access_token|invalid_access_token/i[39m
- Backend provided: Not explicitly parsed from assertion message

### 70. 
- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m
- Smoke test expected: [32m/Missing authentication token provided|Missing authentication token/i[39m
- Backend provided: Not explicitly parsed from assertion message

### 71. 
- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"method_not_allowed"[39m
- Backend provided: [31mundefined[39m

### 72. 
- File: smoke-tests/specs/me_base_get_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m
- Smoke test expected: response1[33m.[39mstatus(
- Backend provided: [31m[200, 500][39m

### 73. 
- File: smoke-tests/specs/me_email_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m
- Smoke test expected: [32m"missing_access_token"[39m
- Backend provided: Not explicitly parsed from assertion message

### 74. 
- File: smoke-tests/specs/me_email_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"method_not_allowed"[39m
- Backend provided: [31mundefined[39m

### 75. 
- File: smoke-tests/specs/me_email_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m
- Smoke test expected: [32m/Email already (exists|in use)/[39m
- Backend provided: Not explicitly parsed from assertion message

### 76. 
- File: smoke-tests/specs/me_email_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m
- Smoke test expected: [32m/unsupported_media_type|bad_request/i[39m
- Backend provided: Not explicitly parsed from assertion message

### 77. 
- File: smoke-tests/specs/me_password_comprehensive.spec.ts
- Why it failed: Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m
- Smoke test expected: [32m"[7mp[27massword"[39m
- Backend provided: [31m"[7mcurrentP[27massword"[39m

### 78. 
- File: smoke-tests/specs/me_password_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 79. 
- File: smoke-tests/specs/me_password_set_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 80. 
- File: smoke-tests/specs/me_profile_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 81. 
- File: smoke-tests/specs/me_subscription_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 82. 
- File: smoke-tests/specs/me_usage_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 83. 
- File: smoke-tests/specs/me_verification_resend_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 84. 
- File: smoke-tests/specs/notifications_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 85. 
- File: smoke-tests/specs/notifications_view_id_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 86. 
- File: smoke-tests/specs/notifications_viewed_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 87. 
- File: smoke-tests/specs/settings_max_uploads_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 88. 
- File: smoke-tests/specs/settings_recording_limit_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 89. 
- File: smoke-tests/specs/settings_recording_prompt_time_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 90. 
- File: smoke-tests/specs/super_admin_clients_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 91. 
- File: smoke-tests/specs/super_admin_companies_companyid_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 92. 
- File: smoke-tests/specs/super_admin_companies_companyid_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 93. 
- File: smoke-tests/specs/super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 94. 
- File: smoke-tests/specs/super_admin_companies_companyid_profile_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 95. 
- File: smoke-tests/specs/super_admin_companies_companyid_profile_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 96. 
- File: smoke-tests/specs/super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 97. 
- File: smoke-tests/specs/super_admin_companies_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 98. 
- File: smoke-tests/specs/super_admin_email_templates_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 99. 
- File: smoke-tests/specs/super_admin_email_templates_templateid_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 100. 
- File: smoke-tests/specs/super_admin_environment_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 101. 
- File: smoke-tests/specs/super_admin_environment_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 102. 
- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 103. 
- File: smoke-tests/specs/super_admin_integrations_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 104. 
- File: smoke-tests/specs/super_admin_usage_last_month_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 105. 
- File: smoke-tests/specs/super_admin_users_userid_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 106. 
- File: smoke-tests/specs/super_admin_users_userid_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 107. 
- File: smoke-tests/specs/super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 108. 
- File: smoke-tests/specs/super_admin_users_userid_profile_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 109. 
- File: smoke-tests/specs/super_admin_users_userid_profile_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 110. 
- File: smoke-tests/specs/super_admin_users_userid_role_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 111. 
- File: smoke-tests/specs/super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 112. 
- File: smoke-tests/specs/teams_active_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 113. 
- File: smoke-tests/specs/teams_chats_chatId_messages_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 114. 
- File: smoke-tests/specs/teams_chats_chatId_messages_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 115. 
- File: smoke-tests/specs/teams_chats_chatId_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 116. 
- File: smoke-tests/specs/teams_chats_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 117. 
- File: smoke-tests/specs/teams_chats_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 118. 
- File: smoke-tests/specs/teams_chats_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 119. 
- File: smoke-tests/specs/teams_files_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 120. 
- File: smoke-tests/specs/teams_files_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 121. 
- File: smoke-tests/specs/teams_files_name_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 122. 
- File: smoke-tests/specs/teams_files_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 123. 
- File: smoke-tests/specs/teams_files_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 124. 
- File: smoke-tests/specs/teams_files_summary_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 125. 
- File: smoke-tests/specs/teams_folders_delete_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 126. 
- File: smoke-tests/specs/teams_folders_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 127. 
- File: smoke-tests/specs/teams_folders_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 128. 
- File: smoke-tests/specs/teams_folders_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 129. 
- File: smoke-tests/specs/teams_folders_tree_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 130. 
- File: smoke-tests/specs/teams_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 131. 
- File: smoke-tests/specs/teams_items_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 132. 
- File: smoke-tests/specs/teams_list_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 133. 
- File: smoke-tests/specs/teams_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 134. 
- File: smoke-tests/specs/teams_put_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 135. 
- File: smoke-tests/specs/teams_share_post_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 136. 
- File: smoke-tests/specs/teams_shared_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 137. 
- File: smoke-tests/specs/teams_shared_get_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 138. 
- File: smoke-tests/specs/teams_status_patch_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message

### 139. 
- File: smoke-tests/specs/teams_update_comprehensive.spec.ts
- Why it failed: Error: Login failed with status 401: {"success":false,"error":"auth_invalid_credentials","message":"Invalid password"}
- Smoke test expected: Not explicitly parsed from assertion message
- Backend provided: Not explicitly parsed from assertion message
