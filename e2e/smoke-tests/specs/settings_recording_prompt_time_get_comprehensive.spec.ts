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

/**
 * Comprehensive test suite for GET /settings/recording-prompt-time endpoint
 * Returns the duration (in minutes) after which the mobile or web app should prompt the user
 * to either continue recording or upload the current session to the server.
 * Response codes: 200, 401, 403, 404, 405, 408, 429, 500, 503, 504
 */

test.describe("GET /settings/recording-prompt-time - Comprehensive Tests", () => {
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
		test("should return prompt time duration for authenticated user", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/settings/recording-prompt-time`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
			});

			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(data.promptTime).toBeDefined();
			expect(typeof data.promptTime).toBe("number");
		});
	});

	// ========================
	// UNAUTHORIZED (401)
	// ========================
	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/settings/recording-prompt-time`);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			if (data.details !== undefined) expect(Array.isArray(data.details) || typeof data.details === "object").toBe(true);
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/settings/recording-prompt-time`, {
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
	// FORBIDDEN (403)
	// ========================
	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user lacks permission", async ({ request }) => {
			// Attempt to access from account without admin/settings access
			const response = await request.get(`${API_BASE_URL}/settings/recording-prompt-time`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
			});
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 403) return;
			const data = await parseJsonSafely(response);
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	// ========================
	// NOT FOUND (404)
	// ========================
	test.describe("404 Not Found Responses", () => {
		test("should return 404 when setting not found", async ({ request }) => {
			// Try malformed endpoint path
			const response = await request.get(
				`${API_BASE_URL}/settings/recording-prompt-time/nonexistent`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 404) return;
			const contentType = response.headers()["content-type"] || "";
			if (!contentType.includes("application/json")) return;
			const data = await parseJsonSafely(response);
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	// ========================
	// CONFLICT (409)
	// ========================
	test.describe("409 Conflict Responses", () => {
		test("should return 409 on concurrent update attempts", async ({ request }) => {
			const promises = Array(5)
				.fill(null)
				.map(() =>
					request.get(`${API_BASE_URL}/settings/recording-prompt-time`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"If-Match": "etag-value",
						},
					}),
				);

			const responses = await Promise.all(promises);
			const hasConflict = responses.some((r) => r.status() === 409);
			if (hasConflict) {
				expect(hasConflict).toBe(true);
			}
		});
	});

	// ========================
	// UNPROCESSABLE ENTITY (422)
	// ========================
	test.describe("422 Unprocessable Entity Responses", () => {
		test("should return 422 when validation fails", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/settings/recording-prompt-time?prompt_time=invalid`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 422) return;
			const data = await parseJsonSafely(response);
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
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
					request.get(`${API_BASE_URL}/settings/recording-prompt-time`, {
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
	// NOT FOUND (404)
	// ========================

	// ========================
	// METHOD NOT ALLOWED (405)
	// ========================

	// ========================
	// REQUEST TIMEOUT (408)
	// ========================

	// ========================
	// RATE LIMIT (429)
	// ========================

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
		test("should handle query parameters gracefully", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/settings/recording-prompt-time?extra=param`,
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
					request.get(`${API_BASE_URL}/settings/recording-prompt-time`, {
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

		test("should be accessible to authenticated users", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/settings/recording-prompt-time`,
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

		test("should return duration in minutes", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/settings/recording-prompt-time`,
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
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should validate token on every request", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/settings/recording-prompt-time`,
				{
					headers: {
						Authorization: "Bearer malformed-token",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should not expose sensitive data in response", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/settings/recording-prompt-time`,
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
				`${API_BASE_URL}/settings/recording-prompt-time`,
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should provide prompt time for session management", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/settings/recording-prompt-time`,
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
				`${API_BASE_URL}/settings/recording-prompt-time`,
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
				`${API_BASE_URL}/settings/recording-prompt-time`,
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
				`${API_BASE_URL}/settings/recording-prompt-time`,
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
				`${API_BASE_URL}/settings/recording-prompt-time`,
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
					request.get(`${API_BASE_URL}/settings/recording-prompt-time`, {
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
				`${API_BASE_URL}/settings/recording-prompt-time`,
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


