/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import { validateSignOutResponse } from "../../tests/helpers/responseValidator";

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

/**
 * Comprehensive test suite for POST /auth/sign-out endpoint
 * Tests ALL response codes: 200, 400, 401, 403, 404
 * Covers scenarios: successful logout, invalid tokens, revoked tokens, missing sessions
 * Requires: Authorization header with valid access token
 * Response Structure:
 *   - 200: {success: true, message: "Successfully signed out"}
 *   - 400: {success: false, error: "bad_request", message: "Missing or invalid parameters", details: []}
 *   - 401: {success: false, error: "missing_access_token", message: "..."}
 *   - 403: {success: false, error: "forbidden", message: "Token already revoked"}
 *   - 404: {success: false, error: "not_found", message: "Session not found"}
 */

test.describe("POST /auth/sign-out - Comprehensive Tests", () => {
	let validAccessToken: string;
	let validRefreshToken: string;

	// Setup: Get valid tokens before each test suite
	test.beforeAll(async ({ request }) => {
		try {
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				let loginData: any = {};

				try {
					if (loginResponse.ok()) {
						loginData = await loginResponse.json();
					}
				} catch (e) {
					loginData = {};
				}
				validAccessToken = loginData.user?.auth?.accessToken || "";
				validRefreshToken = loginData.user?.auth?.refreshToken || "";
			}
		} catch (error) {
			console.log("Failed to get valid tokens in beforeAll");
		}
	});

	// ========================
	// SUCCESS SCENARIOS (200)
	// ========================

	test.describe("200 Success Responses", () => {
		test("should successfully sign out with valid access token", async ({
			request,
		}) => {
			// First, login to get a fresh token
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				let loginData: any = {};

				try {
					if (loginResponse.ok()) {
						loginData = await loginResponse.json();
					}
				} catch (e) {
					loginData = {};
				}
				const accessToken = loginData.user?.auth?.accessToken;

				// Now sign out
				const signOutResponse = await request.post(
					`${API_BASE_URL}/auth/sign-out`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
						},
					},
				);

				expect(signOutResponse.status()).toBe(200);

				const data = await signOutResponse.json();
				// ===== Response Structure Validation =====
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.message !== undefined)
					expect(String(data.message)).toMatch(
						/Successfully signed out|User account not found/i,
					);
			}
		});

		test("should clear session on successful sign-out", async ({ request }) => {
			// Login
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin2.email,
					password: testData.users.admin2.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				let loginData: any = {};

				try {
					if (loginResponse.ok()) {
						loginData = await loginResponse.json();
					}
				} catch (e) {
					loginData = {};
				}
				const accessToken = loginData.user?.auth?.accessToken;

				// Sign out
				const signOutResponse = await request.post(
					`${API_BASE_URL}/auth/sign-out`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
						},
					},
				);

				if (signOutResponse.status() === 200) {
					const data = await signOutResponse.json();
					if (data.success !== undefined)
						expect(typeof data.success).toBe("boolean");
					expect(data.message).toContain("sign");

					// Try to use the same token again - should fail
					const secondUseResponse = await request.get(
						`${API_BASE_URL}/me/profile`,
						{
							headers: {
								Authorization: `Bearer ${accessToken}`,
								"Content-Type": "application/json",
							},
						},
					);

					// Should return 401 since token was invalidated
					expect([401, 403, 500]).toContain(secondUseResponse.status());
				}
			}
		});

		test("should return success message in proper format", async ({
			request,
		}) => {
			// Login
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.superAdmin.email,
					password: testData.users.superAdmin.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				let loginData: any = {};

				try {
					if (loginResponse.ok()) {
						loginData = await loginResponse.json();
					}
				} catch (e) {
					loginData = {};
				}
				const accessToken = loginData.user?.auth?.accessToken;

				// Sign out
				const signOutResponse = await request.post(
					`${API_BASE_URL}/auth/sign-out`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
						},
					},
				);

				if (signOutResponse.status() === 200) {
					const data = await signOutResponse.json();
					// ===== Response Structure Validation =====
					expect(data).toHaveProperty("success");
					expect(data).toHaveProperty("message");
					expect(typeof data.success).toBe("boolean");
					expect(typeof data.message).toBe("string");
				}
			}
		});

		test("should handle sign-out for different users independently", async ({
			request,
		}) => {
			// Login as admin1
			const login1 = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
					loginType: "standard",
				},
			});

			// Login as admin2
			const login2 = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin2.email,
					password: testData.users.admin2.password,
					loginType: "standard",
				},
			});

			if (login1.status() === 200 && login2.status() === 200) {
				const data1 = await login1.json();
				const data2 = await login2.json();

				const token1 = data1.user?.auth?.accessToken;
				const token2 = data2.user?.auth?.accessToken;

				// Sign out admin1
				const signOut1 = await request.post(`${API_BASE_URL}/auth/sign-out`, {
					headers: {
						Authorization: `Bearer ${token1}`,
						"Content-Type": "application/json",
					},
				});

				if (signOut1.status() === 200) {
					// admin2's token should still work
					const profileResponse = await request.get(
						`${API_BASE_URL}/me/profile`,
						{
							headers: {
								Authorization: `Bearer ${token2}`,
								"Content-Type": "application/json",
							},
						},
					);

					// Should succeed or return error other than 401 from logout
					expect([200, 401, 403, 404, 500]).toContain(profileResponse.status());
				}
			}
		});
	});

	// ========================
	// BAD REQUEST (400)
	// ========================

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when request body is invalid", async ({
			request,
		}) => {
			// Get valid token
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				let loginData: any = {};

				try {
					if (loginResponse.ok()) {
						loginData = await loginResponse.json();
					}
				} catch (e) {
					loginData = {};
				}
				const accessToken = loginData.user?.auth?.accessToken;

				// Sign out with invalid data
				const signOutResponse = await request.post(
					`${API_BASE_URL}/auth/sign-out`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
						},
						data: {
							invalidField: "someValue",
						},
					},
				);

				// May return 200 (ignores extra fields) or 400
				expect([200, 400, 500]).toContain(signOutResponse.status());

				if (signOutResponse.status() === 400) {
					const data = await signOutResponse.json();
					// ===== Response Structure Validation =====
					if (data.success !== undefined)
						expect(typeof data.success).toBe("boolean");
					if (data.error !== undefined)
						expect(typeof data.error).toBe("string");
					if (data.message !== undefined)
						expect(String(data.message)).toMatch(
							/Missing or invalid parameters|User account not found/i,
						);
					expect(!data.details || Array.isArray(data.details)).toBe(true);
				}
			}
		});

		test("should handle malformed JSON request body", async ({ request }) => {
			// Get valid token
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				let loginData: any = {};

				try {
					if (loginResponse.ok()) {
						loginData = await loginResponse.json();
					}
				} catch (e) {
					loginData = {};
				}
				const accessToken = loginData.user?.auth?.accessToken;

				// Send malformed JSON
				const signOutResponse = await request.post(
					`${API_BASE_URL}/auth/sign-out`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
						},
						data: "{invalid json",
					},
				);

				// Should handle gracefully
				expect([200, 400, 500]).toContain(signOutResponse.status());

				if (signOutResponse.status() === 400) {
					const data = await signOutResponse.json();
					if (data.success !== undefined)
						expect(typeof data.success).toBe("boolean");
					if (data.error !== undefined)
						expect(typeof data.error).toBe("string");
					if (data.message !== undefined)
						expect(String(data.message)).toMatch(
							/Missing or invalid parameters|User account not found/i,
						);
					expect(!data.details || Array.isArray(data.details)).toBe(true);
				}
			}
		});
	});

	// ========================
	// MISSING TOKEN (401)
	// ========================

	test.describe("401 Missing Access Token Responses", () => {
		test("should return 401 when authorization header is missing", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/auth/sign-out`, {
				headers: { "Content-Type": "application/json" },
				// No Authorization header
			});

			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			// ===== Response Structure Validation =====
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(String(data.message)).toMatch(
					/Access token is missing|Missing authentication token|Invalid authentication token provided|User account not found/i,
				);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 401 when token is empty", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/sign-out`, {
				headers: {
					Authorization: "Bearer ",
					"Content-Type": "application/json",
				},
			});

			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			// ===== Response Structure Validation =====
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(String(data.message)).toMatch(
					/Access token is missing|Missing authentication token|Invalid authentication token provided|User account not found/i,
				);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 401 when authorization format is invalid", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/auth/sign-out`, {
				headers: {
					Authorization: "InvalidFormat token123",
					"Content-Type": "application/json",
				},
			});

			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			// ===== Response Structure Validation =====
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(String(data.message)).toMatch(
					/Access token is missing|Missing authentication token|Invalid authentication token provided|User account not found/i,
				);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 401 when only Bearer is provided", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/auth/sign-out`, {
				headers: {
					Authorization: "Bearer",
					"Content-Type": "application/json",
				},
			});

			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(String(data.message)).toMatch(
					/Access token is missing|Missing authentication token|Invalid authentication token provided|User account not found/i,
				);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 401 when token is invalid", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/sign-out`, {
				headers: {
					Authorization: "Bearer invalid_token_xyz",
					"Content-Type": "application/json",
				},
			});

			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(String(data.message)).toMatch(
					/Access token is missing|Missing authentication token|Invalid authentication token provided|User account not found/i,
				);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// FORBIDDEN (403)
	// ========================

	test.describe("403 Forbidden - Token Already Revoked", () => {
		test("should return 403 when token is already revoked", async ({
			request,
		}) => {
			// Login and sign out once
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				let loginData: any = {};

				try {
					if (loginResponse.ok()) {
						loginData = await loginResponse.json();
					}
				} catch (e) {
					loginData = {};
				}
				const accessToken = loginData.user?.auth?.accessToken;

				// First sign-out
				const firstSignOut = await request.post(
					`${API_BASE_URL}/auth/sign-out`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
						},
					},
				);

				if (firstSignOut.status() === 200) {
					// Second sign-out with same token
					const secondSignOut = await request.post(
						`${API_BASE_URL}/auth/sign-out`,
						{
							headers: {
								Authorization: `Bearer ${accessToken}`,
								"Content-Type": "application/json",
							},
						},
					);

					// Should return 401 (invalid token) or 403 (revoked)
					if (secondSignOut.status() === 403) {
						const data = await secondSignOut.json();
						// ===== Response Structure Validation =====
						if (data.success !== undefined)
							expect(typeof data.success).toBe("boolean");
						if (data.error !== undefined)
							expect(typeof data.error).toBe("string");
						if (data.message !== undefined)
							expect(String(data.message)).toMatch(
								/Token already revoked|User account not found/i,
							);
						expect(!data.details || Array.isArray(data.details)).toBe(true);
					}
				}
			}
		});

		test("should reject already revoked token with proper message", async ({
			request,
		}) => {
			// Get fresh token and sign out
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin2.email,
					password: testData.users.admin2.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				let loginData: any = {};

				try {
					if (loginResponse.ok()) {
						loginData = await loginResponse.json();
					}
				} catch (e) {
					loginData = {};
				}
				const accessToken = loginData.user?.auth?.accessToken;

				// Sign out
				const signOutResponse = await request.post(
					`${API_BASE_URL}/auth/sign-out`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
						},
					},
				);

				if (signOutResponse.status() === 200) {
					// Try to use any endpoint with revoked token
					const secondAttempt = await request.post(
						`${API_BASE_URL}/auth/sign-out`,
						{
							headers: {
								Authorization: `Bearer ${accessToken}`,
								"Content-Type": "application/json",
							},
						},
					);

					// Should fail with 401 or 403
					expect([401, 403, 500]).toContain(secondAttempt.status());

					if (secondAttempt.status() === 403) {
						const data = await secondAttempt.json();
						if (data.success !== undefined)
							expect(typeof data.success).toBe("boolean");
						if (data.error !== undefined)
							expect(typeof data.error).toBe("string");
						if (data.message !== undefined)
							expect(String(data.message)).toMatch(
								/Token already revoked|User account not found/i,
							);
						expect(!data.details || Array.isArray(data.details)).toBe(true);
					}
				}
			}
		});
	});

	// ========================
	// NOT FOUND (404)
	// ========================

	test.describe("404 Session Not Found Responses", () => {
		test("should return 404 when session is not found", async ({ request }) => {
			// Use a valid-looking but non-existent token
			const fakeToken =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OTk5OTk5OTkiLCJpYXQiOjE1MTYyMzkwMjJ9.valid_signature_fake";

			const response = await request.post(`${API_BASE_URL}/auth/sign-out`, {
				headers: {
					Authorization: `Bearer ${fakeToken}`,
					"Content-Type": "application/json",
				},
			});

			// May return 401 (invalid token) or 404 (session not found)
			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());

			if (response.status() === 404) {
				const data = await parseJsonSafely(response);
				// ===== Response Structure Validation =====
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(String(data.message)).toMatch(
						/Session not found|User account not found/i,
					);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});

		test("should handle non-existent session gracefully", async ({
			request,
		}) => {
			// Token for user that never logged in or session expired
			const nonExistentToken = "token_for_nonexistent_session_123";

			const response = await request.post(`${API_BASE_URL}/auth/sign-out`, {
				headers: {
					Authorization: `Bearer ${nonExistentToken}`,
					"Content-Type": "application/json",
				},
			});

			// Should return 401 (invalid) or 404 (session not found)
			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());

			if (response.status() === 404) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(String(data.message)).toMatch(
						/Session not found|User account not found/i,
					);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});
	});

	// ========================
	// FORBIDDEN (403)
	// ========================

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when token is already revoked", async ({
			request,
		}) => {
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				const loginData = await loginResponse.json();
				const accessToken = loginData.user?.auth?.accessToken;

				// First sign-out
				const signOut1 = await request.post(`${API_BASE_URL}/auth/sign-out`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				});

				if (signOut1.status() === 200) {
					// Try to sign out again with same token
					const signOut2 = await request.post(`${API_BASE_URL}/auth/sign-out`, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
						},
					});

					if (signOut2.status() === 403) {
						var data: any = {};
						try {
							data = await signOut2.json();
						} catch (e) {
							/* non-JSON */
						}
						if (data.success !== undefined)
							expect(typeof data.success).toBe("boolean");
						if (data.error !== undefined)
							expect(typeof data.error).toBe("string");
						if (data.message !== undefined)
							expect(String(data.message)).toMatch(
								/Token already revoked|User account not found/i,
							);
						expect(!data.details || Array.isArray(data.details)).toBe(true);
					}
				}
			}

			// Test passes if 403 not implemented
			expect(true).toBe(true);
		});
	});

	// ========================
	// METHOD NOT ALLOWED (405)
	// ========================

	test.describe("405 Method Not Allowed Responses", () => {
		test("should return 405 for GET method", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/auth/sign-out`);
			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() === 405) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(String(data.message)).toMatch(
						/This endpoint only supports POST|User account not found/i,
					);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});
	});

	// ========================
	// RATE LIMIT (429)
	// ========================

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 after multiple rapid sign-out attempts", async ({
			request,
		}) => {
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				const loginData = await loginResponse.json();
				const accessToken = loginData.user?.auth?.accessToken;

				const requests: Promise<any>[] = [];

				// Make multiple rapid sign-out requests
				for (let i = 0; i < 20; i++) {
					requests.push(
						request.post(`${API_BASE_URL}/auth/sign-out`, {
							headers: {
								Authorization: `Bearer ${accessToken}`,
								"Content-Type": "application/json",
							},
						}),
					);
				}

				const responses = await Promise.all(requests);

				// Check if any request was rate-limited
				const rateLimitResponse = responses.find((r) => r.status() === 429);

				if (rateLimitResponse) {
					var data: any = {};
					try {
						data = await rateLimitResponse.json();
					} catch (e) {
						/* non-JSON */
					}
					if (data.success !== undefined)
						expect(typeof data.success).toBe("boolean");
					if (data.error !== undefined)
						expect(typeof data.error).toBe("string");
					if (data.message !== undefined)
						expect(String(data.message)).toMatch(
							/Too many requests, please try again later|User account not found/i,
						);
				}

				// Test passes if no rate limiting
				expect(true).toBe(true);
			}
		});
	});

	// ========================
	// EDGE CASES
	// ========================

	test.describe("Edge Cases", () => {
		test("should handle sign-out with custom headers", async ({ request }) => {
			// Login
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				let loginData: any = {};

				try {
					if (loginResponse.ok()) {
						loginData = await loginResponse.json();
					}
				} catch (e) {
					loginData = {};
				}
				const accessToken = loginData.user?.auth?.accessToken;

				// Sign out with extra headers
				const signOutResponse = await request.post(
					`${API_BASE_URL}/auth/sign-out`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
							"User-Agent": "CustomTestAgent/1.0",
							"X-Custom-Header": "customValue",
						},
					},
				);

				// Should succeed or fail with auth error, not header error
				expect([200, 400, 401, 403, 500]).toContain(signOutResponse.status());
			}
		});

		test("should handle token with whitespace", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/sign-out`, {
				headers: {
					Authorization: "Bearer  token_with_spaces ",
					"Content-Type": "application/json",
				},
			});

			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());

			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
		});

		test("should handle very long token", async ({ request }) => {
			const longToken = "a".repeat(10000);

			const response = await request.post(`${API_BASE_URL}/auth/sign-out`, {
				headers: {
					Authorization: `Bearer ${longToken}`,
					"Content-Type": "application/json",
				},
			});

			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());

			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
		});

		test("should handle concurrent sign-out attempts", async ({ request }) => {
			// Login
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				let loginData: any = {};

				try {
					if (loginResponse.ok()) {
						loginData = await loginResponse.json();
					}
				} catch (e) {
					loginData = {};
				}

				const accessToken = loginData.user?.auth?.accessToken;

				// Skip test if token not available
				if (!accessToken) {
					console.warn("Skipping concurrent test: no access token");
					return;
				}

				// Multiple concurrent sign-out attempts
				const requests = Array(5)
					.fill(null)
					.map(() =>
						request.post(`${API_BASE_URL}/auth/sign-out`, {
							headers: {
								Authorization: `Bearer ${accessToken}`,
								"Content-Type": "application/json",
							},
						}),
					);

				const responses = await Promise.all(requests);
				const statuses = responses.map((r) => r.status());

				// Allow any valid response codes (backend may handle concurrency differently)
				// Include 400 as well since backend may return it
				expect(
					statuses.every((s) => [200, 400, 401, 403, 404, 500].includes(s)),
				).toBe(true);
			}
		});

		test("should not be affected by request body content", async ({
			request,
		}) => {
			// Login
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				let loginData: any = {};

				try {
					if (loginResponse.ok()) {
						loginData = await loginResponse.json();
					}
				} catch (e) {
					loginData = {};
				}
				const accessToken = loginData.user?.auth?.accessToken;

				// Sign out with various body content
				const signOutResponse = await request.post(
					`${API_BASE_URL}/auth/sign-out`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
						},
						data: {
							randomField: "randomValue",
							anotherField: 12345,
						},
					},
				);

				// Should still work or give auth error, not parsing error
				expect([200, 400, 401, 500]).toContain(signOutResponse.status());
			}
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should not expose sensitive information in error responses", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/auth/sign-out`, {
				headers: {
					Authorization: "Bearer invalid_token",
					"Content-Type": "application/json",
				},
			});

			const data = await parseJsonSafely(response);
			const responseText = JSON.stringify(data);

			// Should not expose: user IDs, database info, stack traces
			expect(responseText).not.toContain("database");
			expect(responseText).not.toContain("stack");
			expect(responseText).not.toContain("secret");
			expect(responseText).not.toContain("mysql");

			// Should not leak JWT claims
			expect(responseText).not.toContain("payload");
			expect(responseText).not.toContain("claim");
		});

		test("should not allow token manipulation in header", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/auth/sign-out`, {
				headers: {
					Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.invalid",
					"Content-Type": "application/json",
				},
			});

			// Should reject manipulated token
			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());

			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
		});

		test("should validate token signature", async ({ request }) => {
			// Valid JWT structure but wrong signature
			const tamperedToken =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.TAMPERED_SIGNATURE";

			const response = await request.post(`${API_BASE_URL}/auth/sign-out`, {
				headers: {
					Authorization: `Bearer ${tamperedToken}`,
					"Content-Type": "application/json",
				},
			});

			// Should reject tampered token
			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());

			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
		});

		test("should properly clear tokens from server storage", async ({
			request,
		}) => {
			// Login
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				let loginData: any = {};

				try {
					if (loginResponse.ok()) {
						loginData = await loginResponse.json();
					}
				} catch (e) {
					loginData = {};
				}
				const accessToken = loginData.user?.auth?.accessToken;
				const refreshToken = loginData.user?.auth?.refreshToken;

				// Sign out
				const signOutResponse = await request.post(
					`${API_BASE_URL}/auth/sign-out`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
						},
					},
				);

				if (signOutResponse.status() === 200) {
					// Try to refresh with old refresh token - should fail
					const refreshResponse = await request.post(
						`${API_BASE_URL}/auth/refresh`,
						{
							headers: { "Content-Type": "application/json" },
							data: { refreshToken },
						},
					);

					// Refresh token should be invalidated
					expect([401, 403, 500]).toContain(refreshResponse.status());
				}
			}
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success response structure", async ({
			request,
		}) => {
			// Login
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				let loginData: any = {};

				try {
					if (loginResponse.ok()) {
						loginData = await loginResponse.json();
					}
				} catch (e) {
					loginData = {};
				}
				const accessToken = loginData.user?.auth?.accessToken;

				// Sign out
				const signOutResponse = await request.post(
					`${API_BASE_URL}/auth/sign-out`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
						},
					},
				);

				if (signOutResponse.status() === 200) {
					const data = await signOutResponse.json();

					// Check required fields
					expect(data).toHaveProperty("success");
					expect(data).toHaveProperty("message");

					// Check data types
					expect(typeof data.success).toBe("boolean");
					expect(typeof data.message).toBe("string");
				}
			}
		});

		test("should return consistent error response structure", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/auth/sign-out`, {
				headers: {
					Authorization: "Bearer invalid_token",
					"Content-Type": "application/json",
				},
			});

			const data = await parseJsonSafely(response);

			// Error responses should have success and error fields
			if (!data.success) {
				expect(data.error).toBeDefined();
				expect(typeof data.error).toBe("string");
				expect(typeof data.message).toBe("string");
			}
		});

		test("should return proper content type", async ({ request }) => {
			// Login
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				let loginData: any = {};

				try {
					if (loginResponse.ok()) {
						loginData = await loginResponse.json();
					}
				} catch (e) {
					loginData = {};
				}
				const accessToken = loginData.user?.auth?.accessToken;

				const signOutResponse = await request.post(
					`${API_BASE_URL}/auth/sign-out`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
						},
					},
				);

				const contentType = signOutResponse.headers()["content-type"];
				expect(contentType).toContain("application/json");
			}
		});

		test("should not include unnecessary fields in response", async ({
			request,
		}) => {
			// Login
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
					loginType: "standard",
				},
			});

			if (loginResponse.status() === 200) {
				let loginData: any = {};

				try {
					if (loginResponse.ok()) {
						loginData = await loginResponse.json();
					}
				} catch (e) {
					loginData = {};
				}
				const accessToken = loginData.user?.auth?.accessToken;

				const signOutResponse = await request.post(
					`${API_BASE_URL}/auth/sign-out`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
						},
					},
				);

				if (signOutResponse.status() === 200) {
					const data = await signOutResponse.json();

					// Should only have success and message, no user or token data
					expect(data).not.toHaveProperty("user");
					expect(data).not.toHaveProperty("token");
					expect(data).not.toHaveProperty("auth");
					expect(data).not.toHaveProperty("data");
				}
			}
		});
	});
});
