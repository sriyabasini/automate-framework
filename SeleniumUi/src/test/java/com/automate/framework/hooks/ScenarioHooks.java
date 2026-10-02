package com.automate.framework.hooks;

import com.automate.framework.driver.DriverManager;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

public class ScenarioHooks {
    @Before
    public void startBrowser() {
        DriverManager.startDriver();
    }

    @After
    public void captureFailureAndCloseBrowser(Scenario scenario) {
        try {
            if (scenario.isFailed() && DriverManager.getDriver() instanceof TakesScreenshot screenshotDriver) {
                byte[] screenshot = screenshotDriver.getScreenshotAs(OutputType.BYTES);
                scenario.attach(screenshot, "image/png", "Failure screenshot");
            }
        } finally {
            DriverManager.quitDriver();
        }
    }
}
