import Page from './page.js'

class RegistroPage extends Page {
    get inputNombreCompleto() {
        return $('[name="fullName"]')
    }

    get inputCorreo() {
        return $('[name="email"]')
    }

    get inputUsuario() {
        return $('[name="username"]')
    }

    get inputContrasena() {
        return $('[name="password"]')
    }

    get inputConfirmarContrasena() {
        return $('[name="confirmPassword"]')
    }

    get selectTipoUsuario() {
        return $('[name="userType"]')
    }

    get checkboxTerminos() {
        return $('[name="acceptTerms"]')
    }

    get botonCrearCuenta() {
        return $('[name="btnRegister"]')
    }

    async open() {
        await super.open('/registro')
    }

    async registrarUsuario(datos) {
        await this.inputNombreCompleto.setValue(datos.nombre)
        await this.inputCorreo.setValue(datos.correo)
        await this.inputUsuario.setValue(datos.usuario)
        await this.inputContrasena.setValue(datos.contrasena)
        await this.inputConfirmarContrasena.setValue(
            datos.contrasena
        )

        await this.selectTipoUsuario.selectByVisibleText(datos.tipo)

        if (!(await this.checkboxTerminos.isSelected())) {
            await this.checkboxTerminos.click()
        }

        await this.botonCrearCuenta.click()
    }

    async verificarRegistroExitoso() {
        await browser.waitUntil(
            async () => {
                const url = await browser.getUrl()
                return url.includes('/login') ||
                    url.includes('/catalogo')
            },
            {
                timeout: 10000,
                timeoutMsg:
                    'El registro no redirigió al login o al catálogo'
            }
        )
    }
}

export default new RegistroPage()