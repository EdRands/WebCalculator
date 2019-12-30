/* Visit the web app and see the welcome message. */

describe("The App", function() {
  it("successfully loads", () => {
    cy.visit("/");
  });

  it("has a title", function() {
    cy.title().should("contain", "Calculator");
  });

  it("displays something about a calculator", function() {
    cy.contains("calculator");
  });
});
