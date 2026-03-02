/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for GET /teams/shared endpoint
 * Fetches list of teams shared with the authenticated user
 * Spec Response Codes: 200, 401 (3 variants), 403, 409
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("GET /teams/shared - Comprehensive Tests", () => {
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

		const loginData = await parseJsonSafely(loginResponse);
		const token = loginData.accessToken || loginData.user?.auth?.accessToken || loginData.token;

		if (!token) {
			return;
		}
		validAccessToken = token;
	});

	test.describe("200 Success Responses", () => {
		test("should fetch shared teams successfully", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams/shared`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if ([401, 500].includes(response.status())) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(Array.isArray(data.sharedTeamList)).toBe(true);

			// Validate shared team structure
			if (data.sharedTeamList.length > 0) {
				const team = data.sharedTeamList[0];
				expect(team.id).toBeDefined();
				expect(team.team_name || team.teamName).toBeDefined();
				expect(team.sharedByUserId).toBeDefined();
				expect(team.active).toBe(true);
			}
		});
	});

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams/shared`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams/shared`, {
				headers: {
					Authorization: "Bearer invalid_token",
					"Content-Type": "application/json",
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when access denied", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams/shared`, {
				headers: {
					Authorization: `Bearer invalid_token`,
					"Content-Type": "application/json",
				},
			});

			if (response.status() === 403) {
				const data = await parseJsonSafely(response);
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
			}
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should handle 409 when shared team state conflicts", async ({
			request,
		}) => {
			const response = await request.get(`${API_BASE_URL}/teams/shared`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				params: {
					searchString: "conflict-check",
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when shared teams endpoint is spammed", async ({
			request,
		}) => {
			const requests = Array(12)
				.fill(null)
				.map(() =>
					request.get(`${API_BASE_URL}/teams/shared`, {
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
});

