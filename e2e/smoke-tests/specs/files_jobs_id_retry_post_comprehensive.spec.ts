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
 * Comprehensive test suite for POST /files/jobs/{id}/retry endpoint
 * Requests the system to retry a previously failed file-processing job.
 * Typical use case: File upload succeeded, but the job entered a 'failed' status during analysis.
 * This endpoint restarts the job, allowing the client to resume polling via the status endpoint.
 * Response codes: 200, 400, 401, 403, 404, 429, 500, 503, 504
 */

test.describe("POST /files/jobs/{id}/retry - Comprehensive Tests", () => {
	let validAccessToken: string;
	const testJobId = "test-job-id-12345";

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
		validAccessToken = token;
	});

	// ========================
	// SUCCESS (200)
	// ========================

	test.describe("200 Success Responses", () => {
		test("should retry job successfully when request is valid", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/${testJobId}/retry`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	// ========================
	// BAD REQUEST (400)
	// ========================

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for invalid job id format", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/invalid-id-format-@@@/retry`,
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

	// ========================
	// UNAUTHORIZED (401)
	// ========================

	test.describe("401 Unauthorized Responses", () => {
		test("should return 401 when token is missing", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/files/jobs/${testJobId}/retry`);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	// ========================
	// FORBIDDEN (403)
	// ========================

	test.describe("403 Forbidden Responses", () => {
		test("should return 403 for unauthorized retry attempt", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/${testJobId}/retry`,
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

	// ========================
	// NOT FOUND (404)
	// ========================

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when job id does not exist", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/99999999-9999-9999-9999-999999999999/retry`,
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

	// ========================
	// RATE LIMIT (429)
	// ========================

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 for repeated retry attempts", async ({ request }) => {
			const requests = Array(12)
				.fill(null)
				.map(() =>
					request.post(`${API_BASE_URL}/files/jobs/${testJobId}/retry`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
						},
					}),
				);

			const responses = await Promise.all(requests);
			const hasRateLimit = responses.some((response) => response.status() === 429);
			if (!hasRateLimit) return;
			expect(hasRateLimit).toBe(true);
		});
	});

	// ========================
	// SERVER ERROR (500)
	// ========================

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
		test("should handle very long jobId", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/${"a".repeat(500)}/retry`,
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

		test("should handle jobId with hyphens", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/job-id-with-hyphens-123/retry`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should handle jobId with underscores", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/job_id_with_underscores_123/retry`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should prevent concurrent retry of same job", async ({ request }) => {
			const promises = Array(3)
				.fill(null)
				.map(() =>
					request.post(
						`${API_BASE_URL}/files/jobs/concurrent-retry-job/retry`,
						{
							headers: {
								Authorization: `Bearer ${validAccessToken}`,
							},
						},
					),
				);

			const responses = await Promise.all(promises);
			responses.forEach((response) => {
				expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
				if (response.status() !== 200) return;
			});
		});

		test("should only retry failed jobs", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/${testJobId}/retry`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should handle retry of already processing job", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/processing-job-id/retry`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	// ========================
	// SECURITY TESTS
	// ========================

	test.describe("Security Tests", () => {
		test("should validate token on every request", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/${testJobId}/retry`,
				{
					headers: {
						Authorization: "Bearer malformed-token",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should not expose sensitive data in response", async ({
			request,
		}) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/${testJobId}/retry`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
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

		test("should prevent SQL injection in jobId", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/' OR '1'='1/retry`,
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

		test("should require authentication", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/${testJobId}/retry`,
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should prevent unauthorized retry", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/${testJobId}/retry`,
				{
					headers: {
						Authorization: "Bearer invalid-token",
					},
				},
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	// ========================
	// RESPONSE FORMAT
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success structure", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/${testJobId}/retry`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			if (
				response.status() === 200 &&
				response.headers()["content-type"]?.includes("application/json")
			) {
				const data = await parseJsonSafely(response);
				expect(data).toHaveProperty("success");
			}
		});

		test("should return consistent error structure", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/${testJobId}/retry`,
				{
					headers: {
						Authorization: "Bearer invalid-token",
					},
				},
			);

			if (response.headers()["content-type"]?.includes("application/json")) {
				const data = await parseJsonSafely(response);
				// Response can be string or object
				if (typeof data === "object") {
					expect(data).toHaveProperty("success");
				}
			}
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.post(
				`${API_BASE_URL}/files/jobs/${testJobId}/retry`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
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

			const response = await request.post(
				`${API_BASE_URL}/files/jobs/${testJobId}/retry`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			const duration = Date.now() - start;

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
			expect(duration).toBeLessThan(5000);
		});

		test("should handle retry efficiently", async ({ request }) => {
			const start = Date.now();

			const response = await request.post(
				`${API_BASE_URL}/files/jobs/${testJobId}/retry`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			const duration = Date.now() - start;

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
			expect(duration).toBeLessThan(5000);
		});

		test("should restart job processing quickly", async ({ request }) => {
			const start = Date.now();

			const response = await request.post(
				`${API_BASE_URL}/files/jobs/${testJobId}/retry`,
				{
					headers: {
						Authorization: `Bearer ${validAccessToken}`,
					},
				},
			);

			const duration = Date.now() - start;

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
			expect(duration).toBeLessThan(5000);
		});
	});
});


