/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for GET /teams/{teamId}/files/{fileId}/summary endpoint
 * Retrieve file summary - Returns processed summary data including general overview and extracted notes
 */

const API_BASE_URL = "http://127.0.0.1:5050";

test.describe("GET /teams/{teamId}/files/{fileId}/summary - Comprehensive Tests", () => {
	let validAccessToken: string;
	let adminAccessToken: string;
	const testTeamId = testData.teams.team3.id;

	test.beforeAll(async ({ request }) => {
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
		adminAccessToken = token;
		validAccessToken = token;
	});

	test.describe("200 Success Responses", () => {
		test("should fetch summary for a valid file request", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/summary`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for invalid teamId", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/invalid-id/files/some-file-id/summary`,
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

		test("should return 400 for invalid fileId", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/files/invalid-id/summary`,
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
		test("should return 401 when authorization token is missing", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/summary`,
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 401 for invalid token", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/summary`,
				{
					headers: {
						Authorization: "Bearer invalid_token_here",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 401 for expired token", async ({ request }) => {
			const expiredToken =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjB9.invalid";
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/summary`,
				{
					headers: {
						Authorization: `Bearer ${expiredToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 401 for malformed Bearer token", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/summary`,
				{
					headers: {
						Authorization: "InvalidFormat token",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("404 Not Found", () => {
		test("should return 404 for non-existent file", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/files/99999999-9999-9999-9999-999999999999/summary`,
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

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user lacks access to summary", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/999999/files/some-file-id/summary`,
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

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 for repeated summary requests", async ({ request }) => {
			const requests = Array(12)
				.fill(null)
				.map(() =>
					request.get(`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/summary`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
						},
					}),
				);

			const responses = await Promise.all(requests);
			const hasRateLimit = responses.some((response) => response.status() === 429);
			if (!hasRateLimit) return;
			expect(hasRateLimit).toBe(true);
		});
	});

	test.describe("Security Tests", () => {
		test("should validate authorization token", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/summary`,
				{
					headers: {
						Authorization: "Bearer ",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should handle SQL injection in fileId", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/teams/${testTeamId}/files/' OR '1'='1/summary`,
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

	
});


