import { Given } from '@wdio/cucumber-framework'
import LoginPage from '../../pageobjects/loginPage.js'
import CatalogoPage from '../../pageobjects/catalogoPage.js'
import PrestamosPage from '../../pageobjects/prestamosPage.js'

Given(
    'inicié sesión con el usuario {string} y la contraseña {string}',
    async (usuario, contrasena) => {
        await LoginPage.open()
        await LoginPage.ingresar(usuario, contrasena)
        await CatalogoPage.verificarCargado()
    }
)

Given('ingresé a la sección Mis préstamos', async () => {
    await CatalogoPage.irAMisPrestamos()
    await PrestamosPage.verificarCargado()
})