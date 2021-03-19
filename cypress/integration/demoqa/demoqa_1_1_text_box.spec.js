/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('https://demoqa.com/');
  cy.get('.home-body .category-cards .mt-4:nth-child(1)').click();
  cy.get('#item-0').click();
});

context('Actions', () => {
    it("tests the user input page's starting state", () => {
      cy.get('#userForm #userName').should('be.visible').and('be.empty');
      cy.get('#userForm #userEmail').should('be.visible').and('be.empty');
      cy.get('#userForm #currentAddress').should('be.visible').and('be.empty'); 
      cy.get('#userForm #permanentAddress').should('be.visible').and('be.empty'); 

      cy.get('#submit').click();
      cy.get('#output #name').should('not.exist');
      cy.get('#output #email').should('not.exist');
      cy.get('#output #currentAddress').should('not.exist');
      cy.get('#output #permanentAddress').should('not.exist');
    })
})

context('Actions', () => {
  it("tests the user input page's starting state", () => {
    cy.get('#userForm #userName').should('be.visible').and('be.empty');
    cy.get('#userForm #userEmail').should('be.visible').and('be.empty');
    cy.get('#userForm #currentAddress').should('be.visible').and('be.empty'); 
    cy.get('#userForm #permanentAddress').should('be.visible').and('be.empty'); 

    cy.get('#submit').click();
    cy.get('#output #name').should('not.exist');
    cy.get('#output #email').should('not.exist');
    cy.get('#output #currentAddress').should('not.exist');
    cy.get('#output #permanentAddress').should('not.exist');
  })
})