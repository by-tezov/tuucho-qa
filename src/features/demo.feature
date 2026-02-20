Feature: Check everything works fine

  Scenario: Navigate from Login to Home Page
    Given I am on 'Login Page'
    And I enter login 'my@login'
    And I enter password 'my-super-secret-password'
    And I keyboard tap enter
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

  Scenario: Navigate from B to C Page
    Given I am on 'B Page'
    When I navigate to 'C Page'
    Then I should be on 'C Page'

  Scenario: Navigate from C to D Page
    Given I am on 'C Page'
    When I navigate to 'D Page'
    Then I should be on 'D Page'

  Scenario: Navigate from D to E Page
    Given I am on 'D Page'
    When I navigate to 'E Page'
    Then I should be on 'E Page'

  Scenario: Navigate from E to E Page
    Given I am on 'E Page'
    When I navigate to 'E Page'
    Then I should be on 'E Page'

  Scenario: Navigate from E to E Page
    Given I am on 'E Page'
    When I navigate to 'E Page'
    Then I should be on 'E Page'

  Scenario: Navigate from E to B Page
    Given I am on 'E Page'
    When I navigate to B from E
    Then I should be on 'B Page'

  Scenario: Navigate back from B to E Page
    Given I am on 'B Page'
    When I navigate back
    Then I should be on 'E Page'

  Scenario: Navigate back from E to D Page
    Given I am on 'E Page'
    When I navigate back
    Then I should be on 'D Page'

  Scenario: Navigate back from D to C Page
    Given I am on 'D Page'
    When I navigate back
    Then I should be on 'C Page'

  Scenario: Navigate from C to A Page
    Given I am on 'C Page'
    When I navigate to A from C
    Then I should be on 'A Page'

  Scenario: Navigate back from A to C Page
    Given I am on 'A Page'
    When I navigate back
    Then I should be on 'C Page'

  Scenario: Navigate back from C to A Page
    Given I am on 'C Page'
    When I navigate back
    Then I should be on 'A Page'

  Scenario: Navigate from A to Image Page
    Given I am on 'A Page'
    When I navigate to Image from A
    Then I should be on 'Image Page'

  Scenario: Navigate back from Image to A Page
    Given I am on 'Image Page'
    When I navigate back
    Then I should be on 'A Page'

  Scenario: Navigate back from A to Home Page
    Given I am on 'A Page'
    When I navigate back
    Then I should be on 'Home Page'

  Scenario: Navigate from Home to Language Page
    Given I am on 'Home Page'
    When I navigate to Language Page
    Then I should be on 'Language Page'

  Scenario: I select French language and Navigate back to Home Page
    Given I am on 'Language Page'
    When I select french language
    Then I should be on French Home Page