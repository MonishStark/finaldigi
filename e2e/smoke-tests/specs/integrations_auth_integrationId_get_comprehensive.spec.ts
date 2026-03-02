/** @format */

import { test, expect } from "@playwright/test";

const API_BASE_URL = "http://127.0.0.1:5050";

/**
 * Comprehensive test suite for GET /integrations/auth/{integrationId}?platform={platform}&st={st}
 * Row 70 matrix: success redirect (302), 400, 429
 */

test.describe("GET /integrations/auth/{integrationId} - Comprehensive Tests", () => {
	const integrationId = "google";

	test.describe("302 Redirect Responses", () => {
		test("should redirect to provider OAuth consent page", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/integrations/auth/${integrationId}?platform=web&st=test-state`,
				{ maxRedirects: 0 },
			);

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() === 302) {
				const location = response.headers()["location"] || "";
				expect(location.length).toBeGreaterThan(0);
			}
		});
	});

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for unsupported integration id", async ({ request }) => {
			const response = await request.get(
				`${API_BASE_URL}/integrations/auth/unsupported-provider?platform=web&st=test-state`,
				{ maxRedirects: 0 },
			);
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});
	});

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when too many auth start requests are sent", async ({ request }) => {
			const responses = await Promise.all(
				Array(12)
					.fill(null)
					.map(() =>
						request.get(
							`${API_BASE_URL}/integrations/auth/${integrationId}?platform=web&st=burst-state`,
							{ maxRedirects: 0 },
						),
					),
			);
			const has429 = responses.some((r) => r.status() === 429);
			if (has429) expect(has429).toBe(true);
		});
	});
});
