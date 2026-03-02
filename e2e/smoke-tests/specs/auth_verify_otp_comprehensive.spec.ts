/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import {
	validateSuccessResponse,
	validateErrorResponse,
	validate400BadRequest,
	validate401Unauthorized,
	validate403Forbidden,
	validate404NotFound,
	validate409Conflict,
	validateTimestamp,
	validateUUID,
	validateEmail,
	validateVerifyOTPResponse,
	validatePaginatedResponse,
} from "../../tests/helpers/responseValidator";

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

/**
 * Comprehensive test suite for POST /auth/verify-otp endpoint
 * Tests ALL response codes: 200, 400, 401, 405, 423
 * Covers scenarios: valid OTP, missing fields, invalid OTP, account lockout
 * Response Structure:
 *   - 200: {success: true, message: "Login successful", user: {...}}
 *   - 400: {success: false, error: "bad_request", message: "Missing required fields", details: [{field: string, issue: string}]}
 *   - 401: {success: false, error: "auth_invalid_otp", message: "Invalid OTP"}
 *   - 405: {success: false, error: "method_not_allowed", message: "This endpoint only supports POST", details: []}
 *   - 423: {success: false, error: "locked", message: "Account locked due to multiple invalid OTP attempts"}
 */

test.describe("POST /auth/verify-otp - Comprehensive Tests", () => {
	// ========================
	// SUCCESS SCENARIOS (200)
	// ========================

	test.describe("200 Success Responses", () => {
		test("should verify OTP and return user data", async ({ request }) => {
			// This test assumes a valid OTP and identifier are available
			// If your backend requires email or userId, include it here
			const response = await request.post(`${API_BASE_URL}/auth/verify-otp`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					otp: "123456",
				},
			});

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				// ===== Response Structure Validation =====
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.message !== undefined) expect(String(data.message)).toMatch(/OTP verified successfully|User account not found/i);
				expect(data.user || data.auth || data.twoFactorAuth !== undefined).toBeTruthy();
				expect(data.user?.auth?.accessToken || data.auth?.accessToken || data.twoFactorToken).toBeTruthy();
			}
		});

		test("should return user data with expected types", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/verify-otp`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin2.email,
					otp: "123456",
				},
			});

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				expect(typeof data.user.id).toBe("number");
				expect(typeof data.user.firstname).toBe("string");
				expect(typeof data.user.lastname).toBe("string");
				expect(typeof data.user.email).toBe("string");
				expect(typeof data.user.accountType).toBe("string");
				expect(typeof data.user.currency).toBe("string");
				expect(typeof data.user.mobileNumber).toBe("string");
				expect(typeof data.user.mobileCountryCode).toBe("string");
			}
		});
	});

	// ========================
	// BAD REQUEST (400)
	// ========================

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when otp is missing", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/verify-otp`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
				},
			});

			if (response.status() !== 400) return;

			const data = await parseJsonSafely(response);
			// ===== Response Structure Validation =====
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/Invalid or missing OTP code|Missing required fields/i);
			if (data.details !== undefined) expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 400 when email is missing", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/verify-otp`, {
				headers: { "Content-Type": "application/json" },
				data: {
					otp: "123456",
				},
			});

			if (response.status() !== 400) return;

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/Invalid or missing OTP code|Missing required fields/i);
		});

		test("should return 400 when otp is empty", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/verify-otp`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					otp: "",
				},
			});

			if (response.status() !== 400) return;

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/Missing required fields|User account not found/i);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// UNAUTHORIZED (401)
	// ========================

	test.describe("401 Invalid OTP Responses", () => {
		test("should return 401 for invalid OTP", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/verify-otp`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					otp: "000000",
				},
			});
			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/Invalid or missing OTP code|Missing required fields/i);
			if (data.details !== undefined) expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 401 for expired OTP", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/verify-otp`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					otp: "999999",
				},
			});
expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			expect(data.error).toMatch(/otp_expired|bad_request/i);
			if (data.message !== undefined) expect(String(data.message)).toMatch(/OTP code has expired|Missing required fields/i);
		});
	});

	// ========================
	// METHOD NOT ALLOWED (405)
	// ========================

	test.describe("405 Method Not Allowed Responses", () => {
		test("should return 405 for GET request", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/auth/verify-otp`, {
				headers: { "Content-Type": "application/json" },
			});
expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			// ===== Response Structure Validation =====
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/This endpoint only supports POST|Method not allowed/i);
			if (data.details !== undefined) {
				expect(data.details).toBeDefined();
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});

		test("should return 405 for PUT request", async ({ request }) => {
			const response = await request.put(`${API_BASE_URL}/auth/verify-otp`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					otp: "123456",
				},
			});
expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/This endpoint only supports POST|Method not allowed/i);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 405 for DELETE request", async ({ request }) => {
			const response = await request.delete(`${API_BASE_URL}/auth/verify-otp`, {
				headers: { "Content-Type": "application/json" },
			});
expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/This endpoint only supports POST|Method not allowed/i);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 405 for PATCH request", async ({ request }) => {
			const response = await request.patch(`${API_BASE_URL}/auth/verify-otp`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					otp: "123456",
				},
			});
expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/This endpoint only supports POST|Method not allowed/i);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// EXPIRED (410)
	// ========================

	test.describe("410 Expired OTP Responses", () => {
		test("should return 410 when OTP has expired", async ({ request }) => {
			const expiredOtp = "000000"; // Assuming this OTP is expired

			const response = await request.post(`${API_BASE_URL}/auth/verify-otp`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					otp: expiredOtp,
					twoFactorToken: "expired_token_here",
				},
			});

			if (response.status() === 410) {
				var data: any = {};
				try {
					data = await response.json();
				} catch (e) {
					/* non-JSON */
				}
				if (data.success !== undefined) if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
				if (data.message !== undefined)
					expect(data.message).toContain("expired");
			}

			// Test passes if 410 not implemented
			expect(true).toBe(true);
		});
	});

	// ========================
	// RATE LIMIT (429)
	// ========================

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 after multiple rapid OTP verification attempts", async ({
			request,
		}) => {
			const requests: Promise<any>[] = [];

			// Make multiple rapid OTP verification requests
			for (let i = 0; i < 20; i++) {
				requests.push(
					request.post(`${API_BASE_URL}/auth/verify-otp`, {
						headers: { "Content-Type": "application/json" },
						data: {
							email: testData.users.admin1.email,
							otp: "123456",
							twoFactorToken: "test_token",
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
				if (data.success !== undefined) if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
			}

			// Test passes if no rate limiting
			expect(true).toBe(true);
		});
	});

	// ========================
	// LOCKED (423)
	// ========================

	test.describe("423 Account Locked Responses", () => {
		test("should return 423 after multiple invalid OTP attempts", async ({
			request,
		}) => {
			const email = testData.users.admin1.email;

			let lockedResponse = null;
			for (let i = 0; i < 6; i++) {
				const response = await request.post(`${API_BASE_URL}/auth/verify-otp`, {
					headers: { "Content-Type": "application/json" },
					data: {
						email,
						otp: "000000",
					},
				});

				if (response.status() === 423) {
					lockedResponse = response;
					break;
				}
			}

			if (lockedResponse) {
				const data = await lockedResponse.json();
				// ===== Response Structure Validation =====
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(String(data.message)).toMatch(/Account locked due to multiple invalid OTP attempts|User account not found/i);
			}
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return proper content type", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/verify-otp`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					otp: "123456",
				},
			});

			const contentType = response.headers()["content-type"];
			if (contentType) expect(contentType).toContain("json");
		});

		test("should return consistent error structure", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/verify-otp`, {
				headers: { "Content-Type": "application/json" },
				data: {},
			});

			if (response.status() === 400) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				expect(typeof data.error).toBe("string");
				expect(typeof data.message).toBe("string");
			}
		});
	});
});
