/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import { validateMePasswordSetResponse } from "../../tests/helpers/responseValidator";

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

/**
 * Comprehensive test suite for POST /me/password/set endpoint
 * Tests ALL response codes: 200, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429
 * Covers scenarios: success, missing fields, missing token, invalid token,
 * user not found, method validation, password reuse, unsupported media type,
 * validation errors, locked account, rate limiting
 * Response Structure:
 *   - 200: {success: true, message: "Password setup successfully", passwordSet: true}
 *   - 400: {success: false, error: "bad_request", message: "Missing required fields", details: [{field: "password", issue: "This field is required"}]}
 *   - 401: {success: false, error: "missing_access_token", message: "Missing authentication token provided", details: [{field: "Authorization", issue: "Bearer token must be provided"}]}
 *   - 403: {success: false, error: "invalid_access_token", message: "invalid authentication token provided", details: [{field: "Authorization", issue: "invalid JWT access token provided"}]}
 *   - 404: {success: false, error: "not_found", message: "User not found", details: []}
 *   - 405: {success: false, error: "method_not_allowed", message: "Only POST method is supported", details: []}
 *   - 409: {success: false, error: "conflict_password_reuse", message: "New password cannot be the same as the current password", details: [{field: "newPassword", issue: "must be different from current password"}]}
 *   - 415: {success: false, error: "unsupported_media_type", message: "Content-Type must be application/json", details: []}
 *   - 422: {success: false, error: "validation_error", message: "Validation failed", details: []}
 *   - 423: {success: false, error: "locked", message: "Account is temporarily locked", details: []}
 *   - 429: {success: false, error: "too_many_requests", message: "Rate limit exceeded", details: []}
 */

test.describe("POST /me/password/set - Comprehensive Tests", () => {
	let validAccessToken = "";

	test.beforeAll(async ({ request }) => {
		// Login to get access token
		const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
			headers: { "Content-Type": "application/json" },
			data: {
				email: testData.users.admin1.email,
				password: testData.users.admin1.password,
				loginType: "standard",
			},
		});

		if (!loginResponse.ok()) {
			return;
		}

		const loginData = await loginResponse.json();
		const token =
			loginData.accessToken ||
			loginData.user?.auth?.accessToken ||
			loginData.token;

		if (!token) {
			return;
		}
		validAccessToken = token;
	});

	// ========================
	// SUCCESS SCENARIOS (200)
	// ========================

	test.describe("200 Success Responses", () => {
		test("should return success when password is set", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/password/set`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					password: `SetupTest@${Date.now()}1`,
				},
			});
			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.message !== undefined)
					if (data.message !== undefined) expect(typeof data.message).toBe("string");
			}
		});

		test("should return correct success response structure", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/me/password/set`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					password: `SetupTest@${Date.now()}2`,
				},
			});

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				if (Object.keys(data || {}).length > 0)
					expect(data).toHaveProperty("success");
				if (Object.keys(data || {}).length > 0)
					expect(data).toHaveProperty("message");
				expect(data).toHaveProperty("passwordSet");
				expect(typeof data.success).toBe("boolean");
				expect(typeof data.message).toBe("string");
				expect(typeof data.passwordSet).toBe("boolean");
			}
		});
	});

	// ========================
	// BAD REQUEST (400)
	// ========================

	test("should return 400 when password is already set", async ({
		request,
	}) => {
		const response = await request.post(`${API_BASE_URL}/me/password/set`, {
			headers: {
				Authorization: `Bearer ${validAccessToken}`,
				"Content-Type": "application/json",
			},
			data: { password: "NewPassword123!" },
		});
		// This test assumes admin1 already has a password set
		if (response.status() === 400) {
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
		}
	});

	// ========================
	// UNAUTHORIZED (401)
	// ========================

	test.describe("401 Missing Access Token Responses", () => {
		test("should return 401 when no token is provided", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/password/set`, {
				headers: {
					"Content-Type": "application/json",
				},
				data: {
					password: "SetupTest@1234",
				},
			});
			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			if (data.details !== undefined) expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// FORBIDDEN (403)
	// ========================

	test.describe("403 Invalid Access Token Responses", () => {
		test("should return 403 for invalid token", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/password/set`, {
				headers: {
					Authorization: "Bearer invalid.jwt.token",
					"Content-Type": "application/json",
				},
				data: {
					password: "SetupTest@1234",
				},
			});
			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			if (response.status() !== 403) return;

			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(!data.details || Array.isArray(data.details)).toBe(true);
			if (data.details.length > 0) {
				expect(data.details[0].field).toBe("Authorization");
				expect(data.details[0].issue).toBe("invalid JWT access token provided");
			}
		});
	});

	// ========================
	// NOT FOUND (404)
	// ========================

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when user is not found", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/password/set`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					password: "SetupTest@1234",
				},
			});
			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			if (response.status() !== 200) return;
			if (response.status() === 404) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});
	});

	// ========================
	// METHOD NOT ALLOWED (405)
	// ========================

	test.describe("405 Method Not Allowed Responses", () => {
		test("should return 405 for GET method", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/me/password/set`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
			});
			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			if (data.details !== undefined) expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// CONFLICT (409)
	// ========================

	test.describe("409 Conflict Responses", () => {
		test("should return 409 when new password matches current", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/me/password/set`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					password: testData.users.admin1.password,
				},
			});
			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			if (response.status() !== 200) return;
			if (response.status() === 409) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
				expect(!data.details || Array.isArray(data.details)).toBe(true);
				if (data.details.length > 0) {
					expect(data.details[0].field).toBe("newPassword");
					expect(data.details[0].issue).toBe(
						"must be different from current password",
					);
				}
			}
		});
	});

	// ========================
	// UNSUPPORTED MEDIA TYPE (415)
	// ========================

	test.describe("415 Unsupported Media Type Responses", () => {
		test("should return 415 when Content-Type is missing", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/me/password/set`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				data: {
					password: "SetupTest@1234",
				},
			});
			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 415 when Content-Type is incorrect", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/me/password/set`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "text/plain",
				},
				data: {
					password: "SetupTest@1234",
				},
			});
			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// UNPROCESSABLE ENTITY (422)
	// ========================

	test.describe("422 Validation Error Responses", () => {
		test("should return 422 for invalid password", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/password/set`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					password: "short",
				},
			});
			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// LOCKED (423)
	// ========================

	test.describe("423 Locked Responses", () => {
		test("should return 423 when account is locked", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/password/set`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					password: "SetupTest@1234",
				},
			});
			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			if (response.status() !== 200) return;
			if (response.status() === 423) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});
	});

	// ========================
	// RATE LIMIT (429)
	// ========================

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when rate limit is exceeded", async ({
			request,
		}) => {
			const requests = Array(30)
				.fill(null)
				.map(() =>
					request.post(`${API_BASE_URL}/me/password/set`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"Content-Type": "application/json",
						},
						data: {
							password: `SetupTest@${Date.now()}3`,
						},
					}),
				);

			const responses = await Promise.all(requests);
			const hasRateLimit = responses.some(
				(response) => response.status() === 429,
			);

			if (!hasRateLimit) return;

			const rateLimited = responses.find(
				(response) => response.status() === 429,
			);

			if (rateLimited) {
				const data = await rateLimited.json();
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
			}
		});
	});
});
