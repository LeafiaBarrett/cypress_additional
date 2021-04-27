/// <reference types="cypress" />

const {homeLocators, elementListLocators} = require('../plugins/locators.js');
const {elementsLoc} = homeLocators;
const {brokenLinkLoc} = elementListLocators;

var validImg = "div.col-12:nth-child(2) > div:nth-child(1) > img:nth-child(2)";
var brokenImg = "div.col-12:nth-child(2) > div:nth-child(1) > img:nth-child(6)";
var validLink = "div.col-12:nth-child(2) > div:nth-child(1) > a:nth-child(10)";
var brokenLink = "div.col-12:nth-child(2) > div:nth-child(1) > a:nth-child(14)";

context('Actions', () => {
  before(() =>{
    cy.visit('');
  });

  beforeEach(() => {
    cy.goHome();
    cy.goToPage(elementsLoc, brokenLinkLoc);
  });

  it("tests the starting state of the page", () => {
    //assertions
    cy.get(validImg).should('be.visible');
    cy.get(brokenImg).should('be.visible');
    cy.get(validLink).should('be.visible');
    cy.get(brokenLink).should('be.visible');
  })

  it("tests the images", () => {
    //assertions
    cy.get(validImg)
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0)
    })
    cy.get(brokenImg) //should fail
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0)
    })
  })

  xit("tests the links", () => {
    //assertions
    //cy.get(validLink).click();
    //cy.url().invoke('text').then((text) => { expect(text.trim()).equal('https://demoqa.com/') }); //request blocked because link is http instead of https, can't test
    //commented out instead of waiting to fail because it waits 60 seconds trying to load the page
  })
})