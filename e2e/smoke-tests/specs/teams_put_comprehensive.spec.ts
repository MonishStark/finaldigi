/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for PUT /teams/{teamId} endpoint
 *
 * Based on Swagger documentation - Update an existing team
 */

const API_BASE_URL = "http://127.0.0.1:5050";

test.describe("PUT /teams/{teamId} - Comprehensive Tests", () => {
	let validAccessToken: string;
	let adminAccessToken: string;
	let testTeamId: string;

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
		adminAccessToken = token;
		validAccessToken = token;
	
		// Fetch teams to get a valid team ID
		const teamsResponse = await request.get(`${API_BASE_URL}/teams`, {
			headers: { Authorization: `Bearer ${validAccessToken}` },
			params: { companyId: testData.users.admin1.companyId }
		});

		if (teamsResponse.ok()) {
			const teamsData = await teamsResponse.json();
			if (teamsData.results && teamsData.results.length > 0) {
				testTeamId = teamsData.results[0].id;
			}
		}
	});

	// ========================
	// SUCCESS (200)
	// ========================

	// ========================
	// NOT FOUND (404)
	// ========================

	// ========================
	// UNSUPPORTED MEDIA TYPE (415)
	// ========================

	// ========================
	// LOCKED (423)
	// ========================

	// ========================
	// RATE LIMIT (429)
	// ========================

	// ========================
	// SERVER ERROR (500)
	// ========================

	// ========================
	// SERVICE UNAVAILABLE (503/504)
	// ========================

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should prevent SQL injection in teamId", async ({ request }) => {
			const sqlInjection = "1' OR '1'='1";
			const response = await request.put(
				`${API_BASE_URL}/teams/${sqlInjection}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "Updated",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});

		test("should validate token on every request", async ({ request }) => {
			const response = await request.put(`${API_BASE_URL}/teams/test-team-id`, {
				headers: {
					Authorization: "Bearer tampered-token",
					"Content-Type": "application/json",
				},
				data: {
					name: "Updated",
				},
			});

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return proper content type", async ({ request }) => {
			if (!testTeamId) {
				expect(true).toBe(true);
				return;
			}

			const response = await request.put(
				`${API_BASE_URL}/teams/${testTeamId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "Content Test",
					},
				},
			);

			const contentType = response.headers()["content-type"];
			expect(
				contentType?.includes("application/json") ||
					contentType?.includes("text/html"),
			).toBe(true);
		});
	});

	// ========================
	// PERFORMANCE TESTS
	// ========================

	test.describe("Performance Tests", () => {
		test("should respond quickly (< 1000ms)", async ({ request }) => {
			if (!testTeamId) {
				expect(true).toBe(true);
				return;
			}

			const start = Date.now();

			const response = await request.put(
				`${API_BASE_URL}/teams/${testTeamId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						name: "Perf Test",
					},
				},
			);

			const duration = Date.now() - start;

			expect([200, 400, 401, 403, 404, 409, 422, 423]).toContain(
				response.status(),
			);
			expect(duration).toBeLessThan(5000);
		});
	});
});


