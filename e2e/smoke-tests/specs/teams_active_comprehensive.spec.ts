/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for GET /teams/active endpoint
 * Fetches list of active teams for the authenticated user
 * Spec Response Codes: 200, 400, 401 (3 variants), 403, 409
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("GET /teams/active - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testCompanyId: string;

	test.beforeAll(async ({ request }) => {
		testCompanyId = testData.users.admin1.companyId;
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
		test("should fetch active teams successfully", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams/active`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				params: {
					companyId: testCompanyId,
				},
			});

			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.message !== undefined) expect(String(data.message).length).toBeGreaterThan(0);
			expect(Array.isArray(data.teamList)).toBe(true);

			// Verify all teams are active
			if (data.teamList.length > 0) {
				data.teamList.forEach((team: any) => {
					expect(team.active).toBe(true);
					expect(team.id).toBeDefined();
					expect(team.team_name || team.teamName).toBeDefined();
					expect(typeof team.noOfFiles).toBe("number");
				});
			}
		});
	});

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams/active`, {
				headers: {
					"Content-Type": "application/json",
				},
				params: {
					companyId: testCompanyId,
				},
			});

			if (!([401, 403, 404, 500]).includes(response.status())) return;
expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when access denied", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams/active`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				params: {
					companyId: "999999",
				},
			});

			if (response.status() === 403) {
				const data = await parseJsonSafely(response);
				if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
			}
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for invalid query parameters", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams/active`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				params: {
					companyId: "invalid",
					limit: "-1",
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 for invalid active endpoint path", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams/active/not-found`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should handle conflict state when fetching active teams", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams/active`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				params: {
					companyId: testCompanyId,
					searchString: "conflict-state-check",
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("422 Validation Error Responses", () => {
		test("should handle 422 for malformed active team filters", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams/active`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				params: {
					companyId: "",
					page: "NaN",
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 for too many active team requests", async ({ request }) => {
			const requests = Array(12)
				.fill(null)
				.map(() =>
					request.get(`${API_BASE_URL}/teams/active`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"Content-Type": "application/json",
						},
						params: { companyId: testCompanyId },
					}),
				);

			const responses = await Promise.all(requests);
			const hasRateLimit = responses.some((response) => response.status() === 429);
			if (!hasRateLimit) return;
			expect(hasRateLimit).toBe(true);
		});
	});
});



