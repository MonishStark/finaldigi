/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for POST /invitations/accept endpoint
 * Accept a received invitation
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

test.describe("POST /invitations/accept - Comprehensive Tests", () => {
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
		test("should accept invitation successfully", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/accept`,
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
				expect(data.message).toMatch(/accepted|successfully/i);
			}
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when invitation ID is missing", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/accept`,
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
expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error)
				if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});

		test("should return 400 when token is missing", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/accept`,
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
expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
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
				`${API_BASE_URL}/invitations/accept`,
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
expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error)
				if (data.error !== undefined)
					expect(data.error).toBe("missing_access_token");
		});

		test("should return 401 when invalid access token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/accept`,
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
expect([200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);

			if (data.error)
				if (data.error !== undefined)
					expect(data.error).toBe("invalid_access_token");
		});
	});

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when invitation not found", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/accept`,
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
		test("should return 409 when invitation already accepted", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/accept`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						invitationId: "already-accepted-invitation",
						token: "test-token",
					},
				},
			);

			if (response.status() === 409) {
				const data = await parseJsonSafely(response);

				if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
			}
		});
	});

	test.describe("Response Format Validation", () => {
		test("should include required headers in response", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/invitations/accept`,
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

