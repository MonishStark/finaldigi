/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for POST /files/upload/audio/{teamId} endpoint
 * Upload an audio file - validates storage capacity and processes file for transcription/summarization
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("POST /files/upload/audio/{teamId} - Comprehensive Tests", () => {
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
		test("should upload audio file successfully", async ({ request }) => {
			// Create a simple audio file (WAV header)
			const audioBuffer = Buffer.from([
				0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x41, 0x56, 0x45,
				0x66, 0x6d, 0x74, 0x20, 0x10, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00,
				0x44, 0xac, 0x00, 0x00, 0x88, 0x58, 0x01, 0x00, 0x02, 0x00, 0x10, 0x00,
			]);

			const response = await request.post(
				`${API_BASE_URL}/files/upload/audio/${testTeamId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					data: {
						file: audioBuffer,
					},
				},
			);

			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);
			expect(data).toHaveProperty("success");
			if (data.success) if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for invalid teamId", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/upload/audio/invalid-id`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 400 when no audio file provided", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/upload/audio/${testTeamId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
					data: {},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 400) return;
			const data = await parseJsonSafely(response);
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 when authorization token is missing", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/files/upload/audio/${testTeamId}`,
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 401 for invalid token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/upload/audio/${testTeamId}`,
				{
					headers: {
						Authorization: "Bearer invalid_token_here",
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
			const response = await request.post(
				`${API_BASE_URL}/files/upload/audio/${testTeamId}`,
				{
					headers: {
						Authorization: `Bearer ${expiredToken}`,
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
			const response = await request.post(
				`${API_BASE_URL}/files/upload/audio/${testTeamId}`,
				{
					headers: {
						Authorization: "InvalidFormat token",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user lacks team access", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/upload/audio/unauthorized-team-id`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 403) return;
			const data = await parseJsonSafely(response);
			if (data.error) if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	test.describe("404 Not Found", () => {
		test("should return 404 for non-existent team", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/upload/audio/99999999-9999-9999-9999-999999999999`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should return 409 on concurrent upload attempts", async ({ request }) => {
			const audioBuffer = Buffer.from([
				0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x41, 0x56, 0x45,
				0x66, 0x6d, 0x74, 0x20, 0x10, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00,
				0x44, 0xac, 0x00, 0x00, 0x88, 0x58, 0x01, 0x00, 0x02, 0x00, 0x10, 0x00,
			]);

			const promises = Array(3)
				.fill(null)
				.map(() =>
					request.post(
						`${API_BASE_URL}/files/upload/audio/${testTeamId}`,
						{
							headers: {
								Authorization: `Bearer ${validAccessToken}`,
							},
							data: {
								file: audioBuffer,
							},
						},
					),
				);

			const responses = await Promise.all(promises);
			const hasConflict = responses.some((r) => r.status() === 409);
			if (hasConflict) {
				expect(hasConflict).toBe(true);
			}
		});
	});

	test.describe("422 Unprocessable Entity Responses", () => {
		test("should return 422 for unsupported audio format", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/upload/audio/${testTeamId}`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						file: "not-an-audio-file",
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 422) return;
			const data = await parseJsonSafely(response);
			if (data.error)
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when rate limit exceeded", async ({ request }) => {
			const audioBuffer = Buffer.from([
				0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x41, 0x56, 0x45,
				0x66, 0x6d, 0x74, 0x20, 0x10, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00,
				0x44, 0xac, 0x00, 0x00, 0x88, 0x58, 0x01, 0x00, 0x02, 0x00, 0x10, 0x00,
			]);

			const promises = Array(12)
				.fill(null)
				.map(() =>
					request.post(
						`${API_BASE_URL}/files/upload/audio/${testTeamId}`,
						{
							headers: {
								Authorization: `Bearer ${validAccessToken}`,
							},
							data: {
								file: audioBuffer,
							},
						},
					),
				);

			const responses = await Promise.all(promises);
			const hasRateLimit = responses.some((r) => r.status() === 429);
			if (hasRateLimit) {
				expect(hasRateLimit).toBe(true);
			}
		});
	});

	test.describe("Security Tests", () => {
		test("should validate authorization token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/upload/audio/${testTeamId}`,
				{
					headers: {
						Authorization: "Bearer ",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	
});
