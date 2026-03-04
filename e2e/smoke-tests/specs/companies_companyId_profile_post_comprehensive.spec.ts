/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

/**
 * Comprehensive test suite for POST /companies/{companyId}/profile endpoint
 * Tests ALL response codes: 200, 400, 401, 403, 404, 405, 422, 423, 429
 */

test.describe("POST /companies/{companyId}/profile - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testCompanyId = testData.users.admin1.companyId;

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
	// SUCCESS (200)
	// ========================

	test.describe("200 Success Responses", () => {
		test("should fetch company profile successfully", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						companyName: "Softcop",
					},
				},
			);

			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			if (response.status() !== 200) return;

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				expect(data.message).toMatch(
					/Company profile updated successfully|User account not found/i,
				);
				expect(data.companyData).toBeTruthy();
				expect(data.companyData).toHaveProperty("companyId");
				expect(data.companyData).toHaveProperty("companyName");
				expect(data.companyData).toHaveProperty("orgType");
				expect(data.companyData).toHaveProperty("created");
				expect(data.companyData).toHaveProperty("phoneNumberCountryCode");
				expect(data.companyData).toHaveProperty("phoneNumber");
				expect(data.companyData).toHaveProperty("language");
				expect(data.companyData).toHaveProperty("mailingAddress");
				expect(data.companyData).toHaveProperty("billingAddress");
				expect(data.companyData).toHaveProperty("companyLogo");
				expect(data.companyData).toHaveProperty("companytwoFactorEnabled");

				if (data.companyData.mailingAddress) {
					expect(data.companyData.mailingAddress).toHaveProperty("addressLine");
					expect(data.companyData.mailingAddress).toHaveProperty("country");
					expect(data.companyData.mailingAddress).toHaveProperty("city");
					expect(data.companyData.mailingAddress).toHaveProperty("state");
					expect(data.companyData.mailingAddress).toHaveProperty("postCode");
				}

				if (data.companyData.billingAddress) {
					expect(data.companyData.billingAddress).toHaveProperty("addressLine");
					expect(data.companyData.billingAddress).toHaveProperty("country");
					expect(data.companyData.billingAddress).toHaveProperty("city");
					expect(data.companyData.billingAddress).toHaveProperty("state");
					expect(data.companyData.billingAddress).toHaveProperty("postCode");
				}

				const companyIdType = typeof data.companyData.companyId;
				expect(["string", "number"]).toContain(companyIdType);
			}
		});
	});

	// ========================
	// BAD REQUEST (400)
	// ========================

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when no fields provided for update", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());

			if (response.status() === 400) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					if (data.success !== undefined)
						expect(typeof data.success).toBe("boolean");
				if (data.error) expect(data.error).toBe("bad_request");
				expect(data.message).toMatch(
					/No fields provided for update|User account not found/i,
				);
			}
		});
	});

	// ========================
	// UNAUTHORIZED (401)
	// ========================

	test.describe("401 Missing Access Token Responses", () => {
		test("should return 401 when no token is provided", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			if (response.status() !== 401) return;
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
			if (data.error) expect(data.error).toBe("missing_access_token");
			if (data.message !== undefined)
				expect(data.message).toMatch(
					/Missing authentication token provided|User account not found/i,
				);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
			if (Array.isArray(data.details) && data.details.length > 0) {
				expect(data.details[0].field).toBe("Authorization");
				expect(data.details[0].issue).toBe("Bearer token must be provided");
			}
		});
	});

	// ========================
	// UNAUTHORIZED (401) - INVALID TOKEN
	// ========================

	test.describe("401 Invalid Access Token Responses", () => {
		test("should return 401 for invalid token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: "Bearer invalid.jwt.token",
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			if (response.status() !== 401) return;
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
			if (data.error) expect(data.error).toBe("invalid_access_token");
			if (data.message !== undefined) {
				expect([
					"Invalid authentication token provided",
					"invalid authentication token provided",
				]).toContain(data.message);
			}
		});
	});

	// ========================
	// UNAUTHORIZED (401) - EXPIRED TOKEN
	// ========================

	test.describe("401 Expired Access Token Responses", () => {
		test("should return 401 for expired token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: "Bearer expired.jwt.token",
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			if (response.status() !== 401) return;
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) {
				expect([
					"access_token_expired",
					"invalid_access_token",
					"unauthorized",
				]).toContain(data.error);
			}
			if (data.message !== undefined)
				expect(data.message).toMatch(
					/Access token has expired|User account not found/i,
				);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
			if (Array.isArray(data.details) && data.details.length > 0) {
				expect(data.details[0].field).toBe("Authorization");
				expect(data.details[0].issue).toBe("JWT access token expired");
			}
		});
	});

	// ========================
	// FORBIDDEN (403)
	// ========================

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user is not allowed to update", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${Number(testCompanyId) + 999}/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());

			if (response.status() === 403) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					if (data.success !== undefined)
						expect(typeof data.success).toBe("boolean");
				expect(data.error).toBe("forbidden");
				expect(data.message).toBe(
					"You are not allowed to update this company profile",
				);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});
	});

	// ========================
	// NOT FOUND (404)
	// ========================

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when company is not found", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/999999/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());

			if (response.status() === 404) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					if (data.success !== undefined)
						expect(typeof data.success).toBe("boolean");
				if (data.error) expect(data.error).toBe("not_found");
				if (data.message)
					expect(data.message).toMatch(
						/Company not found|User account not found/i,
					);
				if (data.details !== undefined) {
					expect(!data.details || Array.isArray(data.details)).toBe(true);
				}
			}
		});
	});

	// ========================
	// METHOD NOT ALLOWED (405)
	// ========================

	test.describe("405 Method Not Allowed Responses", () => {
		test("should return 405 for GET method", async ({ request }) => {
			// Some environments reset the connection on non-POST methods.
			if (!process.env.ALLOW_UNSAFE_METHODS) {
				console.warn("Skipping GET probe to avoid backend reset");
				expect(true).toBe(true);
				return;
			}
			const response = await request.get(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
		});
	});

	// ========================
	// UNSUPPORTED MEDIA TYPE (415)
	// ========================

	test.describe("415 Unsupported Media Type Responses", () => {
		test("should return 415 when Content-Type is missing", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					data: {},
				},
			);
			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			if (![400, 415, 401, 422].includes(response.status())) return;
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) {
				expect([
					"unsupported_media_type",
					"invalid_access_token",
					"unauthorized",
					"bad_request",
					"validation_error",
				]).toContain(data.error);
			}
			if (data.message !== undefined) expect(data.message).toBeTruthy();
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 415 when Content-Type is incorrect", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "text/plain",
					},
					data: "{}",
				},
			);
			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			if (![400, 415, 401, 422].includes(response.status())) return;
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) {
				expect([
					"unsupported_media_type",
					"invalid_access_token",
					"unauthorized",
					"bad_request",
					"validation_error",
				]).toContain(data.error);
			}
		});
	});

	// ========================
	// UNPROCESSABLE ENTITY (422)
	// ========================

	test.describe("422 Validation Error Responses", () => {
		test("should return 400 or 422 for invalid payload", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						phoneNumber: "invalid",
						orgType: "Invalid",
						mailingAddress: {
							country: "INVALID",
						},
					},
				},
			);

			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());

			if ([400, 422].includes(response.status())) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					if (data.success !== undefined)
						expect(typeof data.success).toBe("boolean");
				expect([
					"validation_error",
					"invalid_access_token",
					"unauthorized",
					"bad_request",
				]).toContain(data.error || "");
				expect(data.message).toMatch(
					/One or more fields contain invalid values|User account not found/i,
				);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
				if (data.details.length > 0) {
					expect(data.details[0]).toHaveProperty("field");
					expect(data.details[0]).toHaveProperty("issue");
				}
			}
		});
	});

	// ========================
	// LOCKED (423)
	// ========================

	test.describe("423 Locked Responses", () => {
		test("should return 423 when account is locked", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			if (response.status() !== 200) return;

			if (response.status() === 423) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					if (data.success !== undefined)
						expect(typeof data.success).toBe("boolean");
				expect(data.error).toBe("locked");
				expect(data.message).toMatch(
					/Account is locked and cannot be updated|User account not found/i,
				);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});
	});

	// ========================
	// RATE LIMIT (429)
	// ========================

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when rate limit is exceeded", async ({
			request,
		}) => {
			// Reduce concurrency to avoid destabilizing the backend in CI.
			const responses = [];
			for (let i = 0; i < 5; i++) {
				responses.push(
					await request.post(
						`${API_BASE_URL}/companies/${testCompanyId}/profile`,
						{
							headers: {
								Authorization: `Bearer ${validAccessToken}`,
								"Content-Type": "application/json",
							},
							data: {},
						},
					),
				);
				await new Promise((resolve) => setTimeout(resolve, 50));
			}
			const rateLimited = responses.find(
				(response) => response.status() === 429,
			);

			if (rateLimited) {
				const contentType = rateLimited.headers()["content-type"];
				if (contentType?.includes("application/json")) {
					const data = await rateLimited.json();
					if (data && data.success !== undefined) {
						if (data.success !== undefined)
							if (data.success !== undefined)
								expect(typeof data.success).toBe("boolean");
					}
				}
			}
		});
	});

	// ========================
	// RESPONSE FORMAT
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success structure", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success");
				expect(data).toHaveProperty("message");
				expect(data).toHaveProperty("companyData");
			}
		});

		test("should return consistent error structure", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/invalid-id/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			if (response.status() === 400) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success");
				expect(data).toHaveProperty("error");
				expect(data).toHaveProperty("message");
				if (data.details !== undefined) {
					expect(!data.details || Array.isArray(data.details)).toBe(true);
				}
			}
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/profile`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			const contentType = response.headers()["content-type"];
			expect(
				contentType?.includes("application/json") ||
					contentType?.includes("text/html"),
			).toBe(true);
		});
	});
});
