const roles = ["admin", "staff"];

roles.forEach((role) => {
  describe(`${
    role.charAt(0).toUpperCase() + role.slice(1)
  } Reports Tests`, () => {
    beforeEach(() => {
      cy.visit(`http://localhost:3000/${role}/reports`);
    });

    it("Should display all stats cards for staff", () => {
      if (role === "staff") {
        cy.get("div").contains("Low Stocks").should("be.visible");
        cy.get("div").contains("Total Customers").should("be.visible");
        cy.get("div").contains("Total Deliveries").should("be.visible");
        cy.get("div").contains("Total Orders").should("be.visible");
        cy.get("div").contains("Total Products").should("be.visible");
        cy.get("div").contains("Total Returns").should("be.visible");
        cy.get("div").contains("Total Notifications").should("be.visible");
      } else {
        cy.get("div").contains("Low Stocks").should("be.visible");
        cy.get("div").contains("Total Customers").should("be.visible");
        cy.get("div").contains("Total Deliveries").should("be.visible");
        cy.get("div").contains("Total Logs").should("be.visible");
        cy.get("div").contains("Total Orders").should("be.visible");
        cy.get("div").contains("Total Products").should("be.visible");
        cy.get("div").contains("Total Returns").should("be.visible");
        cy.get("div").contains("Total Sales").should("be.visible");
        cy.get("div").contains("Total Users").should("be.visible");
        cy.get("div").contains("Total Suppliers").should("be.visible");
        cy.get("div").contains("Total Notifications").should("be.visible");
      }
    });

    it("Should navigate to Low Stocks page when Low Stocks card is clicked", () => {
      cy.get("div").contains("Low Stocks").click();
      cy.url().should("include", `/${role}/inventory`);
    });

    it("Should navigate to Customers page when Total Customers card is clicked", () => {
      cy.get("div").contains("Total Customers").click();
      cy.url().should("include", `/${role}/customers`);
    });

    it("Should navigate to Delivery page when Total Delivery card is clicked", () => {
      cy.get("div").contains("Total Deliveries").click();
      cy.url().should("include", `/${role}/delivery`);
    });

    it("Should navigate to Orders page when Total Orders card is clicked", () => {
      cy.get("div").contains("Total Orders").click();
      cy.url().should("include", `/${role}/orders`);
    });

    it("Should navigate to Products page when Total Products card is clicked", () => {
      cy.get("div").contains("Total Products").click();
      cy.url().should("include", `/${role}/products`);
    });

    it("Should navigate to Returns page when Total Returns card is clicked", () => {
      cy.get("div").contains("Total Returns").click();
      cy.url().should("include", `/${role}/returns`);
    });

    it("Should display revenue and expense stats correctly for staff", () => {
      if (role === "admin") {
        cy.get("p").contains("₱ 107,000").should("be.visible");
        cy.get("p").contains("₱ 620,000").should("be.visible");
        cy.get("p").contains("₱ 50,000").should("be.visible");
      }
    });

    it("Should display graphs for admin", () => {
      if (role === "admin") {
        cy.get("div").contains("Revenue Graph").should("exist");
        cy.get("div").contains("Cost Breakdown").should("exist"); // Adjust based on actual graph title
      }
    });
  });
});
