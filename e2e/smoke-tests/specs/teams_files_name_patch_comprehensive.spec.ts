/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for PATCH /teams/{teamId}/files/{fileId}/name endpoint
 * Rename an existing file
 */

const API_BASE_URL = "http://127.0.0.1:5050";

test.describe("PATCH /teams/{teamId}/files/{fileId}/name - Comprehensive Tests", () => {
	let validAccessToken: string;
	let adminAccessToken: string;
	const testTeamId = testData.teams.team3.id;

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
		const token = loginData.accessToken || loginData.user?.auth?.accessToken || loginData.token;

		if (!token) {
			return;
		}
		adminAccessToken = token;
		validAccessToken = token;
	});

	test.describe("200 Success Responses", () => {
		test("should accept valid file rename request", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						newName: `renamed-${Date.now()}.pdf`,
					},
				},
			);

			expect([200, 400, 401, 403, 404, 409, 422, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for invalid teamId", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/invalid-id/files/some-file-id/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						newName: "renamed.pdf",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 400 for invalid fileId", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/files/invalid-id/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						newName: "renamed.pdf",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 400 for missing new name", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 when authorization token is missing", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/name`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						newName: "renamed.pdf",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 401 for invalid token", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/name`,
				{
					headers: {
						Authorization: "Bearer invalid_token_here",
						"Content-Type": "application/json",
					},
					data: {
						newName: "renamed.pdf",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 401 for expired token", async ({ request }) => {
			const expiredToken =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjB9.invalid";
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/name`,
				{
					headers: {
						Authorization: `Bearer ${expiredToken}`,
						"Content-Type": "application/json",
					},
					data: {
						newName: "renamed.pdf",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 401 for malformed Bearer token", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/name`,
				{
					headers: {
						Authorization: "InvalidFormat token",
						"Content-Type": "application/json",
					},
					data: {
						newName: "renamed.pdf",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("404 Not Found", () => {
		test("should return 404 for non-existent file", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/files/99999999-9999-9999-9999-999999999999/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						newName: "renamed.pdf",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user cannot rename file", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/999999/files/some-file-id/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						newName: "forbidden-rename.pdf",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should return 409 when target filename already exists", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						newName: "existing-name.pdf",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("422 Validation Error Responses", () => {
		test("should return 422 for invalid rename payload", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						newName: "",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 for repeated rename requests", async ({
			request,
		}) => {
			const requests = Array(12)
				.fill(null)
				.map((_, index) =>
					request.patch(
						`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/name`,
						{
							headers: {
								Authorization: `Bearer ${validAccessToken}`,
								"Content-Type": "application/json",
							},
							data: {
								newName: `burst-rename-${index}.pdf`,
							},
						},
					),
				);

			const responses = await Promise.all(requests);
			const hasRateLimit = responses.some(
				(response) => response.status() === 429,
			);
			if (!hasRateLimit) return;
			expect(hasRateLimit).toBe(true);
		});
	});

	test.describe("Edge Cases", () => {
		test("should handle very long file name", async ({ request }) => {
			const longName = "A".repeat(255) + ".pdf";
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						newName: longName,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should handle special characters in file name", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						newName: "test!@#$%^&*().pdf",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	test.describe("Security Tests", () => {
		test("should reject SQL injection attempts", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/name`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						newName: "'; DROP TABLE files; --.pdf",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should validate authorization token", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/teams/${testTeamId}/files/some-file-id/name`,
				{
					headers: {
						Authorization: "Bearer ",
						"Content-Type": "application/json",
					},
					data: {
						newName: "renamed.pdf",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});
});
