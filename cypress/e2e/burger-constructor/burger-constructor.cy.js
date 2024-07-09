const reactModalsSelector = '[data-react-modals=true]';
const createOrderButtonSelector = '[data-button="createOrder"]';

context('Клиентский путь для оформления заказа', () => {
  beforeEach(() => {
    cy.setCookie('token', 'refreshToken');
    window.localStorage.setItem('token', 'accessToken');
    cy.visit('/')

    cy.fixture('ingredients.json').then((json) => {
      cy.intercept('GET', '**/ingredients', json).as('getIngredients')
    });

    cy.wait('@getIngredients');
  });

  it("Страница прогрузилась", () => {
    cy.contains("Соберите бургер");
    cy.get('[data-category=bun]');
    cy.get('[data-category=main]');
    cy.get('[data-category=sauce]');
  })

  it('Детали ингредиента', () => {
    const ingredientId = '60666c42cc7b410027a1a9b5';
    cy.get(`[data-ingredient-id=${ingredientId}]`).click();
    cy.get(reactModalsSelector).contains('Детали ингредиента');
    cy.get(reactModalsSelector).children().children().last().should('have.attr', 'data-selected-ingredient-id', ingredientId);
    cy.get(reactModalsSelector).click();
    cy.get(reactModalsSelector).should('exist');
    cy.get(reactModalsSelector).click(0, 0);
    cy.get(reactModalsSelector).should('not.exist');
  })

  it('DnD булки', () => {
    const bunId1 = '60666c42cc7b410027a1a9b2';
    const bunId2 = '60666c42cc7b410027a1a9b1';
    cy.get(`[data-ingredient-id=${bunId1}]`).contains('.counter').should('not.exist');
    cy.get(`[data-ingredient-id=${bunId2}]`).contains('.counter').should('not.exist');

    cy.get(`[data-ingredient-id=${bunId1}]`).trigger('dragstart');
    cy.get('[data-constructor=true]').trigger('drop');

    cy.get(`[data-ingredient-id=${bunId1}]`).contains('.counter', 2);
    cy.get(`[data-ingredient-id=${bunId2}]`).contains('.counter').should('not.exist');
    cy.get('.constructor-element_pos_top').parent().should('have.attr', 'data-bun-id', bunId1);
    cy.get('.constructor-element_pos_bottom').parent().should('have.attr', 'data-bun-id', bunId1);

    cy.get(`[data-ingredient-id=${bunId2}]`).trigger('dragstart');
    cy.get('[data-constructor=true]').trigger('drop');

    cy.get(`[data-ingredient-id=${bunId2}]`).contains('.counter', 2);
    cy.get(`[data-ingredient-id=${bunId1}]`).contains('.counter').should('not.exist');
    cy.get('.constructor-element_pos_top').parent().should('have.attr', 'data-bun-id', bunId2);
    cy.get('.constructor-element_pos_bottom').parent().should('have.attr', 'data-bun-id', bunId2);
  })

  it('DnD ингредиента', () => {
    const ingredientId1 = '60666c42cc7b410027a1a9b5';
    const ingredientId2 = '60666c42cc7b410027a1a9ba';
    cy.get(`[data-ingredient-id=${ingredientId1}]`).contains('.counter').should('not.exist');
    cy.get(`[data-ingredient-id=${ingredientId2}]`).contains('.counter').should('not.exist');

    cy.get(`[data-ingredient-id=${ingredientId1}]`).trigger('dragstart');
    cy.get('[data-constructor=true]').trigger('drop');

    cy.get(`[data-ingredient-id=${ingredientId1}]`).contains('.counter', 1);
    cy.get(`[data-ingredient-id=${ingredientId2}]`).contains('.counter').should('not.exist');
    cy.get(`[data-contrustor-ingredient-id=${ingredientId1}]`).should('have.length', 1);
    cy.get(`[data-contrustor-ingredient-id=${ingredientId2}]`).should('not.exist');

    cy.get(`[data-ingredient-id=${ingredientId1}]`).trigger('dragstart');
    cy.get('[data-constructor=true]').trigger('drop');

    cy.get(`[data-ingredient-id=${ingredientId1}]`).contains('.counter', 2);
    cy.get(`[data-ingredient-id=${ingredientId2}]`).contains('.counter').should('not.exist');
    cy.get(`[data-contrustor-ingredient-id=${ingredientId1}]`).should('have.length', 2);
    cy.get(`[data-contrustor-ingredient-id=${ingredientId2}]`).should('not.exist');

    cy.get(`[data-ingredient-id=${ingredientId2}]`).trigger('dragstart');
    cy.get('[data-constructor=true]').trigger('drop');

    cy.get(`[data-ingredient-id=${ingredientId1}]`).contains('.counter', 2);
    cy.get(`[data-ingredient-id=${ingredientId2}]`).contains('.counter', 1);
    cy.get(`[data-contrustor-ingredient-id=${ingredientId1}]`).should('have.length', 2);
    cy.get(`[data-contrustor-ingredient-id=${ingredientId2}]`).should('have.length', 1);
  })

  it('Создание заказа', () => {
    cy.fixture('user.json').then((json) => {
      cy.intercept('GET', '**/auth/user', json).as('getUser')
      cy.intercept('POST', '**/auth/token', json).as('getToken')
    });

    cy.wait('@getUser').then(() => { });
   
    cy.fixture('created-order.json').then((json) => {
      cy.intercept('POST', '**/orders', json).as('createOrder')
    });

    cy.get(createOrderButtonSelector).click();
    
    cy.get(reactModalsSelector).should('not.exist'); 

    const bunId = '60666c42cc7b410027a1a9b2';
    cy.get(`[data-ingredient-id=${bunId}]`).trigger('dragstart');
    cy.get('[data-constructor=true]').trigger('drop');

    cy.get(createOrderButtonSelector).click();
    cy.get(reactModalsSelector).should('exist').contains('123');
    cy.get(reactModalsSelector).click();
    cy.get(reactModalsSelector).should('exist');
    cy.get(reactModalsSelector).click(0, 0);
    cy.get(reactModalsSelector).should('not.exist');

    cy.get(`[data-ingredient-id=${bunId}]`).trigger('dragstart');
    cy.get('[data-constructor=true]').trigger('drop');

    cy.get(createOrderButtonSelector).click();
    cy.get('[data-button="closeModal"]').click();
    cy.get(reactModalsSelector).should('not.exist');
  })
});