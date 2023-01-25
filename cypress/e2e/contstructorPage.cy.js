describe("drag and drop tests", () => {
  beforeEach(() => {
    let email = "natata0303@gmail.com";
    let password = "123456";
    cy.visit("http://localhost:3000/login");
    if (cy.contains("Вход")) {
      //not signed up
      cy.get('input[name="email"]').type(`${email}{enter}`);
      cy.get('input[name="password"]').type(`${password}{enter}`);
    }
    cy.visit("http://localhost:3000");
  });

  it("should be on constructor page", function () {
    cy.contains("Соберите бургер");
  });

  it("can DnD bread", function () {});
  it("can DnD ingredient", function () {});
  it("can remove ingredient", function () {});
  it("can rearrrange ingredients", function () {});

  it("shows ingredient modal on ingredient click", function () {});

  it("shows order info modal on order creation", function () {});
});
