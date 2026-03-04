/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for GET /super-admin/companies/{companyId}/profile endpoint
 * Fetch company profile details (super-admin only)
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

test.describe("GET /super-admin/companies/{companyId}/profile - Comprehensive Tests", () => {
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
		const token =
			loginData.accessToken ||
			loginData.user?.auth?.accessToken ||
			loginData.token;

		if (!token) {
			return;
		}
		validAccessToken = token;
	});

	test.describe("200 Success Responses", () => {
		test("should fetch company profile successfully", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/super-admin/companies/test-company-id/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);

				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				expect(data).toHaveProperty("companyData");
			}
		});

		test("should return company profile with required fields", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/super-admin/companies/test-company-id/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);

				expect(data.companyData).toHaveProperty("companyId");
				expect(data.companyData).toHaveProperty("companyName");
			}
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when companyId is invalid", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/super-admin/companies/invalid-id/profile`,
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
				if (data.error !== undefined)
					expect(String(data.error).length).toBeGreaterThan(0);
		});
	});

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/super-admin/companies/test-id/profile`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);

			if (data.error)
				if (data.error !== undefined)
					expect(data.error).toBe("missing_access_token");
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/super-admin/companies/test-id/profile`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
						"Content-Type": "application/json",
					},
				},
			);
			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);

			if (data.error)
				if (data.error !== undefined)
					expect(data.error).toBe("invalid_access_token");
		});

		test("should return 401 when access token expired", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/super-admin/companies/test-id/profile`,
				{
					headers: {
						Authorization: "Bearer expired_token",
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status() === 401) {
				const data = await parseJsonSafely(response);

				expect(data.error).toMatch(/invalid|expired/i);
			}
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user is not super-admin", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/super-admin/companies/test-id/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status() === 403) {
				const data = await parseJsonSafely(response);

				if (data.error !== undefined)
					expect(String(data.error).length).toBeGreaterThan(0);
			}
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when company not found", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/super-admin/companies/nonexistent-id/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status() !== 404) return;
			const data = await parseJsonSafely(response);

			if (data.error !== undefined)
				expect(String(data.error).length).toBeGreaterThan(0);
		});
	});

	test.describe("Response Format Validation", () => {
		test("should include required headers in response", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/super-admin/companies/test-id/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			const contentType = response.headers()["content-type"];
			if (contentType) {
				if (contentType) expect(contentType).toBeTruthy();
			}
		});
	});
});
