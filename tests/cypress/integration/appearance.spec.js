describe("The Calculator App", function() {
  it("successfully loads", () => {
    cy.visit("/");
  });

  it("returns html", () => {
    cy.document()
      .its("contentType")
      .should("equal", "text/html");
  });

  it("uses the UTF-8 character set", () => {
    cy.document()
      .should("have.property", "charset")
      .and("equal", "UTF-8");
  });

  it("has a title", function() {
    cy.title().should("include", "Calculator");
  });

  it("shows the read-only input display", () => {
    cy.get("#display")
      .should("be.visible")
      .and("have.attr", "readonly");
  });

  it("shows the button for number one", function() {
    cy.get("#number1-button")
      .should("be.visible")
      .and("contain.text", "1");
  });

  it("shows the button for number two", function() {
    cy.get("#number2-button")
      .should("be.visible")
      .and("contain.text", "2");
  });

  it("shows the button for number three", function() {
    cy.get("#number3-button")
      .should("be.visible")
      .and("contain.text", "3");
  });

  it("shows the button for number four", function() {
    cy.get("#number4-button")
      .should("be.visible")
      .and("contain.text", "4");
  });

  it("shows the button for number five", function() {
    cy.get("#number5-button")
      .should("be.visible")
      .and("contain.text", "5");
  });

  it("shows the button for number six", function() {
    cy.get("#number6-button")
      .should("be.visible")
      .and("contain.text", "6");
  });

  it("shows the button for number seven", function() {
    cy.get("#number7-button")
      .should("be.visible")
      .and("contain.text", "7");
  });

  it("shows the button for number eight", function() {
    cy.get("#number8-button")
      .should("be.visible")
      .and("contain.text", "8");
  });

  it("shows the button for number nine", function() {
    cy.get("#number9-button")
      .should("be.visible")
      .and("contain.text", "9");
  });

  it("shows the button for number zero", function() {
    cy.get("#number0-button")
      .should("be.visible")
      .and("contain.text", "0");
  });

  it("shows the button for a decimal point", function() {
    cy.get("#decimal-button")
      .should("be.visible")
      .and("contain.text", ".");
  });

  it("shows the button for addition", function() {
    cy.get("#add-button")
      .should("be.visible")
      .and("contain.text", "+");
  });

  it("shows the button for subtraction", function() {
    cy.get("#subtract-button")
      .should("be.visible")
      .and("contain.text", "−");
  });

  it("shows the button for multiplication", function() {
    cy.get("#multiply-button")
      .should("be.visible")
      .and("contain.text", "×");
  });

  it("shows the button for division", function() {
    cy.get("#divide-button")
      .should("be.visible")
      .and("contain.text", "÷");
  });

  it("shows the button for totaling", function() {
    cy.get("#equals-button")
      .should("be.visible")
      .and("contain.text", "=");
  });

  it("shows the button to toggle negative/positive", function() {
    cy.get("#negative-toggle-button")
      .should("be.visible")
      .and("contain.text", "±");
  });

  it("shows the button to clear everything", function() {
    cy.get("#clear-all-button")
      .should("be.visible")
      .and("contain.text", "C");
  });

  it("shows the button to clear the current entry", function() {
    cy.get("#clear-entry-button")
      .should("be.visible")
      .and("contain.text", "CE");
  });

  it("shows the button to remove the last digit", function() {
    cy.get("#backspace-button")
      .should("be.visible")
      .and("contain.text", "←");
  });
});
