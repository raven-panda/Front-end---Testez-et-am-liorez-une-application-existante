describe('Given I want to create and login to an account', () => {
  const login = `johndoe-${Date.now()}@gmail.com`;
  const password = `PasswordSecured123`;

  describe('When I fill register form', () => {
    it('Then I should see Login Page', () => {
      cy.visit('/register');
      cy.contains('Registration Form');

      cy.get('[data-test-id="firstName-field"]').type("John");
      cy.get('[data-test-id="lastName-field"]').type("Doe");  
      cy.get('[data-test-id="login-field"]').type(login)
      cy.get('[data-test-id="password-field"]').type(password);
      cy.get('[data-test-id="register-submit-btn"]').click();

      cy.contains('Login Form');
    });
  });

  describe('When I fill login form', () => {
    it('Then I should see Student listing page', () => {
      cy.visit('/login');
      cy.contains('Login Form');

      cy.get('[data-test-id="login-field"]').type(login)
      cy.get('[data-test-id="password-field"]').type(password);

      cy.get('[data-test-id="login-submit-btn"]').click();

      cy.contains('Students list');
    });
  });
})
