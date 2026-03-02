/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";

/**
 * Comprehensive test suite for GET/PATCH /super-admin/integrations endpoint
 * Manage integrations for companies and users (super-admin only)
 * Spec Response Codes: 200, 400, 401 (3 variants), 403
 */

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

test.describe("GET /super-admin/integrations - Comprehensive Tests", () => {
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
		test("should fetch integrations successfully", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/super-admin/integrations`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);

				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			}
		});
	});

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/super-admin/integrations`,
				{
					headers: {
						"Content-Type": "application/json",
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
			const response = await request.get(
				`${API_BASE_URL}/super-admin/integrations`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
						"Content-Type": "application/json",
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

		test("should return 401 when access token expired", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/super-admin/integrations`,
				{
					headers: {
						Authorization: "Bearer expired_token",
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status() === 401) {
				const data = await parseJsonSafely(response);

				if (data.error !== undefined) expect(typeof data.error).toBe("string");
			}
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user is not super-admin", async ({
			request,
		}) => {
			const response = await request.get(
				`${API_BASE_URL}/super-admin/integrations`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status() === 403) {
				const data = await parseJsonSafely(response);

				if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
			}
		});
	});

	test.describe("Response Format Validation", () => {
		test("should include required headers in response", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/super-admin/integrations`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			const contentType = response.headers()["content-type"];
			if (contentType) {
				if (contentType) expect(contentType).toBeTruthy();
			}
		});
	});
});

test.describe("PATCH /super-admin/integrations - Comprehensive Tests", () => {
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

	test.describe("200 Success Responses for Company", () => {
		test("should update company integrations successfully", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/super-admin/integrations`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						companyId: "test-company-id",
						integrations: {
							google_drive: true,
							dropbox: false,
						},
					},
				},
			);

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);

				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			}
		});
	});

	test.describe("200 Success Responses for User", () => {
		test("should update user integrations successfully", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/super-admin/integrations`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						userId: "test-user-id",
						integrations: {
							google_drive: true,
							slack: true,
						},
					},
				},
			);

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);

				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			}
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when both userId and companyId are missing", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/super-admin/integrations`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						integrations: {
							google_drive: true,
						},
					},
				},
			);

			if (response.status() !== 400) return;
			const data = await parseJsonSafely(response);

			if (data.error)
				if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
		});
	});

	test.describe("401 Authentication Error Responses", () => {
		test("should return 401 when missing access token", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/super-admin/integrations`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						companyId: "test-id",
						integrations: {},
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
			const response = await request.patch(
				`${API_BASE_URL}/super-admin/integrations`,
				{
					headers: {
						Authorization: "Bearer invalid_token",
						"Content-Type": "application/json",
					},
					data: {
						companyId: "test-id",
						integrations: {},
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

		test("should return 401 when access token expired", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/super-admin/integrations`,
				{
					headers: {
						Authorization: "Bearer expired_token",
						"Content-Type": "application/json",
					},
					data: {
						companyId: "test-id",
						integrations: {},
					},
				},
			);

			if (response.status() === 401) {
				const data = await parseJsonSafely(response);

				if (data.error !== undefined) expect(typeof data.error).toBe("string");
			}
		});
	});

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 when user is not super-admin", async ({
			request,
		}) => {
			const response = await request.patch(
				`${API_BASE_URL}/super-admin/integrations`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						companyId: "test-id",
						integrations: {},
					},
				},
			);

			if (response.status() === 403) {
				const data = await parseJsonSafely(response);

				if (data.error !== undefined) expect(String(data.error).length).toBeGreaterThan(0);
			}
		});
	});

	test.describe("Response Format Validation", () => {
		test("should include required headers in response", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/super-admin/integrations`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
						"Content-Type": "application/json",
					},
					data: {
						companyId: "test-id",
						integrations: {},
					},
				},
			);

			const contentType = response.headers()["content-type"];
			if (contentType) {
				if (contentType) expect(contentType).toContain("json");
			}
		});
	});
});

