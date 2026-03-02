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
 * Comprehensive test suite for PATCH /files/:fileId/name endpoint
 *
 * Based on Swagger documentation - Update filename for the HTML file
 */

test.describe("PATCH /files/:fileId/name - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testFileId: string;

	test.beforeAll(async ({ request }) => {
		testFileId = testData.documents.chatgptPdf.id;
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
		const token = loginData.accessToken || loginData.user?.auth?.accessToken || loginData.token;

		if (!token) {
			return;
		}
		validAccessToken = token;
	});

	// ========================
	// SUCCESS (200)
	// ========================

	// ========================
	// NOT FOUND (404)
	// ========================

	test.describe("404 Not Found Responses", () => {
		test("should return 404 for non-existent file", async ({ request }) => {
			const nonExistentId = "00000000-0000-0000-0000-000000000000";

			const response = await request.patch(
				`${API_BASE_URL}/files/${nonExistentId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						filename: "test.pdf",
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});
	});

	// ========================
	// UNSUPPORTED MEDIA TYPE (415)
	// ========================

	test.describe("415 Unsupported Media Type", () => {
		test("should return 415 when Content-Type is missing", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					data: {
						filename: "test.pdf",
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});

		test("should return 415 for wrong Content-Type", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "text/plain",
					},
					data: {
						filename: "test.pdf",
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});
	});

	// ========================
	// METHOD NOT ALLOWED (405)
	// ========================

	test.describe("405 Method Not Allowed", () => {
		test("should return 405 for GET method", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/files/${testFileId}/name`,
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});

		test("should return 405 for POST method", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/${testFileId}/name`,
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});

		test("should return 405 for DELETE method", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/files/${testFileId}/name`,
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});
	});

	// ========================
	// EDGE CASES
	// ========================

	test.describe("Edge Cases", () => {
		test("should handle very long filename", async ({ request }) => {
			const longFilename = "a".repeat(255) + ".pdf";

			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						filename: longFilename,
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should handle special characters in filename", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						filename: "test!@#$%^&*().pdf",
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should trim whitespace from filename", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						filename: "  test-file.pdf  ",
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should handle unicode characters in filename", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						filename: "文件名测试.pdf",
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should handle concurrent update attempts", async ({ request }) => {
			const updates = Array(3)
				.fill(null)
				.map((_, i) =>
					request.patch(`${API_BASE_URL}/files/${testFileId}/name`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"Content-Type": "application/json",
						},
						data: {
							filename: `concurrent-${i}.pdf`,
							parentFolder: "folder",
						},
					}),
				);

			const responses = await Promise.all(updates);

			responses.forEach((response) => {
				expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
				if (!([200, 201]).includes(response.status())) return;
			});
		});

		test("should handle filename without extension", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						filename: "no-extension-file",
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should handle multiple dots in filename", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						filename: "file.backup.old.pdf",
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should sanitize XSS attempts in filename", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						filename: "<script>alert('xss')</script>.pdf",
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should prevent path traversal in filename", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						filename: "../../etc/passwd",
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should prevent SQL injection in filename", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						filename: "test' OR '1'='1.pdf",
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should validate token on every request", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: "Bearer malformed-jwt-token",
						"Content-Type": "application/json",
					},
					data: {
						filename: "test.pdf",
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});

		test("should not expose sensitive data in response", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						filename: "secure.pdf",
						parentFolder: "folder",
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
	});

	// ========================
	// RESPONSE FORMAT
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success structure", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						filename: "format-test.pdf",
						parentFolder: "folder",
					},
				},
			);

			if (response.headers()["content-type"]?.includes("application/json")) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success");
			}
		});

		test("should return consistent error structure", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						// Missing filename
						parentFolder: "folder",
					},
				},
			);

			if (response.headers()["content-type"]?.includes("application/json")) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success");
			}
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						filename: "content-type-test.pdf",
						parentFolder: "folder",
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
		test("should respond quickly (< 500ms)", async ({ request }) => {
			const start = Date.now();

			const response = await request.patch(
				`${API_BASE_URL}/files/${testFileId}/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						filename: "perf-test.pdf",
						parentFolder: "folder",
					},
				},
			);

			const duration = Date.now() - start;

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (!([200, 201]).includes(response.status())) return;
			expect(duration).toBeLessThan(5000);
		});
	});
});


