describe("The Calculator App", () => {
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

  it("has a title", () => {
    cy.title().should("include", "Calculator");
  });

  it("shows 0 in a read-only input display", () => {
    cy.get("#display")
      .should("be.visible")
      .and("have.attr", "readonly");
    cy.get("#display").should("have.value", "0");
  });

  it("shows the button for number one", () => {
    cy.get("#number1-button")
      .should("be.visible")
      .and("contain.text", "1");
  });

  it("shows the button for number two", () => {
    cy.get("#number2-button")
      .should("be.visible")
      .and("contain.text", "2");
  });

  it("shows the button for number three", () => {
    cy.get("#number3-button")
      .should("be.visible")
      .and("contain.text", "3");
  });

  it("shows the button for number four", () => {
    cy.get("#number4-button")
      .should("be.visible")
      .and("contain.text", "4");
  });

  it("shows the button for number five", () => {
    cy.get("#number5-button")
      .should("be.visible")
      .and("contain.text", "5");
  });

  it("shows the button for number six", () => {
    cy.get("#number6-button")
      .should("be.visible")
      .and("contain.text", "6");
  });

  it("shows the button for number seven", () => {
    cy.get("#number7-button")
      .should("be.visible")
      .and("contain.text", "7");
  });

  it("shows the button for number eight", () => {
    cy.get("#number8-button")
      .should("be.visible")
      .and("contain.text", "8");
  });

  it("shows the button for number nine", () => {
    cy.get("#number9-button")
      .should("be.visible")
      .and("contain.text", "9");
  });

  it("shows the button for number zero", () => {
    cy.get("#number0-button")
      .should("be.visible")
      .and("contain.text", "0");
  });

  it("shows the button for a decimal point", () => {
    cy.get("#decimal-button")
      .should("be.visible")
      .and("contain.text", ".");
  });

  it("shows the button for addition", () => {
    cy.get("#add-button")
      .should("be.visible")
      .and("contain.text", "+");
  });

  it("shows the button for subtraction", () => {
    cy.get("#subtract-button")
      .should("be.visible")
      .and("contain.text", "−");
  });

  it("shows the button for multiplication", () => {
    cy.get("#multiply-button")
      .should("be.visible")
      .and("contain.text", "×");
  });

  it("shows the button for division", () => {
    cy.get("#divide-button")
      .should("be.visible")
      .and("contain.text", "÷");
  });

  it("shows the button for totaling", () => {
    cy.get("#equals-button")
      .should("be.visible")
      .and("contain.text", "=");
  });

  it("shows the button to toggle negative/positive", () => {
    cy.get("#negative-toggle-button")
      .should("be.visible")
      .and("contain.text", "±");
  });

  it("shows the button to clear everything", () => {
    cy.get("#clear-all-button")
      .should("be.visible")
      .and("contain.text", "C");
  });

  it("shows the button to clear the current entry", () => {
    cy.get("#clear-entry-button")
      .should("be.visible")
      .and("contain.text", "CE");
  });

  it("shows the button to remove the last digit", () => {
    cy.get("#backspace-button")
      .should("be.visible")
      .and("contain.text", "←");
  });
});
