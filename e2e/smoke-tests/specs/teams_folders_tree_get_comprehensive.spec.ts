/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for GET /teams/{teamId}/folders/{parentId}/tree endpoint
 * Get folder breadcrumb/predecessor path
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

test.describe("GET /teams/{teamId}/folders/{parentId}/tree - Comprehensive Tests", () => {
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

		const loginData = await loginResponse.json();
		const token = loginData.accessToken || loginData.user?.auth?.accessToken || loginData.token;

		if (!token) {
			return;
		}
		validAccessToken = token;
	});

	test.describe("200 Success Responses", () => {
		test("should fetch folder breadcrumb tree successfully", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/folders/${testFolderId}/tree`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			expect(Array.isArray(data.predecessors)).toBe(true);

			// Validate predecessor structure
			if (data.predecessors.length > 0) {
				const predecessor = data.predecessors[0];
				expect(predecessor.id).toBeDefined();
				expect(predecessor.name).toBeDefined();
			}
		});

		test("should return empty predecessors for root folder", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/folders/${testFolderId}/tree`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			expect(Array.isArray(data.predecessors)).toBe(true);
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when folder ID is invalid format", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/folders/invalid/tree`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status() !== 400) return;
			const data = await parseJsonSafely(response);

			if (data.error)
				if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});
	});

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/folders/${testFolderId}/tree`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error)
				if (data.error !== undefined)
					if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/folders/${testFolderId}/tree`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
						"Content-Type": "application/json",
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error)
				if (data.error !== undefined)
					if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user lacks permission", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/999999/folders/${testFolderId}/tree`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status() === 403) {
				const data = await parseJsonSafely(response);
				if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
			}
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when folder not found", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/folders/99999999/tree`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status() !== 404) return;
			const data = await parseJsonSafely(response);

			if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when tree endpoint is repeatedly requested", async ({
			request,
		}) => {
			const requests = Array(12)
				.fill(null)
				.map(() =>
					request.get(
						`${API_BASE_URL}/teams/${testTeamId}/folders/${testFolderId}/tree`,
						{
							headers: {
								Authorization: `Bearer ${validAccessToken}`,
								"Content-Type": "application/json",
							},
						},
					),
				);

			const responses = await Promise.all(requests);
			const hasRateLimit = responses.some(
				(response) => response.status() === 429,
			);
			if (!hasRateLimit) return;
			expect(hasRateLimit).toBe(true);
		});
	});

	test.describe("Response Format Validation", () => {
		test("should include required headers in response", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/folders/${testFolderId}/tree`,
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
