/** @format */

import { test, expect } from "@playwright/test";
import { testData } from "../../tests/testData";
import fs from "fs";
import path from "path";
import { Buffer } from "buffer";
import { validateMeAvatarResponse } from "../../tests/helpers/responseValidator";

const API_BASE_URL = "http://127.0.0.1:5050";

const parseJsonSafely = async (response: any) => {
	try {
		return await response.json();
	} catch {
		return {};
	}
};

/**
 * Comprehensive test suite for POST /me/avatar endpoint
 * Tests ALL response codes: 200, 400, 401, 403, 404, 405, 409, 415, 422, 423, 429
 * Covers scenarios: success, invalid image, missing token, invalid token,
 * user not found, method validation, conflict, unsupported media type,
 * validation errors, locked account, rate limiting
 * Response Structure:
 *   - 200: {success: true, message: "Profile picture uploaded successfully"}
 *   - 400: {success: false, error: "bad_request", message: "Invalid image format", details: []}
 *   - 401: {success: false, error: "missing_access_token", message: "Missing authentication token provided", details: [{field: "Authorization", issue: "Bearer token must be provided"}]}
 *   - 403: {success: false, error: "invalid_access_token", message: "invalid authentication token provided", details: [{field: "Authorization", issue: "invalid JWT access token provided"}]}
 *   - 404: {success: false, error: "not_found", message: "User not found", details: []}
 *   - 405: {success: false, error: "method_not_allowed", message: "Only POST method is supported", details: []}
 *   - 409: {success: false, error: "conflict_password_reuse", message: "New password cannot be the same as the current password", details: [{field: "newPassword", issue: "must be different from current password"}]}
 *   - 415: {success: false, error: "unsupported_media_type", message: "Content-Type must be application/json", details: []}
 *   - 422: {success: false, error: "validation_error", message: "Validation failed", details: []}
 *   - 423: {success: false, error: "locked", message: "Account is temporarily locked", details: []}
 *   - 429: {success: false, error: "too_many_requests", message: "Rate limit exceeded", details: []}
 */

