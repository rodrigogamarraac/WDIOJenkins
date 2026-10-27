@inciso3
Feature: Registro y préstamo de un libro por 6 días
    Como nuevo usuario
    Quiero crear una cuenta
    Para solicitar un libro prestado durante 6 días

    Scenario: Registrar un usuario y prestar un libro por 6 días
        Given estoy en la página de registro
        When registro un nuevo usuario con los siguientes datos:
            | nombre               | correo                              | usuario    | contraseña | tipo       |
            | Usuario Automatizado | usuario.automatizado@example.com | usuarioqa | Clave123! | Estudiante |
        Then debería registrarse el nuevo usuario correctamente
        When inicio sesión con el usuario recién registrado
        Then debería acceder al catálogo
        When busco el libro "Cosmos"
        And abro el detalle del libro "Cosmos"
        Then debería visualizar el detalle de "Cosmos"
        And debería visualizar que el libro está disponible
        When solicito el préstamo del libro por 6 días
        Then debería confirmarse el préstamo
        And el libro "Cosmos" debería aparecer en Mis préstamos
        And debería tener un plazo de 6 días