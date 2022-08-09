/// <reference types="cypress" />

export class Productos {

    agregarProductoAlCarrito(producto){
        cy.get(`[value="${producto}"]`).click()
    }

    clickModal(){
        cy.get('#closeModal').click()
    }
}

