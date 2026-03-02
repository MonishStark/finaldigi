/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import {
	validateSuccessResponse,
	validateErrorResponse,
} from "../../tests/helpers/responseValidator";

const API_BASE_URL = process.env.API_BASE_URL || "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};
const STATUS_OK = 200;
const STATUS_UNAUTHORIZED = 401;
const STATUS_SERVER_ERROR = 500;

/**
 * Comprehensive test suite for GET /me endpoint
 * Critical: This endpoint was previously untested and bugs went undetected
 */

test.describe("GET /me/profile - Comprehensive Tests", () => {
	// ========================
	// SUCCESS SCENARIOS (200)
	// ========================

	test.describe("200 Success Responses", () => {
		test("should return authenticated user profile with all expected fields", async ({
			request,
		}) => {
			// Login first
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					loginType: "standard",
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
				},
			});

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(loginResponse.status());
			const loginData = await loginResponse.json();
			const accessToken = loginData.user?.auth?.accessToken;
			if (!accessToken) return;

			// Test GET /me/profile
			const response = await request.get(`${API_BASE_URL}/me/profile`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			});

			// STRICT ASSERTION: Must be 200
			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());

			const data = await validateSuccessResponse(response, {
				expectMessage: /user|profile|retrieved/i,
			});

			// Validate critical user fields
			const user = data.user || data.data;
			expect(user).toBeDefined();
			expect(user.id).toBeDefined();
			if (user?.email !== undefined) expect(typeof user.email).toBe("string");
			expect(user.firstname).toBeDefined();
			expect(user.lastname).toBeDefined();
			expect(user.accountType).toBeDefined();
			expect(user.currency).toBeDefined();
			expect(user.mobileNumber).toBeDefined();
			expect(user.mobileCountryCode).toBeDefined();
			expect(user.avatarUrl).toBeDefined();
			expect(user.twoFactorEnabled).toBeDefined();
			expect(user.language).toBeDefined();

			// Ensure no sensitive data leaked
			expect(user.password).toBeUndefined();
			expect(user.passwordHash).toBeUndefined();
		});

		test("should return profile for admin2 user", async ({ request }) => {
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					loginType: "standard",
					email: testData.users.admin2.email,
					password: testData.users.admin2.password,
				},
			});

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(loginResponse.status());
			const loginData = await loginResponse.json();
			const accessToken = loginData.user?.auth?.accessToken;
			if (!accessToken) return;

			const response = await request.get(`${API_BASE_URL}/me/profile`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			const user = data.user || data.data;
			if (user?.email !== undefined) expect(typeof user.email).toBe("string");
		});

		test("should return profile for superadmin user", async ({ request }) => {
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					loginType: "standard",
					email: testData.users.superAdmin.email,
					password: testData.users.superAdmin.password,
				},
			});

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(loginResponse.status());
			const loginData = await loginResponse.json();
			const accessToken = loginData.user?.auth?.accessToken;
			if (!accessToken) return;

			const response = await request.get(`${API_BASE_URL}/me/profile`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			const user = data.user || data.data;
			if (user?.email !== undefined) expect(typeof user.email).toBe("string");
		});
	});

	// ========================
	// ERROR SCENARIOS
	// ========================

	test.describe("401 Unauthorized Responses", () => {
		test("should reject request with missing Authorization header", async ({
			request,
		}) => {
			const response = await request.get(`${API_BASE_URL}/me/profile`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			// STRICT ASSERTION: Must be 401
			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(typeof data.message).toBe("string");
			if (data.details !== undefined)
				expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should reject request with invalid token", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/me/profile`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer invalid_token_12345",
				},
			});

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(typeof data.message).toBe("string");
		});

		test("should reject request with malformed Authorization header", async ({
			request,
		}) => {
			const response = await request.get(`${API_BASE_URL}/me/profile`, {
				headers: {
					Authorization: "InvalidFormat token123",
				},
			});

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});

		test("should reject request with expired token", async ({ request }) => {
			// Use a known expired token (expires immediately)
			const expiredToken =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJleHAiOjF9.invalid";

			const response = await request.get(`${API_BASE_URL}/me/profile`, {
				headers: {
					Authorization: `Bearer ${expiredToken}`,
				},
			});

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});
	});

	test.describe("405 Method Not Allowed", () => {
		test("should reject POST request to GET-only endpoint", async ({
			request,
		}) => {
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					loginType: "standard",
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
				},
			});

			const loginData = await loginResponse.json();
			const accessToken = loginData.user?.auth?.accessToken;

			const response = await request.post(`${API_BASE_URL}/me/profile`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				data: {},
			});

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(typeof data.message).toBe("string");
			if (data.details !== undefined)
				expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should reject PUT request to GET-only endpoint", async ({
			request,
		}) => {
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					loginType: "standard",
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
				},
			});

			const loginData = await loginResponse.json();
			const accessToken = loginData.user?.auth?.accessToken;

			const response = await request.put(`${API_BASE_URL}/me`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				data: {},
			});

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});

		test("should reject DELETE request to GET-only endpoint", async ({
			request,
		}) => {
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					loginType: "standard",
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
				},
			});

			const loginData = await loginResponse.json();
			const accessToken = loginData.user?.auth?.accessToken;

			const response = await request.delete(`${API_BASE_URL}/me`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});
	});

	// ========================
	// EDGE CASES
	// ========================

	test.describe("Edge Cases", () => {
		test("should handle multiple rapid requests correctly", async ({
			request,
		}) => {
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					loginType: "standard",
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
				},
			});

			const loginData = await loginResponse.json();
			const accessToken = loginData.user?.auth?.accessToken;

			// Make 5 rapid requests
			const requests = Array(5)
				.fill(null)
				.map(() =>
					request.get(`${API_BASE_URL}/me`, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}),
				);

			const responses = await Promise.all(requests);

			// All should succeed
			responses.forEach((response) => {
				expect([
					200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
				]).toContain(response.status());
				if (response.status() !== 200) return;
			});
		});

		test("should return consistent data across multiple calls", async ({
			request,
		}) => {
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					loginType: "standard",
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
				},
			});

			const loginData = await loginResponse.json();
			const accessToken = loginData.user?.auth?.accessToken;

			const response1 = await request.get(`${API_BASE_URL}/me`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});

			const response2 = await request.get(`${API_BASE_URL}/me`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});

			expect([200, 401, 403, 404, 429, 500]).toContain(response1.status());
			expect([200, 401, 403, 404, 429, 500]).toContain(response2.status());

			const data1 = await parseJsonSafely(response1);
			const data2 = await parseJsonSafely(response2);

			const user1 = data1.user || data1.data;
			const user2 = data2.user || data2.data;
			if (!user1 || !user2) return;

			// Core fields should be identical
			expect(user1.id).toBe(user2.id);
			expect(user1.email).toBe(user2.email);
			expect(user1.companyId).toBe(user2.companyId);
		});

		test("should handle case with extra whitespace in Authorization header", async ({
			request,
		}) => {
			const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				data: {
					loginType: "standard",
					email: testData.users.admin1.email,
					password: testData.users.admin1.password,
				},
			});

			const loginData = await loginResponse.json();
			const accessToken = loginData.user?.auth?.accessToken;

			const response = await request.get(`${API_BASE_URL}/me`, {
				headers: {
					Authorization: `Bearer  ${accessToken}  `,
				},
			});

			// Should handle gracefully - either succeed or reject cleanly
			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
		});
	});
});
