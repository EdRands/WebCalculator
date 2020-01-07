describe("The Calculator App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("adds integers together", () => {
    cy.get("#number1-button").click();
    cy.get("#add-button").click();
    cy.get("#display").should("have.value", "0");
    cy.get("#number1-button").click();
    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "2");
    cy.get("#add-button").click();
    cy.get("#number2-button").click();
    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "4");
  });

  it("adds floats together", () => {
    cy.get("#number1-button").click();
    cy.get("#decimal-button").click();
    cy.get("#number2-button").click();

    cy.get("#add-button").click();

    cy.get("#number1-button").click();
    cy.get("#decimal-button").click();
    cy.get("#number2-button").click();

    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "2.4");

    cy.get("#add-button").click();
    cy.get("#number3-button").click();
    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "5.4");
  });

  it("subtracts integers", () => {
    cy.get("#number8-button").click();
    cy.get("#subtract-button").click();
    cy.get("#display").should("have.value", "0");
    cy.get("#number3-button").click();
    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "5");
    cy.get("#subtract-button").click();
    cy.get("#number2-button").click();
    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "3");
  });

  it("subtracts floats", () => {
    cy.get("#number8-button").click();
    cy.get("#decimal-button").click();
    cy.get("#number2-button").click();

    cy.get("#subtract-button").click();

    cy.get("#number4-button").click();
    cy.get("#decimal-button").click();
    cy.get("#number8-button").click();

    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "3.4");

    cy.get("#subtract-button").click();
    cy.get("#number3-button").click();
    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "0.4");
  });

  it("multiplies integers", () => {
    cy.get("#number9-button").click();
    cy.get("#multiply-button").click();
    cy.get("#display").should("have.value", "0");
    cy.get("#number9-button").click();
    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "81");
    cy.get("#multiply-button").click();
    cy.get("#number2-button").click();
    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "162");
  });

  it("multiplies floats", () => {
    cy.get("#number2-button").click();
    cy.get("#decimal-button").click();
    cy.get("#number3-button").click();

    cy.get("#multiply-button").click();

    cy.get("#decimal-button").click();
    cy.get("#number4-button").click();

    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "0.92");

    cy.get("#multiply-button").click();
    cy.get("#number6-button").click();
    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "5.52");
  });

  it("divides integers", () => {
    cy.get("#number3-button").click();
    cy.get("#number2-button").click();
    cy.get("#display").should("have.value", "32");
    cy.get("#divide-button").click();
    cy.get("#display").should("have.value", "0");
    cy.get("#number4-button").click();
    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "8");
    cy.get("#divide-button").click();
    cy.get("#number4-button").click();
    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "2");
  });

  it("divides floats", () => {
    cy.get("#number8-button").click();
    cy.get("#decimal-button").click();
    cy.get("#number4-button").click();

    cy.get("#divide-button").click();

    cy.get("#decimal-button").click();
    cy.get("#number8-button").click();

    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "10.5");

    cy.get("#divide-button").click();
    cy.get("#number1-button").click();
    cy.get("#decimal-button").click();
    cy.get("#number4-button").click();
    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "7.5");
  });

  it("handles dividing by 0", () => {
    cy.get("#number3-button").click();
    cy.get("#divide-button").click();
    cy.get("#number0-button").click();
    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "Infinity");

    cy.get("#clear-all-button").click();

    cy.get("#number3-button").click();
    cy.get("#toggle-sign-button").click();
    cy.get("#divide-button").click();
    cy.get("#number0-button").click();
    cy.get("#equals-button").click();
    cy.get("#display").should("have.value", "-Infinity");
  });
});
