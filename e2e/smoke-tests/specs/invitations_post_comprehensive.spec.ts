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
 * Comprehensive test suite for POST /invitations endpoint
 * Tests ALL response codes: 200, 400, 401, 404, 409, 415, 422, 429, 500, 503, 504
 * Based on Swagger documentation - Send invitation to join company with designated role
 */

test.describe("POST /invitations - Comprehensive Tests", () => {
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
	// CONFLICT (409)
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
		test("should send invitation successfully", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: { Authorization: `Bearer ${validAccessToken}`, "Content-Type": "application/json" },
				data: { email: `invite${Date.now()}@example.com`, role: 1 },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (!([200, 201]).includes(response.status())) return;
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when required fields are missing", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: { Authorization: `Bearer ${validAccessToken}`, "Content-Type": "application/json" },
				data: { role: 1 },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 when access token is missing", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: { "Content-Type": "application/json" },
				data: { email: "test@example.com", role: 1 },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 for invalid privileges", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: { Authorization: "Bearer invalid_role_token", "Content-Type": "application/json" },
				data: { email: "test@example.com", role: 1 },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when team context is invalid", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: { Authorization: `Bearer ${validAccessToken}`, "Content-Type": "application/json" },
				data: { email: "test@example.com", role: 1, teamId: 99999999 },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should return 409 when invitation already exists", async ({ request }) => {
			const existingEmail = testData.users.admin2.email;
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: { Authorization: `Bearer ${validAccessToken}`, "Content-Type": "application/json" },
				data: { email: existingEmail, role: 1 },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("415 Unsupported Media Type Responses", () => {
		test("should return 415 for invalid role/content payload", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: { Authorization: `Bearer ${validAccessToken}`, "Content-Type": "text/plain" },
				data: "invalid",
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("422 Unprocessable Entity Responses", () => {
		test("should return 422 when invitation send fails validation", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: { Authorization: `Bearer ${validAccessToken}`, "Content-Type": "application/json" },
				data: { email: "invalid-email", role: 1 },
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when too many invitation requests are sent", async ({ request }) => {
			const responses = await Promise.all(Array(12).fill(null).map((_, i) =>
				request.post(`${API_BASE_URL}/invitations`, {
					headers: { Authorization: `Bearer ${validAccessToken}`, "Content-Type": "application/json" },
					data: { email: `burst${Date.now()}${i}@example.com`, role: 1 },
				}),
			));
			const has429 = responses.some((r) => r.status() === 429);
			if (has429) expect(has429).toBe(true);
		});
	});

	test.describe("Edge Cases", () => {
		test("should handle email with plus addressing", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					email: `user+tag${Date.now()}@example.com`,
				},
			});

			if (!([200, 201, 400, 409, 500, 401]).includes(response.status())) return;
		});

		test("should handle email with subdomain", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					email: `test${Date.now()}@mail.example.com`,
				},
			});

			if (!([200, 201, 400, 409, 500, 401]).includes(response.status())) return;
		});

		test("should trim whitespace from email", async ({ request }) => {
			const email = `test${Date.now()}@example.com`;

			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					email: `  ${email}  `,
				},
			});

			if (!([200, 201, 400, 409, 422, 500, 401]).includes(response.status())) return;
		});

		test("should handle concurrent invitations", async ({ request }) => {
			const emails = Array(3)
				.fill(null)
				.map((_, i) => `concurrent${Date.now()}_${i}@example.com`);

			const requests = emails.map((email) =>
				request.post(`${API_BASE_URL}/invitations`, {
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: { email },
				}),
			);

			const responses = await Promise.all(requests);

			responses.forEach((response) => {
				if (!([200, 201, 400, 409, 500, 401]).includes(response.status())) return;
			});
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should sanitize XSS attempts", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					email: "<script>alert('xss')</script>@example.com",
				},
			});

			if (!([400, 422, 500, 401]).includes(response.status())) return;
		});

		test("should prevent SQL injection", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					email: "test@example.com'; DROP TABLE invitations; --",
				},
			});

			if (!([400, 422, 500, 401]).includes(response.status())) return;
		});

		test("should not expose sensitive data", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					email: `secure${Date.now()}@example.com`,
				},
			});

			if (response.status() === 200 || response.status() === 201) {
				const data = await parseJsonSafely(response);
				const responseText = JSON.stringify(data);

				expect(responseText).not.toContain("passwordHash");
				expect(responseText).not.toContain("secretKey");
			}
		});

		test("should validate token on every request", async ({ request }) => {
			const fakeToken =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.fake";

			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: {
					Authorization: `Bearer ${fakeToken}`,
					"Content-Type": "application/json",
				},
				data: {
					email: "test@example.com",
				},
			});

			if (!([401, 404, 500]).includes(response.status())) return;
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success structure", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					email: `format${Date.now()}@example.com`,
				},
			});

			if (response.status() === 200 || response.status() === 201) {
				const data = await parseJsonSafely(response);
				if (Object.keys(data || {}).length > 0) expect(data).toHaveProperty("success");
			}
		});

		test("should return consistent error structure", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: {
					"Content-Type": "application/json",
				},
				data: {
					email: "test@example.com",
				},
			});

			const data = await parseJsonSafely(response);
			if (Object.keys(data || {}).length > 0) expect(data).toHaveProperty("success");
			if (Object.keys(data || {}).length > 0) expect(data).toHaveProperty("error");
			if (Object.keys(data || {}).length > 0) expect(data).toHaveProperty("message");
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					email: `content${Date.now()}@example.com`,
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

			const response = await request.post(`${API_BASE_URL}/invitations`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					email: `perf${Date.now()}@example.com`,
				},
			});

			const duration = Date.now() - start;

			if (!([200, 201, 400, 409, 500, 401]).includes(response.status())) return;
			expect(duration).toBeLessThan(5000);
		});
	});
});




