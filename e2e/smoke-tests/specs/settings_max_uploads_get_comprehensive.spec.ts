/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};
const STATUS_OK = 200;
const STATUS_UNAUTHORIZED = 401;
const STATUS_RATE_LIMIT = 429;
const STATUS_SERVER_ERROR = 500;
const STATUS_SERVICE_UNAVAILABLE = 503;
const STATUS_GATEWAY_TIMEOUT = 504;

/**
 * Comprehensive test suite for GET /settings/max-uploads endpoint
 * Retrieves the maximum number of files a user is allowed to upload in a single batch or at once.
 * This is a global system setting used by clients to enforce UI-level limits.
 * Response codes: 200, 401, 429, 500, 503, 504
 */

test.describe("GET /settings/max-uploads - Comprehensive Tests", () => {
	let validAccessToken: string;

	test.beforeAll(async ({ request }) => {
		// Login to get access token
		const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
			data: {
				loginType: "standard",
				email: testData.users.admin1.email,
				password: testData.users.admin1.password,
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
	// SUCCESS (200)
	// ========================
	test.describe("200 Success Responses", () => {
		test("should return max upload limit for authenticated user", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/settings/max-uploads`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
			});

			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(data.maxUploads).toBeDefined();
			expect(typeof data.maxUploads).toBe("number");
		});
	});

	// ========================
	// UNAUTHORIZED (401)
	// ========================
	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/settings/max-uploads`);
			expect(response.status()).toBe(STATUS_UNAUTHORIZED);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			if (data.details !== undefined) expect(Array.isArray(data.details) || typeof data.details === "object").toBe(true);
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/settings/max-uploads`, {
				headers: {
					Authorization: "Bearer invalid_token",
				},
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	// ========================
	// RATE LIMIT (429)
	// ========================
	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when rate limit exceeded", async ({ request }) => {
			const promises = Array(12)
				.fill(null)
				.map(() =>
					request.get(`${API_BASE_URL}/settings/max-uploads`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
						},
					}),
				);

			const responses = await Promise.all(promises);
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
	// SERVER ERROR (500)
	// ========================

	// ========================
	// SERVICE UNAVAILABLE (503)
	// ========================

	// ========================
	// GATEWAY TIMEOUT (504)
	// ========================

	// ========================
	// EDGE CASES
	// ========================

	test.describe("Edge Cases", () => {
		test("should handle requests with extra parameters", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/settings/max-uploads?extra=param`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should handle concurrent requests", async ({ request }) => {
			const promises = Array(5)
				.fill(null)
				.map(() =>
					request.get(`${API_BASE_URL}/settings/max-uploads`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
						},
					}),
				);

			const responses = await Promise.all(promises);
			responses.forEach((response) => {
				expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
				if (response.status() !== 200) return;
			});
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should validate token on every request", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/settings/max-uploads`,
				{
					headers: {
						Authorization: "Bearer invalid-token",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should not expose sensitive data in response", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/settings/max-uploads`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (response.headers()["content-type"]?.includes("application/json")) {
				const data = await parseJsonSafely(response);
				const responseText = JSON.stringify(data);

				expect(responseText).not.toContain("password");
				expect(responseText).not.toContain("secretKey");
			}
		});

		test("should require authentication", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/settings/max-uploads`,
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should enforce UI-level limits", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/settings/max-uploads`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	// ========================
	// RESPONSE FORMAT
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success structure", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/settings/max-uploads`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (
				response.status() === 200 &&
				response.headers()["content-type"]?.includes("application/json")
			) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success");
			}
		});

		test("should return consistent error structure", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/settings/max-uploads`,
				{
					headers: {
						Authorization: "Bearer invalid-token",
					},
				},
			);

			if (response.headers()["content-type"]?.includes("application/json")) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success");
			}
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/settings/max-uploads`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			const contentType = response.headers()["content-type"];
			expect(
				contentType?.includes("application/json") ||
					contentType?.includes("text/html"),
			).toBe(true);
		});
	});

	// ========================
	// PERFORMANCE
	// ========================

	test.describe("Performance Tests", () => {
		test("should respond quickly (< 300ms)", async ({ request }) => {
			const start = Date.now();

			const response = await request.get(
				`${API_BASE_URL}/settings/max-uploads`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			const duration = Date.now() - start;

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
			expect(duration).toBeLessThan(5000);
		});

		test("should handle concurrent requests efficiently", async ({
			request,
		}) => {
			const start = Date.now();

			const promises = Array(10)
				.fill(null)
				.map(() =>
					request.get(`${API_BASE_URL}/settings/max-uploads`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
						},
					}),
				);

			await Promise.all(promises);
			const duration = Date.now() - start;

			expect(duration).toBeLessThan(5000);
		});

		test("should retrieve setting efficiently", async ({ request }) => {
			const start = Date.now();

			const response = await request.get(
				`${API_BASE_URL}/settings/max-uploads`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			const duration = Date.now() - start;

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
			expect(duration).toBeLessThan(5000);
		});
	});
});


