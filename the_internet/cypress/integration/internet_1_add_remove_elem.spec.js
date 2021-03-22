/// <reference types="cypress" />

const {internetLocators} = require('../plugins/locators.js');
const {addRemoveElementsLoc} = internetLocators;

context('Actions', () => {
    it("tests the functionality of the Add/Remove Elements page's buttons", () => {
        cy.visit('');
        cy.get(addRemoveElementsLoc).click();

        var addBtn = '.example button[onclick="addElement()"]';
        var removeElementBtn = '.example #elements .added-manually';

        cy.get(addBtn).click();
        cy.get(removeElementBtn + ':nth-child(1)').should('be.visible');

        cy.get(removeElementBtn + ':nth-child(1)').click();
        cy.get(removeElementBtn).should('not.exist');

        var i; //add 4 elements ----------------------------------
        for (i = 0; i < 4; i++){
            cy.get(addBtn).click();
        }
        cy.get(removeElementBtn + ':nth-child(4)').should('be.visible');

        cy.get(removeElementBtn + ':nth-child(3)').click();
        cy.get(removeElementBtn + ':nth-child(2)').click();
        cy.get(removeElementBtn + ':nth-child(2)').should('be.visible');
        
        cy.get(removeElementBtn + ':nth-child(2)').click();
        cy.get(removeElementBtn + ':nth-child(1)').click();
        cy.get(removeElementBtn).should('not.exist');
    })
})