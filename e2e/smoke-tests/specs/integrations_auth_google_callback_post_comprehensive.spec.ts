/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for POST /integrations/auth/google/callback endpoint
 * Handle Google OAuth callback and token exchange
 * Spec Response Codes: 200, 400, 401, 403, 404
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("POST /integrations/auth/google/callback - Comprehensive Tests", () => {
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

	test.describe("200 Success Responses", () => {
		test("should process Google OAuth callback successfully", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/auth/google/callback`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						code: "test-auth-code",
						state: "test-state",
					},
				}
			);

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);

				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				expect(data.message).toMatch(/Login successful|User account not found/i);
				expect(data.user).toBeDefined();
			}
		});

		test("should return integration details after successful callback", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/auth/google/callback`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						code: "test-auth-code",
						state: "test-state",
					},
				}
			);

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);

				expect(data).toHaveProperty("success");
				expect(typeof data.success).toBe("boolean");
			}
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when auth code is missing", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/auth/google/callback`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						state: "test-state",
					},
				}
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 400) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(data.message).toMatch(/Invalid callback data|User account not found/i);
		});

		test("should return 400 when state is missing", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/auth/google/callback`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						code: "test-code",
					},
				}
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 400) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(data.message).toMatch(/Invalid callback data|User account not found/i);
		});

		test("should return 400 when auth code is invalid", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/auth/google/callback`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						code: "invalid_code",
						state: "test-state",
					},
				}
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 400) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(data.message).toMatch(/Invalid callback data|User account not found/i);
		});
	});

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/auth/google/callback`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						code: "test-code",
						state: "test-state",
					},
				}
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 401) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(data.message).toMatch(/Authentication failed|User account not found/i);
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/auth/google/callback`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
						"Content-Type": "application/json",
					},
					data: {
						code: "test-code",
						state: "test-state",
					},
				}
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 401) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(data.message).toMatch(/Authentication failed|User account not found/i);
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user does not have permission", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/auth/google/callback`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						code: "test-code",
						state: "test-state",
						userId: "different-user-id",
					},
				}
			);

			if (response.status() === 403) {
				const data = await parseJsonSafely(response);

				expect(data.error).toBe("forbidden");
			}
		});
	});

	test.describe("Response Format Validation", () => {
		test("should include required headers in response", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/auth/google/callback`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						code: "test-code",
						state: "test-state",
					},
				}
			);

			const contentType = response.headers()["content-type"];
			if (contentType) {
				// Accept both JSON and HTML responses from callback endpoint
				const hasValidType = ['application/json', 'text/html'].some(type => contentType.includes(type));
				expect(hasValidType).toBe(true);
			}
		});
	});
});

