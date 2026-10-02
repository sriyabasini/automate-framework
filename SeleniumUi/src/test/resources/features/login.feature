Feature: Login
  As a registered customer
  I want to log in
  So that I can view the available products

  Scenario: Successful login
    Given the user is on the login page
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the inventory page is displayed
