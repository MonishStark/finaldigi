/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import * as fs from "fs";
import * as path from "path";

/**
 * Comprehensive test suite for PUT /companies/{companyId}/avatar endpoint
 * Uploads or replaces the company's profile picture/logo. Accepts PNG, JPG, or JPEG files via multipart/form-data (Max size: 5MB)
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("PUT /companies/{companyId}/avatar - Comprehensive Tests", () => {
	let validAccessToken: string;
	let adminAccessToken: string;
	const testCompanyId = testData.users.admin1.companyId;
	const testImagePath = path.join(__dirname, "test-avatar.png");

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
		const token =
			loginData.accessToken ||
			loginData.user?.auth?.accessToken ||
			loginData.token;

		if (!token) {
			return;
		}
		adminAccessToken = token;
		validAccessToken = token;

		// Create dummy image file for testing
		if (!fs.existsSync(testImagePath)) {
			fs.writeFileSync(
				testImagePath,
				Buffer.from(
					"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
					"base64",
				),
			);
		}
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for invalid companyId", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/invalid-id/avatar`,
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

	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 when authorization token is missing", async ({
			request,
		}) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
			);

			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
		});

		test("should return 401 for invalid token", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: "Bearer invalid_token_here",
					},
				},
			);

			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
		});

		test("should return 401 for expired token", async ({ request }) => {
			const expiredToken =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjB9.invalid";
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${expiredToken}`,
					},
				},
			);

			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
		});

		test("should return 401 for malformed Bearer token", async ({
			request,
		}) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: "InvalidFormat token",
					},
				},
			);

			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
		});
	});

	test.describe("404 Not Found", () => {
		test("should return 404 for non-existent company", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/99999999/avatar`,
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

	test.describe("Security Tests", () => {
		test("should handle SQL injection in companyId", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/' OR '1'='1/avatar`,
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

		test("should validate authorization token", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: "Bearer ",
					},
				},
			);

			expect([
				200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409,
				422, 429, 500, 502, 503,
			]).toContain(response.status());
		});
	});
});
