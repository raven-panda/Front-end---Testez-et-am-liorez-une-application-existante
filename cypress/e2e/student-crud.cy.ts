describe('Given I want to see and manage my students', () => {
  beforeEach(() => {
    cy.login();
  });

  describe('When I click on Add a student', () => {
    it('Then I should see Create Student form', () => {
      cy.visit('/student');
      cy.get('[data-test-id="create-student-link"]').click();
      cy.contains('Create a Student');
    })
  });

  describe('When I fill and submit the form', () => {
    it('Then I should see the student in the list', () => {
      cy.visit('/student/create');
      cy.get('[data-test-id="firstName-field"]').type('John')
      cy.get('[data-test-id="lastName-field"]').type('Doe')
      cy.get('[data-test-id="login-field"]').type('johndoelogin' + Date.now())
      cy.get('[data-test-id="password-field"]').type('1234')
      cy.get('[data-test-id="create-form-submit-btn"]').click();
      cy.contains('Students list');
      cy.contains('John Doe');
    })
  });

  describe('When I click on Details of a student', () => {
    it('Then I should see their details', () => {
      cy.visit('/student');
      cy.get('[data-test-id="student-details-btn"]').last().click();
      cy.contains('Student details');

      cy.get('[data-test-id="back-to-list-btn"]').last().click();
      cy.contains('Students list');
    })
  });

  describe('When I fill and submit edit form', () => {
    it("Then I should see the updated student's name in the list", () => {
      cy.visit('/student');
      cy.get('[data-test-id="edit-student-btn"]').last().click();
      cy.contains('Edit Student');

      cy.get('[data-test-id="firstName-field"]').clear().type('Jeanne')
      cy.get('[data-test-id="lastName-field"]').clear().type('Doe')

      cy.get('[data-test-id="edit-form-submit-btn"]').click();
      cy.contains('Students list');
      cy.contains('Jeanne Doe');
    })
  });

  describe('When I click Delete a student', () => {
    it("Then it should disappear from the list", () => {
      cy.visit('/student');
      cy.get('[data-test-id="delete-student-btn"]').last().click();
      cy.get('Jeanne Doe').should('not.exist');
    })
  });
})
  
