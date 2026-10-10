Feature: Flipkart mobile shopping
  As an ecommerce customer
  I want to find mobile phones, manage my cart and complete checkout
  So that I can verify the shopping journey

  @smoke
  Scenario: Application launches successfully
    Given the Flipkart application is open
    Then the application page is displayed

  Scenario: Guest searches for a mobile below 10000 and adds it to the cart
    Given the Flipkart application is open
    When the guest searches using test data "guest-under-10000"
    Then matching mobile prices are within the selected budget
    When the guest adds a matching mobile to the cart
    Then the cart contains the selected mobile

  Scenario: Guest searches for a mobile above 50000
    Given the Flipkart application is open
    When the guest searches using test data "guest-over-50000"
    Then matching mobile prices are within the selected budget

  Scenario: Registered user login succeeds with Excel credentials
    Given the Flipkart application is open
    When the user logs in using test data "valid-user"
    Then the user login is successful

  Scenario: Invalid user login is rejected
    Given the Flipkart application is open
    When the user logs in using test data "invalid-user"
    Then the user login is rejected

  @orderPlacement
  Scenario: Authenticated user pays with the configured test payment method and sees order confirmation
    Given the Flipkart application is open
    And the user logs in using test data "order-placement"
    When the user searches using test data "order-placement"
    And the user adds a matching mobile to the cart
    And the user completes checkout using test data "order-placement"
    Then the order confirmation is displayed
