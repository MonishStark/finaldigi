/** @format */

const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const repoRoot = path.resolve(__dirname, "../../..");
const e2eDir = path.resolve(__dirname, "../..");
const playwrightCli = path.join(
	e2eDir,
	"node_modules",
	"@playwright",
	"test",
	"cli.js",
);

const categories = {
	auth: ["auth_"],
	admin: ["admin_"],
	me: ["me_"],
	companies: ["companies_"],
	invitations: ["invitations_"],
	files: ["files_"],
	teams: ["teams_"],
	super_admin: ["super_admin_"],
	integrations: ["integrations_"],
	notifications: ["notifications_"],
	settings: ["settings_"],
	app_data: ["app_data_"],
};

function listSpecs() {
	const smokeDir = path.join(e2eDir, "smoke-tests", "specs");
	return fs
		.readdirSync(smokeDir)
		.filter((name) => name.endsWith("_comprehensive.spec.ts"));
}

function classify(specName) {
	for (const [category, prefixes] of Object.entries(categories)) {
		if (prefixes.some((prefix) => specName.startsWith(prefix))) {
			return category;
		}
	}
	return "other";
}

function stripAnsi(value) {
	return (value || "").replace(/\u001b\[[0-9;]*m/g, "");
}

function extractErrorSnippet(output) {
	const lines = stripAnsi(output)
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean);

	const hit = lines.find(
		(line) =>
			line.includes("Error:") ||
			line.includes("Backend not reachable") ||
			line.includes("Project(s)") ||
			line.includes("No tests found"),
	);

	if (hit) return hit;
	return lines.slice(-3).join(" | ");
}

function runSpec(specName) {
	const specRel = `smoke-tests/specs/${specName}`;
	const result = spawnSync(
		process.execPath,
		[playwrightCli, "test", specRel, "--project=chromium", "--reporter=json"],
		{
			cwd: e2eDir,
			encoding: "utf8",
			maxBuffer: 8 * 1024 * 1024,
			env: process.env,
		},
	);

	let passed = 0;
	let failed = 0;
	let skipped = 0;
	let errorSnippet = "";

	try {
		const json = JSON.parse(result.stdout || "{}");
		if (json.stats) {
			passed = json.stats.expected || 0;
			failed = json.stats.unexpected || 0;
			skipped = json.stats.skipped || 0;
		}
		// Extract error snippet if failed
		if (failed > 0 && json.suites) {
			const findError = (suite) => {
				for (const spec of suite.specs || []) {
					for (const test of spec.tests || []) {
						for (const res of test.results || []) {
							if (res.status === "unexpected" && res.error) {
								return res.error.message || res.error.stack || "";
							}
						}
					}
				}
				for (const subSuite of suite.suites || []) {
					const err = findError(subSuite);
					if (err) return err;
				}
				return "";
			};
			for (const suite of json.suites) {
				const err = findError(suite);
				if (err) {
					errorSnippet = err.split("\n")[0].trim();
					break;
				}
			}
		}
	} catch (e) {
		errorSnippet = "Failed to parse JSON reporter output";
	}

	const combined = `${result.stdout || ""}\n${result.stderr || ""}`;
	const cleaned = stripAnsi(combined);
	return {
		spec: specName,
		exitCode: result.status ?? 1,
		passed,
		failed,
		skipped,
		timedOut: cleaned.includes("Timed out") || cleaned.includes("Timeout"),
		errorSnippet:
			(result.status ?? 1) === 0
				? ""
				: errorSnippet || extractErrorSnippet(cleaned),
	};
}

function main() {
	const arg = process.argv.find((a) => a.startsWith("--category="));
	const requestedCategory = arg ? arg.split("=")[1] : "all";

	const specs = listSpecs();
	const categorized = {};

	for (const spec of specs) {
		const category = classify(spec);
		if (!categorized[category]) categorized[category] = [];
		categorized[category].push(spec);
	}

	const categoriesToRun =
		requestedCategory === "all"
			? Object.keys(categorized).sort()
			: [requestedCategory];

	const summary = {
		startedAt: new Date().toISOString(),
		requestedCategory,
		totalSpecs: 0,
		totalPassed: 0,
		totalFailed: 0,
		totalSkipped: 0,
		categories: {},
	};

	for (const category of categoriesToRun) {
		const specsInCategory = categorized[category] || [];
		if (specsInCategory.length === 0) continue;

		console.log(
			`\n=== ${category.toUpperCase()} (${specsInCategory.length} specs) ===`,
		);

		const cat = {
			specs: [],
			specCount: specsInCategory.length,
			passed: 0,
			failed: 0,
			skipped: 0,
			failedSpecs: 0,
		};

		for (const spec of specsInCategory.sort()) {
			const result = runSpec(spec);
			cat.specs.push(result);
			cat.passed += result.passed;
			cat.failed += result.failed;
			cat.skipped += result.skipped;
			if (result.exitCode !== 0) cat.failedSpecs += 1;

			const mark = result.exitCode === 0 ? "PASS" : "FAIL";
			console.log(
				`[${mark}] ${spec} -> ${result.passed} passed, ${result.failed} failed, ${result.skipped} skipped`,
			);
			if (result.exitCode !== 0 && result.errorSnippet) {
				console.log(`       reason: ${result.errorSnippet}`);
			}
		}

		summary.categories[category] = cat;
		summary.totalSpecs += cat.specCount;
		summary.totalPassed += cat.passed;
		summary.totalFailed += cat.failed;
		summary.totalSkipped += cat.skipped;

		console.log(
			`Summary ${category}: ${cat.specCount} specs, ${cat.passed} passed, ${cat.failed} failed, ${cat.skipped} skipped, ${cat.failedSpecs} spec files failed`,
		);
	}

	summary.finishedAt = new Date().toISOString();

	const outPath = path.join(repoRoot, "smoke_category_results.json");
	fs.writeFileSync(outPath, JSON.stringify(summary, null, 2));

	console.log("\n=== FINAL ===");
	console.log(`Specs: ${summary.totalSpecs}`);
	console.log(`Passed tests: ${summary.totalPassed}`);
	console.log(`Failed tests: ${summary.totalFailed}`);
	console.log(`Skipped tests: ${summary.totalSkipped}`);
	console.log(`Results file: ${outPath}`);

	process.exit(summary.totalFailed > 0 ? 1 : 0);
}

main();
