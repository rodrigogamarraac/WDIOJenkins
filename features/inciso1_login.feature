@inciso1
Feature: Inicio de sesión en Biblioteca QA
    Como usuario registrado
    Quiero iniciar sesión
    Para acceder al catálogo de libros

    Scenario: Iniciar sesión correctamente
        Given estoy en la página de inicio de sesión
        When ingreso el usuario "jperez" y la contraseña "Lector123!"
        Then debería acceder al catálogo
        And debería visualizar el nombre "Juan Pérez"