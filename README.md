# Automate Framework

Maven-based Selenium and Cucumber framework using the Page Object Model.

## Project structure

```text
SeleniumUi/
├── pom.xml
└── src/
    └── test/
        ├── java/com/automate/framework/
        │   ├── config/       # Properties and system-property configuration
        │   ├── driver/       # Browser creation and scenario-scoped WebDriver
        │   ├── hooks/        # Scenario setup, screenshots, and teardown
        │   ├── pages/        # Page objects
        │   ├── runner/       # Cucumber JUnit Platform suite
        │   └── steps/        # Gherkin step definitions
        └── resources/
            ├── config.properties
            └── features/
```

## Run

From `SeleniumUi`, execute `mvn test`. Selenium Manager resolves the installed browser driver. The sample scenario uses the public SauceDemo site and runs Chrome headless by default.

Override settings with Maven system properties, for example:

```text
mvn test -Dbrowser=firefox -Dheadless=false -DbaseUrl=https://www.saucedemo.com/
```

Supported browser values are `chrome` and `firefox`. Cucumber reports are generated at `target/cucumber-report.html` and `target/cucumber-report.json`.
