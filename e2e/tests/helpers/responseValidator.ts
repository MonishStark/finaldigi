/** @format */

import { expect } from "@playwright/test";

/**
 * Response validation helper functions for comprehensive API testing
 * Validates response codes, structure, and field values per ENDPOINTRESPONSES.md
 */

export interface ValidationError {
	field: string;
	issue: string;
}

export interface ValidationDetails {
	[key: string]: ValidationError[] | string | object;
}

export interface ResponseValidationOptions {
	expectMessage?: string | RegExp;
	expectDetails?: ValidationError[] | object;
	expectDataFields?: string[];
	customValidators?: { [key: string]: (value: any) => void };
}

/**
 * Validate a successful response (2xx)
 * @param response The response object
 * @param options Validation options
 */
export async function validateSuccessResponse(
	response: any,
	options: ResponseValidationOptions = {},
) {
	// Status code should be in 200 range
	expect([200, 201, 202]).toContain(response.status());

	const data = await response.json();

	// === CORE VALIDATIONS ===
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);
	expect(typeof data.message).toBe("string");

	// Message validation if specified
	if (options.expectMessage) {
		if (typeof options.expectMessage === "string") {
			expect(data.message).toContain(options.expectMessage);
		} else {
			expect(data.message).toMatch(options.expectMessage);
		}
	}

	// Data structure validation
	if (options.expectDataFields) {
		const resource = data.data || data.item || data.user || data.team;
		expect(resource).toBeDefined();
		options.expectDataFields.forEach((field) => {
			expect(resource).toHaveProperty(field);
		});
	}

	// Custom validators
	if (options.customValidators) {
		Object.entries(options.customValidators).forEach(([key, validator]) => {
			validator(data[key]);
		});
	}

	return data;
}

/**
 * Validate an error response (4xx/5xx)
 * @param response The response object
 * @param expectedErrorCode Expected error code (e.g., "bad_request", "forbidden")
 * @param options Validation options
 */
export async function validateErrorResponse(
	response: any,
	expectedErrorCode: string,
	options: ResponseValidationOptions = {},
) {
	expect([400, 401, 403, 404, 405, 409, 414, 429, 500, 503, 504]).toContain(
		response.status(),
	);

	const data = await response.json();

	// === CORE ERROR VALIDATIONS ===
	expect(data.success).toBe(false);
	expect(data.error).toBe(expectedErrorCode);
	expect(typeof data.message).toBe("string");
	expect(data.message.length).toBeGreaterThan(0);

	// Message validation
	if (options.expectMessage) {
		if (typeof options.expectMessage === "string") {
			expect(data.message).toContain(options.expectMessage);
		} else {
			expect(data.message).toMatch(options.expectMessage);
		}
	}

	// Details validation
	if (options.expectDetails || Array.isArray(data.details)) {
		if (Array.isArray(data.details)) {
			validateDetailsArray(data.details, options.expectDetails);
		} else if (typeof data.details === "object") {
			validateDetailsObject(data.details, options.expectDetails);
		}
	}

	return data;
}

/**
 * Validate 400 Bad Request with field-level errors
 * @param response The response object
 * @param expectedFields Expected fields in details array
 */
export async function validate400BadRequest(
	response: any,
	expectedFields?: string[],
) {
	expect(response.status()).toBe(400);
	const data = await response.json();

	expect(data.success).toBe(false);
	expect(data.error).toBe("bad_request");
	expect(data.message.toLowerCase()).toMatch(/invalid|missing|required/i);

	// Validate details array structure
	if (Array.isArray(data.details)) {
		data.details.forEach((detail) => {
			expect(detail).toHaveProperty("field");
			expect(detail).toHaveProperty("issue");
			expect(typeof detail.field).toBe("string");
			expect(typeof detail.issue).toBe("string");
		});

		if (expectedFields) {
			const detailFields = data.details.map((d) => d.field);
			expectedFields.forEach((field) => {
				expect(detailFields).toContain(field);
			});
		}
	}

	return data;
}

/**
 * Validate 401 Unauthorized - handles three variants
 * @param response The response object
 * @param expectedVariant Which 401 variant: "missing", "invalid", or "expired"
 */
export async function validate401Unauthorized(
	response: any,
	expectedVariant: "missing" | "invalid" | "expired" = "invalid",
) {
	expect(response.status()).toBe(401);
	const data = await response.json();

	expect(data.success).toBe(false);

	// Three distinct 401 error codes from spec
	const validErrorCodes = [
		"missing_access_token",
		"invalid_access_token",
		"access_token_expired",
	];
	expect(validErrorCodes).toContain(data.error);

	// Variant-specific validation
	switch (expectedVariant) {
		case "missing":
			expect(data.error).toBe("missing_access_token");
			expect(data.message.toLowerCase()).toMatch(/missing|required|absent/i);
			break;
		case "invalid":
			expect(data.error).toBe("invalid_access_token");
			expect(data.message.toLowerCase()).toMatch(/invalid|malformed|decode/i);
			break;
		case "expired":
			expect(data.error).toBe("access_token_expired");
			expect(data.message.toLowerCase()).toMatch(/expired|expired|ttl/i);
			break;
	}

	return data;
}

/**
 * Validate 403 Forbidden
 * @param response The response object
 */
export async function validate403Forbidden(response: any) {
	expect(response.status()).toBe(403);
	const data = await response.json();

	expect(data.success).toBe(false);
	expect(data.error).toBe("forbidden");
	expect(data.message.toLowerCase()).toMatch(
		/permission|access|denied|forbidden/i,
	);

	return data;
}

/**
 * Validate 404 Not Found
 * @param response The response object
 */
export async function validate404NotFound(response: any) {
	expect(response.status()).toBe(404);
	const data = await response.json();

	expect(data.success).toBe(false);
	expect(data.error).toBe("not_found");
	expect(data.message.toLowerCase()).toMatch(/not found|does not exist|no/i);

	return data;
}

/**
 * Validate 409 Conflict
 * @param response The response object
 * @param conflictReason Optional specific conflict reason
 */
export async function validate409Conflict(
	response: any,
	conflictReason?: string,
) {
	expect(response.status()).toBe(409);
	const data = await response.json();

	expect(data.success).toBe(false);
	expect(data.error).toBe("conflict");
	expect(data.message.toLowerCase()).toMatch(
		/conflict|already|exists|duplicate/i,
	);

	if (conflictReason) {
		expect(data.message.toLowerCase()).toContain(conflictReason.toLowerCase());
	}

	return data;
}

/**
 * Validate 429 Rate Limit
 * @param response The response object
 */
export async function validate429RateLimit(response: any) {
	expect(response.status()).toBe(429);
	const data = await response.json();

	expect(data.success).toBe(false);
	expect(data.error).toMatch(/rate.limit|too.many.requests/i);
	expect(response.headers()["retry-after"]).toBeDefined();

	return data;
}

