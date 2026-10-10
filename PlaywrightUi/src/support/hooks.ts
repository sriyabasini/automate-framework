import { After, Before, Status } from "@cucumber/cucumber";
import { frameworkConfig } from "../config/frameworkConfig";
import { FrameworkWorld } from "./world";

function assertOrderSubmissionIsSafe(): void {
  if (!frameworkConfig.allowOrderSubmission) {
    throw new Error("Order placement is disabled. Set ALLOW_ORDER_SUBMISSION=true only for a test store.");
  }
  const hostname = new URL(frameworkConfig.baseUrl).hostname.toLowerCase();
  if (hostname === "flipkart.com" || hostname.endsWith(".flipkart.com")) {
    throw new Error("Order placement is blocked on production Flipkart; configure a non-production test store.");
  }
}

Before({ tags: "@orderPlacement" }, function () {
  assertOrderSubmissionIsSafe();
});

Before(async function (this: FrameworkWorld) {
  await this.startBrowser();
});

After(async function (this: FrameworkWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    await this.attach(await this.page.screenshot({ fullPage: true }), "image/png");
  }
  await this.context?.close();
  await this.browser?.close();
});
