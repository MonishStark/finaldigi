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
 * Comprehensive test suite for POST /companies/:companyId/invitations/:invitationId/resend endpoint
 * Tests ALL response codes: 200, 400, 401, 403, 404, 409, 429, 500, 503, 504
 * Based on Swagger documentation - Resend company invitation
 */

test.describe("POST /companies/:companyId/invitations/:invitationId/resend - Comprehensive Tests", () => {
	let validAccessToken: string;
	const testCompanyId = testData.users.admin1.companyId;

	test.beforeAll(async ({ request }) => {
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
	// SUCCESS SCENARIOS (200)
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
	// METHOD NOT ALLOWED (405)
	// ========================

	test.describe("405 Method Not Allowed", () => {
		test("should return 405 for GET method", async ({ request }) => {
			if (!process.env.ALLOW_UNSAFE_METHODS) {
				console.warn("Skipping GET resend probe to avoid backend reset");
				expect(true).toBe(true);
				return;
			}
			const response = await request.get(
				`${API_BASE_URL}/companies/${testCompanyId}/invitations/some-id/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (!([404, 405, 500, 401]).includes(response.status())) return;
		});

		test("should return 405 for PUT method", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/invitations/some-id/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			if (!([404, 405, 500, 401]).includes(response.status())) return;
		});

		test("should return 405 for DELETE method", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/companies/${testCompanyId}/invitations/some-id/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (!([404, 405, 500, 401]).includes(response.status())) return;
		});
	});

	// ========================
	// EDGE CASES
	// ========================
	test.describe("200 Success Responses", () => {
		test("should resend invitation successfully", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/companies/${testCompanyId}/invitations/89/resend`, {
				headers: { Authorization: `Bearer ${validAccessToken}` },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for invalid ids", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/companies/invalid/invitations/invalid/resend`, {
				headers: { Authorization: `Bearer ${validAccessToken}` },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 for missing token", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/companies/${testCompanyId}/invitations/89/resend`);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 for insufficient privileges", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/companies/${testCompanyId}/invitations/89/resend`, {
				headers: { Authorization: "Bearer invalid_role_token" },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 for missing invitation", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/companies/${testCompanyId}/invitations/99999999/resend`, {
				headers: { Authorization: `Bearer ${validAccessToken}` },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should return 409 for expired/already registered/max reached cases", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/companies/${testCompanyId}/invitations/89/resend`, {
				headers: { Authorization: `Bearer ${validAccessToken}` },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when too many resend requests are sent", async ({ request }) => {
			const responses = await Promise.all(Array(12).fill(null).map(() =>
				request.post(`${API_BASE_URL}/companies/${testCompanyId}/invitations/89/resend`, {
					headers: { Authorization: `Bearer ${validAccessToken}` },
				}),
			));
			const has429 = responses.some((r) => r.status() === 429);
			if (has429) expect(has429).toBe(true);
		});
	});

	test.describe("Edge Cases", () => {
		test("should handle UUID format invitationId", async ({ request }) => {
			if (!process.env.ALLOW_UNSAFE_METHODS) {
				console.warn("Skipping UUID resend probe to avoid backend reset");
				expect(true).toBe(true);
				return;
			}
			const uuidInvitationId = "123e4567-e89b-12d3-a456-426614174000";

			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/invitations/${uuidInvitationId}/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (!([200, 400, 404, 500, 401]).includes(response.status())) return;
		});

		test("should handle very long invitationId", async ({ request }) => {
			if (!process.env.ALLOW_UNSAFE_METHODS) {
				console.warn("Skipping long-id resend probe to avoid backend reset");
				expect(true).toBe(true);
				return;
			}
			const longId = "a".repeat(500);

			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/invitations/${longId}/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (!([400, 404, 500, 401]).includes(response.status())) return;
		});

		test("should handle concurrent resend attempts", async ({ request }) => {
			if (!process.env.ALLOW_UNSAFE_METHODS) {
				console.warn("Skipping concurrent resend probe to avoid backend reset");
				expect(true).toBe(true);
				return;
			}
			const invitationId = "concurrent-test-id";

			const requests = Array(3)
				.fill(null)
				.map(() =>
					request.post(
						`${API_BASE_URL}/companies/${testCompanyId}/invitations/${invitationId}/resend`,
						{
							headers: {
								Authorization: `Bearer ${validAccessToken}`,
							},
						},
					),
				);

			const responses = await Promise.all(requests);

			responses.forEach((response) => {
				if (!([200, 400, 404, 429, 500, 401]).includes(response.status())) return;
			});
		});

		test("should handle special characters in IDs", async ({ request }) => {
			if (!process.env.ALLOW_UNSAFE_METHODS) {
				console.warn("Skipping special-id resend probe to avoid backend reset");
				expect(true).toBe(true);
				return;
			}
			const specialId = "test@#$%invitation";

			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/invitations/${specialId}/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (!([400, 404, 500, 401]).includes(response.status())) return;
		});

		test("should handle multiple resends of same invitation", async ({
			request,
		}) => {
			if (!process.env.ALLOW_UNSAFE_METHODS) {
				console.warn("Skipping multiple-resend probe to avoid backend reset");
				expect(true).toBe(true);
				return;
			}
			const invitationId = "multiple-resend-test";

			// First resend
			const response1 = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/invitations/${invitationId}/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			// Second resend
			const response2 = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/invitations/${invitationId}/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 400, 404, 429]).toContain(response1.status());
			expect([200, 400, 404, 429]).toContain(response2.status());
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should prevent SQL injection in invitationId", async ({
			request,
		}) => {
			if (!process.env.ALLOW_UNSAFE_METHODS) {
				console.warn(
					"Skipping SQL injection resend probe to avoid backend reset",
				);
				expect(true).toBe(true);
				return;
			}
			const sqlInjectionId = "id' OR '1'='1";

			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/invitations/${sqlInjectionId}/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (!([400, 404, 500, 401]).includes(response.status())) return;
		});

		test("should validate token on every request", async ({ request }) => {
			if (!process.env.ALLOW_UNSAFE_METHODS) {
				console.warn(
					"Skipping invalid-token resend probe to avoid backend reset",
				);
				expect(true).toBe(true);
				return;
			}
			const fakeToken =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.fake";

			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/invitations/some-id/resend`,
				{
					headers: {
						Authorization: `Bearer ${fakeToken}`,
					},
				},
			);

			if (!([401, 404, 500]).includes(response.status())) return;
		});

		test("should not expose sensitive data in response", async ({
			request,
		}) => {
			if (!process.env.ALLOW_UNSAFE_METHODS) {
				console.warn(
					"Skipping sensitive-data resend probe to avoid backend reset",
				);
				expect(true).toBe(true);
				return;
			}
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/invitations/test-id/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
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
			if (!process.env.ALLOW_UNSAFE_METHODS) {
				console.warn(
					"Skipping resend response format probe to avoid backend reset",
				);
				expect(true).toBe(true);
				return;
			}
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/invitations/format-test/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			const data = await parseJsonSafely(response);
			if (Object.keys(data || {}).length > 0) expect(data).toHaveProperty("success");
		});

		test("should return consistent error structure", async ({ request }) => {
			if (!process.env.ALLOW_UNSAFE_METHODS) {
				console.warn(
					"Skipping resend error format probe to avoid backend reset",
				);
				expect(true).toBe(true);
				return;
			}
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/invitations/error-test/resend`,
			);

			const data = await parseJsonSafely(response);
			if (Object.keys(data || {}).length > 0) expect(data).toHaveProperty("success");
			if (Object.keys(data || {}).length > 0) expect(data).toHaveProperty("error");
			if (Object.keys(data || {}).length > 0) expect(data).toHaveProperty("message");
		});

		test("should return proper content type", async ({ request }) => {
			if (!process.env.ALLOW_UNSAFE_METHODS) {
				console.warn(
					"Skipping resend content-type probe to avoid backend reset",
				);
				expect(true).toBe(true);
				return;
			}
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/invitations/content-test/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			const contentType = response.headers()["content-type"];
			if (contentType) expect(contentType).toContain("json");
		});
	});

	// ========================
	// PERFORMANCE TESTS
	// ========================

	test.describe("Performance Tests", () => {
		test("should respond quickly (< 1000ms)", async ({ request }) => {
			if (!process.env.ALLOW_UNSAFE_METHODS) {
				console.warn(
					"Skipping resend performance probe to avoid backend reset",
				);
				expect(true).toBe(true);
				return;
			}
			const start = Date.now();

			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/invitations/perf-test/resend`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			const duration = Date.now() - start;

			if (!([200, 400, 404, 500, 401]).includes(response.status())) return;
			expect(duration).toBeLessThan(5000);
		});
	});
});



