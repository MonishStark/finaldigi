const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const specsDir = path.join(__dirname, 'smoke-tests', 'specs');
const resultsFile = path.join(__dirname, '..', 'smoke_test_full_results.log');
const API_URL = process.env.API_URL || "http://127.0.0.1:5050";

// Clear previous results
fs.writeFileSync(resultsFile, `--- Smoke Test Sequential Run Started at ${new Date().toISOString()} ---\n\n`);

function getSpecFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getSpecFiles(file));
        } else if (file.endsWith('.spec.ts')) {
            results.push(file);
        }
    });
    return results;
}

async function checkHealth() {
    return new Promise((resolve) => {
        const url = new URL('/health', API_URL);
        const req = http.get(url.toString(), (res) => {
            resolve(res.statusCode === 200);
        });
        req.on('error', () => resolve(false));
        req.setTimeout(2000, () => {
            req.destroy();
            resolve(false);
        });
    });
}

async function run() {
    const allSpecs = getSpecFiles(specsDir);
    console.log(`Found ${allSpecs.length} spec files. Starting execution...`);
    fs.appendFileSync(resultsFile, `Specs found: ${allSpecs.length}\n`);

    for (let i = 0; i < allSpecs.length; i++) {
        const specPath = allSpecs[i];
        const relativePath = path.relative(__dirname, specPath).replace(/\\/g, '/');
        const logHeader = `\n[${i + 1}/${allSpecs.length}] RUNNING: ${relativePath}\n${'='.repeat(50)}\n`;
        
        console.log(`[${i + 1}/${allSpecs.length}] ${relativePath}...`);
        fs.appendFileSync(resultsFile, logHeader);

        // Pre-check health to avoid 5-60s timeout in Playwright
        const isHealthy = await checkHealth();
        if (!isHealthy) {
            const errorMsg = `[CRITICAL] Backend unreachable at ${API_URL}. Skipping Playwright run for this spec.\n`;
            console.error(errorMsg.trim());
            fs.appendFileSync(resultsFile, errorMsg);
            fs.appendFileSync(resultsFile, `\n${'-'.repeat(50)}\n`);
            continue;
        }

        try {
            const output = execSync(`npx playwright test "${relativePath}" --project=chromium --workers=1 --reporter=line`, {
                encoding: 'utf8',
                stdio: 'pipe',
                env: { ...process.env, FORCE_COLOR: '0', API_WAIT_TIMEOUT_MS: '5000' }
            });
            fs.appendFileSync(resultsFile, output);
            fs.appendFileSync(resultsFile, `\n[PASS] ${relativePath}\n`);
            console.log(`[PASS] ${relativePath}`);
        } catch (error) {
            console.error(`[FAIL] ${relativePath}`);
            if (error.stdout) fs.appendFileSync(resultsFile, error.stdout);
            if (error.stderr) fs.appendFileSync(resultsFile, error.stderr);
            fs.appendFileSync(resultsFile, `\n[FAIL] ${relativePath} - Exit Code: ${error.status}\n`);
        }

        fs.appendFileSync(resultsFile, `\n${'-'.repeat(50)}\n`);
    }

    console.log(`\nExecution complete. Results saved to: ${resultsFile}`);
}

run().catch(console.error);
