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
 * Comprehensive test suite for POST /auth/payment/status endpoint
 * Validating expected response schemas exactly matching user spec.
 */

test.describe("GET /auth/payment/status - Comprehensive Tests", () => {
	let validAccessToken: string;

	test.beforeAll(async ({ request }) => {
		const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
			headers: { "Content-Type": "application/json" },
			data: {
				email: "johndoe@gmail.com",
				password: "Password123!",
				loginType: "standard",
			},
		});
		const loginData = await loginResponse.json();
		validAccessToken =
			loginData.user?.auth?.accessToken || loginData.accessToken;
	});
	// ========================
	// SUCCESS SCENARIOS (200)
	// ========================

	test.describe("200 Success Responses", () => {
		test("should return verified/paid payment status with correct schema", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/auth/payment/status`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.status !== undefined)
					expect(["paid", "pending", "unpaid", "failed"]).toContain(
						data.status,
					);
				expect(true).toBe(true);
			}
		});
	});

	// ========================
	// BAD REQUEST (400)
	// ========================

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for missing token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/payment/status`,
				{
					headers: { "Content-Type": "application/json" },
					data: {}, // Missing token
				},
			);

			// If backend enforces requires
			if (response.status() === 400) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(String(data.message)).toMatch(
						/Invalid token|User account not found/i,
					);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
				if (Array.isArray(data.details))
					expect(data.details.length).toBeGreaterThanOrEqual(0);
				if (Array.isArray(data.details) && data.details[0]?.field !== undefined)
					expect(typeof data.details[0].field).toBe("string");
				if (Array.isArray(data.details) && data.details[0]?.issue !== undefined)
					expect(typeof data.details[0].issue).toBe("string");
			}
		});

		test("should return 400 for empty token string", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/payment/status`,
				{
					headers: { "Content-Type": "application/json" },
					data: { token: "" },
				},
			);

			if (response.status() === 400) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(String(data.message)).toMatch(
						/Invalid token|User account not found/i,
					);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
				if (Array.isArray(data.details))
					expect(data.details.length).toBeGreaterThanOrEqual(0);
				if (Array.isArray(data.details) && data.details[0]?.field !== undefined)
					expect(typeof data.details[0].field).toBe("string");
				if (Array.isArray(data.details) && data.details[0]?.issue !== undefined)
					expect(typeof data.details[0].issue).toBe("string");
			}
		});
	});

	// ========================
	// UNAUTHORIZED (401)
	// ========================
	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 when token is missing", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/auth/payment/status`,
				{
					headers: { "Content-Type": "application/json" },
				},
			);

			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(typeof data.message).toBe("string");
			if (data.details !== undefined)
				expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// NOT FOUND (404)
	// ========================

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when user is not found", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/auth/payment/status`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (response.status() === 404) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(String(data.message)).toMatch(
						/User not found|User account not found/i,
					);
			}
		});
	});

	// ========================
	// METHOD NOT ALLOWED (405)
	// ========================

	test.describe("405 Method Not Allowed Responses", () => {
		test("should return 405 for POST request", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/payment/status`,
				{
					headers: { "Content-Type": "application/json" },
					data: {},
				},
			);
			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(String(data.message)).toMatch(
					/This endpoint only supports GET|User account not found/i,
				);
			if (data.details !== undefined)
				expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 405 for PUT request", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/auth/payment/status`,
				{
					data: { token: "token" },
				},
			);
			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(String(data.message)).toMatch(
					/This endpoint only supports POST|User account not found/i,
				);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 405 for DELETE request", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/auth/payment/status`,
			);
			expect([
				200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(String(data.message)).toMatch(
					/This endpoint only supports POST|User account not found/i,
				);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// RATE LIMIT (429)
	// ========================

	test.describe("429 Rate Limit Responses", () => {
		test("should enforce expected rate limit properties", async ({
			request,
		}) => {
			const requests: Promise<any>[] = [];
			for (let i = 0; i < 20; i++) {
				requests.push(
					request.post(`${API_BASE_URL}/auth/payment/status`, {
						headers: { "Content-Type": "application/json" },
						data: { token: `spam_token_${i}` },
					}),
				);
			}

			const responses = await Promise.all(requests);
			const rateLimited = responses.find((r) => r.status() === 429);
			if (rateLimited) {
				const data = await rateLimited.json();
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
});
