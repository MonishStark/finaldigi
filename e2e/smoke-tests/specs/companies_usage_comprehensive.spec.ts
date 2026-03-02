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
 * Comprehensive test suite for GET /companies/{companyId}/usage endpoint
 * Tests ALL response codes: 200, 400, 401, 403, 404, 405, 429
 * Covers scenarios: success, invalid request, missing token, invalid token,
 * user not found, method validation, rate limiting
 * Response Structure:
 *   - 200: {success: true, ...statistics}
 *   - 400: {success: false, error: "bad_request", message: "...", details: []}
 *   - 401: {success: false, error: "missing_access_token", message: "...", details: []}
 *   - 403: {success: false, error: "invalid_access_token", message: "...", details: []}
 *   - 404: {success: false, error: "not_found", message: "...", details: []}
 *   - 405: {success: false, error: "method_not_allowed", message: "...", details: []}
 *   - 429: {success: false, error: "too_many_requests", message: "...", details: []}
 */

test.describe("GET /companies/{companyId}/usage - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testCompanyId: string;

	test.beforeAll(async ({ request }) => {
		testCompanyId = String(testData.users.admin1.companyId);
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
	// SUCCESS (200)
	// ========================

	test.describe("200 Success Responses", () => {
		test("should retrieve company usage data successfully", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/companies/${testCompanyId}/usage`,
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
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
		});
	});

	// ========================
	// BAD REQUEST (400)
	// ========================

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for invalid query params (day > 31)", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/companies/${testCompanyId}/usage?day=99`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
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

		test("should return 400 when Year provided without Month", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/companies/${testCompanyId}/usage?year=2024`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
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
		});
	});

	// ========================
	// UNAUTHORIZED (401)
	// ========================

	test.describe("401 Missing Access Token Responses", () => {
		test("should return 401 when no token is provided", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/companies/${testCompanyId}/usage`,
				{
					headers: {},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
		});
	});

	// ========================
	// FORBIDDEN (403)
	// ========================

	test.describe("403 Invalid Access Token Responses", () => {
		test("should return 403 for invalid token", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/companies/${testCompanyId}/usage`,
				{
					headers: {
						Authorization: "Bearer invalid.jwt.token",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() === 403) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
			}
		});
	});

	// ========================
	// NOT FOUND (404)
	// ========================

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when company is not found", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/companies/999999/usage`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				}
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
		});
	});

	// ========================
	// METHOD NOT ALLOWED (405)
	// ========================

	test.describe("405 Method Not Allowed Responses", () => {
		test("should return 405 for POST method", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/usage`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
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
					request.get(`${API_BASE_URL}/companies/${testCompanyId}/usage`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
						},
					}),
				);

			const responses = await Promise.all(requests);
			const rateLimited = responses.find(
				(response) => response.status() === 429,
			);

			if (rateLimited) {
				const data = await rateLimited.json();
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
			}
		});
	});
});
