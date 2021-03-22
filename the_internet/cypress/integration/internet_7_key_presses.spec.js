/// <reference types="cypress" />

const {internetLocators} = require('../plugins/locators.js');
const {keyPressesLoc} = internetLocators;

context('Actions', () => {
    it("tests the functionality of the Key Presses page's input bar and scanner", () => {
      cy.visit('');
      cy.get(keyPressesLoc).click();

      var textInput = '.example form input#target';
      var resultOutput = '.example #result';

      //wanted to test contents of input field, but couldn't find a way to
      cy.get(textInput).type('a'); 
      cy.get(resultOutput).should('have.text', 'You entered: A');

      cy.get(textInput).type('wert'); 
      cy.get(resultOutput).should('have.text', 'You entered: T');

      cy.get(textInput).type('{shift}'); 
      cy.get(resultOutput).should('have.text', 'You entered: SHIFT')

      cy.get(textInput).type('{shift} eee {backspace}'); 
      cy.get(resultOutput).should('have.text', 'You entered: BACK_SPACE');

      cy.get(textInput).type('{shift+e}'); 
      cy.get(resultOutput).should('have.text', 'You entered: E');
    })
})