/// <reference types="cypress" />

const {internetLocators} = require('../plugins/locators.js');
const {checkboxesLoc} = internetLocators;

context('Actions', () => {
    it("tests the functionality of the Checkboxes page's checkboxes", () => {
      cy.visit('');
      cy.get(checkboxesLoc).click();

      var checkboxElemStr = '.example #checkboxes input[type="checkbox"]';
      
      cy.get(checkboxElemStr + ':nth-child(1)').should('not.be.checked');
      cy.get(checkboxElemStr + ':nth-child(3)').should('be.checked');

      cy.get(checkboxElemStr + ':nth-child(1)').check();
      cy.get(checkboxElemStr + ':nth-child(3)').uncheck();
      cy.get(checkboxElemStr + ':nth-child(1)').should('be.checked');
      cy.get(checkboxElemStr + ':nth-child(3)').should('not.be.checked');
    })
})