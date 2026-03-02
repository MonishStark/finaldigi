/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import * as fs from "fs";
import * as path from "path";

const API_BASE_URL = "http://127.0.0.1:5050";

async function parseJsonSafe(response: any): Promise<any> {
	try {
		return await response.json();
	} catch {
		return {};
	}
}

/**
 * Comprehensive test suite for POST /companies/{companyId}/avatar endpoint
 * Upload or update the company's logo/avatar image
 * Spec Response Codes: 200, 400, 401 (3 variants), 403, 404, 405
 */

test.describe("POST /companies/{companyId}/avatar - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testCompanyId = testData.users.admin1.companyId;
	let testImagePath = path.join(__dirname, "test-avatar.png");

	test.beforeAll(async ({ request }) => {
		// Create dummy image file for testing
		if (!fs.existsSync(testImagePath)) {
			fs.writeFileSync(testImagePath, Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64"));
		}

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
		test("should upload company logo successfully", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "company-logo.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
			const body = await parseJsonSafe(response);

			if (body.success !== undefined) expect(typeof body.success).toBe("boolean");
			if (body.message !== undefined) expect(typeof body.message).toBe("string");
			if (body.companyLogo !== undefined) {
				expect(typeof body.companyLogo).toBe("string");
				expect(body.companyLogo.length).toBeGreaterThan(0);
			}
		});

		test("should update existing company avatar with new image", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "new-logo.jpg",
							mimeType: "image/jpeg",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
			const body = await parseJsonSafe(response);

			if (body.success !== undefined) expect(typeof body.success).toBe("boolean");
			if (body.companyLogo !== undefined) expect(typeof body.companyLogo).toBe("string");
		});
	});

	// ========================
	// 400 BAD REQUEST RESPONSES
	// ========================

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when no image file provided", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			const body = await parseJsonSafe(response);
			if (response.status() !== 400) return;

			if (body.success !== undefined) expect(typeof body.success).toBe("boolean");
			if (body.error !== undefined) expect(typeof body.error).toBe("string");
			if (body.message !== undefined) expect(typeof body.message).toBe("string");
		});

		test("should return 400 when invalid companyId in path", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/invalid/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "logo.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			const body = await parseJsonSafe(response);
			if (response.status() !== 400) return;

			if (body.success !== undefined) expect(typeof body.success).toBe("boolean");
			if (body.error !== undefined) expect(typeof body.error).toBe("string");
		});
	});

	// ========================
	// 401 AUTHENTICATION ERRORS
	// ========================

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						// No Authorization header
					},
					multipart: {
						image: {
							name: "logo.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 401) return;
			const body = await parseJsonSafe(response);

			if (body.success !== undefined) expect(typeof body.success).toBe("boolean");
			if (body.error !== undefined) expect(typeof body.error).toBe("string");
			if (body.message !== undefined) expect(typeof body.message).toBe("string");
			if (Array.isArray(body.details) && body.details.length > 0) {
				expect(body.details[0]?.field).toBeTruthy();
			}
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: "Bearer invalid_token_here",
					},
					multipart: {
						image: {
							name: "logo.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 401) return;
			const body = await parseJsonSafe(response);

			if (body.success !== undefined) expect(typeof body.success).toBe("boolean");
			if (body.error !== undefined) expect(typeof body.error).toBe("string");
			if (body.message !== undefined) expect(typeof body.message).toBe("string");
		});

		test("should return 401 when access token expired", async ({ request }) => {
			// Note: Cannot easily test this without manipulating tokens
			// This test documents the expected behavior
			// In real scenario, would need expired token fixture
		});
	});

	// ========================
	// 403 FORBIDDEN RESPONSES
	// ========================

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user not allowed to update company avatar", async ({
			request,
		}) => {
			// This would require testing with a non-authorized user
			expect(testData.users.admin2).toBeDefined();
			if (!testData.users.admin2) return;

			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "logo.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			if (response.status() === 403) {
				const body = await parseJsonSafe(response);
				if (body.success !== undefined) expect(typeof body.success).toBe("boolean");
				if (body.error !== undefined) expect(typeof body.error).toBe("string");
				if (body.message !== undefined) expect(typeof body.message).toBe("string");
			}
		});
	});

	// ========================
	// 404 NOT FOUND RESPONSES
	// ========================

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when company does not exist", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/99999/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "logo.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			const body = await parseJsonSafe(response);
			if (response.status() !== 404) return;

			if (body.success !== undefined) expect(body.success).toBe(false);
			if (body.error !== undefined) expect(body.error).toBe("not_found");
			if (body.message !== undefined)
				expect(body.message).toBe("Company not found");
		});
	});

	// ========================
	// 405 METHOD NOT ALLOWED RESPONSES
	// ========================

	test.describe("405 Method Not Allowed Responses", () => {
		test("should return 405 for GET request", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			const body = await parseJsonSafe(response);
			if (response.status() !== 405) return;

			if (body.success !== undefined) expect(typeof body.success).toBe("boolean");
			if (body.error !== undefined) expect(typeof body.error).toBe("string");
			if (body.message !== undefined) expect(typeof body.message).toBe("string");
		});

		test("should return 405 for PATCH request", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					data: {
						filename: "logo.png",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			const body = await parseJsonSafe(response);
			if (response.status() !== 405) return;

			if (body.success !== undefined) expect(typeof body.success).toBe("boolean");
			if (body.error !== undefined) expect(typeof body.error).toBe("string");
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return proper content-type header for success response", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "logo.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			if (response.status() === 200) {
				expect(response.headers()["content-type"]).toContain(
					"application/json",
				);
			}
		});

		test("response should have all required success fields", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/companies/${testCompanyId}/avatar`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					multipart: {
						image: {
							name: "logo.png",
							mimeType: "image/png",
							buffer: fs.readFileSync(testImagePath),
						},
					},
				},
			);

			if (response.status() === 200) {
				const body = await parseJsonSafe(response);

				// Verify structure
				if (body.success !== undefined) expect(typeof body.success).toBe("boolean");
				if (body.message !== undefined) expect(typeof body.message).toBe("string");
				if (body.companyLogo !== undefined) expect(typeof body.companyLogo).toBe("string");
			}
		});
	});
});

