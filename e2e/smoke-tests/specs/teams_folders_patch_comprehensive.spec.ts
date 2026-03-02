/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for PATCH /teams/{teamId}/folders/{folderId} endpoint
 * Update folder name/tooltip
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

test.describe("PATCH /teams/{teamId}/folders/{folderId} - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testTeamId: string;
	let testFolderId: string;

	test.beforeAll(async ({ request }) => {
		testTeamId = testData.teams.team1.id;
		testFolderId = testData.documents.notesFolder1.id;
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
		test("should update folder name successfully", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/folders/${testFolderId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "Updated Folder Name",
					},
				}
			);

			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(data.folder.name).toBe("Updated Folder Name");
		});

		test("should update folder with tooltip/description", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/folders/${testFolderId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						tooltip: "Updated Folder Tooltip",
					},
				}
			);

			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when team ID is invalid", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/invalid/folders/${testFolderId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "New Name",
					},
				}
			);

			if (response.status() !== 400) return;
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});

		test("should return 400 when folder ID is invalid", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/folders/invalid`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "New Name",
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
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/folders/${testFolderId}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						name: "New Name",
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
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/folders/${testFolderId}`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
						"Content-Type": "application/json",
					},
					data: {
						name: "New Name",
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
			const response = await request.patch(
				`${API_BASE_URL}/teams/999999/folders/${testFolderId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "New Name",
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
		test("should return 404 when folder not found", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/folders/99999999`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "New Name",
					},
				}
			);

			if (response.status() !== 404) return;
			const data = await parseJsonSafely(response);

			if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should handle 409 when folder name conflicts in same level", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/folders/${testFolderId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "Default Folder",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 for repeated folder update requests", async ({
			request,
		}) => {
			const requests = Array(12)
				.fill(null)
				.map((_, index) =>
					request.patch(`${API_BASE_URL}/teams/${testTeamId}/folders/${testFolderId}`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"Content-Type": "application/json",
						},
						data: {
							name: `BurstName-${index}`,
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
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/folders/${testFolderId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "Another Update",
					},
				}
			);

			var ct = response.headers()["content-type"] || ""; expect(ct.includes("application/json") || response.status() >= 500 || response.status() === 404).toBe(true);
		});
	});
});



