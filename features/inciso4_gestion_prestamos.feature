@inciso4
Feature: Administración de préstamos
    Como usuario con préstamos activos
    Quiero devolver y renovar libros
    Para administrar correctamente mis préstamos

    Background:
        Given inicié sesión con el usuario "jperez" y la contraseña "Lector123!"
        And ingresé a la sección Mis préstamos

    @devolucion
    Scenario: Devolver un libro activo
        Then debería visualizar mis préstamos
        And el libro "Cien años de soledad" debería tener estado "Activo"
        When devuelvo el libro "Cien años de soledad"
        Then debería confirmarse la devolución
        And el préstamo de "Cien años de soledad" debería tener estado "Devuelto"

    @renovacion
    Scenario: Renovar un libro eligiendo una fecha de 21 días
        Then debería visualizar mis préstamos
        And el libro "Cien años de soledad" debería tener estado "Activo"
        When selecciono la opción de renovar el libro "Cien años de soledad"
        And elijo una nueva fecha de vencimiento de 21 días
        And confirmo la renovación del préstamo
        Then debería confirmarse la renovación
        And debería visualizar la nueva fecha de vencimiento
        And la nueva fecha debería corresponder a una renovación de 21 días

