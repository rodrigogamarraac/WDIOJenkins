import Page from './page.js'

class LoginPage extends Page {
    get inputUsuario() {
        return $('#login-username')
    }

    get inputContrasena() {
        return $('#login-password')
    }

    get botonIngresar() {
        return $('#btn-login')
    }

    get enlaceRegistro() {
        return $('#link-register')
    }

    async open() {
        await super.open('/login')
    }

    async ingresar(usuario, contrasena) {
        await this.inputUsuario.setValue(usuario)
        await this.inputContrasena.setValue(contrasena)
        await this.botonIngresar.click()
    }

    async irARegistro() {
        await this.enlaceRegistro.click()
    }

    async verificarLoginExitoso() {
        await expect(browser).toHaveUrl(
            expect.stringContaining('/catalogo')
        )

        await expect($('h1')).toHaveText('Catálogo')
    }

    async verificarNombreUsuario(nombre) {
        const nombreUsuario = $(
            `//*[normalize-space()="${nombre}"]`
        )

        await expect(nombreUsuario).toBeDisplayed()
    }
}

export default new LoginPage()