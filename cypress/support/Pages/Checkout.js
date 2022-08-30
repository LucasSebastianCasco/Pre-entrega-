/// <reference types="cypress" />

export class Checkout{
    
    constructor(){
        this.firstName='#FirstName'
        this.lastName= '#lastName'
        this.cardNumber='#cardNumber'
    }

    clickButtonCheckout (){
        cy.get(".css-641vkz").click()
    }

    IngresarFirstName(first){
        cy.get(this.firstName).type(first)
    }

    IngresarLastName(lastName){
        cy.get(this.lastName).type(lastName)
    }

    IngresarCardNumber(cardNumber){
        cy.get(this.cardNumber).type(cardNumber)
    }

    clickButtonPurchese(){
        cy.get('.css-13zsa').click()
    }

    EsperaProgresbar(){
        cy.get("[role='progressbar']",{timeout:11000}).should("not.exist")
    }
    
    
    ComprarNombre(){
        cy.get('#name').should('have.text','Lucas Casco has succesfully purchased the following items')

    }
    CompararProductos(products){ //agregar parametro producto ver en shoping---no funca  
        cy.get(`[id='${products}']`).should('have.text', products)
    }

    DigitosCardNumber(cardNumber){// agregar el parametro numero de tarjeta y la asercion
        cy.get("[id='creditCard']").invoke("text").should('have.length', '16')
        cy.get("[id='creditCard']").invoke("text").should('contain', cardNumber)
    }

    ValorSumaProductos(precio){
        cy.get("[id='totalPrice']").should('include.text',precio)
    }  
}