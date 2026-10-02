package com.automate.framework.steps;

import com.automate.framework.driver.DriverManager;
import com.automate.framework.pages.InventoryPage;
import com.automate.framework.pages.LoginPage;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LoginSteps {
    private LoginPage loginPage;
    private InventoryPage inventoryPage;

    @Given("the user is on the login page")
    public void userIsOnLoginPage() {
        loginPage = new LoginPage(DriverManager.getDriver()).open();
    }

    @When("the user logs in with username {string} and password {string}")
    public void userLogsIn(String username, String password) {
        inventoryPage = loginPage.login(username, password);
    }

    @Then("the inventory page is displayed")
    public void inventoryPageIsDisplayed() {
        assertEquals("Products", inventoryPage.getTitle());
    }
}
