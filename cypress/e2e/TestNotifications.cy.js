const roles = ['admin', 'staff'];

roles.forEach((role) => {
  describe(`${role.charAt(0).toUpperCase() + role.slice(1)} Notification Tests`, () => {
    beforeEach(() => {
      cy.visit(`http://localhost:3000/${role}/notifications`); // Visit the notification page for the role
    });

    const searchTerms = ['Low Stock', 'Received', 'Maintenance'];

    describe('Search Bar Tests', () => {
      it('Should display the search bar', () => {
        cy.get('input[placeholder="Search / Filter notifications..."]').should('be.visible');
      });

      searchTerms.forEach((term) => {
        it(`Should filter notifications based on search input for "${term}"`, () => {
          cy.get('input[placeholder="Search / Filter notifications..."]')
            .clear()
            .type(term);

          // Assert that filtered results are shown
          cy.contains(term).should('exist');
        });
      });
    });

    it('Should display notification table headers', () => {
      // Check headers for both Admin and Staff
      cy.contains('Title').should('be.visible');
      cy.contains('Message').should('be.visible');
      cy.contains('Timestamp').should('be.visible');
      
      if (role === 'admin') {
        cy.contains('Priority').should('be.visible');
      }
    });

    it('Should display notifications in the table', () => {
      cy.get('table tbody tr').should('have.length.greaterThan', 0); // Check if there are rows in the table
    });

    it('Should display the card summary for total notifications', () => {
      cy.contains('Total Notifications').should('be.visible');
    });
  });
});
