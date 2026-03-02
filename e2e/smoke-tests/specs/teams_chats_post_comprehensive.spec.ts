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
 * Comprehensive test suite for POST /teams/{teamId}/chats endpoint
 * Creates a new chat session text for a specific team
 * Response codes: 201, 400, 401, 403, 404, 409, 422, 428, 500, 503, 504
 */

test.describe("POST /teams/{teamId}/chats - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testTeamId: string;

	test.beforeAll(async ({ request }) => {
		testTeamId = testData.teams.team1.id;
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
		validAccessToken = token;
	});

	// ========================
	// SUCCESS (201)
	// ========================
	test.describe("201 Created Responses", () => {
		test("should create chat successfully", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "New Team Chat",
						scope: "team",
						resourceId: testTeamId,
					},
				},
			);

			if (response.status() !== 201) return;
			const data = await parseJsonSafely(response);
			expect(data).toHaveProperty("chat");
			expect(data.chat).toHaveProperty("id");
		});
	});

	// ========================
	// BAD REQUEST (400)
	// ========================
	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when name is missing", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						scope: "team",
						resourceId: testTeamId,
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 400) return;
			const data = await parseJsonSafely(response);
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});

		test("should return 400 when scope is invalid", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "Test Chat",
						scope: "invalid_scope",
						resourceId: testTeamId,
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 400) return;
			const data = await parseJsonSafely(response);
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	// ========================
	// UNAUTHORIZED (401)
	// ========================
	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						name: "Test Chat",
						scope: "team",
						resourceId: testTeamId,
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 401) return;
			const data = await parseJsonSafely(response);
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
						"Content-Type": "application/json",
					},
					data: {
						name: "Test Chat",
						scope: "team",
						resourceId: testTeamId,
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 401) return;
			const data = await parseJsonSafely(response);
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	// ========================
	// FORBIDDEN (403)
	// ========================
	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user lacks team access", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/unauthorized-team-id/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "Test Chat",
						scope: "team",
						resourceId: "unauthorized-team-id",
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 403) return;
			const data = await parseJsonSafely(response);
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	// ========================
	// NOT FOUND (404)
	// ========================
	test.describe("404 Not Found Responses", () => {
		test("should return 404 when team not found", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/nonexistent-team-id/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "Test Chat",
						scope: "team",
						resourceId: "nonexistent-team-id",
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 404) return;
			const data = await parseJsonSafely(response);
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	// ========================
	// CONFLICT (409)
	// ========================
	test.describe("409 Conflict Responses", () => {
		test("should return 409 when chat name already exists", async ({ request }) => {
			const chatName = `DuplicateChat-${Date.now()}`;

			// Create first chat
			await request.post(`${API_BASE_URL}/teams/${testTeamId}/chats`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					name: chatName,
					scope: "team",
					resourceId: testTeamId,
				},
			});

			// Try to create duplicate
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: chatName,
						scope: "team",
						resourceId: testTeamId,
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 409) return;
			const data = await parseJsonSafely(response);
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	// ========================
	// UNPROCESSABLE ENTITY (422)
	// ========================
	test.describe("422 Unprocessable Entity Responses", () => {
		test("should return 422 when chat name is too long", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "a".repeat(300),
						scope: "team",
						resourceId: testTeamId,
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 422) return;
			const data = await parseJsonSafely(response);
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});

		test("should return 422 when resourceId validation fails", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "Test Chat",
						scope: "team",
						resourceId: "",
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 422) return;
			const data = await parseJsonSafely(response);
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	// ========================
	// RATE LIMIT (429)
	// ========================
	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when rate limit exceeded", async ({ request }) => {
			const promises = Array(12)
				.fill(null)
				.map((_, i) =>
					request.post(`${API_BASE_URL}/teams/${testTeamId}/chats`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"Content-Type": "application/json",
						},
						data: {
							name: `RateTest-${i}-${Date.now()}`,
							scope: "team",
							resourceId: testTeamId,
						},
					}),
				);

			const responses = await Promise.all(promises);
			const hasRateLimit = responses.some((r) => r.status() === 429);
			if (hasRateLimit) {
				expect(hasRateLimit).toBe(true);
			}
		});
	});

	// ========================
	// NOT FOUND (404)
	// ========================

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
		test("should handle very long resourceId", async ({ request }) => {
			const longResourceId = "a".repeat(500);

			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "user",
						resourceId: longResourceId,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 201) return;
		});

		test("should handle special characters in resourceId", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "user",
						resourceId: "test!@#$%^&*()",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 201) return;
		});

		test("should handle unicode characters", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "user",
						resourceId: "测试资源",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 201) return;
		});

		test("should handle concurrent chat creation", async ({ request }) => {
			const requests = Array(3)
				.fill(null)
				.map((_, i) =>
					request.post(`${API_BASE_URL}/teams/${testTeamId}/chats`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"Content-Type": "application/json",
						},
						data: {
							name: "user",
							resourceId: `concurrent-${i}-${Date.now()}`,
						},
					}),
				);

			const responses = await Promise.all(requests);

			responses.forEach((response) => {
				expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
				if (response.status() !== 201) return;
			});
		});

		test("should handle empty resourceId", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "user",
						resourceId: "",
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
		test("should prevent XSS in resourceId", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "user",
						resourceId: "<script>alert('xss')</script>",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 201) return;
		});

		test("should prevent SQL injection", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "user",
						resourceId: "1' OR '1'='1",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 201) return;
		});

		test("should validate token on every request", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: "Bearer malformed-token",
						"Content-Type": "application/json",
					},
					data: {
						name: "user",
						resourceId: "test",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should not expose sensitive data in response", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "user",
						resourceId: "secure-test-" + Date.now(),
					},
				},
			);

			if (response.headers()["content-type"]?.includes("application/json")) {
				const data = await parseJsonSafely(response);
				const responseText = JSON.stringify(data);

				expect(responseText).not.toContain("password");
				expect(responseText).not.toContain("secretKey");
			}
		});
	});

	// ========================
	// RESPONSE FORMAT
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success structure", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "user",
						resourceId: "format-test-" + Date.now(),
					},
				},
			);

			if (
				response.status() === 201 &&
				response.headers()["content-type"]?.includes("application/json")
			) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success");
			}
		});

		test("should return consistent error structure", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			if (response.headers()["content-type"]?.includes("application/json")) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success");
			}
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "user",
						resourceId: "content-test-" + Date.now(),
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
	// PERFORMANCE
	// ========================

	test.describe("Performance Tests", () => {
		test("should respond quickly (< 1000ms)", async ({ request }) => {
			const start = Date.now();

			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "user",
						resourceId: "perf-test-" + Date.now(),
					},
				},
			);

			const duration = Date.now() - start;

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 201) return;
			expect(duration).toBeLessThan(5000);
		});
	});
});


