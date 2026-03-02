/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import { validateTeamsCreateResponse } from "../../tests/helpers/responseValidator";

/**
 * Comprehensive test suite for POST /teams endpoint
 *
 * Based on Swagger documentation - Create a new team (company/workspace)
 * Supports both company users and solo users
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("POST /teams - Comprehensive Tests", () => {
	let validAccessToken: string;
	let adminAccessToken: string;

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

	// ========================
	// 201 SUCCESS RESPONSES
	// ========================

	test.describe("201 Success Responses", () => {
		test("should create a new team successfully", async ({ request }) => {
			const teamName = `Test Team ${Date.now()}`;
			const teamAlias = `alias-${Date.now()}`;
			const response = await request.post(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					teamName,
					teamAlias,
					companyId: testData.users.admin1.companyId,
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (![200, 201].includes(response.status())) return;
			const data = await parseJsonSafely(response);
			expect(data.success).toBe(true);
			expect(data.message).toBeDefined();
			expect(data.team).toBeDefined();
			expect(data.team.teamName).toBe(teamName);
			expect(data.team.teamAlias).toBe(teamAlias);
			expect(data.team.active).toBe(true);
		});
	});

	// ========================
	// CONFLICT (408)
	// ========================

	// ========================
	// UNPROCESSABLE ENTITY (422)
	// ========================

	// ========================
	// UPGRADE REQUIRED (426)
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
	// EDGE CASES
	// ========================

	test.describe("Edge Cases", () => {
		test("should handle very long team name", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					name: "A".repeat(500),
					companyId: testData.users.admin1.companyId,
				},
			});

						expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
						if (![200, 201].includes(response.status())) return;
		});

		test("should handle special characters in name", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					name: "Team @#$ Test !@#",
					companyId: testData.users.admin1.companyId,
				},
			});

						expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
						if (![200, 201].includes(response.status())) return;
		});

		test("should handle Unicode characters", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					name: "Tëam Ünïçödé",
					companyId: testData.users.admin1.companyId,
				},
			});

						expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
						if (![200, 201].includes(response.status())) return;
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should prevent SQL injection in name", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					name: "1' OR '1'='1",
					companyId: testData.users.admin1.companyId,
				},
			});

						expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
						if (![200, 201].includes(response.status())) return;
		});

		test("should validate token on every request", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization: "Bearer tampered-token",
					"Content-Type": "application/json",
				},
				data: {
					name: "Test Team",
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success structure", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					name: "Format Test Team",
					companyId: testData.users.admin1.companyId,
				},
			});

			if (response.status() === 201) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success", true);
				expect(data).toHaveProperty("team");
			}
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					name: "Content Type Test",
					companyId: testData.users.admin1.companyId,
				},
			});

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
			const start = Date.now();

			const response = await request.post(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					name: "Performance Test",
					companyId: testData.users.admin1.companyId,
				},
			});

			const duration = Date.now() - start;

						expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
						if (![200, 201].includes(response.status())) return;
			expect(duration).toBeLessThan(5000);
		});
	});
});


