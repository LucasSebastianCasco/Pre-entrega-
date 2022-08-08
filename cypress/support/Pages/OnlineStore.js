/// <reference types="cypress" />

export class OnlineStore {

    agregarProductoAlCarrito(producto){
        cy.get(`[value="${producto}"]`).click()
    }
}

