/** @format */

const fs = require("fs");
const path = require("path");

const inputJson = process.argv[2];
const outputMd = process.argv[3];

if (!inputJson || !outputMd) {
	console.error(
		"Usage: node generate-clean-smoke-report.js <input-json> <output-md>",
	);
	process.exit(1);
}

function readPlaywrightJson(filePath) {
	const raw = fs.readFileSync(filePath);
	let text =
		raw.length >= 2 && raw[0] === 0xff && raw[1] === 0xfe
			? raw.toString("utf16le")
			: raw.toString("utf8");

	text = text.replace(/^\uFEFF/, "");
	const marker = text.match(/\{\s*"config"\s*:/);
	const start = marker ? marker.index : text.indexOf("{");
	const end = text.lastIndexOf("}");

	if (start < 0 || end <= start) {
		throw new Error("Could not locate JSON payload in report file");
	}

	return JSON.parse(text.slice(start, end + 1));
}

function stripAnsi(s) {
	return (s || "").replace(/\x1B\[[0-9;]*[A-Za-z]/g, "");
}

function clean(s) {
	return stripAnsi(s || "")
		.replace(/\r/g, "")
		.trim();
}

function parseExpectedReceived(message) {
	const lines = clean(message)
		.split("\n")
		.map((l) => l.trim());
	let expected = null;
	let received = null;

	for (const line of lines) {
		const exp = line.match(/^Expected(?: pattern)?:\s*(.+)$/i);
		const rec = line.match(/^Received(?: array|string| value)?:\s*(.+)$/i);
		if (exp && !expected) expected = exp[1];
		if (rec && !received) received = rec[1];
	}

	return { expected, received };
}

function walkSuite(suite, parentTitles, out) {
	const title = suite.title || "";
	const nextParents = title ? [...parentTitles, title] : [...parentTitles];

	for (const spec of suite.specs || []) {
		const testCaseTitle = spec.title || "Unnamed test case";
		const file = spec.file || suite.file || "unknown-file";

		for (const test of spec.tests || []) {
			const status = test.status || "unknown";
			const resultWithError =
				(test.results || []).find((r) => (r.errors || []).length > 0) ||
				(test.results || [])[0] ||
				{};
			const firstErr = (resultWithError.errors || [])[0] || {};
			const message = clean(firstErr.message || "No error message captured");
			const reasonLine = (
				message.split("\n")[0] || "No error message captured"
			).trim();
			const parsed = parseExpectedReceived(message);

			const titlePath = [...nextParents, testCaseTitle]
				.filter(Boolean)
				.filter((t) => !String(t).toLowerCase().endsWith(".spec.ts"));

			out.push({
				status,
				file,
				title: titlePath.join(" > ") || testCaseTitle,
				reason: reasonLine,
				expected:
					parsed.expected || "Not explicitly present in assertion output",
				backendProvided:
					parsed.received || "Not explicitly present in assertion output",
			});
		}
	}

	for (const child of suite.suites || []) {
		walkSuite(child, nextParents, out);
	}
}

const report = readPlaywrightJson(path.resolve(inputJson));
const all = [];
for (const top of report.suites || []) {
	walkSuite(top, [], all);
}

let passed = 0;
let failed = 0;
let skipped = 0;

for (const row of all) {
	if (
		row.status === "expected" ||
		row.status === "passed" ||
		row.status === "flaky"
	)
		passed += 1;
	else if (row.status === "unexpected") failed += 1;
	else if (row.status === "skipped") skipped += 1;
}

const failedCases = all.filter((x) => x.status === "unexpected");
const skippedCases = all.filter((x) => x.status === "skipped");

const lines = [];
lines.push("# Clean Smoke Test Report");
lines.push("");
lines.push(`- Source JSON: ${path.resolve(inputJson)}`);
if (report.stats?.startTime)
	lines.push(`- Run start: ${report.stats.startTime}`);
lines.push(`- Total testcases: ${all.length}`);
lines.push(`- Passed: ${passed}`);
lines.push(`- Failed: ${failed}`);
lines.push(`- Skipped: ${skipped}`);
lines.push("");

lines.push("## Failed Testcases");
lines.push("");
if (!failedCases.length) {
	lines.push("No failed testcases.");
	lines.push("");
} else {
	failedCases.forEach((f, i) => {
		lines.push(`### ${i + 1}. ${f.title}`);
		lines.push(`- File: ${f.file}`);
		lines.push(`- Why it failed: ${f.reason}`);
		lines.push(`- Smoke test expected: ${f.expected}`);
		lines.push(`- Backend provided: ${f.backendProvided}`);
		lines.push("");
	});
}

lines.push("## Skipped Testcases");
lines.push("");
if (!skippedCases.length) {
	lines.push("No skipped testcases.");
	lines.push("");
} else {
	skippedCases.forEach((s, i) => {
		lines.push(`${i + 1}. ${s.title}`);
		lines.push(`   - File: ${s.file}`);
	});
	lines.push("");
}

fs.writeFileSync(path.resolve(outputMd), lines.join("\n"), "utf8");

console.log(`TOTAL=${all.length}`);
console.log(`PASSED=${passed}`);
console.log(`FAILED=${failed}`);
console.log(`SKIPPED=${skipped}`);
console.log(`REPORT=${path.resolve(outputMd)}`);
