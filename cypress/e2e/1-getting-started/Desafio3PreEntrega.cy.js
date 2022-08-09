/// <reference types="cypress" />
import { HomePage } from "../../support/Pages/HomePage"
import { Productos } from "../../support/Pages/Productos"
import { LoginPage } from "../../support/Pages/Login"
import { Register } from "../../support/Pages/Register"
import { Shopping } from "../../support/Pages/Shoping"

describe('Desafio 3 pre entrega', () => {


    const homePage = new HomePage();
    const product = new Productos();
    const loginPage = new LoginPage();
    const register = new Register
    const shopping = new Shopping

    let fixtureProductos, fixtureLogin

    before('setear datos ', () => {
        cy.fixture("fixtureLogin").then(data => {
            fixtureLogin = data
        })
        cy.fixture("fixtureProductos").then(dataProducto => {
            fixtureProductos = dataProducto
        })
    });

    beforeEach('Ingresar a la web y loguearse', () => {
        register.urlWeb()
        register.ClickOnRegister()
        loginPage.escribirUsuario(fixtureLogin.username)
        loginPage.escribirPassword(fixtureLogin.password)
        loginPage.clickLoginBoton();
        homePage.clickOnlineshoplink()
    })

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
        shopping.Precios2Productos('have.text', fixtureProductos.PrecioPrenda1 + fixtureProductos.PrecioPrenda2)
       
    })
})