/**
 * Validate 500 Internal Server Error
 * @param response The response object
 */
export async function validate500ServerError(response: any) {
	expect(response.status()).toBe(500);
	const data = await response.json();

	expect(data.success).toBe(false);
	expect(data.error).toBe("internal_error");
	expect(typeof data.message).toBe("string");

	return data;
}

/**
 * Validate details array structure (for field-level validation errors)
 * @param details The details array
 * @param expected Expected details structure
 */
export function validateDetailsArray(
	details: any[],
	expected?: ValidationError[] | object,
) {
	expect(Array.isArray(details)).toBe(true);

	details.forEach((item) => {
		expect(item).toHaveProperty("field");
		expect(item).toHaveProperty("issue");
		expect(typeof item.field).toBe("string");
		expect(typeof item.issue).toBe("string");
	});

	if (expected && Array.isArray(expected)) {
		expected.forEach((expectedError) => {
			const found = details.find(
				(d) =>
					d.field === expectedError.field && d.issue === expectedError.issue,
			);
			expect(found).toBeDefined();
		});
	}
}

/**
 * Validate details object structure (for aggregate validation errors)
 * @param details The details object
 * @param expected Expected details structure
 */
export function validateDetailsObject(details: any, expected?: object) {
	expect(typeof details).toBe("object");
	expect(details).not.toBeNull();

	if (expected) {
		Object.entries(expected).forEach(([key, value]) => {
			expect(details[key]).toBeDefined();
		});
	}
}

/**
 * Validate paginated response structure
 * @param data The response data object
 * @param expectedCount Expected number of items (optional)
 */
export function validatePaginatedResponse(data: any, expectedCount?: number) {
	expect(data).toHaveProperty("items");
	expect(Array.isArray(data.items)).toBe(true);

	expect(data).toHaveProperty("pagination");
	const pagination = data.pagination;

	expect(pagination).toHaveProperty("offset");
	expect(pagination).toHaveProperty("limit");
	expect(pagination).toHaveProperty("totalItems");
	expect(pagination).toHaveProperty("hasMore");

	expect(typeof pagination.offset).toBe("number");
	expect(typeof pagination.limit).toBe("number");
	expect(typeof pagination.totalItems).toBe("number");
	expect(typeof pagination.hasMore).toBe("boolean");

	if (expectedCount !== undefined) {
		expect(data.items.length).toBe(expectedCount);
	}

	return data;
}

/**
 * Validate timestamp field format (ISO 8601)
 * @param timestamp The timestamp string
 */
export function validateTimestamp(timestamp: any) {
	expect(typeof timestamp).toBe("string");
	const date = new Date(timestamp);
	expect(date.toISOString()).toBeDefined();
	expect(isNaN(date.getTime())).toBe(false);
}

/**
 * Validate UUID format (v4)
 * @param uuid The UUID string
 */
export function validateUUID(uuid: any) {
	const uuidRegex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	expect(typeof uuid).toBe("string");
	expect(uuid).toMatch(uuidRegex);
}

/**
 * Validate email format
 * @param email The email string
 */
export function validateEmail(email: any) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	expect(typeof email).toBe("string");
	expect(email).toMatch(emailRegex);
}

/**
 * Validate URL format
 * @param url The URL string
 */
export function validateURL(url: any) {
	expect(typeof url).toBe("string");
	const urlRegex = /^https?:\/\/.+/;
	expect(url).toMatch(urlRegex);
}

/**
 * Compare two response structures for consistency
 * @param response1 First response
 * @param response2 Second response
 */
export async function validateConsistentStructure(
	response1: any,
	response2: any,
) {
	const data1 = await response1.json();
	const data2 = await response2.json();

	expect(Object.keys(data1).sort()).toEqual(Object.keys(data2).sort());
	expect(typeof data1.success).toBe(typeof data2.success);
	expect(typeof data1.message).toBe(typeof data2.message);
}

// ========================
// COMPLETE RESPONSE BODY VALIDATIONS
// ========================

/**
 * Validate complete user profile response
 * @param data The response data object
 */
export function validateUserProfile(data: any) {
	expect(data).toHaveProperty("id");
	expect(typeof data.id).toBe("number");
	expect(data.id).toBeGreaterThan(0);

	expect(data).toHaveProperty("firstname");
	expect(typeof data.firstname).toBe("string");

	expect(data).toHaveProperty("lastname");
	expect(typeof data.lastname).toBe("string");

	expect(data).toHaveProperty("email");
	expect(typeof data.email).toBe("string");
	validateEmail(data.email);

	expect(data).toHaveProperty("accountType");
	expect(data.accountType).toMatch(/^(solo|team|invited)$/);

	expect(data).toHaveProperty("currency");
	expect(typeof data.currency).toBe("string");

	expect(data).toHaveProperty("twoFactorEnabled");
	expect(typeof data.twoFactorEnabled).toBe("boolean");

	expect(data).toHaveProperty("language");
	expect(typeof data.language).toBe("string");

	expect(data).toHaveProperty("passwordSet");
	expect(typeof data.passwordSet).toBe("boolean");

	expect(data).toHaveProperty("role");
	expect(typeof data.role).toBe("number");

	// Optional fields
	if (data.mobileNumber !== undefined) {
		expect(typeof data.mobileNumber).toBe("string");
	}
	if (data.avatarUrl !== undefined) {
		expect(typeof data.avatarUrl).toBe("string");
		validateURL(data.avatarUrl);
	}
}

/**
 * Validate authentication tokens
 * @param data The auth object
 */
export function validateAuthTokens(data: any) {
	expect(data).toHaveProperty("accessToken");
	expect(typeof data.accessToken).toBe("string");
	// JWT format: 3 parts separated by dots
	const parts = data.accessToken.split(".");
	expect(parts.length).toBe(3);

	expect(data).toHaveProperty("refreshToken");
	expect(typeof data.refreshToken).toBe("string");

	expect(data).toHaveProperty("expiresIn");
	expect(typeof data.expiresIn).toBe("number");
	expect(data.expiresIn).toBeGreaterThan(0);

	expect(data).toHaveProperty("refreshTokenExpiresAt");
	validateTimestamp(data.refreshTokenExpiresAt);
}

/**
 * Validate POST /auth/login 200 Success response
 * Per API spec: Response varies based on 2FA status
 * - Solo/Team account without 2FA: user + company + auth tokens
 * - Account with 2FA enabled: twoFactorAuth + twoFactorToken
 * @param data The login response data
 */
