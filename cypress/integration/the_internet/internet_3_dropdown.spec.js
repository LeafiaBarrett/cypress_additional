/// <reference types="cypress" />

context('Actions', () => {
    it("tests the functionality of the Dropdown page's dropdown menu", () => {
      cy.visit('https://the-internet.herokuapp.com');
      cy.get('ul li a[href="/dropdown"]').click();
      var dropdownElem = '.example #dropdown';
      var dropdownOption = dropdownElem + ' option[value=';
      
      cy.get(dropdownOption + '""]').should('be.disabled');
      cy.get(dropdownOption + '""]').should('be.selected');
      cy.get(dropdownOption + '"1"]').should('not.be.selected');
      cy.get(dropdownOption + '"2"]').should('not.be.selected');
      
      cy.get(dropdownElem).select('1');
      cy.get(dropdownOption + '""]').should('not.be.selected');
      cy.get(dropdownOption + '"1"]').should('be.selected');
      cy.get(dropdownOption + '"2"]').should('not.be.selected');
      
      cy.get(dropdownElem).select('2');
      cy.get(dropdownOption + '""]').should('not.be.selected');
      cy.get(dropdownOption + '"1"]').should('not.be.selected');
      cy.get(dropdownOption + '"2"]').should('be.selected');
    })
})