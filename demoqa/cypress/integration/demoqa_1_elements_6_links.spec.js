/// <reference types="cypress" />

const {homeLocators, elementListLocators} = require('../plugins/locators.js');
const {elementsLoc} = homeLocators;
const {linksLoc} = elementListLocators;

var simpleLink = "#simpleLink"; //Cypress can't do anything with new tabs
var dynaLink = "#dynamicLink"; //so unfortunately I can only test that these exist

var apiCreated = "#created";
var apiNoContent = "#no-content";
var apiMoved = "#moved";
var apiBadRequest = "#bad-request";
var apiUnauthorized = "#unauthorized";
var apiForbidden = "#forbidden";
var apiNotFound = "#invalid-url";
var response = "#linkResponse"; //typo "staus"

context('Actions', () => {
  before(() =>{
    cy.visit('');
  });

  beforeEach(() => {
    cy.goHome();
    cy.goToPage(elementsLoc, linksLoc);
  });

  it("tests the starting state of the page", () => {
    //assertions
    cy.get(simpleLink).should('be.visible');
    cy.get(dynaLink).should('be.visible');
    cy.get(apiCreated).should('be.visible');
    cy.get(apiNoContent).should('be.visible');
    cy.get(apiMoved).should('be.visible');
    cy.get(apiBadRequest).should('be.visible');
    cy.get(apiUnauthorized).should('be.visible');
    cy.get(apiForbidden).should('be.visible');
    cy.get(apiNotFound).should('be.visible');
    cy.get(response).should('not.exist');
  })

  it("tests the links", () => {
    //cy.get(simpleLink).click();

    //cy.get(simpleLink).click();

    //I don't know how to check API calls and I can't read any of the documentation
    //I'm over my head and because I learn exclusively by doing, I don't know how far back I need to go
    cy.get(apiCreated).click();
    cy.get(response).should('contain.text', '201').and('contain.text', 'Created');

    cy.get(apiNoContent).click();
    cy.get(response).should('contain.text', '204').and('contain.text', 'No Content');

    cy.get(apiMoved).click();
    cy.get(response).should('contain.text', '301').and('contain.text', 'Moved Permanently');

    cy.get(apiBadRequest).click();
    cy.get(response).should('contain.text', '400').and('contain.text', 'Bad Request');

    cy.get(apiUnauthorized).click();
    cy.get(response).should('contain.text', '401').and('contain.text', 'Unauthorized');

    cy.get(apiForbidden).click();
    cy.get(response).should('contain.text', '403').and('contain.text', 'Forbidden');

    cy.get(apiNotFound).click();
    cy.get(response).should('contain.text', '404').and('contain.text', 'Not Found');
  })
})