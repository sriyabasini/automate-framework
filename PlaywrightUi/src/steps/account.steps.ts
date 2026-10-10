import { Then, When } from "@cucumber/cucumber";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { FrameworkWorld } from "../support/world";

When("the user logs in using test data {string}", async function (this: FrameworkWorld, id: string) {
  this.scenarioData = await this.testData.getScenario(id);
  if (!this.scenarioData.username || !this.scenarioData.password) {
    throw new Error(`Excel row "${id}" must contain username and password`);
  }
  if (this.scenarioData.username.startsWith("replace-with-")
    || this.scenarioData.password.startsWith("replace-with-")) {
    throw new Error(`Replace the placeholder credentials in Excel row "${id}" with a test account`);
  }
  await new HomePage(this.getPage()).openLogin();
  await new LoginPage(this.getPage()).login(this.scenarioData.username, this.scenarioData.password);
});

Then("the user login is successful", async function (this: FrameworkWorld) {
  if (!(await new LoginPage(this.getPage()).isLoggedIn())) {
    throw new Error("The account menu was not visible after login");
  }
});

Then("the user login is rejected", async function (this: FrameworkWorld) {
  if (!(await new LoginPage(this.getPage()).hasLoginError())) {
    throw new Error("No invalid-credentials message was displayed");
  }
});
