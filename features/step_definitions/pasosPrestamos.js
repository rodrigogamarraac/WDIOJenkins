import { When, Then } from '@wdio/cucumber-framework'
import PrestamosPage from '../../pageobjects/prestamosPage.js'
import {
    sumarDias,
    formatearFecha,
    convertirFecha
} from '../../utils/fechas.js'

let libroEnRenovacion
let vencimientoAnterior
let fechaEsperadaRenovacion
let diasEsperadosRenovacion

Then('debería visualizar mis préstamos', async () => {
    await PrestamosPage.verificarCargado()
})

Then(
    'el libro {string} debería tener estado {string}',
    async (libro, estado) => {
        await PrestamosPage.verificarEstado(libro, estado)
    }
)

When('devuelvo el libro {string}', async libro => {
    await PrestamosPage.devolverLibro(libro)
})

Then('debería confirmarse la devolución', async () => {
    await PrestamosPage.dialogoDevolucion.waitForDisplayed({
        reverse: true,
        timeout: 10000
    })
})

Then(
    'el préstamo de {string} debería tener estado {string}',
    async (libro, estado) => {
        await PrestamosPage.verificarEstado(libro, estado)
    }
)

When(
    'selecciono la opción de renovar el libro {string}',
    async libro => {
        libroEnRenovacion = libro

        vencimientoAnterior =
            await PrestamosPage.obtenerFechaVencimiento(libro)

        await PrestamosPage.abrirRenovacion(libro)
    }
)

When(
    'elijo una nueva fecha de vencimiento de {int} días',
    async dias => {
        diasEsperadosRenovacion = dias

        if (!libroEnRenovacion || !vencimientoAnterior) {
            throw new Error(
                'Primero se debe seleccionar un libro para renovar'
            )
        }

        const fechaAnterior =
            convertirFecha(vencimientoAnterior)

        const nuevaFecha =
            sumarDias(fechaAnterior, dias)

        fechaEsperadaRenovacion =
            formatearFecha(nuevaFecha)

        await PrestamosPage.opcionFechaPersonalizada.click()

        await PrestamosPage
            .botonAbrirCalendarioRenovacion
            .click()

        await PrestamosPage
            .calendarioRenovacion
            .waitForDisplayed()

        let opcionFecha = $(
            `#renew-calendar [aria-label="${fechaEsperadaRenovacion}"]`
        )

        /*
         * El calendario selecciona inicialmente una renovación
         * de 14 días. Para 21 días, la fecha puede encontrarse
         * en el mes siguiente.
         */
        if (!(await opcionFecha.isExisting())) {
            if (dias < 14) {
                await PrestamosPage
                    .mesAnteriorRenovacion
                    .click()
            } else {
                await PrestamosPage
                    .mesSiguienteRenovacion
                    .click()
            }

            opcionFecha = $(
                `#renew-calendar [aria-label="${fechaEsperadaRenovacion}"]`
            )
        }

        await opcionFecha.waitForDisplayed()
        await opcionFecha.click()
    }
)

When('confirmo la renovación del préstamo', async () => {
    await PrestamosPage.botonConfirmarRenovacion.click()
})

Then('debería confirmarse la renovación', async () => {
    await PrestamosPage.modalRenovacion.waitForDisplayed({
        reverse: true,
        timeout: 10000
    })
})

Then(
    'debería visualizar la nueva fecha de vencimiento',
    async () => {
        await PrestamosPage.verificarFechaVencimiento(
            libroEnRenovacion,
            fechaEsperadaRenovacion
        )
    }
)

Then(
    'la nueva fecha debería corresponder a una renovación de {int} días',
    async dias => {
        expect(dias).toBe(diasEsperadosRenovacion)

        const fechaAnterior =
            convertirFecha(vencimientoAnterior)

        const fechaActualTexto =
            await PrestamosPage.obtenerFechaVencimiento(
                libroEnRenovacion
            )

        const fechaActual =
            convertirFecha(fechaActualTexto)

        const milisegundosPorDia =
            24 * 60 * 60 * 1000

        const diferenciaDias = Math.round(
            (fechaActual - fechaAnterior) /
            milisegundosPorDia
        )

        expect(diferenciaDias).toBe(dias)
    }
)