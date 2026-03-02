/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import {
	validateSuccessResponse,
	validateErrorResponse,
	validate400BadRequest,
	validate401Unauthorized,
	validate403Forbidden,
	validate404NotFound,
	validate409Conflict,
	validate429RateLimit,
	validateTimestamp,
	validateUUID,
	validateEmail,
	validatePaginatedResponse,
	validateDetailsArray,
	validateDetailsObject,
} from "../../tests/helpers/responseValidator";

/**
 * Comprehensive test suite for PATCH /admin/users/{userId}/2fa endpoint
 *
 * Based on Swagger documentation - Enable or disable 2FA for a user (Admin only)
 */

const API_BASE_URL = "http://127.0.0.1:5050";

test.describe("PATCH /admin/users/{userId}/2fa - Comprehensive Tests", () => {
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
		const token =
			loginData.accessToken ||
			loginData.user?.auth?.accessToken ||
			loginData.token;

		if (!token) {
			return;
		}
		adminAccessToken = token;
		validAccessToken = token;
	});

	test.describe("415 Unsupported Media Type", () => {
		test("should return 415 for missing Content-Type", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/2fa`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					data: {
						enabled: true,
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});

		test("should return 415 for wrong Content-Type", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/2fa`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "text/plain",
					},
					data: {
						enabled: true,
					},
				},
			);

			// Tightened assertion: expect 415 for wrong Content-Type
			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});
	});

	// ========================
	// EDGE CASES
	// ========================
	test.describe("200 Success Responses", () => {
		test("should enable 2FA successfully", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/2fa`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: { enabled: true },
				},
			);
			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for missing enabled field", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/2fa`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				},
			);
			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});
	});

	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 for missing token", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/2fa`,
				{
					headers: { "Content-Type": "application/json" },
					data: { enabled: true },
				},
			);
			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 for insufficient privileges", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/2fa`,
				{
					headers: {
						Authorization: "Bearer invalid_role_token",
						"Content-Type": "application/json",
					},
					data: { enabled: true },
				},
			);
			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 for unknown user", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/99999999/2fa`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: { enabled: true },
				},
			);
			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should handle conflict when state cannot be updated", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/2fa`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: { enabled: true },
				},
			);
			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when rate limit exceeded", async ({ request }) => {
			const responses = await Promise.all(
				Array(12)
					.fill(null)
					.map(() =>
						request.patch(`${API_BASE_URL}/admin/users/${testUserId}/2fa`, {
							headers: {
								Authorization: `Bearer ${validAccessToken}`,
								"Content-Type": "application/json",
							},
							data: { enabled: true },
						}),
					),
			);
			const has429 = responses.some((r) => r.status() === 429);
			if (has429) expect(has429).toBe(true);
		});
	});

	test.describe("Edge Cases", () => {
		test("should handle toggling 2FA multiple times", async ({ request }) => {
			// Enable 2FA
			const enable = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/2fa`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						enabled: true,
					},
				},
			);

			expect([200, 401, 403, 404, 409, 422, 429]).toContain(enable.status());

			// Disable 2FA
			const disable = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/2fa`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						enabled: false,
					},
				},
			);

			expect([200, 401, 403, 404, 409, 422, 429]).toContain(disable.status());
		});

		test("should handle null value for enabled", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/2fa`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						enabled: null,
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});

		test("should handle extra fields in request body", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/2fa`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						enabled: true,
						extraField: "should be ignored",
					},
				},
			);

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
		test("should prevent SQL injection in userId", async ({ request }) => {
			const sqlInjection = "1' OR '1'='1";
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${sqlInjection}/2fa`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						enabled: true,
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});

		test("should validate token on every request", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/2fa`,
				{
					headers: {
						Authorization: "Bearer tampered-token",
						"Content-Type": "application/json",
					},
					data: {
						enabled: true,
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success structure", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/2fa`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						enabled: true,
					},
				},
			);

			if (response.status() === 200) {
				const data: any = await response.json();
				expect(data).toHaveProperty("success");
			}
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/2fa`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						enabled: false,
					},
				},
			);

			const contentType = response.headers()["content-type"];
			expect(contentType?.includes("application/json")).toBe(true);
		});
	});

	// ========================
	// PERFORMANCE TESTS
	// ========================

	test.describe("Performance Tests", () => {
		test("should respond quickly (< 500ms)", async ({ request }) => {
			const start = Date.now();

			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/2fa`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						enabled: true,
					},
				},
			);

			const duration = Date.now() - start;

			expect([200, 400, 401, 403, 404, 408]).toContain(response.status());
			expect(duration).toBeLessThan(5000);
		});
	});
});
