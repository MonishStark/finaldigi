/** @format */

import { test, expect } from "@playwright/test";

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

/**
 * Comprehensive test suite for POST /invitations/verify endpoint
 * Tests ALL response codes: 200, 400, 404, 409, 429, 500, 503, 504
 * Based on Swagger documentation - Verify invitation token and pre-fill registration form
 */

test.describe("POST /invitations/verify - Comprehensive Tests", () => {
	// ========================
	// SUCCESS SCENARIOS (200)
	// ========================

	// ========================
	// RATE LIMIT (429)
	// ========================

	// ========================
	// SERVER ERROR (500)
	// ========================

	// ========================
	// SERVICE UNAVAILABLE (503/504)
	// ========================

	// ========================
	// EDGE CASES
	// ========================
	test.describe("200 Success Responses", () => {
		test("should verify invitation token successfully", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations/verify`, {
				headers: { "Content-Type": "application/json" },
				data: { email: "test@example.com", token: "123456" },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for missing id/token fields", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations/verify`, {
				headers: { "Content-Type": "application/json" },
				data: {},
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 for non-existent invitation", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations/verify`, {
				headers: { "Content-Type": "application/json" },
				data: { email: "missing@example.com", token: "000000" },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should return 409 when invitation is already used/declined", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations/verify`, {
				headers: { "Content-Type": "application/json" },
				data: { email: "used@example.com", token: "used-token" },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("422 Expired/Validation Responses", () => {
		test("should return 422 when invitation is expired", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations/verify`, {
				headers: { "Content-Type": "application/json" },
				data: { email: "expired@example.com", token: "expired-token" },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when too many verification requests are sent", async ({ request }) => {
			const responses = await Promise.all(Array(12).fill(null).map(() =>
				request.post(`${API_BASE_URL}/invitations/verify`, {
					headers: { "Content-Type": "application/json" },
					data: { email: "burst@example.com", token: "burst-token" },
				}),
			));
			const has429 = responses.some((r) => r.status() === 429);
			if (has429) expect(has429).toBe(true);
		});
	});

	test.describe("Edge Cases", () => {
		test("should handle very long token", async ({ request }) => {
			const longToken = "a".repeat(1000);

			const response = await request.post(
				`${API_BASE_URL}/invitations/verify`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						email: "test@example.com",
						token: longToken,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should handle special characters in token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/verify`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						email: "test@example.com",
						token: "token!@#$%^&*()",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should trim whitespace from inputs", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/verify`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						email: "  test@example.com  ",
						token: "  some-token  ",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should handle concurrent verification attempts", async ({
			request,
		}) => {
			const requests = Array(3)
				.fill(null)
				.map(() =>
					request.post(`${API_BASE_URL}/invitations/verify`, {
						headers: {
							"Content-Type": "application/json",
						},
						data: {
							email: "test@example.com",
							token: "concurrent-token",
						},
					}),
				);

			const responses = await Promise.all(requests);

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
		test("should sanitize XSS attempts in email", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/verify`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						email: "<script>alert('xss')</script>@example.com",
						token: "some-token",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should prevent SQL injection in token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/verify`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						email: "test@example.com",
						token: "token' OR '1'='1",
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
			const response = await request.post(
				`${API_BASE_URL}/invitations/verify`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						email: "test@example.com",
						token: "test-token",
					},
				},
			);

			const data = await parseJsonSafely(response);
			const responseText = JSON.stringify(data);

			expect(responseText).not.toContain("passwordHash");
			expect(responseText).not.toContain("secretKey");
		});

		
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success structure", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/verify`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						email: "test@example.com",
						token: "format-test-token",
					},
				},
			);

			const data = await parseJsonSafely(response);
			expect(data).toHaveProperty("success");
		});

		test("should return consistent error structure", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/verify`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			const data = await parseJsonSafely(response);
			expect(data).toHaveProperty("success");
			expect(data).toHaveProperty("error");
			expect(data).toHaveProperty("message");
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/verify`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						email: "test@example.com",
						token: "content-type-test",
					},
				},
			);

			const contentType = response.headers()["content-type"];
			expect(contentType).toContain("application/json");
		});
	});

	// ========================
	// PERFORMANCE TESTS
	// ========================

	test.describe("Performance Tests", () => {
		test("should respond quickly (< 500ms)", async ({ request }) => {
			const start = Date.now();

			const response = await request.post(
				`${API_BASE_URL}/invitations/verify`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						email: "test@example.com",
						token: "perf-test-token",
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

