import { Given, When, Then } from '@wdio/cucumber-framework'
import LoginPage from '../../pageobjects/loginPage.js'

Given('estoy en la página de inicio de sesión', async () => {
    await LoginPage.open()
})

When(
    'ingreso el usuario {string} y la contraseña {string}',
    async (usuario, contrasena) => {
        await LoginPage.ingresar(usuario, contrasena)
    }
)

Then('debería acceder al catálogo', async () => {
    await LoginPage.verificarLoginExitoso()
})

Then(
    'debería visualizar el nombre {string}',
    async nombre => {
        await LoginPage.verificarNombreUsuario(nombre)
    }
)