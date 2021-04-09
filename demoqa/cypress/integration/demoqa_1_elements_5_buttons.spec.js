/// <reference types="cypress" />

const {homeLocators, elementListLocators} = require('../plugins/locators.js');
const {elementsLoc} = homeLocators;
const {buttonsLoc} = elementListLocators;

var dblClickBtn = '#doubleClickBtn';
var rightClickBtn = '#rightClickBtn';
var dynaClickBtn = 'div:nth-child(3) > button'; //don't like using nth-child, but not a lot of options here...
var dblClickMsg = '#doubleClickMessage';
var rightClickMsg = '#rightClickMessage';
var dynaClickMsg = '#dynamicClickMessage';

context('Actions', () => {
  before(() =>{
    cy.visit('');
  });

  beforeEach(() => {
    cy.goHome();
    cy.goToPage(elementsLoc, buttonsLoc);
  });

  it("tests the starting state of the page", () => {
    //assertions
    cy.get(dblClickBtn).should('be.visible');
    cy.get(rightClickBtn).should('be.visible');
    cy.get(dynaClickBtn).should('be.visible');
    cy.get(dblClickMsg).should('not.exist');
    cy.get(rightClickMsg).should('not.exist');
    cy.get(dynaClickMsg).should('not.exist');
  })

  it("tests the buttons", () => {
    //assertions
    cy.get(dblClickBtn).dblclick();
    cy.get(rightClickBtn).rightclick();
    cy.get(dynaClickBtn).click();
    cy.get(dblClickMsg).should('be.visible');
    cy.get(rightClickMsg).should('be.visible');
    cy.get(dynaClickMsg).should('be.visible');
  })
})