export function validateLoginResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");

	// Check if 2FA is required (message contains "Two-factor")
	const requires2FA = data.message?.includes("Two-factor");

	if (requires2FA) {
		// 2FA required flow
		expect(data).toHaveProperty("twoFactorAuth");
		expect(data.twoFactorAuth).toBe(true);
		expect(data).toHaveProperty("twoFactorToken");
		expect(typeof data.twoFactorToken).toBe("string");
		expect(data.twoFactorToken.length).toBeGreaterThan(0);
	} else {
		// Standard login flow - user object required
		expect(data).toHaveProperty("user");
		expect(typeof data.user).toBe("object");
		validateUserProfile(data.user);

		// Auth tokens present
		if (data.user?.auth) {
			validateAuthTokens(data.user.auth);
		}

		// Company can be null for solo, object for team
		expect(data).toHaveProperty("company");
		if (data.company !== null) {
			validateCompanyProfile(data.company);
		}
	}
}

/**
 * Validate company profile response
 * @param data The company object
 */
export function validateCompanyProfile(data: any) {
	expect(data).toHaveProperty("id");
	expect(typeof data.id).toBe("number");

	expect(data).toHaveProperty("companyName");
	expect(typeof data.companyName).toBe("string");

	expect(data).toHaveProperty("orgType");
	expect(typeof data.orgType).toBe("string");

	expect(data).toHaveProperty("phoneNumber");
	expect(typeof data.phoneNumber).toBe("string");

	expect(data).toHaveProperty("phoneNumberCountryCode");
	expect(typeof data.phoneNumberCountryCode).toBe("string");

	// Optional fields
	if (data.companyLogo !== undefined) {
		expect(typeof data.companyLogo).toBe("string");
		validateURL(data.companyLogo);
	}

	if (data.mailingAddress) {
		expect(typeof data.mailingAddress).toBe("object");
		expect(data.mailingAddress).toHaveProperty("country");
		expect(data.mailingAddress).toHaveProperty("street");
		expect(data.mailingAddress).toHaveProperty("city");
		expect(data.mailingAddress).toHaveProperty("state");
		expect(data.mailingAddress).toHaveProperty("zip");
	}

	if (data.billingAddress) {
		expect(typeof data.billingAddress).toBe("object");
		expect(data.billingAddress).toHaveProperty("country");
		expect(data.billingAddress).toHaveProperty("street");
		expect(data.billingAddress).toHaveProperty("city");
		expect(data.billingAddress).toHaveProperty("state");
		expect(data.billingAddress).toHaveProperty("zip");
	}
}

/**
 * Validate team profile response
 * @param data The team object
 */
export function validateTeamProfile(data: any) {
	expect(data).toHaveProperty("id");
	expect(typeof data.id).toBe("number");

	expect(data).toHaveProperty("teamName");
	expect(typeof data.teamName).toBe("string");

	expect(data).toHaveProperty("createdAt");
	validateTimestamp(data.createdAt);

	expect(data).toHaveProperty("updatedAt");
	validateTimestamp(data.updatedAt);

	expect(data).toHaveProperty("status");
	expect(data.status).toMatch(/^(active|inactive|archived)$/);

	expect(data).toHaveProperty("createdBy");
	expect(typeof data.createdBy).toBe("number");
}

/**
 * Validate file info response
 * @param data The file object
 */
export function validateFileInfo(data: any) {
	expect(data).toHaveProperty("id");
	expect(typeof data.id).toBe("string");

	expect(data).toHaveProperty("name");
	expect(typeof data.name).toBe("string");

	expect(data).toHaveProperty("type");
	expect(typeof data.type).toBe("string");

	expect(data).toHaveProperty("size");
	expect(typeof data.size).toBe("number");
	expect(data.size).toBeGreaterThanOrEqual(0);

	expect(data).toHaveProperty("createdAt");
	validateTimestamp(data.createdAt);

	expect(data).toHaveProperty("updatedAt");
	validateTimestamp(data.updatedAt);

	expect(data).toHaveProperty("createdBy");
	expect(typeof data.createdBy).toBe("number");

	// Optional fields
	if (data.mimeType !== undefined) {
		expect(typeof data.mimeType).toBe("string");
	}
	if (data.status !== undefined) {
		expect(data.status).toMatch(/^(processing|completed|failed)$/);
	}
}

/**
 * Validate chat room response
 * @param data The chat object
 */
export function validateChatRoom(data: any) {
	expect(data).toHaveProperty("id");
	expect(typeof data.id).toBe("string");

	expect(data).toHaveProperty("teamId");
	expect(typeof data.teamId).toBe("number");

	expect(data).toHaveProperty("name");
	expect(typeof data.name).toBe("string");

	expect(data).toHaveProperty("createdAt");
	validateTimestamp(data.createdAt);

	expect(data).toHaveProperty("updatedAt");
	validateTimestamp(data.updatedAt);

	expect(data).toHaveProperty("createdBy");
	expect(typeof data.createdBy).toBe("number");
}

/**
 * Validate chat message response
 * @param data The message object
 */
export function validateChatMessage(data: any) {
	expect(data).toHaveProperty("id");
	expect(typeof data.id).toBe("string");

	expect(data).toHaveProperty("chatId");
	expect(typeof data.chatId).toBe("string");

	expect(data).toHaveProperty("userId");
	expect(typeof data.userId).toBe("number");

	expect(data).toHaveProperty("content");
	expect(typeof data.content).toBe("string");

	expect(data).toHaveProperty("createdAt");
	validateTimestamp(data.createdAt);

	expect(data).toHaveProperty("updatedAt");
	validateTimestamp(data.updatedAt);

	if (data.editedAt !== undefined) {
		validateTimestamp(data.editedAt);
	}
}

/**
 * Validate POST /auth/sign-out 200 Success response
 * Per API spec: {success: true, message: "Successfully signed out"}
 * @param data The sign-out response data
 */
export function validateSignOutResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("signed out");
}

/**
 * Validate POST /auth/verify-otp 200 Success response
 * Per API spec: Similar to login - user + auth tokens
 * @param data The verify-otp response data
 */
export function validateVerifyOTPResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("verified");

	// User object required
	expect(data).toHaveProperty("user");
	expect(typeof data.user).toBe("object");
	validateUserProfile(data.user);

	// Auth tokens required
	expect(data).toHaveProperty("auth");
	if (data.auth) {
		validateAuthTokens(data.auth);
	}

	// Company optional
	if (data.company !== undefined) {
		if (data.company !== null) {
			validateCompanyProfile(data.company);
		}
	}
}

/**
 * Validate POST /auth/password/forgot 200 Success response
 * Per API spec: {success: true, message: "Reset password link sent successfully..."}
 * @param data The forgot password response data
 */
export function validateForgotPasswordResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("reset");
	expect(data.message.toLowerCase()).toContain("email");
}

/**
 * Validate POST /auth/password/reset 200 Success response
 * Per API spec: {success: true, message: "Password updated successfully"}
 * @param data The reset password response data
 */
export function validateResetPasswordResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("password");
	expect(data.message.toLowerCase()).toContain("updated");
}

