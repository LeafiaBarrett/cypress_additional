/// <reference types="cypress" />

const {homeLocators, elementListLocators} = require('../plugins/locators.js');
const {elementsLoc} = homeLocators;
const {checkBoxLoc} = elementListLocators;

var expandAllBtn = 'button.rct-option-expand-all';
var collapseAllBtn = 'button.rct-option-collapse-all';

beforeEach(() => {
  cy.visit('');
  cy.get(elementsLoc).click();
  cy.get(checkBoxLoc).click();
});

context('Actions', () => {
  it("tests the checkbox file list page's starting state", () => {
    cy.get(expandAllBtn).should('be.visible');
    cy.get(collapseAllBtn).should('be.visible');
    cy.get().should('be.visible');
  })
})

