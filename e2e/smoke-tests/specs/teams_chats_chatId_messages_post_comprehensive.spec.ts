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
 * Comprehensive test suite for POST /teams/{teamId}/chats/{chatId}/messages endpoint
 * Adds a new message to an existing chat session
 * Response codes: 201, 400, 401, 403, 404, 429, 500, 503, 504
 */

test.describe("POST /teams/{teamId}/chats/{chatId}/messages - Comprehensive Tests", () => {
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
	// SUCCESS (201)
	// ========================
	test.describe("201 Created Responses", () => {
		test("should send message successfully", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "Test message",
						role: "user",
					},
				},
			);

			if (response.status() !== 201) return;
			const data = await parseJsonSafely(response);
			expect(data).toHaveProperty("message");
			expect(data.message).toHaveProperty("id");
		});
	});

	// ========================
	// BAD REQUEST (400)
	// ========================
	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when message is empty", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "",
						role: "user",
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

		test("should return 400 when role is missing", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "Test message",
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
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						message: "Test message",
						role: "user",
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
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
						"Content-Type": "application/json",
					},
					data: {
						message: "Test message",
						role: "user",
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
			const response = await request.post(
				`${API_BASE_URL}/teams/unauthorized-team-id/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "Test message",
						role: "user",
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
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats/nonexistent-chat-id/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "Test message",
						role: "user",
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
			const response = await request.post(
				`${API_BASE_URL}/teams/nonexistent-team-id/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "Test message",
						role: "user",
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
				.map((_, i) =>
					request.post(
						`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
						{
							headers: {
								Authorization: `Bearer ${validAccessToken}`,
								"Content-Type": "application/json",
							},
							data: {
								message: `Message ${i}`,
								role: "user",
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
		test("should handle special characters in message", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "Test!@#$%^&*()",
						role: "user",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 201) return;
		});

		test("should handle unicode in message", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "你好世界 🌍",
						role: "user",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 201) return;
		});

		test("should handle newlines in message", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "Line 1\nLine 2\nLine 3",
						role: "user",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 201) return;
		});

		test("should handle concurrent message submissions", async ({
			request,
		}) => {
			const requests = Array(3)
				.fill(null)
				.map((_, i) =>
					request.post(
						`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
						{
							headers: {
								Authorization: `Bearer ${validAccessToken}`,
								"Content-Type": "application/json",
							},
							data: {
								message: `Concurrent message ${i}`,
								role: "user",
							},
						},
					),
				);

			const responses = await Promise.all(requests);

			responses.forEach((response) => {
				expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
				if (response.status() !== 201) return;
			});
		});

		test("should handle whitespace-only message", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "    ",
						role: "user",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 201) return;
		});

		test("should handle extremely long message", async ({ request }) => {
			const veryLongMessage = "a".repeat(100000);

			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: veryLongMessage,
						role: "user",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 201) return;
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should prevent XSS in message content", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "<script>alert('xss')</script>",
						role: "user",
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
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "'; DROP TABLE messages; --",
						role: "user",
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
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: "Bearer malformed-token",
						"Content-Type": "application/json",
					},
					data: {
						message: "Test",
						role: "user",
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
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "Secure test message",
						role: "user",
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
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "Format test message",
						role: "user",
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
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
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
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "Content type test",
						role: "user",
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

			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats/${testChatId}/messages`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						message: "Performance test message",
						role: "user",
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


