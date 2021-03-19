/// <reference types="cypress" />

context('Actions', () => {
    it("tests the functionality of the Key Presses page's input bar and scanner", () => {
      cy.visit('https://the-internet.herokuapp.com');
      cy.get('ul li a[href="/key_presses"]').click();
      var textInput = '.example form input#target';
      var resultOutput = '.example #result';

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