Feature: Check everything works fine

  Scenario: Navigate from Home to Page A
    Given I am on Home Page
    When I navigate to Page A
    Then I see title 'Page A'

  Scenario: Navigate from Page A to Page B
    Given I am on Page A
    When I navigate to Page B
    Then I see title 'Page B'
