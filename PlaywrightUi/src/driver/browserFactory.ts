import { chromium, firefox, webkit, type Browser, type BrowserType } from "playwright";
import { frameworkConfig } from "../config/frameworkConfig";

const browserTypes: Record<string, BrowserType> = { chromium, firefox, webkit };

export class BrowserFactory {
  static async launch(): Promise<Browser> {
    return browserTypes[frameworkConfig.browser].launch({
      headless: frameworkConfig.headless
    });
  }
}
