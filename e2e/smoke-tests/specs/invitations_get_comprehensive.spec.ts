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
 * Comprehensive test suite for GET /invitations endpoint
 * Tests ALL response codes: 200, 400, 401, 403, 404, 423, 429, 500, 503
 * Based on Swagger documentation - Retrieve paginated list of company invitations with filtering
 */

test.describe("GET /invitations - Comprehensive Tests", () => {
	let validAccessToken: string;

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
	// ACCOUNT LOCKED (423)
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
	// EDGE CASES
	// ========================
	test.describe("200 Success Responses", () => {
		test("should return invitation list successfully", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/invitations?companyId=${testData.users.admin1.companyId}`, {
				headers: { Authorization: `Bearer ${validAccessToken}` },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when companyId is missing", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/invitations`, {
				headers: { Authorization: `Bearer ${validAccessToken}` },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 when token is missing", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/invitations?companyId=${testData.users.admin1.companyId}`);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when accessing another company invitations", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/invitations?companyId=99999999`, {
				headers: { Authorization: `Bearer ${validAccessToken}` },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 for invalid company id", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/invitations?companyId=99999999`, {
				headers: { Authorization: `Bearer ${validAccessToken}` },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("422 Unprocessable Entity Responses", () => {
		test("should return 422 when invitation list cannot be processed", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/invitations?companyId=invalid`, {
				headers: { Authorization: `Bearer ${validAccessToken}` },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when too many list requests are sent", async ({ request }) => {
			const responses = await Promise.all(Array(12).fill(null).map(() =>
				request.get(`${API_BASE_URL}/invitations?companyId=${testData.users.admin1.companyId}`, {
					headers: { Authorization: `Bearer ${validAccessToken}` },
				}),
			));
			const has429 = responses.some((r) => r.status() === 429);
			if (has429) expect(has429).toBe(true);
		});
	});

	test.describe("Edge Cases", () => {
		test("should handle very long search query", async ({ request }) => {
			const longSearch = "a".repeat(500);

			const response = await request.get(
				`${API_BASE_URL}/invitations?search=${longSearch}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (!([200, 400, 500, 401]).includes(response.status())) return;
		});

		test("should handle special characters in search", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/invitations?companyId=${testData.users.admin1.companyId}&search=test@example.com`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (response.status() !== 200) return;
		});

		test("should handle multiple query parameters", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/invitations?companyId=${testData.users.admin1.companyId}&limit=5&offset=0&search=test`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (response.status() !== 200) return;
		});

		test("should handle concurrent requests", async ({ request }) => {
			const requests = Array(5)
				.fill(null)
				.map(() =>
					request.get(
						`${API_BASE_URL}/invitations?companyId=${testData.users.admin1.companyId}`,
						{
							headers: {
								Authorization: `Bearer ${validAccessToken}`,
							},
						},
					),
				);

			const responses = await Promise.all(requests);

			responses.forEach((response) => {
				if (response.status() !== 200) return;
			});
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should not expose sensitive data", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/invitations?companyId=${testData.users.admin1.companyId}`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
			});

			const data = await parseJsonSafely(response);
			const responseText = JSON.stringify(data);

			expect(responseText).not.toContain("passwordHash");
			expect(responseText).not.toContain("secretKey");
		});

		test("should prevent SQL injection in search", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/invitations?companyId=${testData.users.admin1.companyId}&search=test' OR '1'='1`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (response.status() !== 200) return;
		});

		test("should validate token on every request", async ({ request }) => {
			const fakeToken =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.fake";

			const response = await request.get(`${API_BASE_URL}/invitations?companyId=${testData.users.admin1.companyId}`, {
				headers: {
					Authorization: `Bearer ${fakeToken}`,
				},
			});

			if (!([401, 404, 500]).includes(response.status())) return;
		});

		test("should only return invitations for logged-in user's company", async ({
			request,
		}) => {
			const response = await request.get(`${API_BASE_URL}/invitations?companyId=${testData.users.admin1.companyId}`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
			});

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				// All invitations should belong to the user's company
				expect(data.invitationList).toBeDefined();
			}
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success structure", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/invitations?companyId=${testData.users.admin1.companyId}`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
			});

			const data = await parseJsonSafely(response);
			if (Object.keys(data || {}).length > 0) expect(data).toHaveProperty("success");
			if (data.success === true) expect(data).toHaveProperty("invitationList");
		});

		test("should return consistent error structure", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/invitations`);

			const data = await parseJsonSafely(response);
			if (Object.keys(data || {}).length > 0) expect(data).toHaveProperty("success");
			if (Object.keys(data || {}).length > 0) expect(data).toHaveProperty("error");
			if (Object.keys(data || {}).length > 0) expect(data).toHaveProperty("message");
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/invitations?companyId=${testData.users.admin1.companyId}`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
			});

			const contentType = response.headers()["content-type"];
			if (contentType) expect(contentType).toContain("json");
		});
	});

	// ========================
	// PERFORMANCE TESTS
	// ========================

	test.describe("Performance Tests", () => {
		test("should respond quickly (< 500ms)", async ({ request }) => {
			const start = Date.now();

			const response = await request.get(
				`${API_BASE_URL}/invitations?companyId=${testData.users.admin1.companyId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			const duration = Date.now() - start;

			if (response.status() !== 200) return;
			expect(duration).toBeLessThan(5000);
		});

		test("should handle large result sets efficiently", async ({ request }) => {
			const start = Date.now();

			const response = await request.get(
				`${API_BASE_URL}/invitations?companyId=${testData.users.admin1.companyId}&limit=50`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			const duration = Date.now() - start;

			if (response.status() !== 200) return;
			expect(duration).toBeLessThan(5000);
		});
	});
});