/**
 * Validate GET /me/subscription 200 Success response
 * Per API spec: {success: true, subscriptionData: {...}}
 * subscriptionData contains: id, subscription_type, subscription_plan, subscription_amount, currency, status
 * @param data The subscription response data
 */
export function validateSubscriptionResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("subscriptionData");
	expect(typeof data.subscriptionData).toBe("object");

	const sub = data.subscriptionData;

	// Required fields
	expect(sub).toHaveProperty("id");
	expect(typeof sub.id).toBe("number");
	expect(sub.id).toBeGreaterThan(0);

	expect(sub).toHaveProperty("subscription_type");
	expect(typeof sub.subscription_type).toBe("string");
	expect(sub.subscription_type).toMatch(/^(solo|team|organization)$/i);

	expect(sub).toHaveProperty("subscription_plan");
	expect(typeof sub.subscription_plan).toBe("string");

	expect(sub).toHaveProperty("subscription_amount");
	expect(typeof sub.subscription_amount).toBe("number");
	expect(sub.subscription_amount).toBeGreaterThanOrEqual(0);

	expect(sub).toHaveProperty("currency");
	expect(typeof sub.currency).toBe("string");
	expect(sub.currency.length).toBe(3); // ISO 4217 currency code

	expect(sub).toHaveProperty("status");
	expect(typeof sub.status).toBe("string");
	expect(sub.status).toMatch(/^(active|inactive|expired|suspended|cancelled)$/i);
}

/**
 * Validate POST /auth/register 201 Created response
 * Per API spec: {success, message, user, company, payment}
 * accountType=team includes company, accountType=solo has company=null
 * @param data The register response data
 */
export function validateRegisterResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(data.message).toBe("Account created successfully");

	// User object REQUIRED in 201 response
	expect(data).toHaveProperty("user");
	expect(typeof data.user).toBe("object");
	validateUserProfile(data.user);

	// Company field - null for solo, object for team
	expect(data).toHaveProperty("company");
	if (data.user.accountType === "team") {
		expect(data.company).not.toBeNull();
		validateCompanyProfile(data.company);
	} else {
		expect(data.company).toBeNull();
	}

	// Payment object with required and sessionUrl
	expect(data).toHaveProperty("payment");
	expect(typeof data.payment).toBe("object");
	expect(data.payment).toHaveProperty("required");
	expect(typeof data.payment.required).toBe("boolean");
	expect(data.payment).toHaveProperty("sessionUrl");
	if (data.payment.sessionUrl !== null) {
		validateURL(data.payment.sessionUrl);
	}
}

/**
 * Validate POST /auth/refresh 200 Success response
 * Per API spec: {success, auth: {accessToken, tokenType, expiresIn, refreshTokenExpiresAt}}
 * @param data The refresh response data
 */
export function validateRefreshResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("auth");
	expect(typeof data.auth).toBe("object");

	const auth = data.auth;

	// Access token (JWT format)
	expect(auth).toHaveProperty("accessToken");
	expect(typeof auth.accessToken).toBe("string");
	const parts = auth.accessToken.split(".");
	expect(parts.length).toBe(3);

	// Token type should be "Bearer"
	expect(auth).toHaveProperty("tokenType");
	expect(auth.tokenType).toBe("Bearer");

	// Expiry in seconds
	expect(auth).toHaveProperty("expiresIn");
	expect(typeof auth.expiresIn).toBe("number");
	expect(auth.expiresIn).toBeGreaterThan(0);

	// Refresh token expiry timestamp
	expect(auth).toHaveProperty("refreshTokenExpiresAt");
	validateTimestamp(auth.refreshTokenExpiresAt);
}

/**
 * Validate POST /auth/email/check 200 Success response
 * Per API spec: {success: true, exists: boolean}
 * @param data The email check response data
 */
export function validateEmailCheckResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("exists");
	expect(typeof data.exists).toBe("boolean");
}

/**
 * Validate POST /auth/verify-account 200 Success response
 * Per API spec: {success: true, message: "Account verification successful"}
 * @param data The verify account response data
 */
export function validateVerifyAccountResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("success");
}

/**
 * Validate GET /auth/payment/status 200 Success response
 * Per API spec: {success: true, status: "paid"|"pending"|"unpaid"|"failed"}
 * @param data The payment status response data
 */
export function validatePaymentStatusResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("status");
	expect(typeof data.status).toBe("string");
	expect(data.status).toMatch(/^(paid|pending|unpaid|failed)$/);
}

/**
 * Validate POST /me/verification/resend 200 Success response
 * Per API spec: {success: true, message: "Verification email resent successfully"}
 * @param data The verification resend response data
 */
export function validateVerificationResendResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("verification");
	expect(data.message.toLowerCase()).toContain("resent");
}

/**
 * Validate GET /me/profile 200 Success response
 * Per API spec: {success: true, message: "User data fetched successfully", user: {...}}
 * @param data The profile response data
 */
export function validateMeProfileResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("fetched");

	expect(data).toHaveProperty("user");
	expect(typeof data.user).toBe("object");

	// Validate user profile fields per spec
	const user = data.user;
	expect(user).toHaveProperty("id");
	expect(typeof user.id).toBe("number");
	expect(user).toHaveProperty("firstname");
	expect(typeof user.firstname).toBe("string");
	expect(user).toHaveProperty("lastname");
	expect(typeof user.lastname).toBe("string");
	expect(user).toHaveProperty("email");
	expect(typeof user.email).toBe("string");
	expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
	expect(user).toHaveProperty("accountStatus");
	expect(typeof user.accountStatus).toBe("boolean");
	expect(user).toHaveProperty("passwordSet");
	expect(typeof user.passwordSet).toBe("boolean");
	expect(user).toHaveProperty("mobileNumber");
	expect(user).toHaveProperty("mobileCountryCode");
	expect(user).toHaveProperty("accountLockStatus");
	expect(typeof user.accountLockStatus).toBe("boolean");
	expect(user).toHaveProperty("avatarUrl");
	expect(user).toHaveProperty("twoFactorEnabled");
	expect(typeof user.twoFactorEnabled).toBe("boolean");
	expect(user).toHaveProperty("accountType");
	expect(user.accountType).toMatch(/^(solo|team|organization)$/i);
	expect(user).toHaveProperty("role");
	expect(typeof user.role).toBe("number");
	expect(user).toHaveProperty("language");
	expect(typeof user.language).toBe("string");
}

/**
 * Validate GET /me/usage 200 Success response
 * Per API spec: {success: true, queries, fileStorageSize, recordings, userFileUploadSources}
 * @param data The usage response data
 */
