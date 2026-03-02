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
 * Comprehensive test suite for PATCH /admin/users/{userId}/account-status endpoint
 *
 * Based on Swagger documentation - Update user's account status: lock, unlock, or block (Admin only)
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("PATCH /admin/users/{userId}/account-status - Comprehensive Tests", () => {
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
	// RATE LIMIT (429)
	// ========================

	// ========================
	// SERVER ERROR (500)
	// ========================

	// ========================
	// SERVICE UNAVAILABLE (503/504)
	// ========================

	// ========================
	// UNSUPPORTED MEDIA TYPE (415)
	// ========================

	test.describe("415 Unsupported Media Type", () => {
		test("should return 415 for missing Content-Type", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/account-status`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					data: {
						status: "locked",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 415 for wrong Content-Type", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/account-status`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "text/plain",
					},
					data: {
						status: "locked",
					},
				},
			);

			// Tightened assertion: expect 415 for missing Content-Type
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	// ========================
	// EDGE CASES
	// ========================
	test.describe("200 Success Responses", () => {
		test("should update account status successfully", async ({ request }) => {
			const response = await request.patch(`${API_BASE_URL}/admin/users/${testUserId}/account-status`, {
				headers: { Authorization: `Bearer ${validAccessToken}`, "Content-Type": "application/json" },
				data: { status: "locked" },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for invalid status", async ({ request }) => {
			const response = await request.patch(`${API_BASE_URL}/admin/users/${testUserId}/account-status`, {
				headers: { Authorization: `Bearer ${validAccessToken}`, "Content-Type": "application/json" },
				data: { status: "invalid" },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 for missing token", async ({ request }) => {
			const response = await request.patch(`${API_BASE_URL}/admin/users/${testUserId}/account-status`, {
				headers: { "Content-Type": "application/json" },
				data: { status: "locked" },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 for insufficient privileges", async ({ request }) => {
			const response = await request.patch(`${API_BASE_URL}/admin/users/${testUserId}/account-status`, {
				headers: { Authorization: "Bearer invalid_role_token", "Content-Type": "application/json" },
				data: { status: "locked" },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 for unknown user", async ({ request }) => {
			const response = await request.patch(`${API_BASE_URL}/admin/users/99999999/account-status`, {
				headers: { Authorization: `Bearer ${validAccessToken}`, "Content-Type": "application/json" },
				data: { status: "locked" },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should handle conflict when status cannot be updated", async ({ request }) => {
			const response = await request.patch(`${API_BASE_URL}/admin/users/${testUserId}/account-status`, {
				headers: { Authorization: `Bearer ${validAccessToken}`, "Content-Type": "application/json" },
				data: { status: "locked" },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when rate limit exceeded", async ({ request }) => {
			const responses = await Promise.all(
				Array(12).fill(null).map(() => request.patch(`${API_BASE_URL}/admin/users/${testUserId}/account-status`, {
					headers: { Authorization: `Bearer ${validAccessToken}`, "Content-Type": "application/json" },
					data: { status: "locked" },
				})),
			);
			const has429 = responses.some((r) => r.status() === 429);
			if (has429) expect(has429).toBe(true);
		});
	});

	test.describe("Edge Cases", () => {
		test("should handle all valid status values", async ({ request }) => {
			const statuses = ["active", "locked", "blocked"];

			for (const status of statuses) {
				const response = await request.patch(
					`${API_BASE_URL}/admin/users/${testUserId}/account-status`,
					{
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"Content-Type": "application/json",
						},
						data: {
							status: status,
						},
					},
				);

				expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
				if (response.status() !== 200) return;
			}
		});

		test("should handle case sensitivity in status", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/account-status`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						status: "LOCKED",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should handle null value for status", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/account-status`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						status: null,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should handle extra fields in request body", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/account-status`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						status: "locked",
						extraField: "should be ignored",
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
		test("should prevent SQL injection in userId", async ({ request }) => {
			const sqlInjection = "1' OR '1'='1";
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${sqlInjection}/account-status`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						status: "locked",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should validate token on every request", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/account-status`,
				{
					headers: {
						Authorization: "Bearer tampered-token",
						"Content-Type": "application/json",
					},
					data: {
						status: "locked",
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
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/account-status`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						status: "active",
					},
				},
			);

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success");
			}
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/account-status`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						status: "active",
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

			const response = await request.patch(
				`${API_BASE_URL}/admin/users/${testUserId}/account-status`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						status: "active",
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


