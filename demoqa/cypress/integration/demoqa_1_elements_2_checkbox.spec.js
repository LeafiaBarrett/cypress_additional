/// <reference types="cypress" />

const {homeLocators, elementListLocators} = require('../plugins/locators.js');
const {elementsLoc} = homeLocators;
const {checkBoxLoc} = elementListLocators;

var expandAllBtn = 'button.rct-option-expand-all';
var collapseAllBtn = 'button.rct-option-collapse-all';

var checkBoxList = //IDs are given variable names at the bottom for readability and writeability's sake
    ['#tree-node-home', '#tree-node-desktop', '#tree-node-notes', '#tree-node-commands', '#tree-node-documents',
       '#tree-node-workspace', '#tree-node-react', '#tree-node-angular','#tree-node-veu', '#tree-node-office',
       '#tree-node-public', '#tree-node-private', '#tree-node-classified', '#tree-node-general', '#tree-node-downloads',
       '#tree-node-wordFile', '#tree-node-excelFile'];
var checkBoxResults =
    ['home', 'desktop', 'notes', 'commands', 'documents',
      'workspace', 'react', 'angular', 'veu', 'office', 
      'public', 'private', 'classified', 'general', 'downloads', 
      'wordFile', 'excelFile']

var result = '#result';
var textSuccess = 'span.text-success';
var resultSuccessList = '#result span.text-success:nth-child(';

context('Actions', () => {
  before(() =>{
    cy.visit('');
  });

  beforeEach(() => {
    cy.goHome();
    cy.goToPage(elementsLoc, checkBoxLoc);
  });

  it("tests the checkbox file list page's starting state", () => {
    cy.get(expandAllBtn).should('be.visible');
    cy.get(collapseAllBtn).should('be.visible');
    cy.get(checkBoxList[homeCheck]).should('exist');
    for (var i = 1; i < checkBoxList.length; i++){
      cy.get(checkBoxList[i]).should('not.exist');
    }
    cy.get(result).should('not.exist');
  })

  it("tests expanding and collapsing features", () => {
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

  it("tests the check boxes and results", () => {
    cy.get(checkBoxList[homeCheck]).check({force:true});
    cy.get(expandAllBtn).click();
    //assertions
    for (var i = 0; i < checkBoxList.length; i++){
      cy.get(checkBoxList[i]).should('be.checked');
    }
    cy.get(result).should('be.visible');
    cy.get(result).find(textSuccess).its('length').should('eq', checkBoxList.length) //credit to Yuci on Stackoverflow for this, I changed almost nothing
    cy.log(cy.get(result).find(textSuccess));
    cy.log(cy.get(result).find(textSuccess).length);

    for (var i = 0; i < cy.get(result).find(textSuccess).length; i++){ //tried length here, is not working
      cy.log(resultSuccessList + (i+1) + ')');
      cy.get(resultSuccessList + (i+1) + ')').should('be.visible').and('contain.text', checkBoxResults[i]);
    }

    cy.get(collapseAllBtn).click();
    //assertions
    for (var i = 0; i < cy.get(result).find(textSuccess).length; i++){ //tried length here, is not working
      cy.get(resultSuccessList + (i+1) + ')').should('be.visible').and('contain.text', checkBoxResults[i]);
    }

    cy.get(expandAllBtn).click();
    cy.get(checkBoxList[officeCheck]).uncheck({force:true});
    //assertions
    for (var i = 0; i < checkBoxList.length; i++) {
      if ((i < officeCheck || i > generalCheck) && i != homeCheck && i != documentsCheck) {
        cy.get(checkBoxList[i]).should('be.checked');
      }
      else {
        cy.get(checkBoxList[i]).should('not.be.checked');
      }
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