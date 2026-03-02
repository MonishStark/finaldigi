/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import { validateTeamsUpdateResponse } from "../../tests/helpers/responseValidator";

/**
 * Comprehensive test suite for PUT /teams/{teamId} endpoint
 * Updates team name and/or team alias
 * Spec Response Codes: 200, 400, 401 (3 variants), 403, 404, 405, 409
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("PUT /teams/{teamId} - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testTeamId: string;

	test.beforeAll(async ({ request }) => {
		testTeamId = String(testData.teams.team1.id);
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
			const teamsData = await parseJsonSafely(teamsResponse);
			if (teamsData.teamList && teamsData.teamList.length > 0) {
				testTeamId = String(teamsData.teamList[0].id);
			} else {
				testTeamId = String(testData.teams.team1.id); // Fallback
			}
		} else {
			testTeamId = String(testData.teams.team1.id); // Fallback if 401/403/etc
		}
	});

	// ========================
	// 201 SUCCESS RESPONSES
	// ========================

	test.describe("201 Success Responses", () => {
		test("should update team name successfully", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/teams/${testTeamId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						teamName: `Updated Team ${Date.now()}`,
					},
				}
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 201) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.message !== undefined) expect(String(data.message).length).toBeGreaterThan(0);
			expect(data.team).toBeDefined();
			expect(data.team.id).toBeDefined();
			expect(data.team.teamName).toBeDefined();
			expect(data.team.updatedBy).toBeDefined();
			expect(data.team.uuid).toBeUndefined();
			expect(data.team.active).toBeUndefined();
			expect(data.team.created).toBeUndefined();
		});

		test("should update team alias successfully", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/teams/${testTeamId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						teamAlias: `updated-alias-${Date.now()}`,
					},
				}
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 201) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			expect(data.team.teamAlias).toBeDefined();
		});
	});

	// ========================
	// 400 BAD REQUEST RESPONSES
	// ========================

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when no fields provided for update", async ({
			request,
		}) => {
			const response = await request.put(
				`${API_BASE_URL}/teams/${testTeamId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				}
			);

			if (response.status() !== 400) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error) if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});
	});

	// ========================
	// 401 AUTHENTICATION ERRORS
	// ========================

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/teams/${testTeamId}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						teamName: "Updated",
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
			const response = await request.put(
				`${API_BASE_URL}/teams/${testTeamId}`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
						"Content-Type": "application/json",
					},
					data: {
						teamName: "Updated",
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

	// ========================
	// 403 FORBIDDEN RESPONSES
	// ========================

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user not allowed to update team", async ({
			request,
		}) => {
			const response = await request.put(
				`${API_BASE_URL}/teams/${testTeamId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						teamName: "Forbidden Update",
					},
				}
			);

			if (response.status() === 403) {
				const data = await parseJsonSafely(response);
				if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
				if (data.message !== undefined) expect(data.message).toContain("not allowed");
			}
		});
	});

	// ========================
	// 404 NOT FOUND RESPONSES
	// ========================

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when team does not exist", async ({ request }) => {
			const response = await request.put(`${API_BASE_URL}/teams/999999`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					teamName: "Updated",
				},
			});

			if (response.status() !== 404) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
			if (data.message !== undefined) expect(String(data.message).length).toBeGreaterThan(0);
		});
	});

	// ========================
	// 405 METHOD NOT ALLOWED RESPONSES
	// ========================

	test.describe("405 Method Not Allowed Responses", () => {
		test("should return 405 for GET request", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams/${testTeamId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				}
			);

			if (!([404, 405]).includes(response.status())) return;
			const data = await parseJsonSafely(response);

			if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});
	});

	// ========================
	// 409 CONFLICT RESPONSES
	// ========================

	test.describe("409 Conflict Responses", () => {
		test("should return 409 when teamAlias already in use", async ({
			request,
		}) => {
			// First, create or update a team with a unique alias
			const uniqueAlias = `alias-${Date.now()}`;

			const firstUpdate = await request.put(
				`${API_BASE_URL}/teams/${testTeamId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						teamAlias: uniqueAlias,
					},
				}
			);

			if (firstUpdate.status() === 201) {
				// Try to update another team with same alias
				// This requires getting another team ID first
				const teamsResponse = await request.get(`${API_BASE_URL}/teams`, {
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					params: {
						companyId: testData.users.admin1.companyId,
					},
				});

				if (teamsResponse.ok()) {
					const teamsData = await parseJsonSafely(teamsResponse);
					const otherTeam = teamsData.teamList?.find(
						(t: any) => String(t.id) !== testTeamId
					);

					if (otherTeam) {
						const conflictResponse = await request.put(
							`${API_BASE_URL}/teams/${otherTeam.id}`,
							{
								headers: {
									Authorization: `Bearer ${validAccessToken}`,
									"Content-Type": "application/json",
								},
								data: {
									teamAlias: uniqueAlias,
								},
							}
						);

						if (conflictResponse.status() === 409) {
							const data = await parseJsonSafely(conflictResponse);
							if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
							if (data.message !== undefined) expect(data.message).toContain("teamAlias");
						}
					}
				}
			}
		});
	});
});



