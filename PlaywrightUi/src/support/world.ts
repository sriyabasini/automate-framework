import { World, setWorldConstructor, type IWorldOptions } from "@cucumber/cucumber";
import type { Browser, BrowserContext, Page } from "playwright";
import type { ScenarioData } from "../models/testData";
import { BrowserFactory } from "../driver/browserFactory";
import { TestDataReader } from "../utils/testDataReader";

export class FrameworkWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  scenarioData?: ScenarioData;
  readonly testData = new TestDataReader();

  constructor(options: IWorldOptions) {
    super(options);
  }

  async startBrowser(): Promise<void> {
    this.browser = await BrowserFactory.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  getPage(): Page {
    if (!this.page) throw new Error("Browser page has not been initialized");
    return this.page;
  }
}

setWorldConstructor(FrameworkWorld);
