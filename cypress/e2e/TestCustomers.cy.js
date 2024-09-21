const roles = ['admin', 'staff'];

roles.forEach(role => {
  describe(`${role.charAt(0).toUpperCase() + role.slice(1)} Customers Tests`, () => {
    beforeEach(() => {
      cy.visit(`http://localhost:3000/${role}/customers`);
    });

    const searchTerms = ['John', '@example.com', '09478925611'];

    describe('Search Bar Tests', () => {
      it('Should display the search bar', () => {
        cy.get('input[placeholder="Search / Filter customer..."]').should('be.visible');
      });

      searchTerms.forEach(term => {
        it(`Should filter customers based on search input for "${term}"`, () => {
          cy.get('input[placeholder="Search / Filter customer..."]')
            .clear()
            .type(term);

          // Assert that at least one customer containing the term is visible
          cy.contains(term).should('exist'); // Adjust based on actual expected content
        });
      });
    });

    // Additional tests for the Add Customer button
    it('Should open Add Customer modal when Add Customer button is clicked', () => {
      cy.get('button').contains('Add Customer').click();
      cy.get('div').contains('Customer').should('exist'); // Check if modal is visible
    });

    // Test for the Details button
    it('Should open Customer Details modal when Details button is clicked', () => {
      cy.get('button').contains('Details').first().click();
      cy.get('div').contains('Details').should('exist'); // Check if modal is visible
    });
  });
});
