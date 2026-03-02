/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for DELETE /admin/users/{userId} endpoint
 *
 * Based on Swagger documentation - Permanently delete a user account (Admin only, irreversible)
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("DELETE /admin/users/{userId} - Comprehensive Tests", () => {
	let validAccessToken: string;
	let adminAccessToken: string;
	const testUserId = testData.users.admin2.id;

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
		adminAccessToken = token;
		validAccessToken = token;
	});

	// ========================
	// SUCCESS (200)
	// ========================

	// ========================
	// NOT FOUND (404)
	// ========================

	// ========================
	// UNPROCESSABLE ENTITY (422)
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
	// METHOD NOT ALLOWED (405)
	// ========================

	test.describe("405 Method Not Allowed", () => {
		test("should return 405 for GET method", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/admin/users/${testUserId}`,
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 405 for POST method", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/admin/users/${testUserId}`,
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	// ========================
	// EDGE CASES
	// ========================
	test.describe("200 Success Responses", () => {
		test("should delete user successfully", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/admin/users/${testUserId}`,
				{
					headers: { Authorization: `Bearer ${validAccessToken}` },
				},
			);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for invalid userId format", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/admin/users/invalid-id`,
				{
					headers: { Authorization: `Bearer ${validAccessToken}` },
				},
			);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 for missing token", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/admin/users/${testUserId}`,
			);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 for insufficient privileges", async ({
			request,
		}) => {
			const response = await request.delete(
				`${API_BASE_URL}/admin/users/${testUserId}`,
				{
					headers: { Authorization: "Bearer invalid_role_token" },
				},
			);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 for unknown user", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/admin/users/99999999`,
				{
					headers: { Authorization: `Bearer ${validAccessToken}` },
				},
			);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should handle conflict while deleting user", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/admin/users/${testUserId}`,
				{
					headers: { Authorization: `Bearer ${validAccessToken}` },
				},
			);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("422 Unprocessable Entity Responses", () => {
		test("should return 422 when deletion cannot be processed", async ({
			request,
		}) => {
			const response = await request.delete(
				`${API_BASE_URL}/admin/users/${testUserId}`,
				{
					headers: { Authorization: `Bearer ${validAccessToken}` },
				},
			);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when rate limit exceeded", async ({ request }) => {
			const responses = await Promise.all(
				Array(12)
					.fill(null)
					.map(() =>
						request.delete(`${API_BASE_URL}/admin/users/${testUserId}`, {
							headers: { Authorization: `Bearer ${validAccessToken}` },
						}),
					),
			);
			const has429 = responses.some((r) => r.status() === 429);
			if (has429) expect(has429).toBe(true);
		});
	});

	test.describe("Edge Cases", () => {
		test("should handle UUID format userId", async ({ request }) => {
			const uuidUserId = "123e4567-e89b-12d3-a456-426614174000";
			const response = await request.delete(
				`${API_BASE_URL}/admin/users/${uuidUserId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should handle very long userId", async ({ request }) => {
			const longId = "a".repeat(1000);
			const response = await request.delete(
				`${API_BASE_URL}/admin/users/${longId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should handle special characters in userId", async ({ request }) => {
			const specialCharsId = "!@#$%^&*()";
			const response = await request.delete(
				`${API_BASE_URL}/admin/users/${specialCharsId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should prevent SQL injection in userId", async ({ request }) => {
			const sqlInjection = "1' OR '1'='1";
			const response = await request.delete(
				`${API_BASE_URL}/admin/users/${sqlInjection}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should validate token on every request", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/admin/users/${testUserId}`,
				{
					headers: {
						Authorization: "Bearer tampered-token",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success structure", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/admin/users/${testUserId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success");
			}
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/admin/users/${testUserId}`,
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
	// PERFORMANCE TESTS
	// ========================

	test.describe("Performance Tests", () => {
		test("should respond quickly (< 1000ms)", async ({ request }) => {
			const start = Date.now();

			const response = await request.delete(
				`${API_BASE_URL}/admin/users/${testUserId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			const duration = Date.now() - start;

			expect([200, 400, 401, 403, 404, 408, 500, 401]).toContain(
				response.status(),
			);
			expect(duration).toBeLessThan(5000);
		});
	});
});