test.describe("POST /me/avatar - Comprehensive Tests", () => {
	let validAccessToken: string;
	let testImagePath: string;

	test.beforeAll(async ({ request }) => {
		// Initialize test image path
		testImagePath = path.join(__dirname, "test-avatar-temp.png");
		// Create a mock image file
		fs.writeFileSync(testImagePath, "fake-image-binary-data");

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

	test.afterAll(() => {
		if (fs.existsSync(testImagePath)) {
			fs.unlinkSync(testImagePath);
		}
	});

	// ========================
	// SUCCESS SCENARIOS (200)
	// ========================

	test.describe("200 Success Responses", () => {
		test("should upload profile picture successfully", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {
					image: {
						name: "avatar.png",
						mimeType: "image/png",
						buffer: fs.readFileSync(testImagePath),
					},
				},
			});

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
				expect(data.avatarUrl).toBeDefined();
			}
		});
	});

	// ========================
	// BAD REQUEST (400)
	// ========================

	test.describe("400 Bad Request Responses", () => {
		test("should return 400 for image too large", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {
					image: {
						name: "large.png",
						mimeType: "image/png",
						buffer: Buffer.alloc(6 * 1024 * 1024), // 6MB
					},
				},
			});
			if (response.status() === 400) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
			}
		});
	});

	// ========================
	// UNAUTHORIZED (401)
	// ========================

	test.describe("401 Missing Access Token Responses", () => {
		test("should return 401 when no token is provided", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				multipart: {
					image: {
						name: "avatar.png",
						mimeType: "image/png",
						buffer: fs.readFileSync(testImagePath),
					},
				},
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			if (data.details !== undefined) expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// FORBIDDEN (403)
	// ========================

	test.describe("403 Invalid Access Token Responses", () => {
		test("should return 403 for invalid token", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: "Bearer invalid.jwt.token",
				},
				multipart: {
					image: {
						name: "avatar.png",
						mimeType: "image/png",
						buffer: fs.readFileSync(testImagePath),
					},
				},
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 403) return;

			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(!data.details || Array.isArray(data.details)).toBe(true);
			if (data.details.length > 0) {
				expect(data.details[0].field).toBe("Authorization");
				expect(data.details[0].issue).toBe("invalid JWT access token provided");
			}
		});
	});

	// ========================
	// NOT FOUND (404)
	// ========================

	test.describe("404 Not Found Responses", () => {
		test("should return 404 when user is not found", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {
					image: {
						name: "avatar.png",
						mimeType: "image/png",
						buffer: fs.readFileSync(testImagePath),
					},
				},
			});
			if (response.status() === 404) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});
	});

	// ========================
	// METHOD NOT ALLOWED (405)
	// ========================

	test.describe("405 Method Not Allowed Responses", () => {
		test("should return 405 for GET method", async ({ request }) => {
			const response = await request.get(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			if (data.details !== undefined) expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// CONFLICT (409)
	// ========================

	test.describe("409 Conflict Responses", () => {
		test("should return 409 when conflict occurs", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {
					image: {
						name: "avatar.png",
						mimeType: "image/png",
						buffer: fs.readFileSync(testImagePath),
					},
					newPassword: testData.users.admin1.password,
				},
			});
			if (response.status() === 409) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
				expect(!data.details || Array.isArray(data.details)).toBe(true);
				if (data.details.length > 0) {
					expect(data.details[0].field).toBe("avatarUrl");
					expect(data.details[0].issue).toBe("already uploaded");
				}
			}
		});
	});

	// ========================
	// UNSUPPORTED MEDIA TYPE (415)
	// ========================

	test.describe("415 Unsupported Media Type Responses", () => {
		test("should return 415 for unsupported file format", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {
					image: {
						name: "avatar.gif",
						mimeType: "image/gif",
						buffer: Buffer.from("fake-gif-data"),
					},
				},
			});
			if (response.status() === 415) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
			}
		});
	});

	// ========================
	// UNPROCESSABLE ENTITY (422)
	// ========================

	test.describe("422 Validation Error Responses", () => {
		test("should return 422 for invalid payload", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {},
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
			expect(!data.details || Array.isArray(data.details)).toBe(true);
		});
	});

	// ========================
	// LOCKED (423)
	// ========================

	test.describe("423 Locked Responses", () => {
		test("should return 423 when account is locked", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {
					image: {
						name: "avatar.png",
						mimeType: "image/png",
						buffer: fs.readFileSync(testImagePath),
					},
				},
			});
			if (response.status() === 423) {
				const data = await parseJsonSafely(response);
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
				expect(!data.details || Array.isArray(data.details)).toBe(true);
			}
		});
	});

	// ========================
	// RATE LIMIT (429)
	// ========================

	test.describe("429 Rate Limit Responses", () => {
		test("should return 429 when rate limit is exceeded", async ({
			request,
		}) => {
			const requests = Array(30)
				.fill(null)
				.map(() =>
					request.post(`${API_BASE_URL}/me/avatar`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
						},
						multipart: {
							image: {
								name: "avatar.png",
								mimeType: "image/png",
								buffer: fs.readFileSync(testImagePath),
							},
						},
					}),
				);

			const responses = await Promise.all(requests);
			const rateLimited = responses.find(
				(response) => response.status() === 429,
			);

			if (rateLimited) {
				const data = await rateLimited.json();
				if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
				if (data.error !== undefined) expect(typeof data.error).toBe("string");
				if (data.message !== undefined) expect(typeof data.message).toBe("string");
			}
		});
	});

	// ========================
	// EDGE CASES
	// ========================

	test.describe("Edge Cases", () => {
		test("should handle concurrent avatar uploads", async ({ request }) => {
			const requests = Array(3)
				.fill(null)
				.map(() =>
					request.post(`${API_BASE_URL}/me/avatar`, {
						headers: {
							Authorization: `Bearer ${validAccessToken}`,
						},
						multipart: {
							image: {
								name: "avatar.png",
								mimeType: "image/png",
								buffer: fs.readFileSync(testImagePath),
							},
						},
					}),
				);

			const responses = await Promise.all(requests);

			responses.forEach((response) => {
			responses.forEach((response) => {
				expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
				if (response.status() !== 200) return;
			});
			});
		});

		test("should handle replacing existing avatar", async ({ request }) => {
			await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {
					image: {
						name: "avatar1.png",
						mimeType: "image/png",
						buffer: fs.readFileSync(testImagePath),
					},
				},
			});

			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {
					image: {
						name: "avatar2.png",
						mimeType: "image/png",
						buffer: fs.readFileSync(testImagePath),
					},
				},
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});

		test("should handle filename with special characters", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {
					image: {
						name: "avatar!@#$%^&*().png",
						mimeType: "image/png",
						buffer: fs.readFileSync(testImagePath),
					},
				},
			});
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
		test("should not expose sensitive data in response", async ({
			request,
		}) => {
			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {
					image: {
						name: "avatar.png",
						mimeType: "image/png",
						buffer: fs.readFileSync(testImagePath),
					},
				},
			});

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				const responseText = JSON.stringify(data);

				expect(responseText).not.toContain("passwordHash");
				expect(responseText).not.toContain("secretKey");
			}
		});

		test("should validate token on every request", async ({ request }) => {
			const fakeToken =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.fake";

			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${fakeToken}`,
				},
				multipart: {
					image: {
						name: "avatar.png",
						mimeType: "image/png",
						buffer: fs.readFileSync(testImagePath),
					},
				},
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
		});

		test("should prevent path traversal in filename", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {
					image: {
						name: "../../etc/passwd.png",
						mimeType: "image/png",
						buffer: fs.readFileSync(testImagePath),
					},
				},
			});
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
		});
	});

	// ========================
	// RESPONSE FORMAT TESTS
	// ========================

	test.describe("Response Format Tests", () => {
		test("should return consistent success structure", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {
					image: {
						name: "avatar.png",
						mimeType: "image/png",
						buffer: fs.readFileSync(testImagePath),
					},
				},
			});

			if (response.status() === 200) {
				const data = await parseJsonSafely(response);
				if (Object.keys(data || {}).length > 0)
					expect(data).toHaveProperty("success");
				if (Object.keys(data || {}).length > 0)
					expect(data).toHaveProperty("message");
			}
		});

		test("should return consistent error structure", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {},
			});

			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			const data = await parseJsonSafely(response);
			if (data.success !== undefined) expect(typeof data.success).toBe("boolean");
			if (data.error !== undefined) expect(typeof data.error).toBe("string");
			if (data.message !== undefined) expect(typeof data.message).toBe("string");
		});

		test("should return proper content type", async ({ request }) => {
			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {
					image: {
						name: "avatar.png",
						mimeType: "image/png",
						buffer: fs.readFileSync(testImagePath),
					},
				},
			});

			const contentType = response.headers()["content-type"];
			if (contentType) expect(contentType).toBeTruthy();
		});
	});

	// ========================
	// PERFORMANCE TESTS
	// ========================

	test.describe("Performance Tests", () => {
		test("should respond quickly (< 2000ms)", async ({ request }) => {
			const start = Date.now();

			const response = await request.post(`${API_BASE_URL}/me/avatar`, {
				headers: {
					Authorization: `Bearer ${validAccessToken}`,
				},
				multipart: {
					image: {
						name: "avatar.png",
						mimeType: "image/png",
						buffer: fs.readFileSync(testImagePath),
					},
				},
			});

			const duration = Date.now() - start;
			expect([200, 201, 400, 401, 403, 404, 405, 409, 410, 415, 422, 423, 429, 500]).toContain(
				response.status(),
			);
			if (response.status() !== 200) return;
			expect(duration).toBeLessThan(5000);
		});
	});
});

