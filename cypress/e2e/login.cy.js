describe('Login Page Tests', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:3000/')
  })

  it('Should render the login page correctly', () => {
    // Check if the logo is visible
    cy.get('img[alt="Logo"]').should('be.visible')

    // Check the title of the page
    cy.contains('Login to your account').should('be.visible')

    // Check if the input fields and login button exist
    cy.get('input[placeholder="Username"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
    cy.get('button').contains('Login').should('be.visible')

    // Check if forgot password link is visible
    cy.contains('Forgot password?').should('be.visible')
  })

  it('Should allow typing in username and password fields', () => {
    // Type into the username field
    cy.get('input[placeholder="Username"]')
      .type('testuser')
      .should('have.value', 'testuser')

    // Type into the password field
    cy.get('input[placeholder="Password"]')
      .type('password123')
      .should('have.value', 'password123')
  })

  it('Should navigate to the forgot password page when clicked', () => {
    // Click the "Forgot password?" link
    cy.contains('Forgot password?').click()

    // Check if the URL contains '/forgot-password'
    cy.url().should('include', '/forgot-password')
  })

  it('Should navigate to the admin dashboard after successful login', () => {
    // Simulate login by clicking the login button
    cy.get('input[placeholder="Username"]').type('admin')
    cy.get('input[placeholder="Password"]').type('adminpassword')
    cy.get('button').contains('Login').click()

    // Check if the URL contains '/admin/dashboard' after login
    cy.url().should('include', '/admin/dashboard')
  })

  it('Should display an error for incorrect credentials (optional)', () => {
    // Type incorrect credentials
    cy.get('input[placeholder="Username"]').type('wronguser')
    cy.get('input[placeholder="Password"]').type('wrongpassword')

    // Simulate login attempt
    cy.get('button').contains('Login').click()

    // Check for an error message (you need to handle this in the actual component)
    // This assumes you have some logic to display an error for failed login
    cy.contains('Invalid username or password').should('be.visible')
  })
})
