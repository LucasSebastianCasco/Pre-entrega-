/// <reference types="cypress" />
import { HomePage } from "../../support/Pages/HomePage"
import { OnlineStore } from "../../support/Pages/OnlineStore"

describe ('Desafio 3 pre entrega',()=>{
    let fixtureLogin
    let fixtureProductos
    const homePage = new HomePage();
    const onlineStore = new OnlineStore();

    before ('login ',()=>{
        cy.fixture("fixtureLogin").then(function(data){
            fixtureLogin= data
        }) 
        cy.fixture("fixtureProductos").then(function(dataProducto){
            fixtureProductos= dataProducto
        })    
    });

    beforeEach('Ingresar a la web y loguearse',()=>{
        cy.visit("/")
        cy.get('#registertoggle').dblclick()
        cy.get('#user').type(fixtureLogin.username)
        cy.get('#pass').type(fixtureLogin.password)
        cy.get('.chakra-button').click()
        homePage.clickOnlineshoplink()
    })

    it('Probando it que ande',() =>{
        onlineStore.agregarProductoAlCarrito(fixtureProductos.Prenda1)
        cy.get('#closeModal').click()
        onlineStore.agregarProductoAlCarrito(fixtureProductos.Prenda2)
        cy.get('#closeModal').click()
        cy.contains("Go to shopping cart").click()
        cy.contains("Show total price").click()
        cy.get("#price").should('have.text',fixtureProductos.PrecioPrenda1 + fixtureProductos.PrecioPrenda2)
        cy.log('anda')
    })
})