export function validateMeUsageResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	// Queries object: {current, limit}
	expect(data).toHaveProperty("queries");
	expect(typeof data.queries).toBe("object");
	expect(data.queries).toHaveProperty("current");
	expect(typeof data.queries.current).toBe("number");
	expect(data.queries.current).toBeGreaterThanOrEqual(0);
	expect(data.queries).toHaveProperty("limit");
	expect(typeof data.queries.limit).toBe("number");
	expect(data.queries.limit).toBeGreaterThan(0);

	// File storage size: {used, limit}
	expect(data).toHaveProperty("fileStorageSize");
	expect(typeof data.fileStorageSize).toBe("object");
	expect(data.fileStorageSize).toHaveProperty("used");
	expect(typeof data.fileStorageSize.used).toBe("string");
	expect(data.fileStorageSize).toHaveProperty("limit");
	expect(typeof data.fileStorageSize.limit).toBe("string");

	// Recordings: {count, limit}
	expect(data).toHaveProperty("recordings");
	expect(typeof data.recordings).toBe("object");
	expect(data.recordings).toHaveProperty("count");
	expect(typeof data.recordings.count).toBe("number");
	expect(data.recordings.count).toBeGreaterThanOrEqual(0);
	expect(data.recordings).toHaveProperty("limit");
	expect(typeof data.recordings.limit).toBe("number");
	expect(data.recordings.limit).toBeGreaterThan(0);

	// User file upload sources (array of {source, count, size})
	expect(data).toHaveProperty("userFileUploadSources");
	expect(Array.isArray(data.userFileUploadSources)).toBe(true);
	data.userFileUploadSources.forEach((source: any) => {
		expect(source).toHaveProperty("source");
		expect(typeof source.source).toBe("string");
		expect(source).toHaveProperty("count");
		expect(typeof source.count).toBe("number");
		expect(source.count).toBeGreaterThanOrEqual(0);
		expect(source).toHaveProperty("size");
		expect(["number", "string"]).toContain(typeof source.size);
	});
}

/**
 * Validate PUT /me/password 200 Success response
 * Per API spec: {success: true, message: "Password updated successfully"}
 * @param data The password update response data
 */
export function validateMePasswordResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("password");
	expect(data.message.toLowerCase()).toContain("updated");
}

/**
 * Validate POST /me/password/set 200 Success response
 * Per API spec: {success: true, message: "Password setup successful"}
 * @param data The password set response data
 */
export function validateMePasswordSetResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("password");
	expect(data.message.toLowerCase()).toContain("setup");
}

/**
 * Validate PUT /me/email 200 Success response
 * Per API spec: {success: true, message, email, accountStatus}
 * @param data The email update response data
 */
export function validateMeEmailResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("email");
	expect(data.message.toLowerCase()).toContain("updated");

	expect(data).toHaveProperty("email");
	expect(typeof data.email).toBe("string");
	expect(data.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

	expect(data).toHaveProperty("accountStatus");
	expect(typeof data.accountStatus).toBe("boolean");
}

/**
 * Validate PATCH /me/2fa 200 Success response
 * Per API spec: {success: true, message: "...", twoFactorEnabled: boolean}
 * @param data The 2FA toggle response data
 */
export function validateMe2FAResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("two-factor");

	expect(data).toHaveProperty("twoFactorEnabled");
	expect(typeof data.twoFactorEnabled).toBe("boolean");
}

/**
 * Validate PATCH /me/profile 200 Success response
 * Per API spec: {success: true, message, user}
 * @param data The profile patch response data
 */
export function validateMeProfilePatchResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("updated");

	expect(data).toHaveProperty("user");
	expect(typeof data.user).toBe("object");
	validateUserProfile(data.user);
}

/**
 * Validate POST /me/avatar 200 Success response
 * Per API spec: {success: true, avatarUrl: string}
 * @param data The avatar upload response data
 */
export function validateMeAvatarResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("avatarUrl");
	expect(typeof data.avatarUrl).toBe("string");
	validateURL(data.avatarUrl);
}

/**
 * Validate POST /companies/{id}/2fa 200 Success response
 * Per API spec: {success: true, message, warnings?: []}
 * Handles both complete success and partial success with warnings
 * @param data The company 2FA toggle response data
 */
export function validateCompaniesTwoFactorResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("two-factor");

	// Optional warnings array for partial success
	if (data.warnings) {
		expect(Array.isArray(data.warnings)).toBe(true);
		data.warnings.forEach((warning: any) => {
			expect(warning).toHaveProperty("userId");
			expect(typeof warning.userId).toBe("number");
			expect(warning).toHaveProperty("reason");
			expect(typeof warning.reason).toBe("string");
		});
	}
}

/**
 * Validate GET /companies/{id}/usage 200 Success response
 * Per API spec: {success: true, queries, fileStorageSize}
 * @param data The company usage response data
 */
export function validateCompaniesUsageResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	// Queries object: {current, limit}
	expect(data).toHaveProperty("queries");
	expect(typeof data.queries).toBe("object");
	expect(data.queries).toHaveProperty("current");
	expect(typeof data.queries.current).toBe("number");
	expect(data.queries.current).toBeGreaterThanOrEqual(0);
	expect(data.queries).toHaveProperty("limit");
	expect(typeof data.queries.limit).toBe("number");
	expect(data.queries.limit).toBeGreaterThan(0);

	// File storage size: {used, limit}
	expect(data).toHaveProperty("fileStorageSize");
	expect(typeof data.fileStorageSize).toBe("object");
	expect(data.fileStorageSize).toHaveProperty("used");
	expect(typeof data.fileStorageSize.used).toBe("string");
	expect(data.fileStorageSize).toHaveProperty("limit");
	expect(typeof data.fileStorageSize.limit).toBe("string");
}

/**
 * Validate GET /companies/{id}/profile 200 Success response
 * Per API spec: {success: true, companyData: {id, companyName, orgType}}
 * @param data The company profile get response data
 */
export function validateCompaniesProfileGetResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("companyData");
	expect(typeof data.companyData).toBe("object");

	const company = data.companyData;
	expect(company).toHaveProperty("id");
	expect(typeof company.id).toBe("number");
	expect(company.id).toBeGreaterThan(0);
	expect(company).toHaveProperty("companyName");
	expect(typeof company.companyName).toBe("string");
	expect(company.companyName.length).toBeGreaterThan(0);
	expect(company).toHaveProperty("orgType");
	expect(typeof company.orgType).toBe("string");
}

/**
 * Validate PATCH /companies/{id}/profile 200 Success response
 * Per API spec: {success: true, message, companyData or user}
 * @param data The company profile patch response data
 */
export function validateCompaniesProfilePatchResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("updated");

	// Should have either companyData or user in response
	const hasCompanyData = data.hasOwnProperty("companyData");
	const hasUser = data.hasOwnProperty("user");
	expect(hasCompanyData || hasUser).toBe(true);

	if (hasCompanyData) {
		expect(typeof data.companyData).toBe("object");
	}
	if (hasUser) {
		expect(typeof data.user).toBe("object");
		validateUserProfile(data.user);
	}
}

