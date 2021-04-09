/// <reference types="cypress" />

const {homeLocators, elementListLocators} = require('../plugins/locators.js');
const {elementsLoc} = homeLocators;
const {webTableLoc} = elementListLocators;

var addRowBtn = '#addNewRecordButton';
var searchBar = '#searchBox';

var table = '.rt-table';
var rowLoc = 'div.rt-tr-group:nth-child('; //followed by number, then rowLocEnd
var rowLocEnd = ') div:nth-child(1)';
var cellLoc = ' div:nth-child('; //followed by number, then ')'
var editBtn = '#edit-record-'; //follow by number of row
var deleteBtn = '#delete-record-'; //follow by number of row

var prevBtn = '.-previous button:nth-child(1)';
var nextBtn = '.-next button:nth-child(1)';
var pageJump = '.-pageJump input:nth-child(1)';
var totalPages = '.-totalPages';
var dropDown = '.select-wrap select';

var userForm = '#userForm'
var formFirstName = '#firstName'; //slightly longer than actual variable, but no ambiguity
var formLastName = '#lastName'; //which I think is important considering the fields of the table
var formEmail = '#userEmail';
var formAge = '#age';
var formSalary = '#salary';
var formDepartment = '#department';
var submit = '#submit';
var close = '.close';

context('Actions', () => {
  before(() =>{
    cy.visit('');
  });

  beforeEach(() => {
    cy.goHome();
    cy.goToPage(elementsLoc, webTableLoc);
  });

  it("tests the table page's starting state", () => {
    //assertions
    cy.get(addRowBtn).should('be.visible').and('not.be.disabled');
    cy.get(searchBar).should('be.visible');
    cy.get(table).should('be.visible');
    testRowContents(1, 'Cierra', 'Vega', 39, 'cierra@example.com', 10000, 'Insurance');
    testRowContents(2, 'Alden', 'Cantrell', 45, 'alden@example.com', 12000, 'Compliance');
    testRowContents(3, 'Kierra', 'Gentry', 29, 'kierra@example.com', 2000, 'Legal');
    cy.get(buildRowStr(4)).should('have.class', '-padRow');
    cy.get(prevBtn).should('be.visible').and('be.disabled');
    cy.get(nextBtn).should('be.visible').and('be.disabled');
    cy.get(totalPages).invoke('text').then((text) => { expect(text.trim()).equal('1') });
    cy.get(pageJump).should('be.visible').and('have.value', 1); 
    cy.get(dropDown).should('be.visible');
    cy.get(dropDown + ' option[value="10"]').should('be.selected');

    cy.get(addRowBtn).click();
    //assertions
    cy.get(formFirstName).should('be.visible');
    cy.get(formLastName).should('be.visible');
    cy.get(formEmail).should('be.visible');
    cy.get(formAge).should('be.visible');
    cy.get(formSalary).should('be.visible');
    cy.get(formDepartment).should('be.visible');
    cy.get(submit).should('be.visible');
    cy.get(close).should('be.visible');
    cy.get(close).click();
  })

  it("tests the user form", () => {
    fillRegistration('', '', '', '', '', '');
    //assertions
    cy.get(userForm).should('be.visible').and('have.class', 'was-validated');

    fillRegistration('a', 'a', 'a', '1', '1', 'a', false);
    //assertions
    cy.get(userForm).should('be.visible').and('have.class', 'was-validated');

    fillRegistration('', '', '@a.aa', '', '', '', false);
    //assertions
    testRowContents(4, 'a', 'a', 1, 'a@a.aa', 1, 'a');
  })

  it("tests the edit and delete functions", () => {
    cy.get(deleteBtn+'2').click();
    //assertions
    testRowContents(2, 'Kierra', 'Gentry', 29, 'kierra@example.com', 2000, 'Legal');

    editRegistration(1, '', '', '', '', '', '', true);
    //assertions
    cy.get(userForm).should('be.visible').and('have.class', 'was-validated');
    cy.get(close).click();
    testRowContents(1, 'Cierra', 'Vega', 39, 'cierra@example.com', 10000, 'Insurance');

    editRegistration(1, 'a', '', '{backspace}', '', '0', '');
    //assertions
    testRowContents(1, 'a', 'Vega', 39, 'cierra@example.co', 100000, 'Insurance');
  })

  it("tests the rows per page function", () => {
    for (var i=0; i < 2; i++) fillRegistration('a', 'a', 'a@a.aa', '1', '1', 'a');
    for (var i=0; i < 2; i++) fillRegistration('b', 'b', 'b@b.bb', '2', '2', 'b');
    cy.get(dropDown).select('5');
    cy.get(nextBtn).click();
    //assertions
    cy.get(totalPages).invoke('text').then((text) => { expect(text.trim()).equal('2') });
    testRowContents(2, 'b', 'b', 2, 'b@b.bb', 2, 'b');
    cy.get(nextBtn).should('be.disabled');

    cy.get(dropDown).select('10');
    //assertions
    cy.get(totalPages).invoke('text').then((text) => { expect(text.trim()).equal('1') });
    testRowContents(2, 'Alden', 'Cantrell', 45, 'alden@example.com', 12000, 'Compliance');
    testRowContents(7, 'b', 'b', 2, 'b@b.bb', 2, 'b');
    cy.get(buildRowStr(9)).should('have.class', '-padRow');
    cy.get(prevBtn).should('be.disabled');
    cy.get(nextBtn).should('be.disabled');

    cy.get(dropDown).select('5');
    for (var i=2; i < 6; i++) cy.get(deleteBtn+i.toString()).click(); //deleting a row does not reassign the IDs of the other edit or delete buttons
    //assertions
    testRowContents(2, 'b', 'b', 2, 'b@b.bb', 2, 'b');
    cy.get(totalPages).invoke('text').then((text) => { expect(text.trim()).equal('1') });
    cy.get(pageJump).should('be.visible').and('have.value', 1);
  })
})

