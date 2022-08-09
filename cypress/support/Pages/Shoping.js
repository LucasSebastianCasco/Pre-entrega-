/// <reference types="cypress" />


export class Shopping{


    ComparacionProducto(product){
        cy.get(`[name='${product}']`).should('have.text', product)
    }

    ComparacionPrecioProduct(product,precio){
        cy.xpath(`//*[@name='${product}']`).siblings('#productPrice').should('have.text',`$${precio}`)
    }

    Precios2Productos(){
        cy.get("#price")
    }

    popupGoToShoppingCar(){
        cy.contains("Go to shopping cart").click()
    }

    ShowTotalSuma2Productos(){
        cy.contains("Show total price").click()
    }




}