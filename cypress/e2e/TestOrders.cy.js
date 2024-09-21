const roles = ['admin', 'staff'];

roles.forEach(role => {
  describe(`${role.charAt(0).toUpperCase() + role.slice(1)} Orders Tests`, () => {
    beforeEach(() => {
      cy.visit(`http://localhost:3000/${role}/orders`);
    });

    const searchTerms = ['Approved', 'Pending', 'Shipped'];

    describe('Search Bar Tests', () => {
      it('Should display the search bar', () => {
        cy.get('input[placeholder="Search / Filter order..."]').should('be.visible');
      });

      searchTerms.forEach(term => {
        it(`Should filter orders based on search input for "${term}"`, () => {
          cy.get('input[placeholder="Search / Filter order..."]')
            .clear()
            .type(term);

          // Assert that filtered results are shown
          cy.contains(term).should('exist');
        });
      });
    });

    // Additional tests for buttons
    if (role === 'admin') {
      it('Should open Add Purchase modal when Add Purchase button is clicked', () => {
        cy.get('button').contains('Add Purchase').click();
        cy.get('div').contains('Add Purchase').should('exist');
      });
    }

    it('Should open Add Sales modal when Add Sales button is clicked', () => {
      cy.get('button').contains('Add Sales').click();
      cy.get('div').contains('Add Sales').should('exist');
    });

    // Test for the Details button
    it('Should open Order Details modal when Details button is clicked', () => {
      cy.get('button').contains('Details').first().click();
      cy.get('div').contains('Order Details').should('exist');
    });
  });
});
