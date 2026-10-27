import Page from './page.js'

class CatalogoPage extends Page {
    get titulo() {
        return $('h1')
    }

    get buscador() {
        return $('#catalog-search')
    }

    get enlaceMisPrestamos() {
        return $('#nav-loans')
    }

    get botonCerrarSesion() {
        return $('#btn-logout')
    }

    get cantidadResultados() {
        return $('.results-count')
    }

    filaLibro(titulo) {
        return $(
            `//tr[td[1][normalize-space()="${titulo}"]]`
        )
    }

    async open() {
        await super.open('/catalogo')
    }

    async verificarCargado() {
        await expect(browser).toHaveUrl(
            expect.stringContaining('/catalogo')
        )

        await expect(this.titulo).toHaveText('Catálogo')
    }

    async buscarLibro(titulo) {
        await this.buscador.waitForDisplayed()
        await this.buscador.setValue(titulo)

        const fila = await this.filaLibro(titulo)
        await fila.waitForDisplayed()
    }

    async verificarLibroVisible(titulo) {
        const fila = await this.filaLibro(titulo)
        await expect(fila).toBeDisplayed()
    }

    async abrirDetalle(titulo) {
        const fila = await this.filaLibro(titulo)
        await fila.waitForDisplayed()

        const enlaceDetalle = await fila.$('a')
        await enlaceDetalle.click()
    }

    async irAMisPrestamos() {
        await this.enlaceMisPrestamos.click()
    }
}

export default new CatalogoPage()