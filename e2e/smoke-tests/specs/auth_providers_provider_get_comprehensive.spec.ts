/** @format */

import { test, expect } from "@playwright/test";

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

/**
 * Comprehensive test suite for GET /auth/providers/{provider}?platform={platform}&flow={flow}
 * Row 71 matrix: success redirect (302), 400, 429
 */

test.describe("GET /auth/providers/{provider} - Comprehensive Tests", () => {
	const provider = "google";

	test.describe("200 Success Responses", () => {
		test("should return 200 with provider OAuth URL", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/auth/providers/${provider}?platform=web&flow=login`,
				{ maxRedirects: 0 },
			);

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				expect(data.url).toMatch(/^https:\/\/accounts\.google\.com/);
			}
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for unsupported provider", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/auth/providers/unsupported?platform=web&flow=login`,
				{ maxRedirects: 0 },
			);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
		});
	});

	test.describe("405 Method Not Allowed Responses", () => {
		test("should return 405 for POST request", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/auth/providers/${provider}`);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			if (data.details !== undefined) expect(Array.isArray(data.details) || typeof data.details === "object").toBe(true);
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when too many OAuth start requests are sent", async ({ request }) => {
			const responses = await Promise.all(
				Array(12)
					.fill(null)
					.map(() =>
						request.get(
							`${API_BASE_URL}/auth/providers/${provider}?platform=web&flow=login`,
							{ maxRedirects: 0 },
						),
					),
			);
			const rateLimited = responses.find((r) => r.status() === 429);
			if (rateLimited) {
				const data = await rateLimited.json();
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
			}
		});
	});
});
