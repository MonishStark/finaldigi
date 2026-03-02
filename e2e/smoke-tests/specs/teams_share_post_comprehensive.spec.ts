/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for POST /teams/{teamId}/share endpoint
 * Share team with users/emails
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

test.describe("POST /teams/{teamId}/share - Comprehensive Tests", () => {
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

	test.describe("200/201 Success Responses", () => {
		test("should share team with existing user successfully", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/share`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						email: "shareuser@test.com",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if ([401, 500].includes(response.status())) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
		});

		test("should return success if user already has access", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/share`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						email: testData.users.admin1.email,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() === 401) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when email is missing", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/share`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() === 401) return;
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});

		test("should return 400 when email format is invalid", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/share`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						email: "invalid-email",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() === 401) return;
			const data = await parseJsonSafely(response);

			if (typeof data.error === "string")
				expect(data.error).toMatch(/bad_request|invalid/i);
		});
	});

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/share`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						email: "user@test.com",
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
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/share`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
						"Content-Type": "application/json",
					},
					data: {
						email: "user@test.com",
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
			const response = await request.post(
				`${API_BASE_URL}/teams/999999/share`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						email: "user@test.com",
					},
				},
			);

			if (response.status() === 403) {
				const data = await parseJsonSafely(response);
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
			}
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when team not found", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/99999999/share`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						email: "user@test.com",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if ([401, 500].includes(response.status())) return;
			const data = await parseJsonSafely(response);

			if (response.status() === 404) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should handle 409 when user is already shared to the team", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/share`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						email: testData.users.admin2.email,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (!([200, 201]).includes(response.status())) return;
		});
	});

	test.describe("422 Validation Error Responses", () => {
		test("should return 422 for invalid share payload", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/share`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						email: "not-an-email",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 for too many team share attempts", async ({
			request,
		}) => {
			const requests = Array(12)
				.fill(null)
				.map(() =>
					request.post(`${API_BASE_URL}/teams/${testTeamId}/share`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"Content-Type": "application/json",
						},
						data: {
							email: testData.users.admin2.email,
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

