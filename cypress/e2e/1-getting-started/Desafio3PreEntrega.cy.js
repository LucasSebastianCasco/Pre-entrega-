/// <reference types="cypress" />

import { Checkout } from "../../support/Pages/Checkout"
import { HomePage } from "../../support/Pages/HomePage"
import { Productos } from "../../support/Pages/Productos"
import { Shopping } from "../../support/Pages/Shoping"


describe('Entrega Final', () => {
    const homePage = new HomePage();
    const product = new Productos();
    const shopping = new Shopping();
    const checkout = new Checkout();

    let fixtureProductos, fixtureModalCheckout

    before('Registrar ', () => {
        var password = 'Hola123!'
        cy.request({
            url:"https://pushing-it-backend.herokuapp.com/api/register",
            method: "POST",
            body:{
                username : Math.random(),
                password: password,
                gender: 'M',
                day: '13',
                month: '12',
                year: '1988'

            }
        }).then((respuesta) =>{
            expect(respuesta.status).equal(200)
        }).then((respuesta) =>{
            cy.request({
               url:"https://pushing-it-backend.herokuapp.com/api/login",
               method: "POST",
               body:{
                username : respuesta.body.newUser.username,
                password: password,
                
                }
            }).then((respuesta )  =>{
                expect(respuesta.status).equal(200)
                localStorage.setItem("token",respuesta.body.token)
                localStorage.setItem("user", respuesta.body.user.username)
              
            })
        })
        cy.fixture("fixtureProductos").then(dataProducto => {
            fixtureProductos = dataProducto
        })
        cy.visit("/")
        homePage.clickOnlineshoplink()

        cy.fixture("fixtureModalCheckout").then(dataCheckout => {
            fixtureModalCheckout = dataCheckout
        })
    });


    it('Agregar 2 productos al carrito y verificar precios', () => {
       
        product.agregarProductoAlCarrito(fixtureProductos.Prenda1)
        product.clickModal()
        product.agregarProductoAlCarrito(fixtureProductos.Prenda2)
        product.clickModal()
        shopping.popupGoToShoppingCar()
        shopping.ShowTotalSuma2Productos()
        shopping.ComparacionProducto(fixtureProductos.Prenda1);
        shopping.ComparacionPrecioProduct(fixtureProductos.Prenda1,fixtureProductos.PrecioPrenda1);
        shopping.ComparacionProducto(fixtureProductos.Prenda2);
        shopping.ComparacionPrecioProduct(fixtureProductos.Prenda2,fixtureProductos.PrecioPrenda2); 
        shopping.Precios2Productos(fixtureProductos.PrecioPrenda1 + fixtureProductos.PrecioPrenda2);
        
        checkout.clickButtonCheckout();
        checkout.IngresarFirstName(fixtureModalCheckout.firstName);
        checkout.IngresarLastName(fixtureModalCheckout.lastName);
        checkout.IngresarCardNumber(fixtureModalCheckout.cardNumber);
        checkout.clickButtonPurchese();
        
        checkout.EsperaProgresbar()
        checkout.ComprarNombre()
        checkout.CompararProductos(fixtureProductos.Prenda1)
        checkout.CompararProductos(fixtureProductos.Prenda2)
        checkout.DigitosCardNumber(fixtureModalCheckout.cardNumber)
        checkout.ValorSumaProductos(fixtureProductos.PrecioPrenda1 + fixtureProductos.PrecioPrenda2)
   

    })
})