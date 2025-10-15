Feature: Check everything works fine

  Scenario: Navigate from Login to Home Page
    Given I am on 'Login Page'
    And I enter login 'my@login'
    And I enter password 'my-super-secret-password'
    When I navigate to 'Home Page'
    Then I should be on 'Home Page'

  Scenario: Navigate from Home to A Page
    Given I am on 'Home Page'
    When I navigate to 'A Page'
    Then I should be on 'A Page'

  Scenario: Navigate from A to B Page
    Given I am on 'A Page'
    When I navigate to 'B Page'
    Then I should be on 'B Page'
