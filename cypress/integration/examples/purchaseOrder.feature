Feature: End to End testing - automationexercise.com

  Scenario: Test Case 24: Download Invoice after Purchase Order
    Given User navigates to the Main page
    When User clicks the signup login button
    Then User enter account and address information to create account
    When User validates the account created message
    Then User clicks the Continue button
    Then User clicks the Logout button to Login Page
    When User inputs incorrect email and password
    Then User validates the error message
    When User inputs correct email and password
    Then User click the Login button to Main Page
    When User adds all Tshirts to the cart
    Then User go to cart page to checkout
    Then User validates the address information
    Then User clicks the Place Order button to Payment page
    When User inputs nothing and validates the warning message
    Then User inputs correct card information and clicks confirm order button
    When User validates the order confirmed message
    Then User clicks the download invoice button
    Then User verify the invoice document
    Then User clicks the Continue button to main page

  Scenario: Test Case 26: Verify Scroll Up and Scroll Down Functionality & Delete Account
    Given User navigates to the Main page
    When User clicks the signup login button
    Then User enter account and address information to create account
    When User validates the account created message
    Then User clicks the Continue button
    Then User Scroll down to the bottom of the page
    When User Scroll up to the top of the page
    Then User validates the headers becomes visible again
    When User clicks the Delete Account button
    Then User validates the account bas been deleted successful
    Then User clicks the Continue button to main page
