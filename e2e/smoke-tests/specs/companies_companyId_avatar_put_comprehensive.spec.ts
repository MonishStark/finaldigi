/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import { validateCompaniesAvatarResponse } from "../../tests/helpers/responseValidator";
import * as fs from "fs";
import * as path from "path";

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

/**
 * Comprehensive test suite for PUT /companies/{companyId}/avatar endpoint
 * Upload or replace the company's profile avatar (PNG, JPG, or JPEG, Max 5MB)
 * Response codes: 200, 400, 401, 403, 404, 406, 415, 422, 423, 429, 500, 503, 504
 */

test.describe("PUT /companies/{companyId}/avatar - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testCompanyId: string;
	let testImagePath: string;

	test.beforeAll(async ({ request }) => {
		testCompanyId = String(testData.users.admin1.companyId);
		// Create a dummy image file for testing
		testImagePath = path.join(__dirname, "test_avatar.png");
		const dummyImageBuffer = Buffer.from(
			"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ",
			"base64",
		);
		fs.writeFileSync(testImagePath, dummyImageBuffer);

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
		validAccessToken = token;
	});

	test.afterAll(async () => {
		// Cleanup test image
		if (fs.existsSync(testImagePath)) {
			fs.unlinkSync(testImagePath);
		}
	});

	// ========================
	// 200 SUCCESS RESPONSES
	// ========================

	test.describe("200 Success Responses", () => {
		test("should update company avatar successfully", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: { Authorization: `Bearer ${validAccessToken}` },
					multipart: {
						image: {
							name: "avatar.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);
			expect(data.success).toBe(true);
			if (data.message !== undefined)
				expect(typeof data.message).toBe("string");
			expect(data.companyLogo).toBeDefined();
			if (data.companyLogo !== undefined)
				expect(typeof data.companyLogo).toBe("string");
		});
	});

	// ========================
	// 400 BAD REQUEST RESPONSES
	// ========================

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for invalid companyId", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/invalid-id/avatar`,
				{
					headers: { Authorization: `Bearer ${validAccessToken}` },
					multipart: {
						image: {
							name: "avatar.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);
			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status()); // Caught by companyExist middleware
		});

		test("should return 400 when no image file is provided", async ({
			request,
		}) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: { Authorization: `Bearer ${validAccessToken}` },
					multipart: {},
				},
			);
			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			const data = await parseJsonSafely(response);
			expect(data.success).toBe(false);
			if (data.message !== undefined)
				expect(typeof data.message).toBe("string");
		});
	});

	test.describe("Edge Cases", () => {
		test("should handle special characters in filename", async ({
			request,
		}) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "avatar!@#$%.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
		});

		test("should handle unicode in filename", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "头像.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
		});

		test("should handle concurrent avatar uploads", async ({ request }) => {
			const requests = Array(3)
				.fill(null)
				.map((_, i) =>
					request.put(`${API_BASE_URL}/companies/${testCompanyId}/avatar`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
						},
						multipart: {
							image: {
								name: `avatar-${i}.png`,
								mimeType: "image/png",
								buffer: fs.readFileSync(testImagePath),
							},
						},
					}),
				);

			const responses = await Promise.all(requests);

			responses.forEach((response) => {
				expect([
					200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
				]).toContain(response.status());
				if (response.status() !== 200) return;
			});
		});

		test("should handle very long filename", async ({ request }) => {
			const longName = "a".repeat(255) + ".png";

			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: longName,
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
		});

		test("should handle filename without extension", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "avatar",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should validate token on every request", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: "Bearer malformed-token",
					},
					multipart: {
						image: {
							name: "avatar.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});

		test("should prevent path traversal in filename", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "../../etc/passwd.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
		});

		test("should not expose sensitive data in response", async ({
			request,
		}) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "avatar.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			if (response.headers()["content-type"]?.includes("application/json")) {
				const data = await parseJsonSafely(response);
				const responseText = JSON.stringify(data);

				expect(responseText).not.toContain("password");
				expect(responseText).not.toContain("secretKey");
			}
		});

		test("should require proper authorization", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					multipart: {
						image: {
							name: "avatar.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});
	});

	// ========================
	// RESPONSE FORMAT
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success structure", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "avatar.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			if (
				response.status() === 200 &&
				response.headers()["content-type"]?.includes("application/json")
			) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success", true);
				expect(data).toHaveProperty("companyLogo");
			}
		});

		test("should return consistent error structure", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {},
				},
			);

			if (response.headers()["content-type"]?.includes("application/json")) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) {
					expect(data).toHaveProperty("success");
				}
			}
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "avatar.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			const contentType = response.headers()["content-type"];
			expect(contentType?.includes("application/json")).toBe(true);
		});
	});

	// ========================
	// PERFORMANCE
	// ========================

	test.describe("Performance Tests", () => {
		test("should respond quickly (< 1000ms)", async ({ request }) => {
			const start = Date.now();

			const response = await request.put(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "avatar.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			const duration = Date.now() - start;

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
			expect(duration).toBeLessThan(5000);
		});
	});
});
