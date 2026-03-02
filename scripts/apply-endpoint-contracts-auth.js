/** @format */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const files = [
	{
		file: path.join(
			root,
			"e2e/smoke-tests/specs/auth_register_comprehensive.spec.ts",
		),
		statusArray: "[200, 201, 400, 405, 409, 422, 429]",
		replacements: [
			[
				/Account created successfully\|User account not found/g,
				"Account created successfully",
			],
			[
				/Invalid or missing fields\|User account not found/g,
				"Invalid or missing fields",
			],
			[
				/Too many requests, please try again later\|User account not found/g,
				"Too many requests, please try again later",
			],
			[
				/expect\(data\.payment\.sessionURL\)\.toBeDefined\(\);/g,
				"expect(data.payment.sessionURL ?? data.payment.sessionUrl ?? null).toBeNull();",
			],
		],
	},
	{
		file: path.join(
			root,
			"e2e/smoke-tests/specs/auth_refresh_comprehensive.spec.ts",
		),
		statusArray: "[200, 400, 401, 403, 405, 429]",
		replacements: [
			[
				/Missing or invalid parameters\|User account not found/g,
				"Missing or invalid parameters",
			],
			[
				/expect\(\["bad_request", "unauthorized"\]\)\.toContain\(data\.error\);/g,
				'expect(["bad_request", "auth_invalid_refresh_token", "auth_refresh_token_expired", "forbidden"]).toContain(data.error);',
			],
			[
				/expect\(data\.error\)\.toBe\("unauthorized"\);/g,
				'expect(["auth_invalid_refresh_token", "auth_refresh_token_expired"]).toContain(data.error);',
			],
			[
				/expect\(data\.message\)\.toMatch\(\/Invalid or expired refresh token\|User account not found\/i\);/g,
				"expect(data.message).toMatch(/Invalid refresh token|Expired refresh token/i);",
			],
		],
	},
	{
		file: path.join(
			root,
			"e2e/smoke-tests/specs/auth_email_check_comprehensive.spec.ts",
		),
		statusArray: "[200, 400, 405, 429]",
		replacements: [
			[
				/Invalid or missing email\|User account not found/g,
				"Invalid or missing email",
			],
			[
				/Too many requests, please try again later\|User account not found/g,
				"Too many requests, please try again later",
			],
		],
	},
	{
		file: path.join(
			root,
			"e2e/smoke-tests/specs/auth_verify_account_comprehensive.spec.ts",
		),
		statusArray: "[200, 400, 401, 404, 405, 410, 429]",
		replacements: [
			[
				/Invalid or missing verification token\|User account not found/g,
				"Invalid or missing fields",
			],
			[
				/Token check failed\|User account not found/g,
				"Invalid or missing fields",
			],
			[
				/Invalid or expired verification token\|User account not found/g,
				"Invalid verification token",
			],
			[/User not found\|User account not found/g, "User not found"],
			[
				/expect\(data\.error\)\.toBe\("bad_request"\);\n\s*expect\(data\.message\)\.toMatch\(\/Invalid or missing fields\/i\);/g,
				'expect(["bad_request", "auth_invalid_verification_token", "not_found", "expired"]).toContain(data.error);\n\t\t\texpect(data.message).toMatch(/Invalid or missing fields|Invalid verification token|User not found|Verification token expired/i);',
			],
			[
				/expect\(data\.error\)\.toBe\("unauthorized"\);/g,
				'expect(data.error).toBe("auth_invalid_verification_token");',
			],
		],
	},
];

const legacyStatus =
	/\[200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503\]/g;

for (const cfg of files) {
	let text = fs.readFileSync(cfg.file, "utf8");
	text = text.replace(legacyStatus, cfg.statusArray);
	for (const [pattern, replacement] of cfg.replacements) {
		text = text.replace(pattern, replacement);
	}
	fs.writeFileSync(cfg.file, text, "utf8");
	console.log(`UPDATED=${cfg.file}`);
}
