/// <reference types="cypress" />

const {homeLocators, elementListLocators} = require('../plugins/locators.js');
const {elementsLoc} = homeLocators;
const {textBoxLoc} = elementListLocators;

var inputName = '#userForm #userName';
var inputEmail = '#userForm #userEmail';
var inputCurrAddress = '#userForm #currentAddress';
var inputPermAddress = '#userForm #permanentAddress';

var outputName = '#output #name';
var outputEmail = '#output #email';
var outputCurrAddress = '#output #currentAddress';
var outputPermAddress = '#output #permanentAddress';

var submit = '#submit';

context('Actions', () => {
  before(() =>{
    cy.visit('');
  });

  beforeEach(() => {
    cy.goHome();
    cy.goToPage(elementsLoc, textBoxLoc);
  });

  it("tests the user input page's starting state", () => {
    cy.get(inputName).should('be.visible').and('be.empty');
    cy.get(inputEmail).should('be.visible').and('be.empty');
    cy.get(inputCurrAddress).should('be.visible').and('be.empty'); 
    cy.get(inputPermAddress).should('be.visible').and('be.empty');
    cy.get(submit).click();
    //assertions
    cy.get(outputName).should('not.exist');
    cy.get(outputEmail).should('not.exist');
    cy.get(outputCurrAddress).should('not.exist');
    cy.get(outputPermAddress).should('not.exist');
  })

  it("tests basic form functionality", () => {
    //cy.goToPage(elementsLoc, textBoxLoc);

    cy.get(inputName).type('Jane Doe');
    cy.get(submit).click();
    //assertions
    cy.get(outputName).should('be.visible').and('contain.text','Jane Doe');
    cy.get(outputEmail).should('not.exist');
    cy.get(outputCurrAddress).should('not.exist');
    cy.get(outputPermAddress).should('not.exist');

    cy.get(inputName).clear();
    cy.get(inputName).type('John Doe');
    cy.get(inputEmail).type('johndoe@test.com');
    cy.get(inputCurrAddress).type('1 Temp Street');
    cy.get(inputPermAddress).type('1 Perm Street');
    cy.get(submit).click();
    //assertions
    cy.get(outputName).should('contain.text','John Doe').and('not.contain.text','Jane Doe');
    cy.get(outputEmail).should('be.visible').and('contain.text','johndoe@test.com');
    cy.get(outputCurrAddress).should('be.visible').and('contain.text','1 Temp Street');
    cy.get(outputPermAddress).should('be.visible').and('contain.text','1 Perm Street');
  })

  it("tests email's invalid email handler", () => {
    //cy.goToPage(elementsLoc, textBoxLoc);

    cy.get(inputEmail).type('e@a');
    cy.get(submit).click();
    //assertions
    cy.get(inputEmail).should('have.class', 'field-error');
    cy.get(outputEmail).should('not.exist');

    cy.get(inputEmail).clear();
    cy.get(inputName).type('John Doe');
    cy.get(inputEmail).type('johndoe@test.com');
    cy.get(submit).click();
    //assertions
    cy.get(inputEmail).should('not.have.class', 'field-error');
    cy.get(outputEmail).should('be.visible').and('contain.text','johndoe@test.com');

    cy.get(inputName).clear();
    cy.get(inputEmail).clear();
    cy.get(inputName).type('error');
    cy.get(inputEmail).type('error');
    cy.get(submit).click();
    //assertions
    cy.get(inputEmail).should('have.class', 'field-error');
    cy.get(outputName).should('not.contain.text','error');
    cy.get(outputEmail).should('not.contain.text', 'error');
  })
})