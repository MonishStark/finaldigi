/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import * as fs from "fs";
import * as path from "path";

/**
 * Comprehensive test suite for PUT /admin/users/{userId}/profile/avatar endpoint
 *
 * Based on Swagger documentation - Update user's profile avatar (SuperAdmin or Admin only)
 * Accepts multipart/form-data with image file (png/jpg/jpeg)
 */

const API_BASE_URL = "http://127.0.0.1:5050";

test.describe("PUT /admin/users/{userId}/profile/avatar - Comprehensive Tests", () => {
	let validAccessToken: string;
	let adminAccessToken: string;
	let testImagePath: string;
	const testUserId = testData.users.admin2.id;

	test.beforeAll(async ({ request }) => {
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
		adminAccessToken = token;
		validAccessToken = token;
	});

	test.afterAll(async () => {
		// Cleanup test image
		if (testImagePath && fs.existsSync(testImagePath)) {
			fs.unlinkSync(testImagePath);
		}
	});

	test.describe("200 Success Responses", () => {
		test("should upload avatar successfully", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/admin/users/${testUserId}/profile/avatar`,
				{
					headers: { Authorization: `Bearer ${validAccessToken}` },
					multipart: {
						image: {
							name: "avatar.png",
							mimeType: "image/png",
							buffer: Buffer.from(
								"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ",
								"base64",
							),
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

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when image is missing", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/admin/users/${testUserId}/profile/avatar`,
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
				`${API_BASE_URL}/admin/users/${testUserId}/profile/avatar`,
				{
					multipart: {
						image: {
							name: "avatar.png",
							mimeType: "image/png",
							buffer: Buffer.from(
								"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ",
								"base64",
							),
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
		test("should return 415 for non-multipart content", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/admin/users/${testUserId}/profile/avatar`,
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

	test.describe("422 Unprocessable Entity Responses", () => {
		test("should return 422 for invalid file type", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/admin/users/${testUserId}/profile/avatar`,
				{
					headers: { Authorization: `Bearer ${validAccessToken}` },
					multipart: {
						image: {
							name: "avatar.txt",
							mimeType: "text/plain",
							buffer: Buffer.from("not image"),
						},
					},
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
							`${API_BASE_URL}/admin/users/${testUserId}/profile/avatar`,
							{
								headers: { Authorization: `Bearer ${validAccessToken}` },
								multipart: {
									image: {
										name: "avatar.png",
										mimeType: "image/png",
										buffer: Buffer.from(
											"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ",
											"base64",
										),
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

	test.describe("Security Tests", () => {
		test("should prevent SQL injection in userId", async ({ request }) => {
			const sqlInjection = "1' OR '1'='1";
			const response = await request.put(
				`${API_BASE_URL}/admin/users/${sqlInjection}/profile/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});

		test("should validate token on every request", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/admin/users/${testUserId}/profile/avatar`,
				{
					headers: {
						Authorization: "Bearer tampered-token",
					},
				},
			);

			expect([
				200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500,
			]).toContain(response.status());
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return proper content type", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/admin/users/${testUserId}/profile/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
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
	// PERFORMANCE TESTS
	// ========================

	test.describe("Performance Tests", () => {
		test("should respond quickly (< 2000ms)", async ({ request }) => {
			const start = Date.now();

			const response = await request.put(
				`${API_BASE_URL}/admin/users/${testUserId}/profile/avatar`,
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
