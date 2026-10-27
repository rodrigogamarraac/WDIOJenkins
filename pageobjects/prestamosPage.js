import Page from './page.js'
import {
    sumarDias,
    formatearFecha,
    convertirFecha
} from '../utils/fechas.js'

class PrestamosPage extends Page {
    get titulo() {
        return $('h1')
    }

    get opcionFechaPersonalizada() {
        return $('#renew-mode-custom')
    }

    get modalRenovacion() {
        return $('#renew-modal')
    }

    get botonAbrirCalendarioRenovacion() {
        return $('#btn-open-renew-calendar')
    }

    get calendarioRenovacion() {
        return $('#renew-calendar')
    }

    get mesAnteriorRenovacion() {
        return $('#renew-calendar-prev')
    }

    get mesSiguienteRenovacion() {
        return $('#renew-calendar-next')
    }

    get botonConfirmarRenovacion() {
        return $('#btn-confirm-renew')
    }

    get dialogoDevolucion() {
        return $('#return-dialog')
    }

    get botonConfirmarDevolucion() {
        return $('#return-dialog-accept')
    }

    filaPrestamo(libro) {
        return $(
            `//tr[td[2][normalize-space()="${libro}"]]`
        )
    }

    async open() {
        await super.open('/mis-prestamos')
    }

    async verificarCargado() {
        await expect(browser).toHaveUrl(
            expect.stringContaining('/mis-prestamos')
        )

        await expect(this.titulo).toHaveText('Mis préstamos')
    }

    async verificarLibroVisible(libro) {
        const fila = await this.filaPrestamo(libro)
        await expect(fila).toBeDisplayed()
    }

    async obtenerFechaVencimiento(libro) {
        const fila = await this.filaPrestamo(libro)
        const celdas = await fila.$$('td')

        return await celdas[3].getText()
    }

    async verificarEstado(libro, estado) {
        const fila = await this.filaPrestamo(libro)
        await expect(fila).toHaveText(
            expect.stringContaining(estado)
        )
    }

    async devolverLibro(libro) {
        const fila = await this.filaPrestamo(libro)

        const botonDevolver = await fila.$(
            './/button[normalize-space()="Devolver"]'
        )

        await botonDevolver.click()
        await this.dialogoDevolucion.waitForDisplayed()
        await this.botonConfirmarDevolucion.click()
    }

    async abrirRenovacion(libro) {
        const fila = await this.filaPrestamo(libro)

        const botonRenovar = await fila.$(
            './/button[normalize-space()="Renovar"]'
        )

        await botonRenovar.click()
        await this.modalRenovacion.waitForDisplayed()
    }

    async renovarPorDias(libro, dias) {
        const vencimientoActual =
            await this.obtenerFechaVencimiento(libro)

        const fechaActual = convertirFecha(vencimientoActual)
        const fechaEsperada = sumarDias(fechaActual, dias)
        const fechaFormateada = formatearFecha(fechaEsperada)

        await this.abrirRenovacion(libro)
        await this.opcionFechaPersonalizada.click()
        await this.botonAbrirCalendarioRenovacion.click()
        await this.calendarioRenovacion.waitForDisplayed()

        let opcionFecha = $(
            `#renew-calendar [aria-label="${fechaFormateada}"]`
        )

        /*
         * La renovación selecciona 14 días inicialmente.
         * Para 21 días puede ser necesario avanzar un mes.
         */
        if (!(await opcionFecha.isExisting())) {
            if (dias < 14) {
                await this.mesAnteriorRenovacion.click()
            } else {
                await this.mesSiguienteRenovacion.click()
            }

            opcionFecha = $(
                `#renew-calendar [aria-label="${fechaFormateada}"]`
            )
        }

        await opcionFecha.waitForDisplayed()
        await opcionFecha.click()
        await this.botonConfirmarRenovacion.click()

        return fechaFormateada
    }

    async verificarFechaVencimiento(libro, fechaEsperada) {
        const fechaActual =
            await this.obtenerFechaVencimiento(libro)

        expect(fechaActual).toBe(fechaEsperada)
    }
}

export default new PrestamosPage()