/**
 * Validate POST /companies/{id}/avatar 200 Success response
 * Per API spec: {success: true, avatarUrl: string}
 * @param data The company avatar upload response data
 */
export function validateCompaniesAvatarResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("avatarUrl");
	expect(typeof data.avatarUrl).toBe("string");
	validateURL(data.avatarUrl);
}

/**
 * Validate POST /teams 201 Success response
 * Per API spec: {success: true, message, team: {id, companyId, teamName, teamAlias}}
 * @param data The team create response data
 */
export function validateTeamsCreateResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("team");
	expect(data.message.toLowerCase()).toContain("created");

	expect(data).toHaveProperty("team");
	expect(typeof data.team).toBe("object");

	const team = data.team;
	expect(team).toHaveProperty("id");
	expect(typeof team.id).toBe("number");
	expect(team.id).toBeGreaterThan(0);
	expect(team).toHaveProperty("companyId");
	expect(typeof team.companyId).toBe("number");
	expect(team.companyId).toBeGreaterThan(0);
	expect(team).toHaveProperty("teamName");
	expect(typeof team.teamName).toBe("string");
	expect(team.teamName.length).toBeGreaterThan(0);
	expect(team).toHaveProperty("teamAlias");
	expect(typeof team.teamAlias).toBe("string");
	expect(team.teamAlias).toMatch(/^[a-z0-9\-]+$/); // Slug format
}

/**
 * Validate PATCH /teams/{teamId} 200 Success response
 * Per API spec: {success: true, message: "Team updated successfully"}
 * @param data The team update response data
 */
export function validateTeamsUpdateResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("team");
	expect(data.message.toLowerCase()).toContain("updated");
}

/**
 * Validate GET /teams 200 Success response
 * Per API spec: {success: true, message, teams: []}
 * @param data The teams list response data
 */
export function validateTeamsListResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("team");

	expect(data).toHaveProperty("teams");
	expect(Array.isArray(data.teams)).toBe(true);
	// Teams array can be empty or contain team objects
	data.teams.forEach((team: any) => {
		expect(team).toHaveProperty("id");
		expect(typeof team.id).toBe("number");
		if (team.name) {
			expect(typeof team.name).toBe("string");
		}
	});
}

/**
 * Validate GET /teams/active 200 Success response
 * Per API spec: {success: true, message, teams: []}
 * @param data The active teams list response data
 */
export function validateTeamsActiveResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("team");

	expect(data).toHaveProperty("teams");
	expect(Array.isArray(data.teams)).toBe(true);
}

/**
 * Validate GET /teams/shared 200 Success response
 * Per API spec: {success: true, message, teams: []}
 * @param data The shared teams list response data
 */
export function validateTeamsSharedResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");

	expect(data).toHaveProperty("teams");
	expect(Array.isArray(data.teams)).toBe(true);
}

/**
 * Validate PATCH /teams/{teamId}/status 200 Success response
 * Per API spec: {success: true, message}
 * @param data The team status update response data
 */
export function validateTeamsStatusResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
}

/**
 * Validate POST /teams/{teamId}/share 200 Success response
 * Per API spec: {success: true, message, shareUrl?: string}
 * @param data The team share response data
 */
export function validateTeamsShareResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("share");

	// Optional share URL
	if (data.shareUrl) {
		validateURL(data.shareUrl);
	}
}

/**
 * Validate POST /teams/{teamId}/folders 201 Success response
 * Per API spec: {success: true, message, folder: {id, teamId, parentId, name, ...}}
 * @param data The folder create response data
 */
export function validateTeamsFolderCreateResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("folder");
	expect(data.message.toLowerCase()).toContain("created");

	expect(data).toHaveProperty("folder");
	expect(typeof data.folder).toBe("object");

	const folder = data.folder;
	expect(folder).toHaveProperty("id");
	expect(typeof folder.id).toBe("number");
	expect(folder.id).toBeGreaterThan(0);
	expect(folder).toHaveProperty("teamId");
	expect(typeof folder.teamId).toBe("number");
	expect(folder).toHaveProperty("name");
	expect(typeof folder.name).toBe("string");
	expect(folder.name.length).toBeGreaterThan(0);
	expect(folder).toHaveProperty("isDefault");
	expect(typeof folder.isDefault).toBe("boolean");
	expect(folder).toHaveProperty("isFile");
	expect(typeof folder.isFile).toBe("boolean");
	expect(folder.isFile).toBe(false); // Folder creation should have isFile=false

	// Optional parentId (null for root folders)
	if (folder.hasOwnProperty("parentId")) {
		expect(folder.parentId === null || typeof folder.parentId === "number").toBe(true);
	}
}

/**
 * Validate PATCH /teams/{teamId}/folders/{folderId} 200 Success response
 * Per API spec: {success: true, message, folder: {...}}
 * @param data The folder update response data
 */
export function validateTeamsFolderUpdateResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");

	expect(data).toHaveProperty("folder");
	expect(typeof data.folder).toBe("object");
	const folder = data.folder;
	expect(folder).toHaveProperty("id");
	expect(typeof folder.id).toBe("number");
	expect(folder).toHaveProperty("teamId");
	expect(typeof folder.teamId).toBe("number");
}

/**
 * Validate DELETE /teams/{teamId}/folders/{folderId} 200 Success response
 * Per API spec: {success: true, message}
 * @param data The folder delete response data
 */
export function validateTeamsFolderDeleteResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("deleted");
}

/**
 * Validate GET /teams/{teamId}/folders 200 Success response
 * Per API spec: {success: true, message, items: [], pagination: {offset, limit, totalItems, hasMore}}
 * @param data The folders list response data
 */
export function validateTeamsFoldersListResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");

	expect(data).toHaveProperty("items");
	expect(Array.isArray(data.items)).toBe(true);

	// Validate each item in the list
	data.items.forEach((item: any) => {
		expect(item).toHaveProperty("type");
		expect(["folder", "file"]).toContain(item.type);
		expect(item).toHaveProperty("id");
		expect(typeof item.id).toBe("number");
		expect(item).toHaveProperty("teamId");
		expect(typeof item.teamId).toBe("number");
		expect(item).toHaveProperty("name");
		expect(typeof item.name).toBe("string");
		expect(item).toHaveProperty("created");
		validateTimestamp(item.created);

		// Optional fields
		if (item.parentId !== undefined) {
			expect(item.parentId === null || typeof item.parentId === "number").toBe(true);
		}
		if (item.size !== undefined) {
			expect(typeof item.size).toBe("number");
			expect(item.size).toBeGreaterThan(0);
		}
	});

	// Pagination info
	expect(data).toHaveProperty("pagination");
	expect(typeof data.pagination).toBe("object");
	const pagination = data.pagination;
	expect(pagination).toHaveProperty("offset");
	expect(typeof pagination.offset).toBe("number");
	expect(pagination.offset).toBeGreaterThanOrEqual(0);
	expect(pagination).toHaveProperty("limit");
	expect(typeof pagination.limit).toBe("number");
	expect(pagination.limit).toBeGreaterThan(0);
	expect(pagination).toHaveProperty("totalItems");
	expect(typeof pagination.totalItems).toBe("number");
	expect(pagination.totalItems).toBeGreaterThanOrEqual(0);
	expect(pagination).toHaveProperty("hasMore");
	expect(typeof pagination.hasMore).toBe("boolean");
}

