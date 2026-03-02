/** @format */

import type { FullConfig } from "@playwright/test";

async function sleep(ms: number) {
	await new Promise((resolve) => setTimeout(resolve, ms));
}

async function canReach(url: string): Promise<boolean> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 2000);
	try {
		const res = await fetch(url, { method: "GET", signal: controller.signal });
		return res.ok; // Only treat 2xx as healthy
	} catch {
		return false;
	} finally {
		clearTimeout(timeoutId);
	}
}

export default async function globalSetup(_config: FullConfig) {
	let apiUrl = process.env.API_URL || "http://127.0.0.1:5050";
	if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
		apiUrl = `http://${apiUrl}`;
	}

	// Prefer /health because it is a lightweight check we explicitly added.
	const probeUrl = new URL("/health", apiUrl).toString();

	const timeoutMs = Number(process.env.API_WAIT_TIMEOUT_MS || 5_000);
	const start = Date.now();

	while (Date.now() - start < timeoutMs) {
		if (await canReach(probeUrl)) return;
		await sleep(1000);
	}

	throw new Error(
		[
			`Backend not reachable for smoke tests.`,
			`Expected API at: ${apiUrl}`,
			`Tried: GET ${probeUrl} for ${timeoutMs}ms`,
			`Start your backend separately, then re-run:`,
			`  set API_URL=${apiUrl} ; npm test -- --project=chromium smoke-tests/specs`,
		].join("\n"),
	);
}
