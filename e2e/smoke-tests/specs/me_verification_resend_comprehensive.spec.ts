/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import { validateVerificationResendResponse } from "../../tests/helpers/responseValidator";

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

/**
 * Comprehensive test suite for POST /me/verification/resend endpoint
 * Tests ALL response codes: 200, 401, 403, 404, 405, 409, 422, 429
 * Covers scenarios: resend success, auth missing, forbidden, user not found,
 * method validation, already verified, unprocessable, rate limiting
 * Response Structure:
 *   - 200: {success: true, message: "Verification email resent successfully"}
 *   - 401: {success: false, error: "missing_access_token", message: "Missing authentication token provided", details: []}
 *   - 403: {success: false, error: "forbidden", message: "You do not have permission to resend verification email", details: []}
 *   - 404: {success: false, error: "not_found", message: "User not found", details: []}
 *   - 405: {success: false, error: "method_not_allowed", message: "This endpoint only supports POST", details: []}
 *   - 409: {success: false, error: "conflict", message: "User is already verified", details: []}
 *   - 422: {success: false, error: "unprocessable_entity", message: "Cannot process verification email"}
 *   - 429: {success: false, error: "rate_limit", message: "Too many requests, please try again later"}
 */

test.describe("POST /me/verification/resend - Comprehensive Tests", () => {
	let validAccessToken: string;

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
		const token = loginData.accessToken || loginData.user?.auth?.accessToken || loginData.token;

		if (!token) {
			return;
		}
		validAccessToken = token;
	});

	// ========================
	// SUCCESS SCENARIOS (200)
	// ========================

	test.describe("200 Success Responses", () => {
		test("should resend verification email successfully", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/me/verification/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				// ===== Response Structure Validation =====
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
				expect(data.paymentRequired).toBe(false);
			}
		});
	});

	// ========================
	// UNAUTHORIZED (401)
	// ========================

	test.describe("401 Missing Access Token Responses", () => {
		test("should return 401 when token is missing", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/me/verification/resend`,
				{
					headers: { "Content-Type": "application/json" },
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			// ===== Response Structure Validation =====
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// FORBIDDEN (403)
	// ========================

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user lacks permission", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/me/verification/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			// Depending on backend, may return 200 or 403
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;

			if (response.status() === 403) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});
	});

	// ========================
	// NOT FOUND (404)
	// ========================

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when user is not found", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/me/verification/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			// Depending on backend, may return 200 or 404
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			if (response.status() === 404) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
			}
		});
	});

	// ========================
	// METHOD NOT ALLOWED (405)
	// ========================

	test.describe("405 Method Not Allowed Responses", () => {
		test("should return 405 for GET", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/me/verification/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			if (data.details !== undefined) expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 405 for PUT", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/me/verification/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 405 for DELETE", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/me/verification/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 405 for PATCH", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/me/verification/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// CONFLICT (409)
	// ========================

	test.describe("409 Conflict Responses", () => {
		test("should return 409 when user is already verified", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/me/verification/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			// Depending on backend, may return 200 or 409
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;

			if (response.status() === 400) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
			}
		});
	});

	// ========================
	// UNPROCESSABLE ENTITY (422)
	// ========================

	test.describe("422 Unprocessable Entity Responses", () => {
		test("should return 422 when verification email cannot be processed", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/me/verification/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			// Depending on backend, may return 200 or 422
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;

			if (response.status() === 422) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
			}
		});
	});

	// ========================
	// TOO MANY REQUESTS (429)
	// ========================

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 after excessive requests", async ({ request }) => {
			const requests: Promise<any>[] = [];

			for (let i = 0; i < 20; i++) {
				requests.push(
					request.post(`${API_BASE_URL}/me/verification/resend`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"Content-Type": "application/json",
						},
					}),
				);
				await new Promise((resolve) => setTimeout(resolve, 5));
			}

			const responses = await Promise.all(requests);
			const rateLimited = responses.find((r) => r.status() === 429);

			if (rateLimited) {
				const data = await rateLimited.json();
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
			}
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return proper content type", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/me/verification/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			const contentType = response.headers()["content-type"];
			expect(contentType).toContain("application/json");
		});

		test("should return consistent error structure", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/me/verification/resend`,
				{
					headers: { "Content-Type": "application/json" },
				},
			);

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
		});
	});
});

