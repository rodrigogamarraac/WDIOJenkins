export function sumarDias(fecha, dias) {
    const resultado = new Date(fecha)

    resultado.setHours(12, 0, 0, 0)
    resultado.setDate(resultado.getDate() + dias)

    return resultado
}

export function formatearFecha(fecha) {
    const dia = String(fecha.getDate()).padStart(2, '0')
    const mes = String(fecha.getMonth() + 1).padStart(2, '0')
    const anio = fecha.getFullYear()

    return `${dia}/${mes}/${anio}`
}

export function convertirFecha(fechaTexto) {
    const [dia, mes, anio] = fechaTexto
        .split('/')
        .map(Number)

    return new Date(anio, mes - 1, dia, 12, 0, 0)
}