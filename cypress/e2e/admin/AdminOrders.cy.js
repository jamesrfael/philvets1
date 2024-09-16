describe('Admin Orders SearchBar Tests', () => {
  beforeEach(() => {
    // Visit the Admin Orders page
    cy.visit('http://localhost:3000/admin/orders');
  });

  const searchTerms = ['Approved', 'Pending', 'Shipped'];

  searchTerms.forEach((term) => {
    it(`Should filter orders based on search input for "${term}"`, () => {
      // Type the search term and check results
      cy.get('input[placeholder="Search / Filter order..."]')
        .should('be.visible')
        .clear() // Clear previous input
        .type(term); // Type the current search term

      // Assert that filtered results are shown
      cy.contains(term)
        .should('exist');
    });
  });
});
