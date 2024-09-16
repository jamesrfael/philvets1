describe('Admin Dashboard Card and Link Tests', () => {

  beforeEach(() => {
    // Visit the Admin Dashboard page
    cy.visit('http://localhost:3000/admin/dashboard');
  });

  // Test for CardTotalProducts navigation
  it('Should display Total Products card and navigate to the correct page when clicked', () => {
    cy.contains('Total Products')
      .scrollIntoView()
      .should('be.visible')
      .click(); // Click the card

    // Verify navigation to /admin/products
    cy.url().should('include', '/admin/products');
  });

  // Test for CardTotalSales navigation
  it('Should display Total Sales card and navigate to the correct page when clicked', () => {
    cy.contains('Total Sales')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.url().should('include', '/admin/sales');
  });

  // Test for CardLowStocks navigation
  it('Should display Low Stocks card and navigate to the correct page when clicked', () => {
    cy.contains('Low Stocks')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.url().should('include', '/admin/inventory');
  });

  // Test for CardTotalNotification navigation
  it('Should display Notifications card and navigate to the correct page when clicked', () => {
    cy.contains('Notifications')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.url().should('include', '/admin/notifications');
  });

  // Test for Highest Selling Products link
  it('Should display Highest Selling Products link and navigate correctly', () => {
    cy.contains('Highest Selling Products')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.url().should('include', '/admin/products');
  });

  // Test for Latest Sales link
  it('Should display Latest Sales link and navigate correctly', () => {
    cy.contains('Latest Sales')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.url().should('include', '/admin/sales');
  });

  // Test for Recently Added Products link
  it('Should display Recently Added Products link and navigate correctly', () => {
    cy.contains('Recently Added Products')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.url().should('include', '/admin/products');
  });

  // Test for Lowest Stocks link
  it('Should display Lowest Stocks link and navigate correctly', () => {
    cy.contains('Lowest Stocks')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.url().should('include', '/admin/inventory');
  });

});
