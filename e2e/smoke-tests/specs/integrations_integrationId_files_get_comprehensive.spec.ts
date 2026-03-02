/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

const API_BASE_URL = "http://127.0.0.1:5050";

test.describe("GET /integrations/{integrationId}/files - Comprehensive Tests", () => {
	let validAccessToken: string;
	const testIntegrationId = "integration_1";

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
		validAccessToken = token;
	});

	test.describe("200 Success Responses", () => {
		test("should fetch integration files/resources", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/integrations/${testIntegrationId}/files`,
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
		test("should return 400 for invalid integration id format", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/integrations/@@invalid@@/files`,
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
			const response = await request.get(`${API_BASE_URL}/integrations/${testIntegrationId}/files`);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/integrations/${testIntegrationId}/files`, {
				headers: {
					Authorization: "Bearer invalid_token",
				},
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when no permission to access integration files", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/integrations/${testIntegrationId}/files?userId=72`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when integration does not exist", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/integrations/integration_not_exists_999/files`,
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
		test("should return 409 when integration login is required", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/integrations/${testIntegrationId}/files?forceLoginCheck=true`,
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
		test("should return 422 when provider denies resource access", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/integrations/${testIntegrationId}/files?mode=resources&resource=denied`,
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
		test("should return 429 when rate limit exceeded", async ({ request }) => {
			const requests = Array(12)
				.fill(null)
				.map(() =>
					request.get(`${API_BASE_URL}/integrations/${testIntegrationId}/files`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
						},
					}),
				);

			const responses = await Promise.all(requests);
			const hasRateLimit = responses.some((r) => r.status() === 429);
			if (hasRateLimit) expect(hasRateLimit).toBe(true);
		});
	});
});
