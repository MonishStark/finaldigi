/** @format */

// @format
const axios = require("axios");
const fs = require("fs");
const path = require("path");

/**
 * Upload file to Google Drive using OAuth2
 * Requires environment variables:
 * - GDRIVE_CLIENT_ID
 * - GDRIVE_CLIENT_SECRET
 * - GDRIVE_REFRESH_TOKEN
 * - REPORT_ZIP (path to zip file)
 * - REPORT_NAME_PREFIX (prefix for uploaded file name)
 */

const CLIENT_ID = process.env.GDRIVE_CLIENT_ID;
const CLIENT_SECRET = process.env.GDRIVE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GDRIVE_REFRESH_TOKEN;
const REPORT_ZIP = process.env.REPORT_ZIP;
const REPORT_NAME_PREFIX = process.env.REPORT_NAME_PREFIX || "digibot-report";
const MAKE_FILE_PUBLIC =
	(process.env.GDRIVE_MAKE_PUBLIC || "true").toLowerCase() === "true";

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !REPORT_ZIP) {
	console.error("❌ Missing required environment variables");
	console.log("REPORT_LINK=");
	process.exit(1);
}

// Get access token from refresh token
async function getAccessToken() {
	const postData = new URLSearchParams({
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		refresh_token: REFRESH_TOKEN,
		grant_type: "refresh_token",
	});

	try {
		const response = await axios.post("https://oauth2.googleapis.com/token", postData);
		if (response.data.access_token) {
			return response.data.access_token;
		}
		throw new Error("No access token in response");
	} catch (error) {
		throw new Error(`Failed to get access token: ${error.response?.data?.error_description || error.message}`);
	}
}

// Upload file to Google Drive
async function uploadFile(accessToken, filePath, fileName) {
	const FormData = require("form-data");
	const form = new FormData();
	const metadata = {
		name: fileName,
		mimeType: "application/zip",
	};

	form.append("metadata", JSON.stringify(metadata), {
		contentType: "application/json; charset=UTF-8",
	});
	form.append("file", fs.createReadStream(filePath));

	try {
		const response = await axios.post(
			"https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
			form,
			{
				headers: {
					...form.getHeaders(),
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		if (response.data.id) {
			return response.data.id;
		}
		throw new Error("No file ID in response");
	} catch (error) {
		throw new Error(`Failed to upload file: ${error.response?.data?.error?.message || error.message}`);
	}
}

// Make file publicly accessible
async function makeFilePublic(accessToken, fileId) {
	try {
		await axios.post(
			`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
			{
				role: "reader",
				type: "anyone",
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
			}
		);
	} catch (error) {
		throw new Error(`Failed to make file public: ${error.response?.data?.error?.message || error.message}`);
	}
}

// Main execution
(async () => {
	try {
		console.error("🔐 Getting access token...");
		const accessToken = await getAccessToken();

		const timestamp = new Date()
			.toISOString()
			.replace(/[:.]/g, "-")
			.slice(0, -5);
		const fileName = `${REPORT_NAME_PREFIX}-${timestamp}.zip`;

		console.error(`📤 Uploading ${REPORT_ZIP} as ${fileName}...`);
		const fileId = await uploadFile(accessToken, REPORT_ZIP, fileName);

		if (MAKE_FILE_PUBLIC) {
			console.error("🔓 Making file publicly accessible...");
			await makeFilePublic(accessToken, fileId);
		} else {
			console.error(
				"🔒 Keeping file private (set GDRIVE_MAKE_PUBLIC=true to enable public sharing)",
			);
		}

		const driveLink = `https://drive.google.com/file/d/${fileId}/view`;
		console.error(`✅ Upload successful!`);
		console.log(`REPORT_LINK=${driveLink}`);
	} catch (error) {
		console.error("❌ Upload failed:", error.message);
		console.log("REPORT_LINK=");
		process.exit(1);
	}
})();
