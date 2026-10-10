import { Then, When } from "@cucumber/cucumber";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { PaymentPage } from "../pages/paymentPage";
import { FrameworkWorld } from "../support/world";

When("the user completes checkout using test data {string}", async function (this: FrameworkWorld, id: string) {
  const data = await this.testData.getScenario(id);
  await new CartPage(this.getPage()).open();
  await new CartPage(this.getPage()).proceedToCheckout();
  await new CheckoutPage(this.getPage()).enterAddress(data);
  const paymentPage = new PaymentPage(this.getPage());
  await paymentPage.chooseTestMethod(data.paymentMethod);
  await paymentPage.placeOrder();
});

Then("the order confirmation is displayed", async function (this: FrameworkWorld) {
  if (!(await new CheckoutPage(this.getPage()).hasOrderConfirmation())) {
    throw new Error("The order confirmation message was not displayed");
  }
});
