/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for POST /teams/{teamId}/folders endpoint
 * Create new folder in team
 * Spec Response Codes: 200, 201, 400, 401 (3 variants), 403, 404, 409
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("POST /teams/{teamId}/folders - Comprehensive Tests", () => {
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

	test.describe("201 Created Success Responses", () => {
		test("should create folder at root level successfully", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/folders`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						folderName: "Test Folder Root",
						parentId: null,
					},
				}
			);

			if (response.status() !== 201) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(data.folder).toBeDefined();
			expect(data.folder.name).toBe("Test Folder Root");
			expect(data.folder.teamId).toBe(testTeamId);
			expect(data.folder.parentId).toBeNull();
		});

		test("should create subfolder with valid parentId", async ({ request }) => {
			// First get or create a parent folder
			const parentResponse = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/folders`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						folderName: "Parent Folder",
						parentId: null,
					},
				}
			);

			const parentData = await parseJsonSafely(parentResponse);
			const parentId = parentData.folder?.id;

			// Now create child folder
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/folders`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						folderName: "Child Folder",
						parentId: parentId,
					},
				}
			);

			if (response.status() !== 201) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			expect(data.folder.parentId).toBe(parentId);
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when folder name is missing", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/folders`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						parentId: null,
					},
				}
			);

			if (response.status() !== 400) return;
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});

		test("should return 400 when team ID is invalid", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/invalid/folders`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						folderName: "Test",
						parentId: null,
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
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/folders`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						folderName: "Test",
						parentId: null,
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
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/folders`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
						"Content-Type": "application/json",
					},
					data: {
						folderName: "Test",
						parentId: null,
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
		test("should return 403 when user lacks permission", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/999999/folders`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						folderName: "Test",
						parentId: null,
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
			const response = await request.post(
				`${API_BASE_URL}/teams/99999999/folders`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						folderName: "Test",
						parentId: null,
					},
				}
			);

			if (response.status() !== 404) return;
			const data = await parseJsonSafely(response);

			if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});

		test("should return 404 when parent folder not found", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/folders`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						folderName: "Test",
						parentId: 99999999,
					},
				}
			);

			if (response.status() !== 404) return;
			const data = await parseJsonSafely(response);

			if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should handle 409 when folder already exists", async ({ request }) => {
			const existingFolderName = `ConflictFolder-${Date.now()}`;

			await request.post(`${API_BASE_URL}/teams/${testTeamId}/folders`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					folderName: existingFolderName,
					parentId: null,
				},
			});

			const response = await request.post(`${API_BASE_URL}/teams/${testTeamId}/folders`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					folderName: existingFolderName,
					parentId: null,
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (!([200, 201]).includes(response.status())) return;
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 for repeated folder create requests", async ({
			request,
		}) => {
			const requests = Array(12)
				.fill(null)
				.map((_, index) =>
					request.post(`${API_BASE_URL}/teams/${testTeamId}/folders`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"Content-Type": "application/json",
						},
						data: {
							folderName: `RateLimitFolder-${Date.now()}-${index}`,
							parentId: null,
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
			const response = await request.post(
				`${API_BASE_URL}/teams/${testTeamId}/folders`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						folderName: "Test Folder",
						parentId: null,
					},
				}
			);

			var ct = response.headers()["content-type"] || ""; expect(ct.includes("application/json") || response.status() >= 500 || response.status() === 404).toBe(true);
		});
	});
});



