/** @format */

/**
 * Endpoint Response Schemas - Extracted from docs.json
 * Defines expected response structure for each API endpoint
 * Used for comprehensive response validation in smoke tests
 */

export interface AuthTokens {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
	refreshTokenExpiresAt: string;
}

export interface UserProfile {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	accountType: "solo" | "team" | "invited";
	currency: string;
	mobileNumber?: string;
	mobileCountryCode?: string;
	avatarUrl?: string;
	twoFactorEnabled: boolean;
	language: string;
	passwordSet: boolean;
	userCloudIntegrationWeb?: boolean;
	userCloudIntegrationMob?: boolean;
	role: number;
	auth?: AuthTokens;
}

export interface CompanyProfile {
	id: number;
	companyName: string;
	orgType: string;
	phoneNumber: string;
	phoneNumberCountryCode: string;
	companyLogo?: string;
	companytwoFactorEnabled?: boolean;
	language?: string;
	mailingAddress?: {
		country: string;
		street: string;
		city: string;
		state: string;
		zip: string;
	};
	billingAddress?: {
		country: string;
		street: string;
		city: string;
		state: string;
		zip: string;
	};
}

export interface TeamProfile {
	id: number;
	teamName: string;
	teamDescription?: string;
	createdAt: string;
	updatedAt: string;
	status: "active" | "inactive" | "archived";
	createdBy: number;
}

export interface FileInfo {
	id: string;
	name: string;
	type: string;
	size: number;
	createdAt: string;
	updatedAt: string;
	createdBy: number;
	mimeType?: string;
	status?: "processing" | "completed" | "failed";
}

export interface ChatRoom {
	id: string;
	teamId: number;
	name: string;
	description?: string;
	createdAt: string;
	updatedAt: string;
	createdBy: number;
	messageCount?: number;
}

export interface ChatMessage {
	id: string;
	chatId: string;
	userId: number;
	content: string;
	createdAt: string;
	updatedAt: string;
	editedAt?: string;
}

export interface PaginatedResponse<T> {
	items: T[];
	pagination: {
		offset: number;
		limit: number;
		totalItems: number;
		hasMore: boolean;
	};
}

/**
 * Endpoint Response Schemas by Category
 */

// ========================
// AUTHENTICATION ENDPOINTS
// ========================

