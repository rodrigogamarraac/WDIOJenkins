@inciso2
Feature: Préstamo de un libro por 18 días
    Como usuario registrado
    Quiero revisar el detalle de un libro
    Para solicitarlo prestado durante 18 días

    Background:
        Given inicié sesión con el usuario "jperez" y la contraseña "Lector123!"

    Scenario: Consultar el detalle y prestar un libro por 18 días
        When busco el libro "Clean Code"
        And abro el detalle del libro "Clean Code"
        Then debería visualizar el detalle de "Clean Code"
        And debería visualizar que el libro está disponible
        When solicito el préstamo del libro por 18 días
        Then debería confirmarse el préstamo
        And el libro "Clean Code" debería aparecer en Mis préstamos
        And debería tener un plazo de 18 días