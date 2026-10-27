import { Given, When, Then } from '@wdio/cucumber-framework'
import RegistroPage from '../../pageobjects/registroPage.js'
import LoginPage from '../../pageobjects/loginPage.js'

let usuarioRegistrado

Given('estoy en la página de registro', async () => {
    await RegistroPage.open()
})

When(
    'registro un nuevo usuario con los siguientes datos:',
    async tabla => {
        const fila = tabla.hashes()[0]

        usuarioRegistrado = {
            nombre: fila.nombre,
            correo: fila.correo,
            usuario: fila.usuario,
            contrasena: fila['contraseña'],
            tipo: fila.tipo
        }

        await RegistroPage.registrarUsuario(usuarioRegistrado)
    }
)

Then(
    'debería registrarse el nuevo usuario correctamente',
    async () => {
        await RegistroPage.verificarRegistroExitoso()
    }
)

When(
    'inicio sesión con el usuario recién registrado',
    async () => {
        if (!usuarioRegistrado) {
            throw new Error(
                'No existen datos del usuario registrado'
            )
        }

        const urlActual = await browser.getUrl()

        /*
         * Si el registro inicia la sesión automáticamente,
         * no es necesario volver a ingresar credenciales.
         */
        if (urlActual.includes('/catalogo')) {
            return
        }

        if (!urlActual.includes('/login')) {
            await LoginPage.open()
        }

        await LoginPage.ingresar(
            usuarioRegistrado.usuario,
            usuarioRegistrado.contrasena
        )
    }
)