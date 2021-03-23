/// <reference types="cypress" />

const {homeLocators, elementListLocators} = require('../plugins/locators.js');
const {elementsLoc} = homeLocators;
const {checkBoxLoc} = elementListLocators;

var expandAllBtn = 'button.rct-option-expand-all';
var collapseAllBtn = 'button.rct-option-collapse-all';

var checkBoxList = //IDs are given variable names at the bottom for readability's sake
    ['#tree-node-home', '#tree-node-desktop', '#tree-node-notes', '#tree-node-commands', '#tree-node-documents',
       '#tree-node-workspace', '#tree-node-react', '#tree-node-angular','#tree-node-veu', '#tree-node-office',
       '#tree-node-public', '#tree-node-private', '#tree-node-classified', '#tree-node-general', '#tree-node-downloads',
       '#tree-node-wordFile', '#tree-node-excelFile'];

var result = '#result';

beforeEach(() => {
  cy.visit('');
  cy.get(elementsLoc).click();
  cy.get(checkBoxLoc).click();
});

context('Actions', () => {
  it("tests the checkbox file list page's starting state", () => {
    cy.get(expandAllBtn).should('be.visible');
    cy.get(collapseAllBtn).should('be.visible');
    cy.get(checkBoxList[homeCheck]).should('exist');
    for (var i = 1; i < checkBoxList.length; i++){
      cy.get(checkBoxList[i]).should('not.exist');
    }
    cy.get(result).should('not.exist');
  })
})

context('Actions', () => {
  it("tests the Expand All and Collapse All buttons", () => {
    cy.get(expandAllBtn).click();
    for (var i = 0; i < checkBoxList.length; i++){
      cy.get(checkBoxList[i]).should('exist');
    }

    cy.get(collapseAllBtn).click();
    cy.get(checkBoxList[homeCheck]).should('exist');
    for (var i = 1; i < checkBoxList.length; i++){
      cy.get(checkBoxList[i]).should('not.exist');
    }
  })
})

var homeCheck = 0;
var desktopCheck = 1;
var notesCheck = 2;
var commandsCheck = 3;
var documentsCheck = 4;
var workspaceCheck = 5;
var reactCheck = 6;
var angularCheck = 7;
var veuCheck = 8;
var officeCheck = 9;
var publicCheck = 10;
var privateCheck = 11;
var classifiedCheck = 12;
var generalCheck = 13;
var downloadsCheck = 14;
var wordFileCheck = 15;
var excelFileCheck = 16;