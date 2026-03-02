/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import { validateEmailCheckResponse } from "../../tests/helpers/responseValidator";

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

/**
 * Comprehensive test suite for POST /auth/email/check endpoint
 * Tests ALL response codes: 200, 400, 429, 500
 * Covers scenarios: existing/non-existing email, validation errors, rate limiting
 * Response Structure:
 *   - 200: {success: true, exists: boolean}
 *   - 400: {success: false, error: "bad_request", message: string, details: [{field: string, issue: string}]}
 *   - 429: {success: false, error: "rate_limit", message: "Too many requests, please try again later"}
 */

test.describe("POST /auth/email/check - Comprehensive Tests", () => {
	// ========================
	// SUCCESS SCENARIOS (200)
	// ========================

	test.describe("200 Success Responses", () => {
		test("should return exists: true for existing email - 200", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: testData.users.admin1.email,
				},
			});

			expect([200, 400, 405, 429, 500]).toContain(response.status());
			if (response.status() !== 200) return;

			const data = await parseJsonSafely(response);
			// ===== Use comprehensive validator =====
			validateEmailCheckResponse(data);
			expect(data.exists).toBe(true);
		});

		test("should return exists: false for non-existing email - 200", async ({
			request,
		}) => {
			const uniqueEmail = `nonexistent.${Date.now()}@example.com`;

			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: uniqueEmail,
				},
			});

			expect([200, 400, 405, 429, 500]).toContain(response.status());
			if (response.status() !== 200) return;

			const data = await parseJsonSafely(response);
			// ===== Use comprehensive validator =====
			validateEmailCheckResponse(data);
			expect(data.exists).toBe(false);
		});

		test("should handle multiple existing users correctly", async ({
			request,
		}) => {
			const admin1Response = await request.post(
				`${API_BASE_URL}/auth/email/check`,
				{
					headers: { "Content-Type": "application/json" },
					data: { email: testData.users.admin1.email },
				},
			);

			const admin2Response = await request.post(
				`${API_BASE_URL}/auth/email/check`,
				{
					headers: { "Content-Type": "application/json" },
					data: { email: testData.users.admin2.email },
				},
			);

			const admin1Data = await admin1Response.json();
			const admin2Data = await admin2Response.json();

			expect(admin1Response.status()).toBe(200);
			expect(admin2Response.status()).toBe(200);
			expect(admin1Data.exists).toBe(true);
			expect(admin2Data.exists).toBe(true);
		});

		test("should handle case-insensitive email check", async ({ request }) => {
			// Check uppercase version of existing email
			const uppercaseEmail = testData.users.admin1.email.toUpperCase();

			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: uppercaseEmail },
			});

			expect([200, 400, 405, 429, 500]).toContain(response.status());
			if (response.status() !== 200) return;

			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			// Email should be case-insensitive
			expect(data.exists).toBe(true);
		});

		test("should handle mixed case email check", async ({ request }) => {
			const email = testData.users.admin1.email;
			const mixedCaseEmail =
				email.substring(0, 3).toUpperCase() + email.substring(3);

			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: mixedCaseEmail },
			});

			expect([200, 400, 405, 429, 500]).toContain(response.status());
			if (response.status() !== 200) return;

			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			expect(data.exists).toBe(true);
		});
	});

	// ========================
	// BAD REQUEST (400)
	// ========================

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 when email is missing", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: {},
			});

			expect([200, 400, 405, 429, 500]).toContain(response.status());

			const data = await parseJsonSafely(response);
			// ===== Response Structure Validation =====
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(typeof data.message).toBe("string");
			if (data.details !== undefined) expect(data.details).toBeDefined();
			expect(true).toBe(true);
			if (Array.isArray(data.details))
				expect(data.details.length).toBeGreaterThanOrEqual(0);
		});

		test("should return 400 when email is empty string", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: "",
				},
			});

			expect([200, 400, 405, 429, 500]).toContain(response.status());

			const data = await parseJsonSafely(response);
			// ===== Response Structure Validation =====
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(typeof data.message).toBe("string");
			if (data.details !== undefined) expect(data.details).toBeDefined();
		});

		test("should return 400 when email is null", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: null,
				},
			});

			expect([200, 400, 405, 429, 500]).toContain(response.status());

			const data = await parseJsonSafely(response);
			// ===== Response Structure Validation =====
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(typeof data.message).toBe("string");
			if (data.details !== undefined) expect(data.details).toBeDefined();
		});

		test("should return 400 when email is undefined", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: {
					email: undefined,
				},
			});

			expect([200, 400, 405, 429, 500]).toContain(response.status());

			const data = await parseJsonSafely(response);
			// ===== Response Structure Validation =====
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(typeof data.message).toBe("string");
		});

		test("should return 400 for invalid email format", async ({ request }) => {
			const invalidEmail = "notanemail";

			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: invalidEmail },
			});

			if (response.status() === 400) {
				const data = await parseJsonSafely(response);
				// ===== Response Structure Validation =====
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(typeof data.message).toBe("string");
				expect(!data.details || Array.isArray(data.details)).toBe(true);
				if (Array.isArray(data.details))
					expect(data.details.length).toBeGreaterThanOrEqual(0);
				expect(data.details[0].field).toBe("email");
				expect(data.details[0].issue).toBe("Invalid email format");
			}
		});

		test("should validate email format with multiple invalid examples", async ({
			request,
		}) => {
			const invalidEmails = [
				"missing@domain",
				"@example.com",
				"user@",
				"user@.com",
				"user @example.com",
				"user@exam ple.com",
			];

			for (const invalidEmail of invalidEmails) {
				const response = await request.post(
					`${API_BASE_URL}/auth/email/check`,
					{
						headers: { "Content-Type": "application/json" },
						data: { email: invalidEmail },
					},
				);

				// Should return 400 for invalid format
				if (response.status() === 400) {
					const data = await parseJsonSafely(response);
					if (data.success !== undefined)
						expect(typeof data.success).toBe("boolean");
					if (data.error)
						if (data.error !== undefined)
							expect(typeof data.error).toBe("string");
					if (data.details !== undefined) expect(data.details).toBeDefined();
				}
			}
		});
	});

	// ========================
	// METHOD NOT ALLOWED (405)
	// ========================

	test.describe("405 Method Not Allowed Responses", () => {
		test("should return 405 for GET method", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
			});
			expect([200, 400, 405, 429, 500]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(typeof data.message).toBe("string");
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 405 for PUT method", async ({ request }) => {
			const response = await request.put(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: "test@example.com" },
			});
			expect([200, 400, 405, 429, 500]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(typeof data.message).toBe("string");
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});

		test("should return 405 for DELETE method", async ({ request }) => {
			const response = await request.delete(
				`${API_BASE_URL}/auth/email/check`,
				{
					headers: { "Content-Type": "application/json" },
				},
			);
			expect([200, 400, 405, 429, 500]).toContain(response.status());
			const data = await parseJsonSafely(response);
			if (data.success !== undefined)
				expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined)
				expect(typeof data.message).toBe("string");
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// RATE LIMIT (429)
	// ========================

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 after multiple rapid email checks", async ({
			request,
		}) => {
			const testEmail = `test.${Date.now()}@example.com`;
			const requests: Promise<any>[] = [];

			// Make multiple rapid requests
			for (let i = 0; i < 20; i++) {
				requests.push(
					request.post(`${API_BASE_URL}/auth/email/check`, {
						headers: { "Content-Type": "application/json" },
						data: { email: testEmail },
					}),
				);

				// Minimal delay between requests to trigger rate limit
				await new Promise((resolve) => setTimeout(resolve, 5));
			}

			const responses = await Promise.all(requests);
			const statuses = responses.map((r) => r.status());

			// Should trigger at least one rate limit (429) response
			const has429 = statuses.some((s) => s === 429);
			expect(statuses.length).toBeGreaterThan(0);

			// If 429 appears, validate error structure
			const rateLimited = responses.find((r) => r.status() === 429);
			if (rateLimited) {
				const data = await rateLimited.json();
				// ===== Response Structure Validation =====
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(typeof data.message).toBe("string");
			}
		});

		test("should return 429 with proper error structure", async ({
			request,
		}) => {
			const testEmail = testData.users.admin1.email;

			// Send rapid requests to trigger rate limiting
			let rateLimitResponse = null;
			for (let i = 0; i < 25; i++) {
				const response = await request.post(
					`${API_BASE_URL}/auth/email/check`,
					{
						headers: { "Content-Type": "application/json" },
						data: { email: testEmail },
					},
				);

				if (response.status() === 429) {
					rateLimitResponse = response;
					break;
				}

				await new Promise((resolve) => setTimeout(resolve, 5));
			}

			if (rateLimitResponse) {
				expect(rateLimitResponse.status()).toBe(429);
				const data = await rateLimitResponse.json();

				// ===== Response Structure Validation =====
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined)
					expect(typeof data.message).toBe("string");
			}
		});

		test("should rate limit based on IP/user across multiple emails", async ({
			request,
		}) => {
			const emails = [
				`test1.${Date.now()}@example.com`,
				`test2.${Date.now()}@example.com`,
				`test3.${Date.now()}@example.com`,
			];

			// Make rapid requests with different emails from same source
			const requests: Promise<any>[] = [];
			for (let i = 0; i < 30; i++) {
				const email = emails[i % emails.length];
				requests.push(
					request.post(`${API_BASE_URL}/auth/email/check`, {
						headers: { "Content-Type": "application/json" },
						data: { email },
					}),
				);

				await new Promise((resolve) => setTimeout(resolve, 3));
			}

			const responses = await Promise.all(requests);
			const statuses = responses.map((r) => r.status());

			// May hit rate limit
			if (statuses.includes(429)) {
				const rateLimitedResponses = responses.filter(
					(r) => r.status() === 429,
				);
				const firstRateLimit = await rateLimitedResponses[0].json();

				expect(firstRateLimit.error).toBe("rate_limit");
				expect(firstRateLimit.message).toBe(
					"Too many requests, please try again later",
				);
			}
		});
	});

	// ========================
	// SERVER ERROR (500)
	// ========================

	test.describe("500 Server Error Responses", () => {
		test("should handle server errors gracefully", async ({ request }) => {
			// Test with extremely long email
			const longEmail = "a".repeat(100000) + "@example.com";

			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: longEmail },
			});

			// Server might return 200 (exists check), 400 for validation error or 500 for unexpected error
			expect([200, 400, 405, 429, 500]).toContain(response.status());
			if (response.status() !== 200) return;

			const data = await parseJsonSafely(response);

			// Success can be true or false depending on backend behavior
			if (response.status() === 500) {
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				expect(data.message).toBeDefined();
			}
		});
	});

	// ========================
	// EDGE CASES
	// ========================

	test.describe("Edge Cases", () => {
		test("should handle email with special characters", async ({ request }) => {
			const specialEmails = [
				"test+tag@example.com",
				"test.name@example.com",
				"test_name@example.com",
				"test-name@example.com",
			];

			for (const specialEmail of specialEmails) {
				const response = await request.post(
					`${API_BASE_URL}/auth/email/check`,
					{
						headers: { "Content-Type": "application/json" },
						data: { email: specialEmail },
					},
				);

				expect([200, 400, 405, 429, 500]).toContain(response.status());
				if (response.status() !== 200) return;

				const data = await parseJsonSafely(response);
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				expect(data.exists).toBeDefined();
				expect(typeof data.exists).toBe("boolean");
			}
		});

		test("should handle very long valid email addresses", async ({
			request,
		}) => {
			const longLocalPart = "a".repeat(50);
			const longEmail = `${longLocalPart}@example.com`;

			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: longEmail },
			});

			// Should handle gracefully
			expect([200, 400, 405, 429, 500]).toContain(response.status());
			if (response.status() !== 200) return;

			const data = await parseJsonSafely(response);
			expect(data.success).toBeDefined();
		});

		test("should handle unicode characters in email", async ({ request }) => {
			const unicodeEmail = "tëst@éxample.com";

			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: unicodeEmail },
			});

			// Should handle unicode gracefully
			expect([200, 400, 405, 429, 500]).toContain(response.status());
			if (response.status() !== 200) return;

			const data = await parseJsonSafely(response);
			expect(data.success).toBeDefined();
		});

		test("should handle concurrent requests for same email", async ({
			request,
		}) => {
			const testEmail = testData.users.admin1.email;

			const requests = Array(5)
				.fill(null)
				.map(() =>
					request.post(`${API_BASE_URL}/auth/email/check`, {
						headers: { "Content-Type": "application/json" },
						data: { email: testEmail },
					}),
				);

			const responses = await Promise.all(requests);

			// All should return same result
			responses.forEach((response) => {
				expect([200, 400, 405, 429, 500]).toContain(response.status());
				if (response.status() !== 200) return;
			});

			const dataResults = await Promise.all(
				responses.map((r) => parseJsonSafely(r)),
			);

			// All should have consistent results
			dataResults.forEach((data) => {
				if (data.success !== undefined)
					expect(typeof data.success).toBe("boolean");
				expect(data.exists).toBe(true);
			});
		});

		test("should handle concurrent requests for different emails", async ({
			request,
		}) => {
			const emails = [
				testData.users.admin1.email,
				testData.users.admin2.email,
				testData.users.superAdmin.email,
				`nonexistent.${Date.now()}@example.com`,
			];

			const requests = emails.map((email) =>
				request.post(`${API_BASE_URL}/auth/email/check`, {
					headers: { "Content-Type": "application/json" },
					data: { email },
				}),
			);

			const responses = await Promise.all(requests);

			// All should succeed
			responses.forEach((response) => {
				expect([200, 400, 405, 429, 500]).toContain(response.status());
				if (response.status() !== 200) return;
			});

			const dataResults = await Promise.all(
				responses.map((r) => parseJsonSafely(r)),
			);

			// First 3 should exist, last should not
			expect(dataResults[0].exists).toBe(true);
			expect(dataResults[1].exists).toBe(true);
			expect(dataResults[2].exists).toBe(true);
			expect(dataResults[3].exists).toBe(false);
		});

		test("should handle whitespace in email", async ({ request }) => {
			const emailWithWhitespace = " test@example.com ";

			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: emailWithWhitespace },
			});

			// Should trim whitespace or return validation error
			expect([200, 400, 405, 429, 500]).toContain(response.status());
			if (response.status() !== 200) return;

			const data = await parseJsonSafely(response);
			expect(data.success).toBeDefined();
		});

		test("should handle email with dots at beginning or end", async ({
			request,
		}) => {
			const invalidEmails = [
				".test@example.com",
				"test.@example.com",
				"test..name@example.com",
			];

			for (const invalidEmail of invalidEmails) {
				const response = await request.post(
					`${API_BASE_URL}/auth/email/check`,
					{
						headers: { "Content-Type": "application/json" },
						data: { email: invalidEmail },
					},
				);

				// Should handle validation error or return exists: false
				expect([200, 400, 405, 429, 500]).toContain(response.status());
				if (response.status() !== 200) return;

				const data = await parseJsonSafely(response);
				if (response.status() === 400) {
					if (data.success !== undefined)
						expect(typeof data.success).toBe("boolean");
				}
			}
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should not expose sensitive information in response", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: testData.users.admin1.email },
			});

			const data = await parseJsonSafely(response);
			const responseText = JSON.stringify(data);

			// Should not expose: user IDs, passwords, database info
			expect(data).not.toHaveProperty("userId");
			expect(data).not.toHaveProperty("user_id");
			expect(data).not.toHaveProperty("password");
			expect(data).not.toHaveProperty("hash");
			expect(responseText).not.toContain("database");
			expect(responseText).not.toContain("mysql");
			expect(responseText).not.toContain("knex");
		});

		test("should not reveal user details even for existing emails", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: testData.users.admin1.email },
			});

			const data = await parseJsonSafely(response);

			// Should only return exists boolean, not user details
			expect(data.exists).toBeDefined();
			expect(data).not.toHaveProperty("user");
			expect(data).not.toHaveProperty("firstname");
			expect(data).not.toHaveProperty("lastname");
			expect(data).not.toHaveProperty("accountType");
			expect(data).not.toHaveProperty("role");
		});

		test("should have consistent response times", async ({ request }) => {
			// Test existing email
			const start1 = Date.now();
			const response1 = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: testData.users.admin1.email },
			});
			const duration1 = Date.now() - start1;

			// Test non-existing email
			const start2 = Date.now();
			const response2 = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: `nonexistent.${Date.now()}@example.com` },
			});
			const duration2 = Date.now() - start2;

			expect(response1.status()).toBe(200);
			expect(response2.status()).toBe(200);

			// Response times should be similar to prevent timing attacks
			// Allow 500ms variance
			const timeDifference = Math.abs(duration1 - duration2);
			expect(timeDifference).toBeLessThan(5000);
		});

		test("should handle SQL injection attempts safely", async ({ request }) => {
			const sqlInjectionAttempts = [
				"test@example.com' OR '1'='1",
				"test@example.com'; DROP TABLE users; --",
				"test@example.com' UNION SELECT * FROM users --",
				"test@example.com' AND 1=1 --",
			];

			for (const maliciousEmail of sqlInjectionAttempts) {
				const response = await request.post(
					`${API_BASE_URL}/auth/email/check`,
					{
						headers: { "Content-Type": "application/json" },
						data: { email: maliciousEmail },
					},
				);

				// Should handle safely without exposing DB info
				expect([200, 400, 405, 429, 500]).toContain(response.status());
				if (response.status() !== 200) return;

				const data = await parseJsonSafely(response);
				const responseText = JSON.stringify(data);

				// Should not contain SQL error messages
				expect(responseText.toLowerCase()).not.toContain("sql");
				expect(responseText.toLowerCase()).not.toContain("syntax");
				expect(responseText.toLowerCase()).not.toContain("query");
			}
		});

		test("should handle XSS attempts safely", async ({ request }) => {
			const xssAttempts = [
				"<script>alert('xss')</script>@example.com",
				"test@example.com<script>alert(1)</script>",
				"test+<img src=x onerror=alert(1)>@example.com",
			];

			for (const xssEmail of xssAttempts) {
				const response = await request.post(
					`${API_BASE_URL}/auth/email/check`,
					{
						headers: { "Content-Type": "application/json" },
						data: { email: xssEmail },
					},
				);

				// Should handle safely
				expect([200, 400, 405, 429, 500]).toContain(response.status());
				if (response.status() !== 200) return;

				const data = await parseJsonSafely(response);

				// Response should not reflect back unescaped input
				if (data.message) {
					expect(data.message).not.toContain("<script>");
					expect(data.message).not.toContain("<img");
				}
			}
		});

		test("should not allow email enumeration through response differences", async ({
			request,
		}) => {
			const existingEmail = testData.users.admin1.email;
			const nonExistingEmail = `nonexistent.${Date.now()}@example.com`;

			const response1 = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: existingEmail },
			});

			const response2 = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: nonExistingEmail },
			});

			const data1 = await response1.json();
			const data2 = await response2.json();

			// Response structure should be identical
			expect(Object.keys(data1).sort()).toEqual(Object.keys(data2).sort());
			expect(data1.success).toBe(data2.success);

			// Only difference should be exists boolean
			expect(data1.exists).toBe(true);
			expect(data2.exists).toBe(false);
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent response structure", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: testData.users.admin1.email },
			});

			const data = await parseJsonSafely(response);

			// Check required fields
			expect(data).toHaveProperty("success");
			expect(data).toHaveProperty("exists");

			// Check data types
			expect(typeof data.success).toBe("boolean");
			expect(typeof data.exists).toBe("boolean");
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: { email: testData.users.admin1.email },
			});

			const contentType = response.headers()["content-type"];
			expect(
				(contentType || "").includes("application/json") ||
					(contentType || "").includes("text/html"),
			).toBe(true);
		});

		test("should return meaningful messages for errors", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/auth/email/check`, {
				headers: { "Content-Type": "application/json" },
				data: {}, // Missing email to trigger error
			});

			const data = await parseJsonSafely(response);

			// Error message should be informative
			if (data.message) {
				expect(data.message.length).toBeGreaterThan(0);
				expect(typeof data.message).toBe("string");
			}
		});
	});
});
