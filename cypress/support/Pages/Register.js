/// <reference types="cypress" />

export class Register {

    urlWeb(){
        cy.visit("/")
    }

    ClickOnRegister(){
     
        cy.get('#registertoggle').dblclick()
    }        
}