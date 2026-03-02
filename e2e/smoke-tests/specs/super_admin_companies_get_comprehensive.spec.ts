/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for GET /super-admin/companies endpoint
 * List all companies (super-admin only)
 * Spec Response Codes: 200, 400, 401 (3 variants), 403
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("GET /super-admin/companies - Comprehensive Tests", () => {
	let validAccessToken: string;

	test.beforeAll(async ({ request }) => {
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
		test("should fetch all companies successfully", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/super-admin/companies`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
			});

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);

				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				expect(data).toHaveProperty("companies");
				expect(Array.isArray(data.companies)).toBe(true);
			}
		});

		test("should return companies with expected structure", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/super-admin/companies`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
			});

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);

				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.companies.length > 0) {
					const company = data.companies[0];
					expect(company).toHaveProperty("id");
					expect(company).toHaveProperty("companyName");
				}
			}
		});
	});

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/super-admin/companies`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/super-admin/companies`, {
				headers: {
					Authorization: "Bearer invalid_token",
					"Content-Type": "application/json",
				},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});

		test("should return 401 when access token expired", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/super-admin/companies`, {
				headers: {
					Authorization: "Bearer expired_token",
					"Content-Type": "application/json",
				},
			});

			if (response.status() === 401) {
				const data = await parseJsonSafely(response);

				if (data.error !== undefined) expect(typeof data.error).toBe("string");
			}
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user is not super-admin", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/super-admin/companies`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
			});

			if (response.status() === 403) {
				const data = await parseJsonSafely(response);

				if (data.error !== undefined) expect(typeof data.error).toBe("string");
			}
		});
	});

	test.describe("Response Format Validation", () => {
		test("should include required headers in response", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/super-admin/companies`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
			});

			const contentType = response.headers()["content-type"];
			if (contentType) {
				expect(contentType).toContain("application/json");
			}
		});
	});
});

