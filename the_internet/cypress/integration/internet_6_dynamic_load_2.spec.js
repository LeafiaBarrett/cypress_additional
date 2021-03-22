/// <reference types="cypress" />

const {internetLocators} = require('../plugins/locators.js');
const {dynamicLoadLoc} = internetLocators;

context('Actions', () => {
    it("tests the functionality of the Add/Remove Elements page's buttons", () => {
        cy.visit('');
        cy.get(dynamicLoadLoc).click();

        var dynaStartBtn = '.example #start button';
        var dynaLoading = '.example #loading';
        var dynaFinish = '.example #finish';

        cy.get('.example a[href="/dynamic_loading/2"]').click();
        cy.get(dynaFinish).should('not.exist');

        cy.get(dynaStartBtn).click();
        cy.get(dynaLoading).should('be.visible');
        
        cy.get(dynaLoading).should('not.be.visible');
        cy.get(dynaFinish).should('be.visible');
    })
})