/**
 * Validate GET /teams/{teamId}/items 200 Success response
 * Per API spec: {success: true, message, items: []}
 * @param data The items list response data
 */
export function validateTeamsItemsResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("item");

	expect(data).toHaveProperty("items");
	expect(Array.isArray(data.items)).toBe(true);

	// Validate structure of items (can be folders or files)
	data.items.forEach((item: any) => {
		expect(item).toHaveProperty("type");
		expect(["folder", "file"]).toContain(item.type);
		expect(item).toHaveProperty("id");
		expect(typeof item.id).toBe("number");
		expect(item).toHaveProperty("teamId");
		expect(typeof item.teamId).toBe("number");
		expect(item).toHaveProperty("name");
		expect(typeof item.name).toBe("string");
	});
}

/**
 * Validate GET /settings/max-uploads 200 Success response
 * Per API spec: {success: true, maxUploads|max_uploads: number, message: string}
 * @param data The max uploads settings response data
 */
export function validateSettingsMaxUploadsResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	const maxUploads = data.maxUploads ?? data.max_uploads;
	expect(maxUploads).toBeDefined();
	expect(typeof maxUploads).toBe("number");
	expect(maxUploads).toBeGreaterThan(0);

	if (data.message !== undefined) {
		expect(typeof data.message).toBe("string");
		expect(data.message.toLowerCase()).toContain("upload");
	}
}

/**
 * Validate GET /settings/recording-limit 200 Success response
 * Per API spec: {success: true, used: number, limit: number}
 * @param data The recording limit settings response data
 */
export function validateSettingsRecordingLimitResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("used");
	expect(typeof data.used).toBe("number");
	expect(data.used).toBeGreaterThanOrEqual(0);

	expect(data).toHaveProperty("limit");
	expect(typeof data.limit).toBe("number");
	expect(data.limit).toBeGreaterThan(0);
}

/**
 * Validate GET /settings/recording-prompt-time 200 Success response
 * Per API spec: {success: true, promptTime|prompt_time: number}
 * @param data The recording prompt time settings response data
 */
export function validateSettingsRecordingPromptTimeResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	const promptTime = data.promptTime ?? data.prompt_time;
	expect(promptTime).toBeDefined();
	expect(typeof promptTime).toBe("number");
	expect(promptTime).toBeGreaterThan(0);
}

/**
 * Validate POST /teams/{teamId}/chats 201 Success response
 * Per API spec: {success: true, chat: {id, scope, resourceId, teamId, name, createdAt}}
 * @param data The chat creation response data
 */
export function validateTeamsChatsCreateResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("chat");
	expect(typeof data.chat).toBe("object");
	const chat = data.chat;
	expect(chat).toHaveProperty("id");
	expect(typeof chat.id).toBe("number");
	expect(chat.id).toBeGreaterThan(0);
	expect(chat).toHaveProperty("name");
	expect(typeof chat.name).toBe("string");

	if (chat.scope !== undefined) {
		expect(typeof chat.scope).toBe("string");
	}
	if (chat.resourceId !== undefined) {
		expect(typeof chat.resourceId).toBe("number");
	}
	if (chat.teamId !== undefined) {
		expect(typeof chat.teamId).toBe("number");
	}
	if (chat.createdAt !== undefined) {
		validateTimestamp(chat.createdAt);
	}
}

/**
 * Validate GET /teams/{teamId}/chats 200 Success response
 * Per API spec: {success: true, userChatHistories|chats: []}
 * @param data The chat histories response data
 */
export function validateTeamsChatsListResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	const chats = data.userChatHistories ?? data.chats;
	expect(Array.isArray(chats)).toBe(true);

	chats.forEach((chat: any) => {
		expect(chat).toHaveProperty("id");
		expect(typeof chat.id).toBe("number");
		expect(chat).toHaveProperty("name");
		expect(typeof chat.name).toBe("string");
		if (chat.created !== undefined) {
			validateTimestamp(chat.created);
		}
		if (chat.createdAt !== undefined) {
			validateTimestamp(chat.createdAt);
		}
	});
}

/**
 * Validate PATCH /teams/{teamId}/chats/{chatId} 200 Success response
 * Per API spec: {success: true, chat: {...}}
 * @param data The chat rename response data
 */
export function validateTeamsChatsRenameResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("chat");
	expect(typeof data.chat).toBe("object");
	expect(data.chat).toHaveProperty("id");
	expect(typeof data.chat.id).toBe("number");
	if (data.chat.name !== undefined) {
		expect(typeof data.chat.name).toBe("string");
		expect(data.chat.name.length).toBeGreaterThan(0);
	}
}

/**
 * Validate DELETE /teams/{teamId}/chats/{chatId} 200 Success response
 * Per API spec: {success: true, message: string}
 * @param data The chat delete response data
 */
export function validateTeamsChatsDeleteResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);
	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("delete");
}

/**
 * Validate GET /teams/{teamId}/chats/{chatId}/messages 200 Success response
 * Per API spec: {success: true, chatMessages|messages: []}
 * @param data The chat messages fetch response data
 */
export function validateTeamsChatMessagesGetResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	const messages = data.chatMessages ?? data.messages;
	expect(Array.isArray(messages)).toBe(true);

	messages.forEach((msg: any) => {
		expect(msg).toHaveProperty("id");
		expect(typeof msg.id).toBe("number");
		expect(msg).toHaveProperty("message");
		expect(typeof msg.message).toBe("string");
		if (msg.chatId !== undefined) {
			expect(typeof msg.chatId).toBe("number");
		}
		if (msg.role !== undefined) {
			expect(typeof msg.role).toBe("string");
		}
		if (msg.created !== undefined) {
			validateTimestamp(msg.created);
		}
	});
}

/**
 * Validate POST /teams/{teamId}/chats/{chatId}/messages 201 Success response
 * Per API spec: {success: true, message: {id,...}}
 * @param data The chat message send response data
 */
export function validateTeamsChatMessagesPostResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("object");
	expect(data.message).toHaveProperty("id");
	expect(typeof data.message.id).toBe("number");
}

/**
 * Validate POST /files/upload/audio/{teamId} 200 Success response
 * Per API spec: {success: true, message: "File uploaded successfully"}
 * @param data The audio upload response data
 */
