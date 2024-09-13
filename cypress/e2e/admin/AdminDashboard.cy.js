describe('Admin Dashboard Card and Link Tests', () => {

  beforeEach(() => {
    // Visit the Admin Dashboard page
    cy.visit('http://localhost:3000/admin/dashboard');
  });

  // Test for CardTotalProducts navigation
  it('Should display CardTotalProducts and navigate to the correct page when clicked', () => {
    // Ensure the CardTotalProducts component is visible and clickable
    cy.get('[data-cy="card-total-products"]')
      .scrollIntoView() // Ensure the element is in view
      .should('be.visible')
      .click(); // Test that clicking the card performs the expected action

    // Verify that clicking navigates to /admin/products
    cy.url().should('include', '/admin/products');
  });

  // Test for CardTotalSales navigation
  it('Should display CardTotalSales and navigate to the correct page when clicked', () => {
    // Ensure the CardTotalSales component is visible and clickable
    cy.get('[data-cy="card-total-sales"]')
      .scrollIntoView() // Ensure the element is in view
      .should('be.visible')
      .click(); // Test that clicking the card performs the expected action

    // Verify that clicking navigates to /admin/sales
    cy.url().should('include', '/admin/sales');
  });

  // Test for CardLowStocks navigation
  it('Should display CardLowStocks and navigate to the correct page when clicked', () => {
    // Ensure the CardLowStocks component is visible and clickable
    cy.get('[data-cy="card-low-stocks"]')
      .scrollIntoView() // Ensure the element is in view
      .should('be.visible')
      .click(); // Test that clicking the card performs the expected action

    // Verify that clicking navigates to /admin/low-stocks
    cy.url().should('include', '/admin/low-stocks');
  });

  // Test for CardTotalNotification navigation
  it('Should display CardTotalNotification and navigate to the correct page when clicked', () => {
    // Ensure the CardTotalNotification component is visible and clickable
    cy.get('[data-cy="card-total-notification"]')
      .scrollIntoView() // Ensure the element is in view
      .should('be.visible')
      .click(); // Test that clicking the card performs the expected action

    // Verify that clicking navigates to /admin/notifications
    cy.url().should('include', '/admin/notifications');
  });

  // Test for Highest Selling Products link
  it('Should display Highest Selling Products link and be clickable', () => {
    cy.contains('Highest Selling Products')
      .scrollIntoView()
      .should('be.visible')
      .click(); 

    cy.url().should('include', '/admin/products');
  });

  // Test for Latest Sales link
  it('Should display Latest Sales link and be clickable', () => {
    cy.contains('Latest Sales')
      .scrollIntoView()
      .should('be.visible')
      .click(); 

    cy.url().should('include', '/admin/sales');
  });

  // Test for Recently Added Products link
  it('Should display Recently Added Products link and be clickable', () => {
    cy.contains('Recently Added Products')
      .scrollIntoView()
      .should('be.visible')
      .click(); 

    cy.url().should('include', '/admin/products');
  });

  // Test for Lowest Stocks link
  it('Should display Lowest Stocks link and be clickable', () => {
    cy.contains('Lowest Stocks')
      .scrollIntoView()
      .should('be.visible')
      .click(); 

    cy.url().should('include', '/admin/inventory');
  });

});
