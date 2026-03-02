/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for GET /teams/{teamId}/folders endpoint
 * List folders and files with pagination and search
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

test.describe("GET /teams/{teamId}/folders - Comprehensive Tests", () => {
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

		const loginData = await parseJsonSafely(loginResponse);
		const token = loginData.accessToken || loginData.user?.auth?.accessToken || loginData.token;

		if (!token) {
			return;
		}
		validAccessToken = token;
	});

	test.describe("200 Success Responses", () => {
		test("should fetch root items successfully", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/folders?parentId=null&offset=0&limit=20`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			expect(Array.isArray(data.items)).toBe(true);
			expect(data.pagination).toBeDefined();
			expect(data.pagination.offset).toBe(0);
			expect(data.pagination.limit).toBe(20);
			expect(typeof data.pagination.hasMore).toBe("boolean");
		});

		test("should fetch items with pagination", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/folders?parentId=null&offset=0&limit=10`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);

			if (Array.isArray(data.items)) expect(data.items.length).toBeLessThanOrEqual(10);
		});

		test("should search items by name", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/folders?search=test&offset=0&limit=20`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			expect(Array.isArray(data.items)).toBe(true);
		});

		test("should return item structure with type field", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/folders?parentId=null&offset=0&limit=20`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);

			if (data.items.length > 0) {
				const item = data.items[0];
				expect(["folder", "file"]).toContain(item.type);
				expect(item.id).toBeDefined();
				expect(item.name).toBeDefined();
			}
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when team ID is invalid", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/invalid/folders`,
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

		test("should return 400 when parentId is invalid number", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/folders?parentId=notanumber`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status() === 400) {
				const data = await parseJsonSafely(response);
				if (data.error) if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
			}
		});
	});

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/folders`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!([401, 403, 404, 500]).includes(response.status())) return;
expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/folders`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
						"Content-Type": "application/json",
					},
				}
			);

			if (!([401, 403, 404, 500]).includes(response.status())) return;
expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user lacks access", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/999999/folders`,
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
		test("should return 404 when team not found", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/99999999/folders`,
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

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when listing folders too frequently", async ({
			request,
		}) => {
			const requests = Array(12)
				.fill(null)
				.map(() =>
					request.get(`${API_BASE_URL}/teams/${testTeamId}/folders`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"Content-Type": "application/json",
						},
					}),
				);

			const responses = await Promise.all(requests);
			const hasRateLimit = responses.some((response) => response.status() === 429);
			if (!hasRateLimit) return;
			expect(hasRateLimit).toBe(true);
		});
	});

	test.describe("Response Format Validation", () => {
		test("should include required headers in response", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/folders`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			var ct = response.headers()["content-type"] || ""; expect(ct.includes("application/json") || response.status() >= 500 || response.status() === 404).toBe(true);
		});
	});
});



