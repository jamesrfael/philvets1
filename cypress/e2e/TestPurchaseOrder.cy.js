const roles = ['admin', 'superadmin']; // Only include 'admin' role

roles.forEach(role => {
  describe(`${role.charAt(0).toUpperCase() + role.slice(1)} Orders Tests`, () => {
    beforeEach(() => {
      cy.visit(`http://localhost:3000/admin/orders/purchase-order`);
    });

    const searchTerms = ['Completed', 'Pending', 'Cancelled'];

    describe('Search Bar Tests', () => {
      it('Should display the search bar', () => {
        cy.get('input[placeholder="Search / Filter purchase orders..."]').should('be.visible');
      });

      searchTerms.forEach(term => {
        it(`Should filter orders based on search input for "${term}"`, () => {
          cy.get('input[placeholder="Search / Filter purchase orders..."]')
            .clear()
            .type(term);

          // Assert that filtered results are shown
          cy.contains(term).should('exist');
        });
      });
    });

    // Test for the Add Purchase button
    it('Should open Add Purchase modal when Add Purchase button is clicked', () => {
      cy.get('button').contains('Purchase Order').click();
      cy.get('div').contains('Add Purchase Order').should('exist'); // Adjust based on actual modal content
    });

    // Test for the Details button
    it('Should open Order Details modal when Details button is clicked', () => {
      // Assuming there's at least one order present
      cy.get('button').contains('Details').first().click();
      cy.get('div').contains('Order Details').should('exist'); // Adjust based on actual modal content
    });
  });
});