export const AuthenticationSchemas = {
	/**
	 * POST /auth/register
	 * Successful response (201)
	 */
	register: {
		status: 201,
		body: {
			success: true,
			message: "Account created successfully",
			user: "UserProfile",
			company: "CompanyProfile | null",
			payment: {
				required: "boolean",
				sessionUrl: "string | null",
			},
		},
	},

	/**
	 * POST /auth/login
	 * Successful response (200)
	 * Per API spec: Response varies based on 2FA status and account type
	 */
	login: {
		status: 200,
		body: {
			success: true,
			message: "Login successful | Two-factor verification required",
			user: "UserProfile (if no 2FA required)",
			company: "CompanyProfile | null (if no 2FA required)",
			auth: "AuthTokens (if no 2FA required)",
			twoFactorAuth: "boolean (if 2FA required)",
			twoFactorToken: "string (if 2FA required)",
		},
		errorCodes: {
			400: "bad_request - Missing required fields (email, password)",
			401: "auth_invalid_credentials - Invalid password",
			404: "not_found - User not found",
			405: "method_not_allowed - This endpoint only supports POST",
			409: "conflict - Account already logged in elsewhere",
			423: "locked - Account has been locked",
			429: "rate_limit - Too many login attempts",
		},
	},

	/**
	 * POST /auth/sign-out
	 * Successful response (200)
	 * Per API spec: Revokes current session and tokens
	 */
	signOut: {
		status: 200,
		body: {
			success: true,
			message: "Successfully signed out",
		},
		errorCodes: {
			400: "bad_request - Missing authorization",
			401: "auth_invalid | auth_expired - Invalid or expired token",
			403: "forbidden - Token already revoked",
			404: "not_found - Session not found",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * POST /auth/verify-otp
	 * Successful response (200)
	 * Per API spec: Verify OTP token from 2FA flow, returns user + auth tokens
	 */
	verifyOTP: {
		status: 200,
		body: {
			success: true,
			message: "OTP verified successfully",
			user: "UserProfile",
			company: "CompanyProfile | null",
			auth: "AuthTokens",
		},
		errorCodes: {
			400: "bad_request - Missing OTP or twoFactorToken",
			401: "auth_invalid_otp | auth_invalid_2fa_token - Invalid OTP or token",
			405: "method_not_allowed - This endpoint only supports POST",
			410: "expired - OTP expired",
			423: "locked - Too many failed OTP attempts",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * POST /auth/password/forgot
	 * Successful response (200)
	 * Per API spec: Send password reset link to email
	 */
	passwordForgot: {
		status: 200,
		body: {
			success: true,
			message: "Reset password link sent successfully to your email",
		},
		errorCodes: {
			400: "bad_request - Invalid or missing email",
			404: "not_found - User with email not found",
			405: "method_not_allowed - This endpoint only supports POST",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * POST /auth/password/reset
	 * Successful response (200)
	 * Per API spec: Complete password reset with token
	 */
	passwordReset: {
		status: 200,
		body: {
			success: true,
			message: "Password updated successfully",
		},
		errorCodes: {
			400: "bad_request - Invalid password or missing fields",
			401: "auth_invalid_reset_token - Invalid reset token",
			405: "method_not_allowed - This endpoint only supports POST",
			410: "token_expired - Password reset token expired",
			422: "validation_error - Password validation failed",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /me/subscription
	 * Successful response (200)
	 * Per API spec: Get current subscription details
	 */
	meSubscription: {
		status: 200,
		body: {
			success: true,
			subscriptionData: {
				id: "number",
				subscription_type: "string (solo | team | organization)",
				subscription_plan: "string (basic | pro | enterprise)",
				subscription_amount: "number",
				currency: "string (ISO 4217 code, e.g. INR, USD)",
				status: "string (active | inactive | expired | suspended | cancelled)",
			},
		},
		errorCodes: {
			401: "auth_invalid | auth_expired - Invalid or expired token",
			403: "forbidden - Access denied to subscription",
			404: "not_found - Subscription not found",
			429: "rate_limit - Too many requests",
		},
	},
	},

	/**
	 * POST /me/profile
	 * Successful response (200)
	 */
	meProfile: {
		status: 200,
		body: {
			success: true,
			message: "Profile retrieved successfully",
			user: "UserProfile",
			company: "CompanyProfile | null",
		},
	},

	/**
	 * POST /auth/email/check
	 * Successful response (200)
	 * Per API spec: Check if email exists in system
	 */
	emailCheck: {
		status: 200,
		body: {
			success: true,
			exists: "boolean",
		},
		errorCodes: {
			400: "bad_request - Invalid or missing email",
			405: "method_not_allowed - This endpoint only supports POST",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * POST /auth/verify-account
	 * Successful response (200)
	 * Per API spec: Verify account with token
	 */
	verifyAccount: {
		status: 200,
		body: {
			success: true,
			message: "Account verification successful",
		},
		errorCodes: {
			400: "bad_request - Invalid or missing token",
			401: "auth_invalid_verification_token - Invalid verification token",
			404: "not_found - User not found",
			405: "method_not_allowed - This endpoint only supports POST",
			410: "expired - Verification token expired",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /auth/payment/status
	 * Successful response (200)
	 * Query param: email (required)
	 * Per API spec: Get payment status for email
	 */
	paymentStatus: {
		status: 200,
		body: {
			success: true,
			status: "string (paid | pending | unpaid | failed)",
		},
		errorCodes: {
			404: "not_found - Payment record not found",
			405: "method_not_allowed - This endpoint only supports GET",
			429: "rate_limit - Too many requests",
		},
	},
};

// ========================
// TEAM ENDPOINTS
// ========================

export const TeamSchemas = {
	/**
	 * GET /teams
	 * Successful response (200)
	 */
	listTeams: {
		status: 200,
		body: {
			success: true,
			message: "Teams retrieved successfully",
			data: "PaginatedResponse<TeamProfile>",
		},
	},

	/**
	 * POST /teams
	 * Successful response (201)
	 */
	createTeam: {
		status: 201,
		body: {
			success: true,
			message: "Team created successfully",
			team: "TeamProfile",
		},
	},

	/**
	 * GET /teams/{teamId}
	 * Successful response (200)
	 */
	getTeam: {
		status: 200,
		body: {
			success: true,
			message: "Team retrieved successfully",
			team: "TeamProfile",
		},
	},

	/**
	 * PUT /teams/{teamId}
	 * Successful response (200)
	 */
	updateTeam: {
		status: 200,
		body: {
			success: true,
			message: "Team updated successfully",
			team: "TeamProfile",
		},
	},

	/**
	 * DELETE /teams/{teamId}
	 * Successful response (200)
	 */
	deleteTeam: {
		status: 200,
		body: {
			success: true,
			message: "Team deleted successfully",
		},
	},
};

// ========================
// FILE ENDPOINTS
// ========================

export const FileSchemas = {
	/**
	 * POST /teams/{teamId}/files
	 * Successful response (201)
	 */
	uploadFile: {
		status: 201,
		body: {
			success: true,
			message: "File uploaded successfully",
			file: "FileInfo",
		},
	},

	/**
	 * GET /teams/{teamId}/files
	 * Successful response (200)
	 */
	listFiles: {
		status: 200,
		body: {
			success: true,
			message: "Files retrieved successfully",
			data: "PaginatedResponse<FileInfo>",
		},
	},

	/**
	 * GET /teams/{teamId}/files/{fileId}
	 * Successful response (200)
	 */
	getFile: {
		status: 200,
		body: {
			success: true,
			message: "File retrieved successfully",
			file: "FileInfo",
		},
	},

	/**
	 * DELETE /teams/{teamId}/files/{fileId}
	 * Successful response (200)
	 */
	deleteFile: {
		status: 200,
		body: {
			success: true,
			message: "File deleted successfully",
		},
	},
};

// ========================
//CHAT ENDPOINTS
// ========================

export const ChatSchemas = {
	/**
	 * GET /teams/{teamId}/chats
	 * Successful response (200)
	 */
	listChats: {
		status: 200,
		body: {
			success: true,
			message: "Chats retrieved successfully",
			data: "PaginatedResponse<ChatRoom>",
		},
	},

	/**
	 * POST /teams/{teamId}/chats/{chatId}/messages
	 * Successful response (201)
	 */
	sendMessage: {
		status: 201,
		body: {
			success: true,
			message: "Message sent successfully",
			message: "ChatMessage",
		},
	},

	/**
	 * GET /teams/{teamId}/chats/{chatId}/messages
	 * Successful response (200)
	 */
	listMessages: {
		status: 200,
		body: {
			success: true,
			message: "Messages retrieved successfully",
			data: "PaginatedResponse<ChatMessage>",
		},
	},
};

// ========================
// ERROR RESPONSE SCHEMAS
// ========================

export const ErrorSchemas = {
	/**
	 * 400 Bad Request
	 */
	badRequest: {
		status: 400,
		body: {
			success: false,
			error: "bad_request",
			message: "string",
			details: [
				{
					field: "string",
					issue: "string",
				},
			],
		},
	},

	/**
	 * 401 Unauthorized
	 */
	unauthorized: {
		status: 401,
		body: {
			success: false,
			error:
				"missing_access_token | invalid_access_token | access_token_expired",
			message: "string",
		},
	},

	/**
	 * 403 Forbidden
	 */
	forbidden: {
		status: 403,
		body: {
			success: false,
			error: "forbidden",
			message: "string",
		},
	},

	/**
	 * 404 Not Found
	 */
	notFound: {
		status: 404,
		body: {
			success: false,
			error: "not_found",
			message: "string",
		},
	},

	/**
	 * 409 Conflict
	 */
	conflict: {
		status: 409,
		body: {
			success: false,
			error: "conflict",
			message: "string",
		},
	},

	/**
	 * 422 Unprocessable Entity
	 */
	unprocessable: {
		status: 422,
		body: {
			success: false,
			error: "unprocessable_entity",
			message: "string",
			details: {
				// field-level errors
			},
		},
	},

	/**
	 * 429 Too Many Requests
	 */
	rateLimited: {
		status: 429,
		body: {
			success: false,
			error: "rate_limit_exceeded",
			message: "string",
		},
	},

	/**
	 * POST /me/verification/resend
	 * Successful response (200)
	 * Per API spec: Resend verification email to user
	 */
	meVerificationResend: {
		status: 200,
		body: {
			success: true,
			message: "Verification email resent successfully",
		},
		errorCodes: {
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - User not allowed to resend verification",
			404: "not_found - User not found",
			405: "method_not_allowed - This endpoint only supports POST",
			409: "conflict - User already verified",
			422: "unprocessable_entity - Cannot process verification email",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /me/profile
	 * Successful response (200)
	 * Per API spec: Get authenticated user's profile information
	 */
	meProfile: {
		status: 200,
		body: {
			success: true,
			message: "User data fetched successfully",
			user: "UserProfile (id, firstname, lastname, email, accountStatus, passwordSet, mobileNumber, mobileCountryCode, accountLockStatus, avatarUrl, twoFactorEnabled, accountType, role, language)",
		},
		errorCodes: {
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to user profile",
			404: "not_found - User not found",
			405: "method_not_allowed - This endpoint only supports GET",
			422: "validation_error - Validation failed",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /me/usage
	 * Successful response (200)
	 * Per API spec: Get current user resource usage statistics
	 */
	meUsage: {
		status: 200,
		body: {
			success: true,
			queries: "object {current: number, limit: number}",
			fileStorageSize: "object {used: string, limit: string}",
			recordings: "object {count: number, limit: number}",
			userFileUploadSources: "array of {source: string, count: number, size: number|string}",
		},
		errorCodes: {
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to usage data",
			404: "not_found - User not found",
			405: "method_not_allowed - This endpoint only supports GET",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * PUT /me/password
	 * Successful response (200)
	 * Per API spec: Update user password with current password verification
	 */
	mePassword: {
		status: 200,
		body: {
			success: true,
			message: "Password updated successfully",
		},
		errorCodes: {
			400: "bad_request - Missing required fields (currentPassword, newPassword)",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to password update",
			404: "not_found - User not found",
			405: "method_not_allowed - This endpoint only supports PUT",
			409: "conflict - New password same as current",
			415: "unsupported_media_type - Content-Type must be application/json",
			422: "validation_error - Password validation failed",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * POST /me/password/set
	 * Successful response (200)
	 * Per API spec: Initial password setup for users without password
	 */
	mePasswordSet: {
		status: 200,
		body: {
			success: true,
			message: "Password setup successful",
		},
		errorCodes: {
			400: "bad_request - Missing required password field",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to password setup",
			404: "not_found - User not found",
			405: "method_not_allowed - This endpoint only supports POST",
			409: "conflict - User already has password set",
			415: "unsupported_media_type - Content-Type must be application/json",
			422: "validation_error - Password validation failed",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * PUT /me/email
	 * Successful response (200)
	 * Per API spec: Update user email address and send verification link
	 */
	meEmail: {
		status: 200,
		body: {
			success: true,
			message: "Email updated successfully. A verification link has been sent to your inbox.",
			email: "string (new email address)",
			accountStatus: false,
		},
		errorCodes: {
			400: "bad_request - Missing required newEmail field",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to email update",
			404: "not_found - User not found",
			405: "method_not_allowed - This endpoint only supports PUT",
			409: "conflict - Email already in use or user already verified",
			415: "unsupported_media_type - Content-Type must be application/json",
			422: "validation_error - Email validation failed",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * PATCH /me/2fa
	 * Successful response (200)
	 * Per API spec: Enable or disable two-factor authentication for user
	 */
	me2FA: {
		status: 200,
		body: {
			success: true,
			message: "string (Two-factor authentication enabled|disabled)",
			twoFactorEnabled: "boolean",
		},
		errorCodes: {
			400: "bad_request - Missing required enable2FA field",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to 2FA settings",
			404: "not_found - User not found",
			405: "method_not_allowed - This endpoint only supports PATCH",
			409: "conflict - 2FA already in desired state",
			422: "validation_error - Validation failed",
			423: "locked - Account is locked",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * PATCH /me/profile
	 * Successful response (200)
	 * Per API spec: Update user profile fields
	 */
	meProfilePatch: {
		status: 200,
		body: {
			success: true,
			message: "User data updated successfully",
			user: "UserProfile",
		},
		errorCodes: {
			400: "bad_request - Missing or invalid fields",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to profile update",
			404: "not_found - User not found",
			405: "method_not_allowed - This endpoint only supports PATCH",
			415: "unsupported_media_type - Content-Type must be application/json",
			422: "validation_error - Validation failed",
			423: "locked - Account is locked",
		},
	},

	/**
	 * POST /me/avatar
	 * Successful response (200)
	 * Per API spec: Upload or update user avatar
	 */
	meAvatar: {
		status: 200,
		body: {
			success: true,
			avatarUrl: "string (URL to uploaded avatar)",
		},
		errorCodes: {
			400: "bad_request - Missing or invalid avatar file",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to avatar upload",
			404: "not_found - User not found",
			405: "method_not_allowed - This endpoint only supports POST",
			415: "unsupported_media_type - Content-Type must be multipart/form-data",
			422: "validation_error - Image validation failed",
			423: "locked - Account is locked",
		},
	},

	/**
	 * POST /companies/{id}/2fa
	 * Successful response (200)
	 * Per API spec: Enable/disable 2FA for company users (full or partial success)
	 */
	companies2FA: {
		status: 200,
		body: {
			success: true,
			message: "string (Two-factor authentication enabled|disabled for users)",
			warnings: "array of {userId: number, reason: string} (optional for partial success)",
		},
		errorCodes: {
			400: "bad_request - Missing or invalid fields",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to company 2FA settings",
			404: "not_found - Company not found",
			409: "conflict - 2FA already in desired state for users",
			422: "validation_error - Validation failed",
		},
	},

	/**
	 * GET /companies/{id}/usage
	 * Successful response (200)
	 * Per API spec: Get company resource usage statistics
	 */
	companiesUsage: {
		status: 200,
		body: {
			success: true,
			queries: "object {current: number, limit: number}",
			fileStorageSize: "object {used: string, limit: string}",
		},
		errorCodes: {
			400: "bad_request - Invalid company ID format",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to company usage data",
			404: "not_found - Company not found",
			405: "method_not_allowed - This endpoint only supports GET",
			423: "locked - Account is locked",
		},
	},

	/**
	 * GET /companies/{id}/profile
	 * Successful response (200)
	 * Per API spec: Get company profile information
	 */
	companiesProfileGet: {
		status: 200,
		body: {
			success: true,
			companyData: "object {id: number, companyName: string, orgType: string}",
		},
		errorCodes: {
			400: "bad_request - Invalid company ID format",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to company profile",
			404: "not_found - Company not found",
			405: "method_not_allowed - This endpoint only supports GET",
			415: "unsupported_media_type - Content-Type must be application/json",
			423: "locked - Account is locked",
		},
	},

	/**
	 * PATCH /companies/{id}/profile
	 * Successful response (200)
	 * Per API spec: Update company profile fields
	 */
	companiesProfilePatch: {
		status: 200,
		body: {
			success: true,
			message: "Company data updated successfully",
			companyData: "object (optional)",
			user: "UserProfile (optional)",
		},
		errorCodes: {
			400: "bad_request - Missing or invalid fields",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to company profile update",
			404: "not_found - Company not found",
			405: "method_not_allowed - This endpoint only supports PATCH",
			422: "validation_error - Validation failed",
			423: "locked - Account is locked",
		},
	},

	/**
	 * POST /companies/{id}/avatar
	 * Successful response (200)
	 * Per API spec: Upload or update company avatar/logo
	 */
	companiesAvatar: {
		status: 200,
		body: {
			success: true,
			avatarUrl: "string (URL to uploaded company logo)",
		},
		errorCodes: {
			400: "bad_request - Missing or invalid avatar file",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to company avatar upload",
			404: "not_found - Company not found",
			405: "method_not_allowed - This endpoint only supports POST",
			415: "unsupported_media_type - Content-Type must be multipart/form-data",
			422: "validation_error - Image validation failed",
		},
	},

	/**
	 * POST /teams
	 * Successful response (201 Created)
	 * Per API spec: Create a new team
	 */
	teamsCreate: {
		status: 201,
		body: {
			success: true,
			message: "Team created successfully",
			team: "object {id: number, companyId: number, teamName: string, teamAlias: string}",
		},
		errorCodes: {
			400: "bad_request - Missing or invalid team data",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to team creation",
			404: "not_found - Company not found",
			409: "conflict - Team name or alias already exists",
			422: "validation_error - Validation failed",
		},
	},

	/**
	 * PATCH /teams/{teamId}
	 * Successful response (200)
	 * Per API spec: Update team information
	 */
	teamsUpdate: {
		status: 200,
		body: {
			success: true,
			message: "Team updated successfully",
		},
		errorCodes: {
			400: "bad_request - Missing or invalid team data",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to team update",
			404: "not_found - Team not found",
			405: "method_not_allowed - This endpoint only supports PATCH",
			409: "conflict - Team name or alias already in use",
			415: "unsupported_media_type - Content-Type must be application/json",
			422: "validation_error - Validation failed",
			423: "locked - Team is locked",
		},
	},

	/**
	 * GET /teams
	 * Successful response (200)
	 * Per API spec: Fetch list of teams
	 */
	teamsList: {
		status: 200,
		body: {
			success: true,
			message: "Team list fetched successfully",
			teams: "array",
		},
		errorCodes: {
			400: "bad_request - Invalid query parameters",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to teams list",
			404: "not_found - Team records not found",
			409: "conflict - Team state conflict",
			422: "validation_error - Validation failed",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /teams/active
	 * Successful response (200)
	 * Per API spec: Fetch active teams list
	 */
	teamsActive: {
		status: 200,
		body: {
			success: true,
			message: "string",
			teams: "array",
		},
		errorCodes: {
			400: "bad_request - Invalid query parameters",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to active teams",
			404: "not_found - Active teams not found",
			409: "conflict - Team state conflict",
			422: "validation_error - Validation failed",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /teams/shared
	 * Successful response (200)
	 * Per API spec: Fetch shared teams list
	 */
	teamsShared: {
		status: 200,
		body: {
			success: true,
			message: "string",
			teams: "array",
		},
		errorCodes: {
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to shared teams",
			409: "conflict - Shared team state conflict",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * PATCH /teams/{teamId}/status
	 * Successful response (200)
	 * Per API spec: Update team status
	 */
	teamsStatusPatch: {
		status: 200,
		body: {
			success: true,
			message: "string",
		},
		errorCodes: {
			400: "bad_request - Invalid status payload",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to status update",
			404: "not_found - Team not found",
			409: "conflict - Team already in target status",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * POST /teams/{teamId}/share
	 * Successful response (200|201)
	 * Per API spec: Share team access
	 */
	teamsSharePost: {
		status: 200,
		body: {
			success: true,
			message: "string",
			shareUrl: "string (optional)",
		},
		errorCodes: {
			400: "bad_request - Invalid share payload",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to team sharing",
			404: "not_found - Team or target user not found",
			409: "conflict - User already shared",
			422: "validation_error - Validation failed",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * POST /teams/{teamId}/folders
	 * Successful response (201)
	 * Per API spec: Create folder in team space
	 */
	teamsFoldersPost: {
		status: 201,
		body: {
			success: true,
			message: "Folder created successfully",
			folder: "object {id, teamId, parentId, name, tooltip, isDefault, isFile, created}",
		},
		errorCodes: {
			400: "bad_request - Invalid folder payload",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to folder creation",
			404: "not_found - Team or parent folder not found",
			415: "unsupported_media_type - Invalid content type",
			409: "conflict - Folder already exists",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * PATCH /teams/{teamId}/folders/{folderId}
	 * Successful response (200)
	 * Per API spec: Update folder metadata
	 */
	teamsFoldersPatch: {
		status: 200,
		body: {
			success: true,
			message: "string",
			folder: "object",
		},
		errorCodes: {
			400: "bad_request - Invalid folder update payload",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to folder update",
			404: "not_found - Team or folder not found",
			409: "conflict - Folder update conflict",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * DELETE /teams/{teamId}/folders/{folderId}
	 * Successful response (200)
	 * Per API spec: Delete folder
	 */
	teamsFoldersDelete: {
		status: 200,
		body: {
			success: true,
			message: "string",
		},
		errorCodes: {
			400: "bad_request - Invalid folder delete payload",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to folder delete",
			404: "not_found - Team or folder not found",
			409: "conflict - Folder cannot be deleted",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /teams/{teamId}/folders
	 * Successful response (200)
	 * Per API spec: List folders and files with pagination
	 */
	teamsFoldersGet: {
		status: 200,
		body: {
			success: true,
			message: "Items fetched successfully",
			items: "array",
			pagination: "object {offset, limit, totalItems, hasMore}",
		},
		errorCodes: {
			400: "bad_request - Invalid query parameters",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to folders list",
			404: "not_found - Team or folders not found",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /teams/{teamId}/items
	 * Successful response (200)
	 * Per API spec: List team items
	 */
	teamsItemsGet: {
		status: 200,
		body: {
			success: true,
			message: "items retrieved successfully",
			items: "array",
		},
		errorCodes: {
			400: "bad_request - Invalid query parameters",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to items list",
			404: "not_found - Team or items not found",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /settings/max-uploads
	 * Successful response (200)
	 * Per API spec: Read maximum file uploads setting
	 */
	settingsMaxUploads: {
		status: 200,
		body: {
			success: true,
			maxUploads: "number (or max_uploads)",
			message: "Maximum file upload limit retrieved successfully",
		},
		errorCodes: {
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /settings/recording-limit
	 * Successful response (200)
	 * Per API spec: Read recording usage limits
	 */
	settingsRecordingLimit: {
		status: 200,
		body: {
			success: true,
			used: "number",
			limit: "number",
		},
		errorCodes: {
			400: "bad_request - Invalid query parameters",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /settings/recording-prompt-time
	 * Successful response (200)
	 * Per API spec: Read recording prompt time setting
	 */
	settingsRecordingPromptTime: {
		status: 200,
		body: {
			success: true,
			promptTime: "number (or prompt_time)",
		},
		errorCodes: {
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied",
			404: "not_found - Setting not found",
			405: "method_not_allowed - This endpoint only supports GET",
			409: "conflict - Concurrent setting state conflict",
			422: "validation_error - Validation failed",
		},
	},

	/**
	 * POST /teams/{teamId}/chats
	 * Successful response (201)
	 * Per API spec: Create team chat
	 */
	teamsChatsPost: {
		status: 201,
		body: {
			success: true,
			chat: "object {id, scope, resourceId, teamId, name, createdAt}",
		},
		errorCodes: {
			400: "bad_request - Invalid chat payload",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to create chat",
			404: "not_found - Team not found",
			409: "conflict - Chat creation conflict",
			415: "unsupported_media_type - Invalid content type",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /teams/{teamId}/chats
	 * Successful response (200)
	 * Per API spec: Fetch chat histories
	 */
	teamsChatsGet: {
		status: 200,
		body: {
			success: true,
			userChatHistories: "array (or chats)",
		},
		errorCodes: {
			400: "bad_request - Invalid query parameters",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to chats",
			404: "not_found - Team/chats not found",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * PATCH /teams/{teamId}/chats/{chatId}
	 * Successful response (200)
	 * Per API spec: Rename chat
	 */
	teamsChatsPatch: {
		status: 200,
		body: {
			success: true,
			chat: "object",
		},
		errorCodes: {
			400: "bad_request - Invalid rename payload",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to rename chat",
			404: "not_found - Chat not found",
			415: "unsupported_media_type - Invalid content type",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * DELETE /teams/{teamId}/chats/{chatId}
	 * Successful response (200)
	 * Per API spec: Delete chat
	 */
	teamsChatsDelete: {
		status: 200,
		body: {
			success: true,
			message: "string",
		},
		errorCodes: {
			400: "bad_request - Invalid delete payload",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to delete chat",
			404: "not_found - Chat not found",
			409: "conflict - Chat delete conflict",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /teams/{teamId}/chats/{chatId}/messages
	 * Successful response (200)
	 * Per API spec: Fetch chat messages
	 */
	teamsChatMessagesGet: {
		status: 200,
		body: {
			success: true,
			chatMessages: "array (or messages)",
		},
		errorCodes: {
			400: "bad_request - Invalid query parameters",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to messages",
			404: "not_found - Chat/messages not found",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * POST /teams/{teamId}/chats/{chatId}/messages
	 * Successful response (201)
	 * Per API spec: Send chat message
	 */
	teamsChatMessagesPost: {
		status: 201,
		body: {
			success: true,
			message: "object {id,...}",
		},
		errorCodes: {
			400: "bad_request - Invalid message payload",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to send message",
			404: "not_found - Chat not found",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * POST /files/upload/audio/{teamId}
	 * Successful response (200)
	 * Per API spec: Upload and process audio file
	 */
	filesUploadAudio: {
		status: 200,
		body: {
			success: true,
			message: "File uploaded successfully",
		},
		errorCodes: {
			400: "bad_request - Missing/invalid file",
			401: "missing_access_token | invalid_access_token - Invalid or missing token",
			403: "forbidden - Access denied to upload",
			404: "not_found - Team not found",
			409: "conflict - Upload processing conflict",
			415: "unsupported_media_type - Invalid file content type",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * PATCH /super-admin/integrations
	 * Successful response (200)
	 * Per API spec: Update integration settings for company or user
	 */
	superAdminIntegrationsPatch: {
		status: 200,
		body: {
			success: true,
			message: "Integration settings updated for company|user",
			companyId: "number (when updating company)",
			userId: "number (when updating user)",
			updatedIntegrations: "object",
		},
		errorCodes: {
			400: "bad_request - companyId/userId validation failed",
			401: "missing_access_token | invalid_access_token | access_token_expired",
			403: "forbidden - Not allowed to update this company/user",
			404: "not_found - Company or user not found",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /super-admin/clients
	 * Successful response (200)
	 * Per API spec: Fetch client details list
	 */
	superAdminClientsGet: {
		status: 200,
		body: {
			success: true,
			message: "Successfully fetched client details",
			clients: "array [{user: object}]",
		},
		errorCodes: {
			401: "missing_access_token - Missing authentication token provided",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /super-admin/companies
	 * Successful response (200)
	 * Per API spec: Fetch all companies
	 */
	superAdminCompaniesGet: {
		status: 200,
		body: {
			success: true,
			message: "Successfully fetched companies",
			companies: "array [{companyId, companyName, orgType, ...}]",
		},
		errorCodes: {
			401: "missing_access_token - Missing authentication token provided",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /super-admin/companies/{companyId}/usage
	 * Successful response (200)
	 * Per API spec: Fetch company usage metrics
	 */
	superAdminCompanyUsageGet: {
		status: 200,
		body: {
			success: true,
			queries: "object {current: number, limit: number}",
			fileStorageSize: "object {used: string, limit?: string}",
		},
		errorCodes: {
			400: "bad_request - companyId must be valid number",
			401: "missing_access_token - Missing authentication token provided",
			403: "forbidden - Only Super Admins can view company usage",
			404: "not_found - No usage data found for company",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /super-admin/users/{userId}/usage
	 * Successful response (200)
	 * Per API spec: Fetch user usage metrics
	 */
	superAdminUserUsageGet: {
		status: 200,
		body: {
			success: true,
			queries: "object {current: number, limit: number}",
			fileStorageSize: "object {used: string, limit?: string}",
		},
		errorCodes: {
			400: "bad_request - userId must be valid number",
			401: "missing_access_token - Missing authentication token provided",
			403: "forbidden - Only Super Admins can view user usage",
			404: "not_found - No usage data found for user",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /super-admin/users/{userId}/role
	 * Successful response (200)
	 * Per API spec: Check if user is super admin
	 */
	superAdminUserRoleGet: {
		status: 200,
		body: {
			success: true,
			userId: "number",
			isSuperAdmin: "boolean",
		},
		errorCodes: {
			400: "bad_request - userId validation failed",
			401: "missing_access_token - Missing authentication token provided",
			403: "forbidden - Only Super Admins can check user roles",
			404: "not_found - User not found",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /super-admin/environment
	 * Successful response (200)
	 * Per API spec: Fetch environment settings list
	 */
	superAdminEnvironmentGet: {
		status: 200,
		body: {
			success: true,
			env: "array [{id, meta_key, meta_value, created}]",
		},
		errorCodes: {
			400: "unauthorized - Missing or invalid authentication token",
			401: "missing_access_token - Missing authentication token provided",
			403: "forbidden - Only Super Admins can view environment settings",
			404: "not_found - No environment settings found",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * PATCH /super-admin/environment
	 * Successful response (200)
	 * Per API spec: Update environment settings
	 */
	superAdminEnvironmentPatch: {
		status: 200,
		body: {
			success: true,
			message: "Environment settings updated successfully",
			updatedKeys: "string[]",
		},
		errorCodes: {
			400: "bad_request - Invalid or missing fields",
			401: "missing_access_token - Missing authentication token provided",
			403: "forbidden - Only Super Admins can update environment settings",
			404: "not_found - One or more environment keys do not exist",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * GET /super-admin/email/templates
	 * Successful response (200)
	 * Per API spec: Fetch email templates
	 */
	superAdminEmailTemplatesGet: {
		status: 200,
		body: {
			success: true,
			templates: "array [{id, name, subject, template, ...}]",
		},
		errorCodes: {
			401: "missing_access_token - Missing authentication token provided",
			403: "forbidden - Only Super Admins can fetch email templates",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * PATCH /super-admin/email/templates/{templateId}
	 * Successful response (200)
	 * Per API spec: Update email template
	 */
	superAdminEmailTemplatePatch: {
		status: 200,
		body: {
			success: true,
			message: "Email template updated successfully",
			templateId: "number",
		},
		errorCodes: {
			400: "bad_request - Invalid or missing fields",
			401: "missing_access_token - Missing authentication token provided",
			403: "forbidden - Only Super Admins can update templates",
			404: "not_found - Template not found",
			429: "rate_limit - Too many requests",
		},
	},

	/**
	 * 500 Internal Server Error
	 */
	serverError: {
		status: 500,
		body: {
			success: false,
			error: "internal_error",
			message: "string",
		},
	},
};
