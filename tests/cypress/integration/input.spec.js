describe("The Calculator App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("appends 1 to the current input when the number one button is activated", () => {
    cy.get("#number1-button").click();
    cy.get("#display").should("have.value", "1");
    cy.get("#number1-button").click();
    cy.get("#display").should("have.value", "11");
  });

  it("appends 2 to the current input when the number two button is activated", () => {
    cy.get("#number2-button").click();
    cy.get("#display").should("have.value", "2");
    cy.get("#number2-button").click();
    cy.get("#display").should("have.value", "22");
  });

  it("appends 3 to the current input when the number three button is activated", () => {
    cy.get("#number3-button").click();
    cy.get("#display").should("have.value", "3");
    cy.get("#number3-button").click();
    cy.get("#display").should("have.value", "33");
  });

  it("appends 4 to the current input when the number four button is activated", () => {
    cy.get("#number4-button").click();
    cy.get("#display").should("have.value", "4");
    cy.get("#number4-button").click();
    cy.get("#display").should("have.value", "44");
  });

  it("appends 5 to the current input when the number five button is activated", () => {
    cy.get("#number5-button").click();
    cy.get("#display").should("have.value", "5");
    cy.get("#number5-button").click();
    cy.get("#display").should("have.value", "55");
  });

  it("appends 6 to the current input when the number six button is activated", () => {
    cy.get("#number6-button").click();
    cy.get("#display").should("have.value", "6");
    cy.get("#number6-button").click();
    cy.get("#display").should("have.value", "66");
  });

  it("appends 7 to the current input when the number seven button is activated", () => {
    cy.get("#number7-button").click();
    cy.get("#display").should("have.value", "7");
    cy.get("#number7-button").click();
    cy.get("#display").should("have.value", "77");
  });

  it("appends 8 to the current input when the number eight button is activated", () => {
    cy.get("#number8-button").click();
    cy.get("#display").should("have.value", "8");
    cy.get("#number8-button").click();
    cy.get("#display").should("have.value", "88");
  });

  it("appends 9 to the current input when the number nine button is activated", () => {
    cy.get("#number9-button").click();
    cy.get("#display").should("have.value", "9");
    cy.get("#number9-button").click();
    cy.get("#display").should("have.value", "99");
  });

  it("appends 0 to the current input when the number zero button is activated, unless currently at 0", () => {
    cy.get("#number0-button").click();
    cy.get("#number0-button").click();
    cy.get("#number0-button").click();
    cy.get("#display").should("have.value", "0");
    cy.get("#number1-button").click();
    cy.get("#number0-button").click();
    cy.get("#display").should("have.value", "10");
  });

  it("appends a decimal point when the decimal button is activated", () => {
    cy.get("#number1-button").click();
    cy.get("#decimal-button").click();
    cy.get("#number2-button").click();
    cy.get("#display").should("have.value", "1.2");
  });

  it("includes a 0 when the decimal button is activated first", () => {
    cy.get("#decimal-button").click();
    cy.get("#display").should("have.value", "0.");
    cy.get("#number2-button").click();
    cy.get("#display").should("have.value", "0.2");
  });

  it("only accepts the first decimal point", () => {
    cy.get("#number1-button").click();
    cy.get("#decimal-button").click();
    cy.get("#number2-button").click();
    cy.get("#decimal-button").click();
    cy.get("#number3-button").click();
    cy.get("#decimal-button").click();
    cy.get("#decimal-button").click();
    cy.get("#display").should("have.value", "1.23");
  });

  it("toggles negativity when the Positive/Negative button is activated", () => {
    // No effect upon 0
    cy.get("#negative-toggle-button").click();
    cy.get("#display").should("have.value", "0");

    // Single digit
    cy.get("#number1-button").click();
    cy.get("#negative-toggle-button").click();
    cy.get("#display").should("have.value", "-1");
    cy.get("#negative-toggle-button").click();
    cy.get("#display").should("have.value", "1");

    // Multiple digits
    cy.get("#number2-button").click();
    cy.get("#number3-button").click();
    cy.get("#negative-toggle-button").click();
    cy.get("#display").should("have.value", "-123");
    cy.get("#negative-toggle-button").click();
    cy.get("#display").should("have.value", "123");

    // Floating point
    cy.get("#decimal-button").click();
    cy.get("#number4-button").click();
    cy.get("#number5-button").click();
    cy.get("#negative-toggle-button").click();
    cy.get("#display").should("have.value", "-123.45");
    cy.get("#negative-toggle-button").click();
    cy.get("#display").should("have.value", "123.45");
  });

  it("removes the last element of input when the Backspace button is activated", () => {
    // No effect upon 0
    cy.get("#backspace-button").click();
    cy.get("#display").should("have.value", "0");

    // Multiple numbers
    cy.get("#number1-button").click();
    cy.get("#number2-button").click();
    cy.get("#number3-button").click();
    cy.get("#display").should("have.value", "123");
    cy.get("#backspace-button").click();
    cy.get("#display").should("have.value", "12");
    cy.get("#backspace-button").click();
    cy.get("#display").should("have.value", "1");
    cy.get("#backspace-button").click();
    cy.get("#display").should("have.value", "0");

    // Now floating point
    cy.get("#number1-button").click();
    cy.get("#decimal-button").click();
    cy.get("#number2-button").click();
    cy.get("#display").should("have.value", "1.2");
    cy.get("#backspace-button").click();
    cy.get("#display").should("have.value", "1.");
    cy.get("#backspace-button").click();
    cy.get("#display").should("have.value", "1");
  });

  it("resets the input when the Clear Entry button is activated", () => {
    cy.get("#number1-button").click();
    cy.get("#number2-button").click();
    cy.get("#number3-button").click();
    cy.get("#display").should("have.value", "123");
    cy.get("#clear-entry-button").click();
    cy.get("#display").should("have.value", "0");
  });

  // TODO: Test Clear All button
});
