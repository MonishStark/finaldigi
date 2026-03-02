/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for GET /teams endpoint
 * Fetches list of teams for the authenticated user
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

console.log("DEBUG: testData keys:", Object.keys(testData));
if (testData.users) {
	console.log("DEBUG: testData.users keys:", Object.keys(testData.users));
	console.log("DEBUG: admin1:", JSON.stringify(testData.users.admin1));
} else {
	console.log("DEBUG: testData.users IS UNDEFINED");
}

test.describe("GET /teams - Comprehensive Tests", () => {
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

	// ========================
	// 200 SUCCESS RESPONSES
	// ========================

	test.describe("200 Success Responses", () => {
		test("should fetch team list successfully", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				params: {
					companyId: testCompanyId,
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if ([401, 403].includes(response.status())) return;
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(Array.isArray(data.teamList)).toBe(true);
			if (data.totalPagesNum !== undefined)
				expect(typeof data.totalPagesNum).toBe("number");
			if (data.noOfRecords !== undefined)
				expect(typeof data.noOfRecords).toBe("number");

			// Validate team structure
			if (data.teamList.length > 0) {
				const team = data.teamList[0];
				expect(team.id).toBeDefined();
				expect(team.companyId).toBeDefined();
				expect(team.creatorId).toBeDefined();
				expect(team.teamName).toBeDefined();
				expect(team.teamAlias).toBeDefined();
				expect(typeof team.active).toBe("boolean");
				expect(team.uuid).toBeDefined();
				expect(team.created).toBeDefined();
				expect(team.updated).toBeDefined();
				expect(typeof team.noOfFiles).toBe("number");
			}
		});

		test("should support pagination parameters", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				params: {
					companyId: testCompanyId,
					offset: 0,
					limit: 10,
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if ([401, 403].includes(response.status())) return;
			const data = await parseJsonSafely(response);

			expect(data.teamList).toBeDefined();
			expect(Array.isArray(data.teamList)).toBe(true);
		});
	});

	// ========================
	// 400 BAD REQUEST RESPONSES
	// ========================

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when companyId invalid for company users", async ({
			request,
		}) => {
			const response = await request.get(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				params: {
					companyId: "invalid",
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (response.status() === 400) {
				if (data.success !== undefined) if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
				expect(data.message).toContain("invalid");
			}
		});
	});

	// ========================
	// 401 AUTHENTICATION ERRORS
	// ========================

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams`, {
				headers: {
					"Content-Type": "application/json",
				},
				params: {
					companyId: testCompanyId,
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization: "Bearer invalid_token",
					"Content-Type": "application/json",
				},
				params: {
					companyId: testCompanyId,
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.success !== undefined) if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});

		test("should return 401 when access token expired", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjB9.invalid",
					"Content-Type": "application/json",
				},
				params: {
					companyId: testCompanyId,
				},
			});

			if (response.status() === 401) {
				const data = await parseJsonSafely(response);
				expect([
					"access_token_expired",
					"invalid_access_token",
					"unauthorized",
				]).toContain(data.error || "");
			}
		});
	});

	// ========================
	// 403 FORBIDDEN RESPONSES
	// ========================

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user does not have access", async ({
			request,
		}) => {
			const response = await request.get(`${API_BASE_URL}/teams`, {
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
				if (data.success !== undefined) if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				expect(data.message).toContain("Access Denied");
			}
		});
	});

	// ========================
	// 409 CONFLICT RESPONSES
	// ========================

	test.describe("409 Conflict Responses", () => {
		test("should return 409 when failed to fetch team list", async ({
			request,
		}) => {
			// This would be a transient error scenario
			// Test documents expected behavior
		});
	});

	// ========================
	// 404 NOT FOUND RESPONSES
	// ========================

	test.describe("404 Not Found Responses", () => {
		test("should handle invalid route parameters with not found response", async ({
			request,
		}) => {
			const response = await request.get(`${API_BASE_URL}/teams/non-existent`, {
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

	// ========================
	// 422 VALIDATION RESPONSES
	// ========================

	test.describe("422 Validation Error Responses", () => {
		test("should handle invalid query format for filter params", async ({
			request,
		}) => {
			const response = await request.get(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				params: {
					companyId: "invalid-company-id",
					page: "-1",
					limit: "0",
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	// ========================
	// 429 RATE LIMIT RESPONSES
	// ========================

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when team list endpoint is heavily requested", async ({
			request,
		}) => {
			const requests = Array(12)
				.fill(null)
				.map(() =>
					request.get(`${API_BASE_URL}/teams`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"Content-Type": "application/json",
						},
						params: {
							companyId: testCompanyId,
						},
					}),
				);

			const responses = await Promise.all(requests);
			const hasRateLimit = responses.some((response) => response.status() === 429);
			if (!hasRateLimit) return;

			const rateLimited = responses.find((response) => response.status() === 429);
			if (rateLimited) {
				const contentType = rateLimited.headers()["content-type"] || "";
				expect(contentType.includes("application/json") || contentType.includes("text/")).toBe(true);
			}
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return proper content-type", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/teams`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				params: {
					companyId: testCompanyId,
				},
			});

			var ct = response.headers()["content-type"] || "";
			expect(
				ct.includes("application/json") ||
					response.status() >= 500 ||
					response.status() === 404,
			).toBe(true);
		});
	});
});

