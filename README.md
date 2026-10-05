# MFE Catálogo - AgroCesar Marketplace

Este es el Micro Frontend encargado del **Descubrimiento y Búsqueda de Productos** desarrollado por **Camilo Andrés Santana Ortiz**.

## Requisitos Oficiales Cumplidos (Actividad 2)
- **Repositorio Separado:** Sí.
- **Heterogeneidad Tecnológica:** Construido en **Preact** sin dependencias instaladas en node_modules.
- **Contratos:** Expone `mountAgroCatalogo` y `unmountAgroCatalogo`. Emite el evento `carrito:agregado` y escucha `producto:publicado`.
- **Prueba Automática:** Cuenta con `contrato.html` para probar montaje de forma aislada.

## Tecnologías utilizadas
- **Preact** (vía CDN usando HTM) para cumplir el límite estricto de los 200 KB sin usar empaquetadores como Vite o Webpack.
- **ES Modules** nativos.
- **CSS Aislado** usando el prefijo `.agro-cat-`.

## Cómo probar localmente
Como este proyecto usa ES Modules nativos (`<script type="module">`), no puedes abrir el archivo HTML dando doble clic (el navegador lo bloqueará por políticas CORS para archivos locales `file://`).

Debes usar un servidor web local. Si usas Python:
```bash
python -m http.server 8080
```
O usando Node:
```bash
npx serve .
```
Luego abre `http://localhost:8080/index.html` para ver el MFE aislado, o `http://localhost:8080/contrato.html` para correr la batería de validación del contrato.
