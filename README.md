# Automate Framework

This repository contains two independent BDD automation examples:

- `SeleniumUi/`: existing Java, Maven, Selenium and Cucumber framework.
- `PlaywrightUi/`: Playwright TypeScript, Cucumber and Page Object Model framework for ecommerce flows.

## Playwright TypeScript framework

```text
PlaywrightUi/
├── features/                # Gherkin shopping, account, and order flows
├── scripts/                 # Excel workbook setup
└── src/
    ├── config/              # Environment-backed settings
    ├── driver/              # Browser lifecycle
    ├── models/              # Test-data types
    ├── pages/                # POM pages
    ├── steps/                # Cucumber step definitions
    ├── support/              # Scenario world and hooks
    └── utils/                # Web, API, generic, and Excel helpers
```

### Install and run

From `PlaywrightUi`, install dependencies and browser binaries, then create the Excel data workbook:

```text
npm install
npx playwright install chromium
npm run setup:test-data
npm test
```

Edit `test-data/flipkart-test-data.xlsx` to provide registered test-account credentials and any test-store address details. The workbook has rows for guest price searches below ₹10,000 and above ₹50,000, valid and invalid login, and order placement. Set `FLIPKART_BASE_URL`, `BROWSER`, `HEADLESS`, and `TEST_DATA_FILE` in `.env` as needed; `.env.example` documents the options.

The Cucumber Extent Spark report and Cucumber JSON report are written to `PlaywrightUi/reports/`. Use `npm run typecheck` for TypeScript validation and `npm run test:dry` to validate Gherkin/step wiring without opening a browser.

Order placement is opt-in and protected: it is disabled by default and refuses to run against `flipkart.com` or any Flipkart production subdomain. Only enable `ALLOW_ORDER_SUBMISSION=true` for a non-production test store with test payment data; OTPs and real payments are not automated. Public Flipkart may change its UI or block automation, so selectors and checkout fields may need adaptation to the target test environment.

The Java framework remains independently runnable from `SeleniumUi` with `mvn test`.
