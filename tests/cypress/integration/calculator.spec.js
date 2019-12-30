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

  it("shows the numbers and decimal buttons", function() {
    for (let buttonNumber = 0; buttonNumber <= 9; buttonNumber++) {
      const buttonID = "#number" + buttonNumber + "-button";
      cy.get(buttonID)
        .should("be.visible")
        .and("contain.text", buttonNumber.toString());
    }
  });

  it("shows the basic non-numeric buttons", function() {
    const buttons = {
      "add": "+",
      "subtract": "−",
      "multiply": "×",
      "divide": "÷",
      "equals": "=",
      "negative-toggle": "±",
      "clear-all": "C",
      "clear-entry": "CE",
      "backspace": "←",
      "decimal": ".",
    };

    for (const buttonName in buttons) {
      if (buttons.hasOwnProperty(buttonName)) {
        const buttonID = "#" + buttonName + "-button";
        const buttonLabel = buttons[buttonName];
        cy.get(buttonID)
          .should("be.visible")
          .and("contain.text", buttonLabel);
      }
    }
  });

  it("shows the read-only input display", () => {
    cy.get("#display")
      .should("be.visible")
      .and("have.attr", "readonly");
  });
});
