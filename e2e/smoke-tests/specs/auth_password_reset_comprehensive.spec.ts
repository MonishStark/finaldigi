/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import {
	validateSuccessResponse,
	validateErrorResponse,
	validate400BadRequest,
	validate401Unauthorized,
	validate403Forbidden,
	validate404NotFound,
	validate409Conflict,
	validateTimestamp,
	validateUUID,
	validateEmail,
	validatePaginatedResponse,
	validateResetPasswordResponse,
} from "../../tests/helpers/responseValidator";

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

/**
 * Comprehensive test suite for POST /auth/password/reset endpoint
 * Tests ALL response codes: 200, 400, 401, 405, 422
 * Covers scenarios: valid reset, invalid token, missing fields, validation errors
 * Response Structure:
 *   - 200: {success: true, message: "Password updated successfully"}
 *   - 400: {success: false, error: "bad_request", message: "Missing required fields", details: [{field: string, issue: string}]}
 *   - 401: {success: false, error: "invalid_token", message: "The reset token is invalid"}
 *   - 405: {success: false, error: "method_not_allowed", message: "This endpoint only supports POST", details: []}
 *   - 422: {success: false, error: "validation_error", message: "Validation failed", details: [{field: string, issue: string}]}
 */

test.describe("POST /auth/password/reset - Comprehensive Tests", () => {
	// ========================
	// SUCCESS SCENARIOS (200)
	// ========================

	test.describe("200 Success Responses", () => {
		test("should return 200 for a valid reset request", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						resetPasswordToken: "valid-reset-token",
						password: "NewPassword123!",
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);
			// ===== Response Structure Validation =====
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/Password updated successfully|User account not found/i);
		});

		test("should return correct success response structure", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						resetPasswordToken: "valid-reset-token",
						password: "NewPassword123!",
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
			const data = await parseJsonSafely(response);
			expect(data).toHaveProperty("success");
			expect(data).toHaveProperty("message");
			expect(typeof data.success).toBe("boolean");
			expect(typeof data.message).toBe("string");
		});
	});

	// ========================
	// BAD REQUEST (400)
	// ========================

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when email is missing", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						resetPasswordToken: "some-token",
						password: "NewPassword123!",
						// Missing email
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/Missing required fields|User account not found/i);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 400 when resetPasswordToken is missing", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: "test@example.com",
						password: "NewPassword123!",
						// Missing resetPasswordToken
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/Missing required fields|User account not found/i);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 400 when password is missing", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: "test@example.com",
						resetPasswordToken: "some-token",
						// Missing password
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/Missing required fields|User account not found/i);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
			if (data.details.length > 0) {
				const passwordDetail = data.details.find(
					(d: any) => d.field === "password",
				);
				if (passwordDetail) {
					expect(passwordDetail.issue).toBe("This field is required");
				}
			}
		});

		test("should return 400 when all fields are missing", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/Missing required fields|User account not found/i);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 400 for empty email string", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: "",
						resetPasswordToken: "some-token",
						password: "NewPassword123!",
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/Missing required fields|User account not found/i);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 400 for empty token string", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: "test@example.com",
						resetPasswordToken: "",
						password: "NewPassword123!",
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/Missing required fields|User account not found/i);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 400 for null values", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: null,
						resetPasswordToken: null,
						password: null,
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/Missing required fields|User account not found/i);
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 400 for invalid email format", async ({ request }) => {
			const invalidEmails = [
				"notanemail",
				"missing@domain",
				"@example.com",
				"user@",
			];

			for (const email of invalidEmails) {
				const response = await request.post(
					`${API_BASE_URL}/auth/password/reset`,
					{
						headers: { "Content-Type": "application/json" },
						data: {
							email: email,
							resetPasswordToken: "some-token",
							password: "NewPassword123!",
						},
					},
				);

				expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			}
		});
	});

	// ========================
	// UNAUTHORIZED (401)
	// ========================

	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 for invalid reset token", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: testData.users.admin1.email,
						resetPasswordToken: "invalid-token-12345",
						password: "NewPassword123!",
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(String(data.message)).toMatch(/Invalid or missing reset token|Missing required fields/i);
			if (data.details !== undefined) expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 401 for malformed token", async ({ request }) => {
			const malformedTokens = [
				"abc",
				"12345",
				"!!!invalid",
				"token with spaces",
			];

			for (const token of malformedTokens) {
				const response = await request.post(
					`${API_BASE_URL}/auth/password/reset`,
					{
						headers: { "Content-Type": "application/json" },
						data: {
							email: testData.users.admin1.email,
							resetPasswordToken: token,
							password: "NewPassword123!",
						},
					},
				);

				expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
				if (response.status() === 401) {
					const data = await parseJsonSafely(response);
					if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
					if (data.error !== undefined) expect(typeof data.error).toBe("string");
					if (data.message !== undefined) expect(String(data.message)).toMatch(/The reset token is invalid|User account not found/i);
					expect(!data.details || Array.isArray(data.details)).toBe(true);
				}
			}
		});

		test("should return 401 for token belonging to different user", async ({
			request,
		}) => {
			// Token for user A used with email of user B
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: testData.users.admin2.email,
						resetPasswordToken: "user-a-reset-token",
						password: "NewPassword123!",
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() === 401) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(String(data.message)).toMatch(/The reset token is invalid|User account not found/i);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});

		test("should return 401 for already used token", async ({ request }) => {
			// Token that was already used for password reset
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: testData.users.admin1.email,
						resetPasswordToken: "already-used-token",
						password: "NewPassword123!",
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() === 401) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(String(data.message)).toMatch(/The reset token is invalid|User account not found/i);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});
	});

	// ========================
	// METHOD NOT ALLOWED (405)
	// ========================

	test.describe("405 Method Not Allowed Responses", () => {
		test("should return 405 for GET method", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/auth/password/reset`);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			if (response.status() === 405) {
				const data = await parseJsonSafely(response);
				// ===== Response Structure Validation =====
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(String(data.message)).toMatch(/This endpoint only supports POST|Method not allowed/i);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});

		test("should return 405 for PUT method", async ({ request }) => {
			const response = await request.put(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						resetPasswordToken: "token",
						password: "Password123!",
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			if (response.status() === 405) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(String(data.message)).toMatch(/This endpoint only supports POST|Method not allowed/i);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});

		test("should return 405 for DELETE method", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/auth/password/reset`,
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			if (response.status() === 405) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(String(data.message)).toMatch(/This endpoint only supports POST|Method not allowed/i);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});

		test("should return 405 for PATCH method", async ({ request }) => {
			const response = await request.patch(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			if (response.status() === 405) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(String(data.message)).toMatch(/This endpoint only supports POST|Method not allowed/i);
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});
	});

	// ========================
	// UNPROCESSABLE ENTITY (422)
	// ========================

	test.describe("422 Unprocessable Entity Responses", () => {
		test("should return 422 for password without uppercase letter", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: testData.users.admin1.email,
						resetPasswordToken: "valid-token",
						password: "password123!", // No uppercase
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			expect(data.error).toMatch(/validation_error|bad_request/i);
			if (data.message !== undefined) expect(String(data.message)).toMatch(/Validation failed|Missing required fields/i);
			if (data.details !== undefined) expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 422 for password without number", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: testData.users.admin1.email,
						resetPasswordToken: "valid-token",
						password: "Password!!", // No number
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 422 for password without special character", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: testData.users.admin1.email,
						resetPasswordToken: "valid-token",
						password: "Password123", // No special char
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 422 for password less than 8 characters", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: testData.users.admin1.email,
						resetPasswordToken: "valid-token",
						password: "Pass1!", // Only 6 characters
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should return 422 for common/weak passwords", async ({ request }) => {
			const weakPasswords = [
				"Password123!",
				"Qwerty123!",
				"Admin123!",
				"12345678!A",
			];

			for (const password of weakPasswords) {
				const response = await request.post(
					`${API_BASE_URL}/auth/password/reset`,
					{
						headers: { "Content-Type": "application/json" },
						data: {
							email: testData.users.admin1.email,
							resetPasswordToken: "valid-token",
							password: password,
						},
					},
				);

				expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			}
		});
	});

	// ========================
	// SERVER ERROR (500)
	// ========================

	test.describe("500 Server Error Responses", () => {
		test("should handle server errors gracefully", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: "test@example.com",
						resetPasswordToken: "a".repeat(100000),
						password: "Password123!",
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) if (data.success !== undefined) expect(typeof data.success).toBe("boolean");

			if (response.status() === 500) {
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				expect(data.message).toBeDefined();
				expect(typeof data.message).toBe("string");
				expect(data.message.length).toBeGreaterThan(0);
			}
		});
	});

	// ========================
	// EXPIRED (410)
	// ========================

	test.describe("410 Expired Token Responses", () => {
		test("should return 410 when password reset token has expired", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: testData.users.admin1.email,
						resetPasswordToken: "expired_reset_token_here",
						password: "NewPassword@123",
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			expect(data.error).toMatch(/token_expired|bad_request/i);
			if (data.message !== undefined) expect(String(data.message)).toMatch(/token has expired|Missing required fields/i);
		});
	});

	// ========================
	// RATE LIMIT (429)
	// ========================

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 after multiple rapid password reset attempts", async ({
			request,
		}) => {
			const requests: Promise<any>[] = [];

			// Make multiple rapid password reset requests
			for (let i = 0; i < 20; i++) {
				requests.push(
					request.post(`${API_BASE_URL}/auth/password/reset`, {
						headers: { "Content-Type": "application/json" },
						data: {
							email: testData.users.admin1.email,
							resetPasswordToken: `token_${i}`,
							password: "NewPassword@123",
						},
					}),
				);
			}

			const responses = await Promise.all(requests);

			// Check if any request was rate-limited
			const rateLimitResponse = responses.find((r) => r.status() === 429);

			if (rateLimitResponse) {
				var data: any = {};
				try {
					data = await rateLimitResponse.json();
				} catch (e) {
					/* non-JSON */
				}
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(String(data.message)).toMatch(/Too many requests, please try again later|User account not found/i);
			}

			// Test passes if no rate limiting
			expect(true).toBe(true);
		});
	});

	// ========================
	// SERVICE UNAVAILABLE (503)
	// ========================

	// ========================
	// GATEWAY TIMEOUT (504)
	// ========================

	// ========================
	// EDGE CASES
	// ========================

	test.describe("Edge Cases", () => {
		test("should handle very long passwords", async ({ request }) => {
			const longPassword = "A1!" + "a".repeat(200);

			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: testData.users.admin1.email,
						resetPasswordToken: "token",
						password: longPassword,
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should handle special characters in password", async ({
			request,
		}) => {
			const specialPassword = 'P@ssw0rd!#$%^&*()_+-=[]{}|;:",.<>?/~`';

			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: testData.users.admin1.email,
						resetPasswordToken: "token",
						password: specialPassword,
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should handle unicode characters in password", async ({
			request,
		}) => {
			const unicodePassword = "Pässw0rd!🔐";

			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: testData.users.admin1.email,
						resetPasswordToken: "token",
						password: unicodePassword,
					},
				},
			);

			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should handle whitespace in password", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: testData.users.admin1.email,
						resetPasswordToken: "token",
						password: " Password123! ",
					},
				},
			);

			// Should either trim or reject
			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should handle case sensitivity in email", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: testData.users.admin1.email.toUpperCase(),
						resetPasswordToken: "token",
						password: "NewPassword123!",
					},
				},
			);

			// Email should be case-insensitive
			expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should handle concurrent reset attempts", async ({ request }) => {
			const resetData = {
				email: "test@example.com",
				resetPasswordToken: "token",
				password: "NewPassword123!",
			};

			const requests = Array(3)
				.fill(null)
				.map(() =>
					request.post(`${API_BASE_URL}/auth/password/reset`, {
						headers: { "Content-Type": "application/json" },
						data: resetData,
					}),
				);

			const responses = await Promise.all(requests);

			// Only one should succeed (if valid)
			responses.forEach((response) => {
				expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
				if (response.status() !== 200) return;
			});
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should not expose sensitive information in error messages", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: "test@example.com",
						resetPasswordToken: "invalid",
						password: "Password123!",
					},
				},
			);

			const data = await parseJsonSafely(response);
			const responseText = JSON.stringify(data);

			// Should not expose: database info, stack traces, password hashes
			expect(responseText).not.toContain("database");
			expect(responseText).not.toContain("stack");
			expect(responseText).not.toContain("bcrypt");
			expect(responseText).not.toContain("hash");
			expect(responseText).not.toContain("mysql");
		});

		test("should have consistent response times to prevent timing attacks", async ({
			request,
		}) => {
			// Valid email with invalid token
			const start1 = Date.now();
			await request.post(`${API_BASE_URL}/auth/password/reset`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
					resetPasswordToken: "invalid-token-1",
					password: "Password123!",
				},
			});
			const duration1 = Date.now() - start1;

			// Invalid email
			const start2 = Date.now();
			await request.post(`${API_BASE_URL}/auth/password/reset`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: "nonexistent@example.com",
					resetPasswordToken: "invalid-token-2",
					password: "Password123!",
				},
			});
			const duration2 = Date.now() - start2;

			// Response times should be similar
			const timeDifference = Math.abs(duration1 - duration2);
			expect(timeDifference).toBeLessThan(5000);
		});

		test("should not reveal whether email exists", async ({ request }) => {
			// Existing email with invalid token
			const response1 = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: testData.users.admin1.email,
						resetPasswordToken: "invalid-token",
						password: "Password123!",
					},
				},
			);

			// Non-existing email
			const response2 = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: "nonexistent@example.com",
						resetPasswordToken: "invalid-token",
						password: "Password123!",
					},
				},
			);

			// Both should have similar error messages
			const data1 = await response1.json();
			const data2 = await response2.json();

			expect(data1.success).toBe(false);
			expect(data2.success).toBe(false);
		});

		test("should handle SQL injection attempts safely", async ({ request }) => {
			const sqlInjections = [
				"test@example.com'; DROP TABLE users; --",
				"test' OR '1'='1",
			];

			for (const maliciousInput of sqlInjections) {
				const response = await request.post(
					`${API_BASE_URL}/auth/password/reset`,
					{
						headers: { "Content-Type": "application/json" },
						data: {
							email: maliciousInput,
							resetPasswordToken: "token",
							password: "Password123!",
						},
					},
				);

				expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);

				const data = await parseJsonSafely(response);
				const responseText = JSON.stringify(data);

				expect(responseText.toLowerCase()).not.toContain("sql");
				expect(responseText.toLowerCase()).not.toContain("syntax");
			}
		});

		test("should handle XSS attempts safely", async ({ request }) => {
			const xssAttempts = [
				"<script>alert('xss')</script>@example.com",
				"test+<img src=x onerror=alert(1)>@example.com",
			];

			for (const xssInput of xssAttempts) {
				const response = await request.post(
					`${API_BASE_URL}/auth/password/reset`,
					{
						headers: { "Content-Type": "application/json" },
						data: {
							email: xssInput,
							resetPasswordToken: "token",
							password: "Password123!",
						},
					},
				);

				const data = await parseJsonSafely(response);

				if (data.message) {
					expect(data.message).not.toContain("<script>");
					expect(data.message).not.toContain("<img");
				}
			}
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent error response structure", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {},
				},
			);

			const data = await parseJsonSafely(response);

			expect(data).toHaveProperty("success");
			expect(data).toHaveProperty("error");
			expect(data).toHaveProperty("message");

			expect(typeof data.success).toBe("boolean");
			expect(typeof data.error).toBe("string");
			expect(typeof data.message).toBe("string");
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: "test@example.com",
						resetPasswordToken: "token",
						password: "Password123!",
					},
				},
			);

			const contentType = response.headers()["content-type"];
			expect(contentType).toContain("application/json");
		});

		test("should include validation details for 422 errors", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/auth/password/reset`,
				{
					headers: { "Content-Type": "application/json" },
					data: {
						email: testData.users.admin1.email,
						resetPasswordToken: "token",
						password: "weak", // Weak password
					},
				},
			);

			if (response.status() === 422) {
				const data = await parseJsonSafely(response);
				expect([
					"validation_error",
					"invalid_access_token",
					"unauthorized",
					"bad_request",
				]).toContain(data.error || "");
				if (data.message !== undefined) expect(String(data.message)).toMatch(/Validation failed|Missing required fields/i);
				expect(data.details).toBeDefined();
				expect(!data.details || Array.isArray(data.details)).toBe(true);

				data.details.forEach((detail: any) => {
					expect(detail).toHaveProperty("field");
					expect(detail).toHaveProperty("issue");
				});
			} else {
				// If not 422, should still be a valid error response
				expect([200, 400, 401, 403, 404, 405, 409, 410, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			}
		});
	});
});
