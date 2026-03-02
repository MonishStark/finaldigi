# Smoke Tests

This directory contains all smoke test infrastructure for the Digibot application.

## Structure

```
smoke-tests/
├── specs/              # 111 comprehensive smoke test specs
│   ├── auth_*.spec.ts
│   ├── me_*.spec.ts
│   ├── teams_*.spec.ts
│   ├── companies_*.spec.ts
│   ├── admin_*.spec.ts
│   ├── super_admin_*.spec.ts
│   └── ... (all comprehensive endpoint tests)
│
└── scripts/           # Smoke test infrastructure
    ├── run_smoke_by_category.js  # Category-based batch test runner
    ├── uploadToDrive.js          # Google Drive report uploader
    └── seed_db.js                # Test database seeding utility
```

## Running Smoke Tests

From the `e2e/` directory:

```bash
# Run all smoke tests
npm run smoke

# Run specific category
npx playwright test smoke-tests/specs/auth_*.spec.ts --project=chromium

# Run by category script
node smoke-tests/scripts/run_smoke_by_category.js
```

## CI/CD Integration

Smoke tests run automatically on:
- **Pull Requests**: `.github/workflows/pr-tests.yml`
- **Manual Trigger**: `.github/workflows/smoke-tests.yml`

## Configuration

- **Playwright Config**: `e2e/playwright.config.ts`
- **Global Setup**: `e2e/global-setup.ts` (backend health check)
- **Package Scripts**: `e2e/package.json`

## Test Coverage

- **110+ specs** covering all major API endpoints
- **1507 total tests** across authentication, user management, teams, companies, admin operations
- **Serial execution** to maintain state consistency
- **Comprehensive assertions** for status codes, response structure, error handling
