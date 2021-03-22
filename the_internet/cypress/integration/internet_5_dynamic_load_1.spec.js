/// <reference types="cypress" />

const {sites, internetLocators} = require('../plugins/locators.js');
const {internetSite} = sites;
const {dynamicLoadLoc} = internetLocators;

context('Actions', () => {
    it("tests the functionality of the Add/Remove Elements page's buttons", () => {
        cy.visit(internetSite);
        cy.get(dynamicLoadLoc).click();

        var dynaStartBtn = '.example #start button';
        var dynaLoading = '.example #loading';
        var dynaFinish = '.example #finish';

        cy.get('.example a[href="/dynamic_loading/1"]').click();
        cy.get(dynaFinish).should('not.be.visible');

        cy.get(dynaStartBtn).click();
        cy.get(dynaLoading).should('be.visible');
        
        cy.get(dynaLoading).should('not.be.visible');
        cy.get(dynaFinish).should('be.visible');
    })
})