/// <reference types="cypress" />

export class HomePage {

constructor() {
    this.onlineshoplink = "#onlineshoplink"
}
clickOnlineshoplink(){
    cy.get(this.onlineshoplink).click();
};

}