import "dotenv/config";

const booleanFromEnv = (name: string, fallback: boolean): boolean => {
  const value = process.env[name];
  if (value === undefined) return fallback;
  if (value.toLowerCase() !== "true" && value.toLowerCase() !== "false") {
    throw new Error(`${name} must be true or false`);
  }
  return value.toLowerCase() === "true";
};

export const frameworkConfig = {
  baseUrl: process.env.FLIPKART_BASE_URL ?? "https://www.flipkart.com/",
  browser: process.env.BROWSER ?? "chromium",
  headless: booleanFromEnv("HEADLESS", true),
  testDataFile: process.env.TEST_DATA_FILE ?? "test-data/flipkart-test-data.xlsx",
  allowOrderSubmission: booleanFromEnv("ALLOW_ORDER_SUBMISSION", false),
  navigationTimeoutMs: 30_000
};

if (!["chromium", "firefox", "webkit"].includes(frameworkConfig.browser)) {
  throw new Error("BROWSER must be chromium, firefox, or webkit");
}
