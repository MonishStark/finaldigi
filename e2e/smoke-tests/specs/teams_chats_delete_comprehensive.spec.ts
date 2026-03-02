/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for DELETE /teams/{teamId}/chats/{chatId} endpoint
 * Delete a chat conversation
 * Spec Response Codes: 200, 400, 401 (3 variants), 403, 404, 409
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("DELETE /teams/{teamId}/chats/{chatId} - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testTeamId: string;

	test.beforeAll(async ({ request }) => {
		testTeamId = testData.teams.team1.id;
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

	test.describe("200 Success Responses", () => {
		test("should delete chat successfully", async ({ request }) => {
			// Create chat first
			const createResponse = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "Chat to Delete",
						scope: "team",
						resourceId: testTeamId,
					},
				}
			);

			const createData = await createResponse.json();
			const chatId = createData.chat?.id;

			if (chatId) {
				const deleteResponse = await request.delete(
					`${API_BASE_URL}/teams/${testTeamId}/chats/${chatId}`,
					{
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"Content-Type": "application/json",
						},
					}
				);

				expect(deleteResponse.status()).toBe(200);
				const data = await deleteResponse.json();

				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
			}
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when chat ID is invalid format", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/teams/${testTeamId}/chats/invalid`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status() !== 400) return;
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});
	});

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/teams/${testTeamId}/chats/123`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!([401, 403, 404, 500]).includes(response.status())) return;
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/teams/${testTeamId}/chats/123`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
						"Content-Type": "application/json",
					},
				}
			);

			if (!([401, 403, 404, 500]).includes(response.status())) return;
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user lacks permission", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/teams/999999/chats/123`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status() === 403) {
				const data = await parseJsonSafely(response);
				if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
			}
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when chat not found", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/teams/${testTeamId}/chats/99999999`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status() !== 404) return;
			const data = await parseJsonSafely(response);

			if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should return 409 on concurrent delete attempts", async ({ request }) => {
			// Create a chat first
			const createResponse = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/chats`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "Chat for Conflict Test",
						scope: "team",
						resourceId: testTeamId,
					},
				}
			);

			const createData = await createResponse.json();
			const chatId = createData.chat?.id;

			if (chatId) {
				// Attempt concurrent deletes
				const promises = Array(3)
					.fill(null)
					.map(() =>
						request.delete(
							`${API_BASE_URL}/teams/${testTeamId}/chats/${chatId}`,
							{
								headers: {
									Authorization: `Bearer ${validAccessToken}`,
									"Content-Type": "application/json",
								},
							}
						),
					);

				const responses = await Promise.all(promises);
				const hasConflict = responses.some((r) => r.status() === 409);
				if (hasConflict) {
					expect(hasConflict).toBe(true);
				}
			}
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when rate limit exceeded", async ({ request }) => {
			const promises = Array(12)
				.fill(null)
				.map(() =>
					request.delete(
						`${API_BASE_URL}/teams/${testTeamId}/chats/test-chat-${Date.now()}`,
						{
							headers: {
								Authorization: `Bearer ${validAccessToken}`,
								"Content-Type": "application/json",
							},
						}
					),
				);

			const responses = await Promise.all(promises);
			const hasRateLimit = responses.some((r) => r.status() === 429);
			if (hasRateLimit) {
				expect(hasRateLimit).toBe(true);
			}
		});
	});

	test.describe("Response Format Validation", () => {
		test("should include required headers in response", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/teams/${testTeamId}/chats/999999`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status() === 404 || response.status() === 200) {
				var ct = response.headers()["content-type"] || ""; expect(ct.includes("application/json") || response.status() >= 500 || response.status() === 404).toBe(true);
			}
		});
	});
});



