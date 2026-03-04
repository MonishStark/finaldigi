<!-- @format -->

# GitHub Actions Secrets Checklist

This file lists every secret key referenced by the workflow in [.github/workflows/pr-tests.yml](.github/workflows/pr-tests.yml).

## Workflow Scope

- Workflow scanned: [.github/workflows/pr-tests.yml](.github/workflows/pr-tests.yml)
- Trigger note: this workflow currently runs for PRs targeting `master` and `develop` only ([.github/workflows/pr-tests.yml](.github/workflows/pr-tests.yml#L10-L13)).

## Required Secrets (recommended to always set)

These are used to build `.env`, upload reports, and send notifications.

| Key                         | Example Value (put your real value)         | Why it is needed            |
| --------------------------- | ------------------------------------------- | --------------------------- |
| `GOOGLE_PROJECT_ID`         | `my-gcp-project-id`                         | BigQuery project            |
| `BIGQUERY_DATASET_ID`       | `digibot_dataset`                           | BigQuery dataset            |
| `BIGQUERY_TABLE`            | `documents`                                 | BigQuery table              |
| `BIGQUERY_CONNECTION_ID`    | `digibot-conn`                              | BigQuery connection         |
| `BIGQUERY_AI_MODEL_ID`      | `gemini_model`                              | BigQuery ML model reference |
| `BIGQUERY_MAX_OUTPUT_TOKEN` | `1024`                                      | Model output token cap      |
| `BIGQUERY_LOCATION`         | `us-central1`                               | BigQuery region             |
| `UUID_NAMESPACE`            | `123e4567-e89b-12d3-a456-426614174000`      | UUID namespace used by app  |
| `GDRIVE_CLIENT_ID`          | `1234567890-abc.apps.googleusercontent.com` | Google Drive upload auth    |
| `GDRIVE_CLIENT_SECRET`      | `GOCSPX-xxxxxxxxxxxxxxxx`                   | Google Drive upload auth    |
| `GDRIVE_REFRESH_TOKEN`      | `1//0gxxxxxxxxxxxxxxxx`                     | Google Drive upload auth    |
| `REPORT_FROM_MAIL`          | `qa-bot@yourdomain.com`                     | SMTP username               |
| `REPORT_FROM_PASSWORD`      | `smtp_app_password_here`                    | SMTP password               |
| `REPORT_TO_MAILS`           | `qa@yourdomain.com,dev@yourdomain.com`      | Notification recipients     |

## Optional Secrets (workflow has defaults)

If not provided, workflow uses fallback values from [.github/workflows/pr-tests.yml](.github/workflows/pr-tests.yml#L56-L63).

| Key                                   | Example Value                                             | Fallback in workflow               |
| ------------------------------------- | --------------------------------------------------------- | ---------------------------------- |
| `STRIPE_SECRET_KEY`                   | `sk_test_xxxxxxxxxxxxx`                                   | `sk_test_ci_dummy`                 |
| `GOOGLE_CLIENT_ID`                    | `1234567890-abc.apps.googleusercontent.com`               | `ci_dummy_client_id`               |
| `GOOGLE_CLIENT_SECRET`                | `GOCSPX-xxxxxxxxxxxxxxxx`                                 | `ci_dummy_client_secret`           |
| `MICROSOFT_CLIENT_ID`                 | `11111111-2222-3333-4444-555555555555`                    | `ci_dummy_microsoft_client_id`     |
| `MICROSOFT_CLIENT_SECRET`             | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                        | `ci_dummy_microsoft_client_secret` |
| `MICROSOFT_TENANT_ID`                 | `aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`                    | `ci_dummy_microsoft_tenant_id`     |
| `MICROSOFT_OAUTH_REDIRECT_URL`        | `http://localhost:5050/auth/providers/microsoft/callback` | same localhost callback            |
| `MICROSOFT_OAUTH_MOBILE_REDIRECT_URL` | `http://localhost:5050/auth/providers/microsoft/callback` | same localhost callback            |

## Copy-Paste Template (key = value)

Create these in GitHub repository secrets:

```text
GOOGLE_PROJECT_ID = my-gcp-project-id
BIGQUERY_DATASET_ID = digibot_dataset
BIGQUERY_TABLE = documents
BIGQUERY_CONNECTION_ID = digibot-conn
BIGQUERY_AI_MODEL_ID = gemini_model
BIGQUERY_MAX_OUTPUT_TOKEN = 1024
BIGQUERY_LOCATION = us-central1
UUID_NAMESPACE = 123e4567-e89b-12d3-a456-426614174000

STRIPE_SECRET_KEY = sk_test_xxxxxxxxxxxxx
GOOGLE_CLIENT_ID = 1234567890-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET = GOCSPX-xxxxxxxxxxxxxxxx
MICROSOFT_CLIENT_ID = 11111111-2222-3333-4444-555555555555
MICROSOFT_CLIENT_SECRET = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MICROSOFT_TENANT_ID = aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
MICROSOFT_OAUTH_REDIRECT_URL = http://localhost:5050/auth/providers/microsoft/callback
MICROSOFT_OAUTH_MOBILE_REDIRECT_URL = http://localhost:5050/auth/providers/microsoft/callback

GDRIVE_CLIENT_ID = 1234567890-abc.apps.googleusercontent.com
GDRIVE_CLIENT_SECRET = GOCSPX-xxxxxxxxxxxxxxxx
GDRIVE_REFRESH_TOKEN = 1//0gxxxxxxxxxxxxxxxx

REPORT_FROM_MAIL = qa-bot@yourdomain.com
REPORT_FROM_PASSWORD = smtp_app_password_here
REPORT_TO_MAILS = qa@yourdomain.com,dev@yourdomain.com
```

## Quick Setup Path

1. Open repository `Settings` → `Secrets and variables` → `Actions`.
2. Add all keys from the template above.
3. Open a PR to `master` or `develop` (or update workflow trigger to include `main`).
