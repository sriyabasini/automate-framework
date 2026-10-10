import { Given, Then, When } from "@cucumber/cucumber";
import { CartPage } from "../pages/cartPage";
import { HomePage } from "../pages/homePage";
import { SearchResultsPage } from "../pages/searchResultsPage";
import { FrameworkWorld } from "../support/world";

Given("the Flipkart application is open", async function (this: FrameworkWorld) {
  await new HomePage(this.getPage()).open();
});

Then("the application page is displayed", async function (this: FrameworkWorld) {
  const page = this.getPage();
  if (page.url() === "about:blank") {
    throw new Error("The application page did not open");
  }
  await page.locator("body").waitFor({ state: "visible" });
});

When("the guest searches using test data {string}", async function (this: FrameworkWorld, id: string) {
  this.scenarioData = await this.testData.getScenario(id);
  await new HomePage(this.getPage()).search(this.scenarioData.searchTerm);
});

When("the user searches using test data {string}", async function (this: FrameworkWorld, id: string) {
  this.scenarioData = await this.testData.getScenario(id);
  await new HomePage(this.getPage()).search(this.scenarioData.searchTerm);
});

Then("matching mobile prices are within the selected budget", async function (this: FrameworkWorld) {
  if (!this.scenarioData) throw new Error("Search test data has not been loaded");
  await new SearchResultsPage(this.getPage()).assertMatchingPriceExists({
    min: this.scenarioData.minPrice,
    max: this.scenarioData.maxPrice
  });
});

When("the guest adds a matching mobile to the cart", async function (this: FrameworkWorld) {
  if (!this.scenarioData) throw new Error("Search test data has not been loaded");
  await new SearchResultsPage(this.getPage()).addFirstMatchingProductToCart({
    min: this.scenarioData.minPrice,
    max: this.scenarioData.maxPrice
  });
});

When("the user adds a matching mobile to the cart", async function (this: FrameworkWorld) {
  if (!this.scenarioData) throw new Error("Search test data has not been loaded");
  await new SearchResultsPage(this.getPage()).addFirstMatchingProductToCart({
    min: this.scenarioData.minPrice,
    max: this.scenarioData.maxPrice
  });
});

Then("the cart contains the selected mobile", async function (this: FrameworkWorld) {
  if (!(await new CartPage(this.getPage()).hasItems())) {
    throw new Error("The selected mobile was not found in the cart");
  }
});
