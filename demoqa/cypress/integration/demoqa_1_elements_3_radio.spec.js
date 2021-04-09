/// <reference types="cypress" />

const {homeLocators, elementListLocators} = require('../plugins/locators.js');
const {elementsLoc} = homeLocators;
const {radioBtnLoc} = elementListLocators;

var yesBtn = '#yesRadio';
var impressBtn = '#impressiveRadio';
var noBtn = '#noRadio';
var success = '.text-success';

context('Actions', () => {
  before(() =>{
    cy.visit('');
  });

  beforeEach(() => {
    cy.goHome();
    cy.goToPage(elementsLoc, radioBtnLoc);
  });

  it("tests the radio buttons", () => {
    //assertions
    cy.get(success).should('not.exist');
    cy.get(noBtn).should('be.disabled');

    cy.get(yesBtn).check({force:true});
    //assertions
    cy.get(success).should('be.visible').and('contain.text', 'Yes');

    cy.get(impressBtn).check({force:true});
    //assertions
    cy.get(success).should('be.visible').and('contain.text', 'Impressive');
  })
})