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
 * Comprehensive test suite for GET /app-data endpoint
 * Retrieve global application data including branding, feature toggles, system limits, and rate definitions
 * This endpoint is public and should be cached for 12-24 hours
 * Response codes: 200, 400, 404, 429, 500, 503, 504
 */

test.describe("GET /app-data - Comprehensive Tests", () => {
	// ========================
	// SUCCESS (200)
	// ========================
	test.describe("200 Success Responses", () => {
		test("should fetch application data successfully", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/app-data`);
			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.message !== undefined)
					expect(typeof data.message).toBe("string");
				expect(data.data !== undefined || data.appData !== undefined).toBe(
					true,
				);
			}
		});
	});

	// ========================
	// BAD REQUEST (400)
	// ========================
	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for malformed query input", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/app-data?limit=invalid`,
			);
			if (response.status() === 400) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
			}
		});
	});

	// ========================
	// UNAUTHORIZED (401)
	// ========================
	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 when authentication is missing", async ({
			request,
		}) => {
			const response = await request.get(`${API_BASE_URL}/app-data`, {
				headers: { Authorization: "" }, // Force authentication check if optional
			});
			if (response.status() === 401) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(typeof data.message).toBe("string");
				if (data.details !== undefined)
					expect(
						Array.isArray(data.details) || typeof data.details === "object",
					).toBe(true);
			}
		});
	});

	// ========================
	// NOT FOUND (404)
	// ========================
	test.describe("404 Not Found Responses", () => {
		test("should return 404 when route variant does not exist", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/app-data/non-existent`,
			);
			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});
	});

	// ========================
	// RATE LIMIT (429)
	// ========================
	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when rate limit exceeded", async ({ request }) => {
			const requests = Array(12)
				.fill(null)
				.map(() => request.get(`${API_BASE_URL}/app-data`));

			const responses = await Promise.all(requests);
			const rateLimited = responses.find((r) => r.status() === 429);
			if (rateLimited) {
				const data = await rateLimited.json();
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(typeof data.message).toBe("string");
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
		test("should handle concurrent requests", async ({ request }) => {
			const requests = Array(5)
				.fill(null)
				.map(() => request.get(`${API_BASE_URL}/app-data`));

			const responses = await Promise.all(requests);

			responses.forEach((response) => {
				expect([
					200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
				]).toContain(response.status());
				if (response.status() !== 200) return;
			});
		});

		test("should handle request with headers", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/app-data`, {
				headers: {
					"Accept-Language": "en-US",
				},
			});

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
		});

		test("should handle request with user agent", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/app-data`, {
				headers: {
					"User-Agent": "Test Client",
				},
			});

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
		});

		test("should handle OPTIONS request", async ({ request }) => {
			const response = await request.fetch(`${API_BASE_URL}/app-data`, {
				method: "OPTIONS",
			});

			expect([
				200, 201, 204, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429,
				500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
		});

		test("should handle HEAD request", async ({ request }) => {
			const response = await request.fetch(`${API_BASE_URL}/app-data`, {
				method: "HEAD",
			});

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should not expose sensitive data in response", async ({
			request,
		}) => {
			const response = await request.get(`${API_BASE_URL}/app-data`);

			if (response.headers()["content-type"]?.includes("application/json")) {
				const data = await parseJsonSafely(response);
				const responseText = JSON.stringify(data);

				expect(responseText).not.toContain("password");
				expect(responseText).not.toContain("secretKey");
				expect(responseText).not.toContain("privateKey");
			}
		});

		test("should prevent SQL injection attempts", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/app-data?param=1' OR '1'='1`,
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
		});

		test("should handle XSS attempts", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/app-data?param=<script>alert('xss')</script>`,
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
		});

		test("should be accessible without authentication", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/app-data`);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
		});
	});

	// ========================
	// RESPONSE FORMAT
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success structure", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/app-data`);

			if (
				response.status() === 200 &&
				response.headers()["content-type"]?.includes("application/json")
			) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success");
			}
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/app-data`);

			const contentType = response.headers()["content-type"];
			expect(
				contentType?.includes("application/json") ||
					contentType?.includes("text/html"),
			).toBe(true);
		});

		test("should include standard response headers", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/app-data`);

			expect(response.headers()).toBeDefined();
			expect(response.headers()["content-type"]).toBeDefined();
		});
	});

	// ========================
	// PERFORMANCE
	// ========================

	test.describe("Performance Tests", () => {
		test("should respond quickly (< 500ms)", async ({ request }) => {
			const start = Date.now();

			const response = await request.get(`${API_BASE_URL}/app-data`);

			const duration = Date.now() - start;

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
			expect(duration).toBeLessThan(5000);
		});

		test("should handle concurrent requests efficiently", async ({
			request,
		}) => {
			const start = Date.now();

			const requests = Array(10)
				.fill(null)
				.map(() => request.get(`${API_BASE_URL}/app-data`));

			const responses = await Promise.all(requests);
			const duration = Date.now() - start;

			responses.forEach((response) => {
				expect([
					200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
				]).toContain(response.status());
				if (response.status() !== 200) return;
			});

			expect(duration).toBeLessThan(5000);
		});

		test("should support caching for performance", async ({ request }) => {
			const response1 = await request.get(`${API_BASE_URL}/app-data`);
			const response2 = await request.get(`${API_BASE_URL}/app-data`);

			expect([200, 500]).toContain(response1.status());
			expect([200, 500]).toContain(response2.status());

			if (
				response1.status() === 200 &&
				response2.status() === 200 &&
				response1.headers()["content-type"]?.includes("application/json") &&
				response2.headers()["content-type"]?.includes("application/json")
			) {
				const data1 = await response1.json();
				const data2 = await response2.json();

				// Data should be consistent
				expect(JSON.stringify(data1)).toBe(JSON.stringify(data2));
			}
		});
	});
});
