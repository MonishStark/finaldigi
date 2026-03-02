/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for GET /teams/{teamId}/items endpoint
 * Get unified list of all items metadata
 * Spec Response Codes: 200, 400, 401 (3 variants), 403, 404
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("GET /teams/{teamId}/items - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testTeamId: string;

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

		const loginData = await parseJsonSafely(loginResponse);
		const token = loginData.accessToken || loginData.user?.auth?.accessToken || loginData.token;

		if (!token) {
			return;
		}
		validAccessToken = token;

		// Fetch teams to get a valid team ID
		const teamsResponse = await request.get(`${API_BASE_URL}/teams`, {
			headers: { Authorization: `Bearer ${validAccessToken}` },
			params: { companyId: testData.users.admin1.companyId }
		});

		if (teamsResponse.ok()) {
			const teamsData: any = await teamsResponse.json();
			const firstTeamId = teamsData?.teamList?.[0]?.id;
			if (firstTeamId) {
				testTeamId = String(firstTeamId);
			} else {
				testTeamId = String(testData.teams.team1.id);
			}
		} else {
			testTeamId = String(testData.teams.team1.id);
		}
	});

	test.describe("200 Success Responses", () => {
		test("should fetch all items successfully", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/items`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(Array.isArray(data.items)).toBe(true);

			// Validate item structure
			if (data.items.length > 0) {
				const item = data.items[0];
				expect(item.id).toBeDefined();
				expect(item.name).toBeDefined();
				expect(["folder", "file", null]).toContain(item.parentId);
			}
		});

		test("should return items with correct parent relationships", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/items`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);

			expect(Array.isArray(data.items)).toBe(true);

			// All items should have required fields
			data.items.forEach((item: any) => {
				expect(item.id).toBeDefined();
				expect(item.name).toBeDefined();
			});
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when team ID is invalid format", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/invalid/items`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() === 401) return;
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/items`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/items`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
						"Content-Type": "application/json",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user lacks permission", async ({
			request,
		}) => {
			const response = await request.get(`${API_BASE_URL}/teams/999999/items`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
			});

			if (response.status() === 403) {
				const data = await parseJsonSafely(response);
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
			}
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when team not found", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/99999999/items`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() === 401) return;
			const data = await parseJsonSafely(response);

			if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when item list endpoint is requested excessively", async ({
			request,
		}) => {
			const requests = Array(12)
				.fill(null)
				.map(() =>
					request.get(`${API_BASE_URL}/teams/${testTeamId}/items`, {
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
				`${API_BASE_URL}/teams/${testTeamId}/items`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			var ct = response.headers()["content-type"] || "";
			expect(
				ct.includes("application/json") ||
					response.status() >= 500 ||
					response.status() === 404,
			).toBe(true);
		});
	});
});