function buildRowStr (rowNum){
  return rowLoc + rowNum.toString() + rowLocEnd;
}

function buildCellStr (rowNum, cellNum){
  return buildRowStr(rowNum) + cellLoc + cellNum.toString() + ')';
}

function testRowContents (rowNum, firstName, lastName, age, email, salary, department){
  cy.get (buildCellStr(rowNum, 1)).should('contain.text', firstName);
  cy.get (buildCellStr(rowNum, 2)).should('contain.text', lastName);
  cy.get (buildCellStr(rowNum, 3)).should('contain.text', age);
  cy.get (buildCellStr(rowNum, 4)).should('contain.text', email);
  cy.get (buildCellStr(rowNum, 5)).should('contain.text', salary);
  cy.get (buildCellStr(rowNum, 6)).should('contain.text', department);
  cy.get (buildCellStr(rowNum, 7)).should('be.visible');
}

function fillRegistration (firstName, lastName, email, age, salary, department, btnClick = true){
  if (btnClick) cy.get(addRowBtn).click();

  if (firstName != "") cy.get(formFirstName).type(firstName);
  if (lastName != "") cy.get(formLastName).type(lastName);
  if (email != "") cy.get(formEmail).type(email);
  if (age != "") cy.get(formAge).type(age);
  if (salary != "") cy.get(formSalary).type(salary);
  if (department != "") cy.get(formDepartment).type(department);

  cy.get(submit).click();
}

function editRegistration (btnNum, firstName, lastName, email, age, salary, department, 
                          firstNameClear=false, lastNameClear=false, emailClear=false, ageClear=false, salaryClear=false, departmentClear=false){
  cy.get(editBtn + btnNum.toString()).click();

  if (firstNameClear) cy.get(formFirstName).clear();
  if (lastNameClear) cy.get(formLastName).clear();
  if (emailClear) cy.get(formEmail).clear();
  if (ageClear) cy.get(formAge).clear();
  if (salaryClear) cy.get(formSalary).clear();
  if (departmentClear) cy.get(formDepartment).clear();

  if (firstName != "") cy.get(formFirstName).type(firstName);
  if (lastName != "") cy.get(formLastName).type(lastName);
  if (email != "") cy.get(formEmail).type(email);
  if (age != "") cy.get(formAge).type(age);
  if (salary != "") cy.get(formSalary).type(salary);
  if (department != "") cy.get(formDepartment).type(department);

  cy.get(submit).click();
}