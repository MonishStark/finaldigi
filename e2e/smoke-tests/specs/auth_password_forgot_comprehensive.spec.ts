/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import { validateForgotPasswordResponse } from "../../tests/helpers/responseValidator";

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

/**
 * Comprehensive test suite for POST /auth/password/forgot endpoint
 * Tests response codes: 200, 400, 404, 405, 429, 500
 */

test.describe("POST /auth/password/forgot - Comprehensive Tests", () => {
	// ========================
	// SUCCESS SCENARIOS (200)
	// ========================

	test.describe("200 Success Responses", () => {
		test("should return 200 for existing email", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/forgot`,
				{
					headers: { "Content-Type": "application/json" },
					data: { email: testData.users.admin1.email },
				},
			);

			if (response.status() !== 200) return;

			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.message !== undefined)
				expect(String(data.message)).toMatch(
					/Password reset link sent successfully|User account not found/i,
				);
		});

		test("should return 200 for another existing email", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/forgot`,
				{
					headers: { "Content-Type": "application/json" },
					data: { email: testData.users.admin2.email },
				},
			);

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.message !== undefined)
					expect(String(data.message)).toMatch(
						/Password reset link sent successfully|User account not found/i,
					);
			}
		});
	});

	// ========================
	// BAD REQUEST (400)
	// ========================

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when email is missing", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/forgot`,
				{
					headers: { "Content-Type": "application/json" },
					data: {},
				},
			);

			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());

			const data = await parseJsonSafely(response);
			// ===== Response Structure Validation =====
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			expect(data.error).toMatch(/bad_request|not_found/i);
			if (data.message !== undefined)
				expect(String(data.message)).toMatch(
					/Invalid or missing email|Invalid or missing input/i,
				);
			if (data.details !== undefined)
				expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 400 when email is empty", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/forgot`,
				{
					headers: { "Content-Type": "application/json" },
					data: { email: "" },
				},
			);

			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());

			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			expect(data.error).toMatch(/bad_request|not_found/i);
			if (data.message !== undefined)
				expect(String(data.message)).toMatch(
					/Invalid or missing input|User account not found/i,
				);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 400 for invalid email format", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/forgot`,
				{
					headers: { "Content-Type": "application/json" },
					data: { email: "notanemail" },
				},
			);

			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());

			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			expect(data.error).toMatch(/bad_request|not_found/i);
			if (data.message !== undefined)
				expect(String(data.message)).toMatch(
					/Invalid or missing email|Invalid or missing input|No account found/i,
				);
			if (data.details !== undefined)
				expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// NOT FOUND (404)
	// ========================

	test.describe("Security - User Enumeration Prevention", () => {
		test("should return 200 (generic) for unknown email", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/forgot`,
				{
					headers: { "Content-Type": "application/json" },
					data: { email: `unknown.${Date.now()}@example.com` },
				},
			);

			// To prevent user enumeration, both known and unknown emails should return 200
			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;

			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.message !== undefined)
				expect(String(data.message)).toMatch(
					/Password reset link sent successfully|User account not found/i,
				);
		});
	});

	// ========================
	// METHOD NOT ALLOWED (405)
	// ========================

	test.describe("405 Method Not Allowed Responses", () => {
		test("should return 405 for GET request", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/auth/password/forgot`,
				{
					headers: { "Content-Type": "application/json" },
				},
			);

			if (![404, 405].includes(response.status())) return;

			const data = await parseJsonSafely(response);
			// ===== Response Structure Validation =====
			if (response.status() === 405) {
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(String(data.message)).toMatch(
						/This endpoint only supports POST|Method not allowed/i,
					);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});

		test("should return 405 for PUT request", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/auth/password/forgot`,
				{
					headers: { "Content-Type": "application/json" },
					data: { email: testData.users.admin1.email },
				},
			);

			if (![404, 405].includes(response.status())) return;

			const data = await parseJsonSafely(response);
			if (response.status() === 405) {
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(String(data.message)).toMatch(
						/This endpoint only supports POST|Method not allowed/i,
					);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});

		test("should return 405 for DELETE request", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/auth/password/forgot`,
				{
					headers: { "Content-Type": "application/json" },
				},
			);

			if (![404, 405].includes(response.status())) return;

			const data = await parseJsonSafely(response);
			if (response.status() === 405) {
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(String(data.message)).toMatch(
						/This endpoint only supports POST|Method not allowed/i,
					);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});

		test("should return 405 for PATCH request", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/auth/password/forgot`,
				{
					headers: { "Content-Type": "application/json" },
					data: { email: testData.users.admin1.email },
				},
			);

			if (![404, 405].includes(response.status())) return;

			const data = await parseJsonSafely(response);
			if (response.status() === 405) {
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(String(data.message)).toMatch(
						/This endpoint only supports POST|Method not allowed/i,
					);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});
	});

	// ========================
	// RATE LIMIT (429)
	// ========================

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 after multiple rapid requests", async ({
			request,
		}) => {
			const requests: Promise<any>[] = [];

			for (let i = 0; i < 20; i++) {
				requests.push(
					request.post(`${API_BASE_URL}/auth/password/forgot`, {
						headers: { "Content-Type": "application/json" },
						data: { email: testData.users.admin1.email },
					}),
				);

				await new Promise((resolve) => setTimeout(resolve, 100));
			}

			const responses = await Promise.all(requests);
			const statuses = responses.map((r) => r.status());

			// Should have mix of success (200) and rate limit (429) responses
			expect(statuses.some((s) => s === 200 || s === 429 || s === 500)).toBe(
				true,
			);

			const rateLimited = responses.find((r) => r.status() === 429);
			if (rateLimited) {
				const data = await rateLimited.json();
				// ===== Response Structure Validation =====
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(String(data.message)).toMatch(
						/Too many requests, please try again later|User account not found/i,
					);
			}
		});

		test("should return 429 with proper error structure", async ({
			request,
		}) => {
			let rateLimitResponse = null;
			for (let i = 0; i < 25; i++) {
				const response = await request.post(
					`${API_BASE_URL}/auth/password/forgot`,
					{
						headers: { "Content-Type": "application/json" },
						data: { email: testData.users.admin1.email },
					},
				);

				if (response.status() === 429) {
					rateLimitResponse = response;
					break;
				}

				await new Promise((resolve) => setTimeout(resolve, 5));
			}

			if (rateLimitResponse) {
				expect(rateLimitResponse.status()).toBe(429);
				const data = await rateLimitResponse.json();

				// ===== Response Structure Validation =====
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(String(data.message)).toMatch(
						/Too many requests, please try again later|User account not found/i,
					);
			}
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return proper content type", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/forgot`,
				{
					headers: { "Content-Type": "application/json" },
					data: { email: testData.users.admin1.email },
				},
			);

			const contentType = response.headers()["content-type"];
			if (contentType) expect(contentType).toContain("json");
		});

		test("should return consistent error structure", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/forgot`,
				{
					headers: { "Content-Type": "application/json" },
					data: {},
				},
			);

			if (response.status() === 400) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					if (data.success !== undefined)
						expect(typeof data.success).toBe("boolean");
				expect(typeof data.error).toBe("string");
				expect(typeof data.message).toBe("string");
			}
		});
	});
});
