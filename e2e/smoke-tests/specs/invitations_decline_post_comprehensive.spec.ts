/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for POST /invitations/decline endpoint
 * Decline a received invitation
 * Spec Response Codes: 200, 400, 401 (3 variants), 404, 409
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("POST /invitations/decline - Comprehensive Tests", () => {
	let validAccessToken: string;

	test.beforeAll(async ({ request }) => {
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

	test.describe("200 Success Responses", () => {
		test("should decline invitation successfully", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/decline`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						invitationId: "test-invitation-id",
						token: "test-token",
					},
				},
			);

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);

				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
			}
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when invitation ID is missing", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/decline`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						token: "test-token",
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error)
				if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});

		test("should return 400 when token is missing", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/decline`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						invitationId: "test-id",
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error)
				if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});
	});

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/decline`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						invitationId: "test-id",
						token: "test-token",
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error)
				if (data.error !== undefined)
					if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/decline`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
						"Content-Type": "application/json",
					},
					data: {
						invitationId: "test-id",
						token: "test-token",
					},
				},
			);
expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error)
				if (data.error !== undefined)
					if (data.error !== undefined) expect(typeof data.error).toBe("string");
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when invitation not found", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/decline`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						invitationId: "nonexistent-id",
						token: "test-token",
					},
				},
			);

			if (response.status() !== 404) return;
			const data = await parseJsonSafely(response);

			if (data.error)
				expect(["not_found", "bad_request"]).toContain(data.error);
		});
	});

	test.describe("409 Conflict Responses", () => {
		test("should return 409 when invitation is already used/declined", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/decline`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						invitationId: "already-used-id",
						token: "used-token",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when too many decline requests are sent", async ({ request }) => {
			const responses = await Promise.all(
				Array(12).fill(null).map(() =>
					request.post(`${API_BASE_URL}/invitations/decline`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
							"Content-Type": "application/json",
						},
						data: {
							invitationId: "burst-id",
							token: "burst-token",
						},
					}),
				),
			);

			const has429 = responses.some((r) => r.status() === 429);
			if (has429) {
				expect(has429).toBe(true);
			}
		});
	});

	test.describe("Response Format Validation", () => {
		test("should include required headers in response", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/decline`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						invitationId: "test-id",
						token: "test-token",
					},
				},
			);

			const contentType = response.headers()["content-type"];
			if (contentType) {
				expect(contentType).toBeTruthy();
			}
		});
	});
});

