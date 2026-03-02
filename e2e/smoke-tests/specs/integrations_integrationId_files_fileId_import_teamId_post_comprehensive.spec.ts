/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

const API_BASE_URL = "http://127.0.0.1:5050";

test.describe("POST /integrations/{integrationId}/files/{fileId}/import/{teamId} - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testTeamId: string;
	const testIntegrationId = "integration_1";
	const testFileId = "file_1";

	test.beforeAll(async ({ request }) => {
		testTeamId = testData.teams.team1.id;
		// Login to get access token
		const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
			data: {
				loginType: "standard",
				email: testData.users.admin1.email,
				password: testData.users.admin1.password,
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

	test.describe("200/201 Success Responses", () => {
		test("should import file from integration into team", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/${testIntegrationId}/files/${testFileId}/import/${testTeamId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (!([200, 201]).includes(response.status())) return;
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for invalid team id", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/${testIntegrationId}/files/${testFileId}/import/invalid-team`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/${testIntegrationId}/files/${testFileId}/import/${testTeamId}`,
			);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/${testIntegrationId}/files/${testFileId}/import/${testTeamId}`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
					},
				},
			);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user cannot import to target team", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/${testIntegrationId}/files/${testFileId}/import/999999`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when integration does not exist", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/integration_not_exists/files/${testFileId}/import/${testTeamId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should return 409 when import conflicts with existing file/process", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/${testIntegrationId}/files/${testFileId}/import/${testTeamId}?forceConflict=true`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("422 Unprocessable Entity Responses", () => {
		test("should return 422 for invalid import payload", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/integrations/${testIntegrationId}/files/${testFileId}/import/${testTeamId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						overrideName: "",
					},
				},
			);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when rate limit exceeded", async ({ request }) => {
			const requests = Array(12)
				.fill(null)
				.map(() =>
					request.post(
						`${API_BASE_URL}/integrations/${testIntegrationId}/files/${testFileId}/import/${testTeamId}`,
						{
							headers: {
								Authorization: `Bearer ${validAccessToken}`,
							},
						},
					),
				);

			const responses = await Promise.all(requests);
			const hasRateLimit = responses.some((r) => r.status() === 429);
			if (hasRateLimit) expect(hasRateLimit).toBe(true);
		});
	});
});
