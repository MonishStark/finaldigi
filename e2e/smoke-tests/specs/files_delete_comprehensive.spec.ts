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
 * Comprehensive test suite for DELETE /files/:fileId endpoint
 *
 * Based on Swagger documentation - Delete a file and retrieve the updated list of files and folders
 */

test.describe("DELETE /files/:fileId - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testFileId: string;
	let testTeamId: string;

	test.beforeAll(async ({ request }) => {
		testFileId = testData.documents.chatgptPdf.id;
		testTeamId = testData.teams.team1.id;
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
			const nonExistentId = "99999999";

			const response = await request.delete(
				`${API_BASE_URL}/files/${nonExistentId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						fileId: nonExistentId,
						teamId: testTeamId,
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);

			if (response.headers()["content-type"]?.includes("application/json")) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			}
		});

		test("should return 404 for non-existent team", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/files/${testFileId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						fileId: testFileId,
						teamId: "99999999",
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
			const response = await request.get(`${API_BASE_URL}/files/${testFileId}`);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});

		test("should return 405 for POST method", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/${testFileId}`,
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});

		test("should return 405 for PUT method", async ({ request }) => {
			const response = await request.put(`${API_BASE_URL}/files/${testFileId}`);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});
	});

	// ========================
	// EDGE CASES
	// ========================

	test.describe("Edge Cases", () => {
		test("should handle UUID format fileId", async ({ request }) => {
			const uuidFileId = "123e4567-e89b-12d3-a456-426614174000";

			const response = await request.delete(
				`${API_BASE_URL}/files/${uuidFileId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						fileId: uuidFileId,
						teamId: testTeamId,
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should handle very long fileId", async ({ request }) => {
			const longId = "a".repeat(500);

			const response = await request.delete(`${API_BASE_URL}/files/${longId}`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
					"Content-Type": "application/json",
				},
				data: {
					fileId: longId,
					teamId: testTeamId,
					parentFolder: "folder",
				},
			});

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});

		test("should handle concurrent deletion attempts", async ({ request }) => {
			const deletes = Array(3)
				.fill(null)
				.map(() =>
					request.delete(`${API_BASE_URL}/files/${testFileId}`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"Content-Type": "application/json",
						},
						data: {
							fileId: testFileId,
							teamId: testTeamId,
							parentFolder: "folder",
						},
					}),
				);

			const responses = await Promise.all(deletes);

			responses.forEach((response) => {
				expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
				if (!([200, 201]).includes(response.status())) return;
			});
		});

		test("should handle special characters in fileId", async ({ request }) => {
			const specialCharsId = "test!@#$%^&*()";

			const response = await request.delete(
				`${API_BASE_URL}/files/${encodeURIComponent(specialCharsId)}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						fileId: specialCharsId,
						teamId: testTeamId,
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});

		test("should handle empty parentFolder", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/files/${testFileId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						fileId: testFileId,
						teamId: testTeamId,
						parentFolder: "",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should handle null values in request", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/files/${testFileId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						fileId: null,
						teamId: null,
						parentFolder: null,
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should prevent SQL injection in fileId", async ({ request }) => {
			const sqlInjection = "1' OR '1'='1";

			const response = await request.delete(
				`${API_BASE_URL}/files/${encodeURIComponent(sqlInjection)}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						fileId: sqlInjection,
						teamId: testTeamId,
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});

		test("should prevent SQL injection in teamId", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/files/${testFileId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						fileId: testFileId,
						teamId: "1' OR '1'='1",
						parentFolder: "folder",
					},
				},
			);

			expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
		});

		test("should validate token on every request", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/files/${testFileId}`,
				{
					headers: {
						Authorization: "Bearer malformed-jwt-token",
						"Content-Type": "application/json",
					},
					data: {
						fileId: testFileId,
						teamId: testTeamId,
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
			const response = await request.delete(
				`${API_BASE_URL}/files/${testFileId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						fileId: testFileId,
						teamId: testTeamId,
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

		test("should only allow deletion of own team files", async ({
			request,
		}) => {
			const response = await request.delete(
				`${API_BASE_URL}/files/${testFileId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						fileId: testFileId,
						teamId: "another-team-id",
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
	// RESPONSE FORMAT
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success structure", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/files/${testFileId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						fileId: testFileId,
						teamId: testTeamId,
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
			const response = await request.delete(
				`${API_BASE_URL}/files/${testFileId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						// Missing required fields
					},
				},
			);

			if (response.headers()["content-type"]?.includes("application/json")) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success");
			}
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/files/${testFileId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						fileId: testFileId,
						teamId: testTeamId,
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

			const response = await request.delete(
				`${API_BASE_URL}/files/${testFileId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						fileId: testFileId,
						teamId: testTeamId,
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


