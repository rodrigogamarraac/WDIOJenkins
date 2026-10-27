import Page from './page.js'
import { sumarDias, formatearFecha } from '../utils/fechas.js'

class DetalleLibroPage extends Page {
    get titulo() {
        return $('h1')
    }

    get botonPrestar() {
        return $('.book-detail__loan-btn')
    }

    get modalPrestamo() {
        return $('#loan-modal')
    }

    get campoFechaDevolucion() {
        return $('#loan-due-date')
    }

    get botonAbrirCalendario() {
        return $('#btn-open-calendar')
    }

    get calendario() {
        return $('#loan-calendar')
    }

    get mesAnterior() {
        return $('#loan-calendar-prev')
    }

    get mesSiguiente() {
        return $('#loan-calendar-next')
    }

    get cantidadDias() {
        return $('#loan-days-count')
    }

    get botonCancelarPrestamo() {
        return $('#btn-cancel-loan')
    }

    get botonConfirmarPrestamo() {
        return $('#btn-confirm-loan')
    }

    async verificarDetalle(titulo) {
        await expect(this.titulo).toHaveText(titulo)
    }

    async verificarDisponible() {
        const mensajeDisponible = $(
            '//*[contains(normalize-space(), "Disponible para préstamo")]'
        )

        await expect(mensajeDisponible).toBeDisplayed()
        await expect(this.botonPrestar).toBeEnabled()
    }

    async abrirFormularioPrestamo() {
        await this.botonPrestar.click()
        await this.modalPrestamo.waitForDisplayed()
    }

    async seleccionarFechaPrestamo(dias) {
        const fechaEsperada = sumarDias(new Date(), dias)
        const fechaFormateada = formatearFecha(fechaEsperada)

        await this.botonAbrirCalendario.click()
        await this.calendario.waitForDisplayed()

        let opcionFecha = $(
            `#loan-calendar [aria-label="${fechaFormateada}"]`
        )

        
        if (!(await opcionFecha.isExisting())) {
            if (dias < 14) {
                await this.mesAnterior.click()
            } else {
                await this.mesSiguiente.click()
            }

            opcionFecha = $(
                `#loan-calendar [aria-label="${fechaFormateada}"]`
            )
        }

        await opcionFecha.waitForDisplayed()
        await opcionFecha.click()

        await expect(this.cantidadDias).toHaveText(`${dias} días`)

        return fechaFormateada
    }

    async prestarPorDias(dias) {
        await this.abrirFormularioPrestamo()

        const fechaEsperada =
            await this.seleccionarFechaPrestamo(dias)

        await this.botonConfirmarPrestamo.click()

        return fechaEsperada
    }
}

export default new DetalleLibroPage()