export function validateFilesAudioUploadResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	if (data.message !== undefined) {
		expect(typeof data.message).toBe("string");
		expect(data.message.toLowerCase()).toContain("uploaded");
	}
}

/**
 * Validate PATCH /super-admin/integrations 200 Success response
 * Per API spec: update integration settings for company or user
 * @param data The integrations update response data
 */
export function validateSuperAdminIntegrationsUpdateResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);
	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("integration settings updated");

	const hasCompanyId = data.companyId !== undefined;
	const hasUserId = data.userId !== undefined;
	expect(hasCompanyId || hasUserId).toBe(true);
	if (hasCompanyId) {
		expect(typeof data.companyId).toBe("number");
		expect(data.companyId).toBeGreaterThan(0);
	}
	if (hasUserId) {
		expect(typeof data.userId).toBe("number");
		expect(data.userId).toBeGreaterThan(0);
	}

	expect(data).toHaveProperty("updatedIntegrations");
	expect(typeof data.updatedIntegrations).toBe("object");
	const integrations = data.updatedIntegrations;
	if (integrations.userCloudIntegration !== undefined) {
		expect(typeof integrations.userCloudIntegration).toBe("boolean");
	}
	if (integrations.userCloudIntegrationMob !== undefined) {
		expect(typeof integrations.userCloudIntegrationMob).toBe("boolean");
	}
	if (integrations.web !== undefined) {
		expect(typeof integrations.web).toBe("object");
	}
	if (integrations.mobile !== undefined) {
		expect(typeof integrations.mobile).toBe("object");
	}
}

/**
 * Validate GET /super-admin/clients 200 Success response
 * Per API spec: {success, message, clients: [{user: {...}}]}
 * @param data The clients list response data
 */
export function validateSuperAdminClientsResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);
	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data).toHaveProperty("clients");
	expect(Array.isArray(data.clients)).toBe(true);

	data.clients.forEach((client: any) => {
		expect(client).toHaveProperty("user");
		expect(typeof client.user).toBe("object");
		expect(client.user).toHaveProperty("id");
		expect(typeof client.user.id).toBe("number");
	});
}

/**
 * Validate GET /super-admin/companies 200 Success response
 * Per API spec: {success, message, companies: [{companyId|id, companyName, orgType}]}
 * @param data The companies list response data
 */
export function validateSuperAdminCompaniesResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);
	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data).toHaveProperty("companies");
	expect(Array.isArray(data.companies)).toBe(true);

	data.companies.forEach((company: any) => {
		const companyId = company.companyId ?? company.id;
		expect(companyId).toBeDefined();
		expect(typeof companyId).toBe("number");
		expect(company).toHaveProperty("companyName");
		expect(typeof company.companyName).toBe("string");
		if (company.orgType !== undefined) {
			expect(typeof company.orgType).toBe("string");
		}
	});
}

/**
 * Validate super-admin usage response (company/user) 200 Success response
 * Per API spec: {success, queries, fileStorageSize}
 * @param data The usage response data
 */
export function validateSuperAdminUsageResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);

	expect(data).toHaveProperty("queries");
	expect(typeof data.queries).toBe("object");
	expect(data.queries).toHaveProperty("current");
	expect(typeof data.queries.current).toBe("number");
	expect(data.queries).toHaveProperty("limit");
	expect(typeof data.queries.limit).toBe("number");

	expect(data).toHaveProperty("fileStorageSize");
	expect(typeof data.fileStorageSize).toBe("object");
	expect(data.fileStorageSize).toHaveProperty("used");
	expect(typeof data.fileStorageSize.used).toBe("string");
	if (data.fileStorageSize.limit !== undefined) {
		expect(typeof data.fileStorageSize.limit).toBe("string");
	}
}

/**
 * Validate GET /super-admin/users/{userId}/role 200 Success response
 * Per API spec: {success, userId, isSuperAdmin}
 * @param data The user role response data
 */
export function validateSuperAdminUserRoleResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);
	expect(data).toHaveProperty("userId");
	expect(typeof data.userId).toBe("number");
	expect(data.userId).toBeGreaterThan(0);
	expect(data).toHaveProperty("isSuperAdmin");
	expect(typeof data.isSuperAdmin).toBe("boolean");
}

/**
 * Validate GET /super-admin/environment 200 Success response
 * Per API spec: {success, env: [{id, meta_key, meta_value, created}]}
 * @param data The environment list response data
 */
export function validateSuperAdminEnvironmentGetResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);
	expect(data).toHaveProperty("env");
	expect(Array.isArray(data.env)).toBe(true);

	data.env.forEach((entry: any) => {
		expect(entry).toHaveProperty("id");
		expect(typeof entry.id).toBe("number");
		expect(entry).toHaveProperty("meta_key");
		expect(typeof entry.meta_key).toBe("string");
		expect(entry).toHaveProperty("meta_value");
		expect(typeof entry.meta_value).toBe("string");
		if (entry.created !== undefined) {
			validateTimestamp(entry.created);
		}
	});
}

/**
 * Validate PATCH /super-admin/environment 200 Success response
 * Per API spec: {success, message, updatedKeys: []}
 * @param data The environment update response data
 */
export function validateSuperAdminEnvironmentPatchResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);
	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("updated");
	expect(data).toHaveProperty("updatedKeys");
	expect(Array.isArray(data.updatedKeys)).toBe(true);
	data.updatedKeys.forEach((key: any) => {
		expect(typeof key).toBe("string");
		expect(key.length).toBeGreaterThan(0);
	});
}

/**
 * Validate GET /super-admin/email/templates 200 Success response
 * Per API spec: {success, templates: [...]}
 * @param data The email templates list response data
 */
export function validateSuperAdminEmailTemplatesResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);
	expect(data).toHaveProperty("templates");
	expect(Array.isArray(data.templates)).toBe(true);

	data.templates.forEach((template: any) => {
		expect(template).toHaveProperty("id");
		expect(typeof template.id).toBe("number");
		expect(template).toHaveProperty("name");
		expect(typeof template.name).toBe("string");
		if (template.subject !== undefined) {
			expect(typeof template.subject).toBe("string");
		}
		if (template.template !== undefined) {
			expect(typeof template.template).toBe("string");
		}
	});
}

/**
 * Validate PATCH /super-admin/email/templates/{templateId} 200 Success response
 * Per API spec: {success, message, templateId}
 * @param data The email template update response data
 */
export function validateSuperAdminEmailTemplatePatchResponse(data: any) {
	expect(data).toHaveProperty("success");
	expect(data.success).toBe(true);
	expect(data).toHaveProperty("message");
	expect(typeof data.message).toBe("string");
	expect(data.message.toLowerCase()).toContain("template updated");
	expect(data).toHaveProperty("templateId");
	expect(typeof data.templateId).toBe("number");
	expect(data.templateId).toBeGreaterThan(0);
}
