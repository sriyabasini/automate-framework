package com.automate.framework.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class InventoryPage extends BasePage {
    private static final By PAGE_TITLE = By.className("title");

    public InventoryPage(WebDriver driver) {
        super(driver);
    }

    public String getTitle() {
        return findVisible(PAGE_TITLE).getText();
    }
}
