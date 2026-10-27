import { When, Then } from '@wdio/cucumber-framework'
import CatalogoPage from '../../pageobjects/catalogoPage.js'
import DetalleLibroPage from '../../pageobjects/detalleLibroPage.js'
import PrestamosPage from '../../pageobjects/prestamosPage.js'

let ultimoLibroSeleccionado
let fechaEsperadaPrestamo
let plazoEsperadoPrestamo

When('busco el libro {string}', async titulo => {
    ultimoLibroSeleccionado = titulo

    await CatalogoPage.buscarLibro(titulo)
    await CatalogoPage.verificarLibroVisible(titulo)
})

When('abro el detalle del libro {string}', async titulo => {
    ultimoLibroSeleccionado = titulo
    await CatalogoPage.abrirDetalle(titulo)
})

Then(
    'debería visualizar el detalle de {string}',
    async titulo => {
        await DetalleLibroPage.verificarDetalle(titulo)
    }
)

Then(
    'debería visualizar que el libro está disponible',
    async () => {
        await DetalleLibroPage.verificarDisponible()
    }
)

When(
    'solicito el préstamo del libro por {int} días',
    async dias => {
        plazoEsperadoPrestamo = dias

        fechaEsperadaPrestamo =
            await DetalleLibroPage.prestarPorDias(dias)
    }
)

Then('debería confirmarse el préstamo', async () => {
    await DetalleLibroPage.modalPrestamo.waitForDisplayed({
        reverse: true,
        timeout: 10000
    })
})

Then(
    'el libro {string} debería aparecer en Mis préstamos',
    async libro => {
        ultimoLibroSeleccionado = libro

        const urlActual = await browser.getUrl()

        if (!urlActual.includes('/mis-prestamos')) {
            await CatalogoPage.irAMisPrestamos()
        }

        await PrestamosPage.verificarCargado()
        await PrestamosPage.verificarLibroVisible(libro)
    }
)

Then(
    'debería tener un plazo de {int} días',
    async dias => {
        expect(dias).toBe(plazoEsperadoPrestamo)

        await PrestamosPage.verificarFechaVencimiento(
            ultimoLibroSeleccionado,
            fechaEsperadaPrestamo
        )
    }
)