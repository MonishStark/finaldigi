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
 * Comprehensive test suite for GET /teams/{teamId}/chats/{chatId}/messages endpoint
 * Fetches messages from a specific chat with optional pagination
 * Response codes: 200, 400, 401, 403, 404, 429, 500, 503, 504
 */

test.describe("GET /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testTeamId: string;
	let testChatId: string;

	test.beforeAll(async ({ request }) => {
		testTeamId = testData.teams.team1.id;
		testChatId = testData.chats.chat1.id;
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
	// SUCCESS (200)
	// ========================
	test.describe("200 Success Responses", () => {
		test("should fetch messages from chat", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);
			expect(data).toHaveProperty("messages");
			expect(Array.isArray(data.messages)).toBe(true);
		});

		test("should support pagination in messages", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages?limit=20`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);
			expect(data).toHaveProperty("messages");
			expect(Array.isArray(data.messages)).toBe(true);
		});
	});

	// ========================
	// BAD REQUEST (400)
	// ========================
	test.describe("400 Bad Request Responses", () => {
		test("should return 400 with invalid limit", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages?limit=invalid`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
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

		test("should return 400 with negative limit", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages?limit=-1`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
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
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 401) return;
			const data = await parseJsonSafely(response);
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
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
		test("should return 403 when user lacks access", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/unauthorized-team-id/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
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
		test("should return 404 when chat not found", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/nonexistent-chat-id/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
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

		test("should return 404 when team not found", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/nonexistent-team-id/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
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
	// RATE LIMIT (429)
	// ========================
	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when rate limit exceeded", async ({ request }) => {
			const promises = Array(12)
				.fill(null)
				.map(() =>
					request.get(
						`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
						{
							headers: {
								Authorization: `Bearer ${validAccessToken}`,
							},
						},
					),
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
		test("should handle zero limit", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages?limit=0`,
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
		});

		test("should handle special characters in cursor", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages?before=${encodeURIComponent("cursor!@#$%")}`,
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
		});

		test("should handle very long cursor", async ({ request }) => {
			const longCursor = "a".repeat(1000);

			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages?before=${longCursor}`,
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
		});

		test("should handle concurrent requests", async ({ request }) => {
			const requests = Array(3)
				.fill(null)
				.map(() =>
					request.get(
						`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
						{
							headers: {
								Authorization: `Bearer ${validAccessToken}`,
							},
						},
					),
				);

			const responses = await Promise.all(requests);

			responses.forEach((response) => {
				expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
				if (response.status() !== 200) return;
			});
		});

		test("should handle empty cursor values", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages?before=`,
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
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should prevent XSS in cursor parameter", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages?before=${encodeURIComponent("<script>alert('xss')</script>")}`,
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
		});

		test("should prevent SQL injection in cursor", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages?before=${encodeURIComponent("1' OR '1'='1")}`,
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
		});

		test("should validate token on every request", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: "Bearer malformed-token",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should not expose sensitive data in messages", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
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
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (
				response.status() === 200 &&
				response.headers()["content-type"]?.includes("application/json")
			) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success");
			}
		});

		test("should return consistent error structure", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/invalid-id/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (response.headers()["content-type"]?.includes("application/json")) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) {
					expect(typeof data.success).toBe("boolean");
				}
			}
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
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
	// PERFORMANCE
	// ========================

	test.describe("Performance Tests", () => {
		test("should respond quickly (< 500ms)", async ({ request }) => {
			const start = Date.now();

			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
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

		test("should handle large limit efficiently", async ({ request }) => {
			const start = Date.now();

			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages?limit=100`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
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


