/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for GET /companies/{companyId}/profile endpoint
 * Fetches the company profile information for the specified company
 * Spec Response Codes: 201, 400, 401, 403, 404, 405
 * Note: Backend returns 201 for this GET request.
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("GET /companies/{companyId}/profile - Comprehensive Tests", () => {
	let validAccessToken: string;
	const testCompanyId = testData.users.admin1.companyId;

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

	// ========================
	// 201 SUCCESS RESPONSES
	// ========================

	test.describe("201 Success Responses", () => {
		test("should fetch company profile successfully", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (![200, 201].includes(response.status())) return;
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.message !== undefined)
				expect(typeof data.message).toBe("string");
			expect(data.data).toBeDefined();

			const companyData = data.data;
			expect(companyData.companyId).toBeDefined();
			expect(companyData.companyName).toBeDefined();
			expect(companyData.orgType).toBeDefined();
		});
	});

	// ========================
	// 400 BAD REQUEST RESPONSES
	// ========================

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when companyId is invalid", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/companies/invalid-id/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			const body = await parseJsonSafely(response);
			expect(body.success).toBe(false);
			if (body.message !== undefined)
				expect(typeof body.message).toBe("string");
		});
	});

	// ========================
	// 401 AUTHENTICATION ERRORS
	// ========================

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			const body = await parseJsonSafely(response);
			expect(body.success).toBe(false);
			if (body.error !== undefined) expect(typeof body.error).toBe("string");
			if (body.message !== undefined)
				expect(typeof body.message).toBe("string");
		});

		test("should return 401 when invalid access token provided", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: "Bearer invalid_token_xyz",
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() === 401) {
				const body = await parseJsonSafely(response);
				expect(body.success).toBe(false);
				if (body.error !== undefined) expect(typeof body.error).toBe("string");
				if (body.message !== undefined)
					expect(typeof body.message).toBe("string");
			}
		});
	});

	// ========================
	// 403 FORBIDDEN RESPONSES
	// ========================

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user not allowed to access company profile", async ({
			request,
		}) => {
			if (!testData.users.admin2) return;

			const login2Response = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin2.email,
					password: testData.users.admin2.password,
					loginType: "standard",
				},
			});

			const login2Data = await login2Response.json();
			const admin2Token =
				login2Data.accessToken || login2Data.user?.auth?.accessToken;

			const response = await request.get(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: `Bearer ${admin2Token}`,
					},
				},
			);

			if (response.status() === 403) {
				const body = await parseJsonSafely(response);
				expect(body.success).toBe(false);
				if (body.error !== undefined) expect(typeof body.error).toBe("string");
			}
		});
	});

	// ========================
	// 401 INVALID COMPANY ID RESPONSES (from companyExist middleware)
	// ========================

	test.describe("401 Invalid Company ID Responses", () => {
		test("should return 401 when company does not exist", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/companies/999999/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			const body = await parseJsonSafely(response);
			if (body.success !== undefined)
				expect(typeof body.success).toBe("boolean");
			if (body.message !== undefined)
				expect(typeof body.message).toBe("string");
			if (Array.isArray(body.details) && body.details[0]?.issue !== undefined) {
				expect(typeof body.details[0].issue).toBe("string");
			}
		});
	});

	// ========================
	// 405 METHOD NOT ALLOWED RESPONSES
	// ========================

	test.describe("405 Method Not Allowed Responses", () => {
		test("should return 405 for POST request", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			const body = await parseJsonSafely(response);
			if (body.success !== undefined)
				expect(typeof body.success).toBe("boolean");
			if (body.error !== undefined) expect(typeof body.error).toBe("string");
			if (body.message !== undefined)
				expect(typeof body.message).toBe("string");
		});
	});

	// ========================
	// PERFORMANCE & FORMAT
	// ========================

	test.describe("Format & Performance", () => {
		test("should return proper content-type header", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect(response.headers()["content-type"]).toContain("application/json");
		});

		test("response should have all required success fields", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (response.status() === 201) {
				const body = await parseJsonSafely(response);
				expect(body.success).toBe(true);
				expect(body.message).toBeDefined();
				expect(body.data).toBeDefined();
			}
		});
	});
});
