describe('Admin Delivery SearchBar Tests', () => {
    beforeEach(() => {
      // Visit the Admin delivery page
      cy.visit('http://localhost:3000/admin/delivery');
    });
  
    const searchTerms = ['Completed', 'Pending', 'Cancelled', 'Sales', 'Purchase'];
  
    searchTerms.forEach((term) => {
      it(`Should filter delivery based on search input for "${term}"`, () => {
        // Check if SearchBar is present and visible
        cy.get('input[placeholder="Search / Filter delivery..."]')
          .should('be.visible')
          .clear() // Clear previous input
          .type(term); // Type the current search term
  
        // Assert that filtered results are shown
        cy.contains(term)
          .should('exist');
      });
    });
  });
  