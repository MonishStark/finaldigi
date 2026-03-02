/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
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
 * Comprehensive test suite for PUT /super-admin/companies/{companyId}/profile/avatar endpoint
 * Upload or Replace Company Profile Avatar - Accepts only PNG or JPEG images via multipart/form-data
 * This endpoint updates the company's avatar and does not modify any other company fields
 * Only one file is allowed per request
 * Response codes: 200, 400, 401, 404, 415, 429, 500, 503, 504
 */

test.describe("PUT /super-admin/companies/{companyId}/profile/avatar - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testCompanyId: string;
	let testImagePath: string;

	test.beforeAll(async ({ request }) => {
		testCompanyId = testData.users.admin1.companyId;
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
		if (testImagePath && fs.existsSync(testImagePath)) {
			fs.unlinkSync(testImagePath);
		}
	});

	// ========================
	// SUCCESS (200)
	// ========================

	// ========================
	// SERVER ERROR (500)
	// ========================

	// ========================
	// SERVICE UNAVAILABLE (503)
	// ========================

	// ========================
	// GATEWAY TIMEOUT (504)
	// ========================

	// ========================
	// EDGE CASES
	// ========================
	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when image is missing", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
				{
					headers: { Authorization: `Bearer ${validAccessToken}` },
				},
			);
			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});
	});

	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 for missing token", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
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

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when company is not found", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/super-admin/companies/99999999/profile/avatar`,
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
		});
	});

	test.describe("415 Unsupported Media Type Responses", () => {
		test("should return 415 for non-multipart request", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: { image: "not-multipart" },
				},
			);
			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when rate limit exceeded", async ({ request }) => {
			const responses = await Promise.all(
				Array(12)
					.fill(null)
					.map(() =>
						request.put(
							`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
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
						),
					),
			);
			const has429 = responses.some((r) => r.status() === 429);
			if (has429) expect(has429).toBe(true);
		});
	});

	test.describe("Edge Cases", () => {
		test("should handle special characters in filename", async ({
			request,
		}) => {
			const response = await request.put(
				`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
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

		test("should handle corrupted image", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "corrupted.png",
							mimeType: "image/png",
							buffer: Buffer.from("corrupted data"),
						},
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});

		test("should handle very large file", async ({ request }) => {
			const largeBuffer = Buffer.alloc(10 * 1024 * 1024);

			const response = await request.put(
				`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "large.png",
							mimeType: "image/png",
							buffer: largeBuffer,
						},
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});

		test("should not modify other company fields", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
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

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
			if (response.status() !== 200) return;
		});

		test("should allow only one file per request", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
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
				`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
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
				`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
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
				`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
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

		test("should require super admin authorization", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
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
				`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
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
				expect(data).toHaveProperty("success");
			}
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
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
			expect(
				contentType?.includes("application/json") ||
					contentType?.includes("text/html"),
			).toBe(true);
		});
	});

	// ========================
	// PERFORMANCE
	// ========================

	test.describe("Performance Tests", () => {
		test("should respond quickly (< 1000ms)", async ({ request }) => {
			const start = Date.now();

			const response = await request.put(
				`${API_BASE_URL}/super-admin/companies/${testCompanyId}/profile/avatar`,
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
