# Automatización E2E de SauceDemo

Proyecto de pruebas funcionales con WebdriverIO, Page Object Model, Cucumber y Allure.

## Cobertura

- Login exitoso, usuarios especiales, usuario bloqueado y validaciones de credenciales.
- Inventario, detalle, ordenamiento, agregar/quitar productos y enlaces del pie.
- Carrito vacío, múltiples productos, eliminación y continuidad de navegación.
- Checkout: campos requeridos, cancelaciones, resumen, cálculos y compra completa.
- Menú lateral: apertura/cierre, navegación, reset y logout.

## Ejecución

```bash
npm install
npm test
npm run test:smoke
npm run test:regression
npm run test:edge
npm run test:crossbrowser
npm run test:headless
```

Para filtrar cualquier conjunto de tags en PowerShell:

```powershell
$env:TAGS='@checkout and not @negative'; npm run wdio
```

## Reporte Allure

```bash
npm run allure:generate
npm run allure:open
```

Los resultados se crean en `allure-results`, el reporte HTML en `allure-report` y cada escenario fallido adjunta una captura de pantalla.
