/// <reference types="cypress" />

const {homeLocators, elementListLocators} = require('../plugins/locators.js');
const {elementsLoc} = homeLocators;
const {checkBoxLoc} = elementListLocators;

var expandAllBtn = 'button.rct-option-expand-all';
var collapseAllBtn = 'button.rct-option-collapse-all';

//this is probably an overly convoluted mess, but... it seems to work best for what I'm doing, even if some of it doesn't get used
//IDs are given variable names at the bottom for readability and writeability's sake
var homeList = ['#tree-node-home'];
var desktopList = ['#tree-node-desktop', '#tree-node-notes', '#tree-node-commands'];
var documentList = ['#tree-node-documents'];
var workspaceList = ['#tree-node-workspace', '#tree-node-react', '#tree-node-angular','#tree-node-veu'];
var officeList = ['#tree-node-office', '#tree-node-public', '#tree-node-private', '#tree-node-classified', '#tree-node-general'];
var downloadsList = ['#tree-node-downloads', '#tree-node-wordFile', '#tree-node-excelFile'];
var checkBoxListArr = homeList.concat (desktopList, documentList, workspaceList, officeList, downloadsList);

var checkBoxResArr = [''];
var homeResults = ['home'];
var desktopResults = ['desktop', 'notes', 'commands'];
var documentResults = ['documents'];
var workspaceResults = ['workspace', 'react', 'angular', 'veu'];
var officeResults = ['office', 'public', 'private', 'classified', 'general'];
var downloadsResults = ['downloads', 'wordFile', 'excelFile'];
var checkBoxResArr = homeResults.concat (desktopResults, documentResults, workspaceResults, officeResults, downloadsResults);

var result = '#result';
var textSuccess = 'span.text-success';
var resultSuccessList = '#result span:nth-child(';

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
    cy.get(checkBoxListArr[homeCheck]).should('exist');
    for (var i = 1; i < checkBoxListArr.length; i++){
      cy.get(checkBoxListArr[i]).should('not.exist');
    }
    cy.get(result).should('not.exist');
  })

  it("tests expanding and collapsing features", () => {
    cy.get(expandAllBtn).click();
    for (var i = 0; i < checkBoxListArr.length; i++){
      cy.get(checkBoxListArr[i]).should('exist');
    }

    cy.get(collapseAllBtn).click();
    cy.get(checkBoxListArr[homeCheck]).should('exist');
    for (var i = 1; i < checkBoxListArr.length; i++){
      cy.get(checkBoxListArr[i]).should('not.exist');
    }
  })

  it("tests the check boxes and results", () => {
    cy.get(checkBoxListArr[homeCheck]).check({force:true});
    cy.get(expandAllBtn).click();
    //assertions
    for (var i = 0; i < checkBoxListArr.length; i++){
      cy.get(checkBoxListArr[i]).should('be.checked');
    }
    cy.get(result).should('be.visible');
    cy.get(result).find(textSuccess).its('length').should('eq', checkBoxListArr.length) //credit to Yuci on Stackoverflow for this, I changed almost nothing

    for (var i = 0; i < checkBoxListArr.length; i++){ //tried cy.get(result).find(textSuccess).length here, is not working
      cy.log(resultSuccessList + (i+2) + ')');
      cy.get(resultSuccessList + (i+2) + ')').should('be.visible').and('contain.text', checkBoxResArr[i]);
    }

    cy.get(collapseAllBtn).click();
    //assertions
    for (var i = 0; i < checkBoxListArr.length - officeResults.length; i++){ //tried cy.get(result).find(textSuccess).length here, is not working
      cy.get(resultSuccessList + (i+2) + ')').should('be.visible').and('contain.text', checkBoxResArr[i]);
    }

    cy.get(expandAllBtn).click();
    cy.get(checkBoxListArr[officeCheck]).uncheck({force:true});
    //assertions
    for (var i = 0; i < checkBoxListArr.length; i++) {
      if ((i < officeCheck || i > generalCheck) && i != homeCheck && i != documentsCheck) {
        cy.get(checkBoxListArr[i]).should('be.checked');
      }
      else {
        cy.get(checkBoxListArr[i]).should('not.be.checked');
      }
    }

    cy.get(checkBoxListArr[homeCheck]).check({force:true});
    cy.get(checkBoxListArr[homeCheck]).uncheck({force:true});
    //assertions
    for (var i = 0; i < checkBoxListArr.length; i++){
      cy.get(checkBoxListArr[i]).should('not.be.checked');
    }
    cy.get(result).should('not.exist');
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