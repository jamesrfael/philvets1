const roles = ['admin', 'staff'];

roles.forEach(role => {
  describe(`${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard Tests`, () => {
    beforeEach(() => {
      cy.visit(`http://localhost:3000/${role}/dashboard`);
    });

    if (role === 'admin') {
      // Admin-specific tests
      it('Should display Total Products card and navigate to the correct page when clicked', () => {
        cy.contains('Total Products')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.url().should('include', '/admin/products');
      });

      it('Should display Total Sales card and navigate to the correct page when clicked', () => {
        cy.contains('Total Sales')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.url().should('include', '/admin/sales');
      });

      it('Should display Low Stocks card and navigate to the correct page when clicked', () => {
        cy.contains('Low Stocks')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.url().should('include', '/admin/inventory');
      });

      it('Should display Notifications card and navigate to the correct page when clicked', () => {
        cy.contains('Notifications')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.url().should('include', '/admin/notifications');
      });

      it('Should display Highest Selling Products link and navigate correctly', () => {
        cy.contains('Highest Selling Products')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.url().should('include', '/admin/products');
      });

      it('Should display Latest Sales link and navigate correctly', () => {
        cy.contains('Latest Sales')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.url().should('include', '/admin/sales');
      });

      it('Should display Recently Added Products link and navigate correctly', () => {
        cy.contains('Recently Added Products')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.url().should('include', '/admin/products');
      });

      it('Should display Lowest Stocks link and navigate correctly', () => {
        cy.contains('Lowest Stocks')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.url().should('include', '/admin/inventory');
      });
    } else {
      // Staff-specific tests
      it('Should display Total Products card and navigate to the correct page when clicked', () => {
        cy.contains('Total Products')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.url().should('include', '/staff/products');
      });

      it('Should display Low Stocks card and navigate to the correct page when clicked', () => {
        cy.contains('Low Stocks')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.url().should('include', '/staff/inventory');
      });

      it('Should display Recently Added Products link and navigate correctly', () => {
        cy.contains('Recently Added Products')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.url().should('include', '/staff/products');
      });

      it('Should display Lowest Stocks link and navigate correctly', () => {
        cy.contains('Lowest Stocks')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.url().should('include', '/staff/inventory');
      });
    }
  });
});
