import "@4tw/cypress-drag-drop";
const email = "natata0303@gmail.com";
const password = "123456";
const baseUrl = "http://localhost:3000";
const ingredientContainerSelector =
  '*[class^="burger-constructor_ingContainer"]';
const ingredientSelector = "[class^=burger-ingredients_ingredient]";
const priceLabelSelector = `*[class^="burger-constructor_totalContainer"]`;
const bunContainerSelector = "#bunContainer";
const mainContainerSelector = "#mainContainer";
const sauceContainerSelector = "#sauceContainer";
const constructorElementSelector = "[class=constructor-element]";

describe("drag and drop tests", () => {
  beforeEach(() => {
    cy.visit(baseUrl + "/login");
    if (cy.contains("Вход")) {
      //not signed up
      cy.get('input[name="email"]').type(`${email}{enter}`);
      cy.get('input[name="password"]').type(`${password}{enter}`);
    }
    cy.visit(baseUrl);
  });

  it("should be on constructor page", function () {
    cy.contains("Соберите бургер");
  });

  it("can DnD bread", function () {
    //select elements
    cy.get(bunContainerSelector)
      .find(ingredientSelector)
      .first()
      .as("breadItem");
    cy.get("#dropTarget").as("mainContainer");
    cy.get(ingredientContainerSelector).as("container");
    cy.get(priceLabelSelector).as("totalPrice");
    cy.get("@breadItem").children("p").first().invoke("text").as("price");
    cy.get("@breadItem").children("p").eq(1).invoke("text").as("name");
    //drag
    cy.get("@breadItem").drag("@container");
    //check existance
    cy.get("@name").then((name) => {
      cy.get("@mainContainer").contains(name).should("exist");
      cy.get("@container").contains(name).should("not.exist");
    });
    //check price
    cy.get("@price").then(($price) => {
      const price = parseFloat($price);
      cy.get("@totalPrice").contains(2 * price);
    });
  });

  it("can DnD ingredient", function () {
    //select elements
    cy.get(sauceContainerSelector).find(ingredientSelector).first().as("item");
    cy.get("#dropTarget").as("mainContainer");
    cy.get(ingredientContainerSelector).as("container");
    cy.get(priceLabelSelector).as("totalPrice");
    cy.get("@item").children("p").first().invoke("text").as("price");
    cy.get("@item").children("p").eq(1).invoke("text").as("name");
    //drag
    cy.get("@item").drag("@container");
    //check existance
    cy.get("@name").then((name) => {
      cy.get("@container").contains(name).should("exist");
    });
    //check price
    cy.get("@price").then(($price) => {
      const price = parseFloat($price);
      cy.get("@totalPrice").contains(price);
    });
  });

  it("can remove ingredient", function () {
    //select elements
    cy.get(sauceContainerSelector).find(ingredientSelector).first().as("item");
    cy.get("#dropTarget").as("mainContainer");
    cy.get(ingredientContainerSelector).as("container");
    cy.get(priceLabelSelector).as("totalPrice");
    cy.get("@item").children("p").first().invoke("text").as("price");
    cy.get("@item").children("p").eq(1).invoke("text").as("name");
    //drag
    cy.get("@item").drag("@container");
    //remove
    cy.get("@name").then((name) => {
      cy.get("@container")
        .find(constructorElementSelector)
        .contains(name)
        .as("elemToDelete");
      cy.get("@elemToDelete")
        .get('*[class^="constructor-element__action"]')
        .click();
    });
    //check
    cy.get("@name").then((name) => {
      cy.get("@container").contains(name).should("not.exist");
    });
    cy.get("@totalPrice").contains(0);
  });

  it("can rearrrange ingredients", function () {
    //select elements
    cy.get(mainContainerSelector).find(ingredientSelector).first().as("item1");
    cy.get(mainContainerSelector).find(ingredientSelector).eq(1).as("item2");
    cy.get(mainContainerSelector).find(ingredientSelector).eq(2).as("item3");
    cy.get("#dropTarget").as("mainContainer");
    cy.get(ingredientContainerSelector).as("container");
    cy.get("@item1").children("p").eq(1).invoke("text").as("name1");
    cy.get("@item2").children("p").eq(1).invoke("text").as("name2");
    //drag
    cy.get("@item1").drag("@container");
    cy.get("@item2").drag("@container");
    cy.get("@item3").drag("@container");
    //rearrange 1st element
    cy.get("@container")
      .find(constructorElementSelector)
      .first()
      .as("elemToRearrange");

    cy.get("@elemToRearrange")
      .find(".constructor-element__text")
      .invoke("text")
      .then((name1) => {
        //select element and target
        cy.get("@container")
          .find(constructorElementSelector)
          .first()
          .as("elemToRearrange");
        cy.get('*[class^="burger-constructor_gap"]').last().as("gap");
        //rearrange
        cy.get("@elemToRearrange").drag("@gap");
        //check
        cy.get("@container")
          .find(constructorElementSelector)
          .last()
          .contains(name1)
          .should("exist");
      });
  });

  it("shows ingredient modal on ingredient click", function () {
    cy.get(sauceContainerSelector).find(ingredientSelector).first().as("item1");
    cy.get("@item1").children("p").eq(1).invoke("text").as("name1");
    cy.get("@item1").click();
    cy.contains("Детали ингредиента");
    cy.get("@name1").then((name) => {
      cy.contains(name);
    });
  });

  it("shows order info modal on order creation", function () {
    //select elements
    cy.get(bunContainerSelector).find(ingredientSelector).first().as("item1");
    cy.get(mainContainerSelector).find(ingredientSelector).first().as("item2");
    cy.get("#dropTarget").as(mainContainerSelector);

    cy.get(ingredientContainerSelector).as("container");
    cy.get("@item1").children("p").eq(1).invoke("text").as("name1");
    cy.get("@item2").children("p").eq(1).invoke("text").as("name2");
    //drag
    cy.get("@item1").drag("@container");
    cy.get("@item2").drag("@container");
    //order
    cy.get("button").contains("Оформить заказ").click();
    if (cy.contains("Вход")) {
      //not signed up
      cy.get('input[name="email"]').type(`${email}{enter}`);
      cy.get('input[name="password"]').type(`${password}{enter}`);
    }
    cy.contains("Ваш заказ начали готовить");
  });
});
