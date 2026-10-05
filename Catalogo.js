import { html, useState, useEffect } from 'https://unpkg.com/htm/preact/standalone.module.js';

export function Catalogo({ bffUrl }) {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Saco de Papa Pastusa', precio: 45000, productor: 'Finca El Sol' },
    { id: 2, nombre: 'Canasta de Tomates', precio: 12000, productor: 'Granja Verde' },
    { id: 3, nombre: 'Plátano Hartón', precio: 25000, productor: 'Finca La Esperanza' }
  ]);

  // 1. ESCUCHAR EL EVENTO DE ANDERSON (Operaciones)
  useEffect(() => {
    const handleNuevoProducto = (event) => {
      console.log("[Catálogo] Detectado nuevo producto publicado:", event.detail);
      setProductos(prev => [...prev, event.detail]);
    };
    window.addEventListener('producto:publicado', handleNuevoProducto);
    
    // Cleanup del listener al desmontar
    return () => window.removeEventListener('producto:publicado', handleNuevoProducto);
  }, []);

  // 2. EMITIR EVENTO AL CARRITO (Logística)
  const agregarAlCarrito = (producto) => {
    const evento = new CustomEvent('carrito:agregado', {
      detail: { idProducto: producto.id, cantidad: 1, nombre: producto.nombre, precio: producto.precio }
    });
    window.dispatchEvent(evento);
    console.log(`[Catálogo] Evento 'carrito:agregado' emitido para el producto:`, producto);
    
    alert(`Se emitió el evento para agregar ${producto.nombre} al carrito.`);
  };

  return html`
    <div class="agro-cat-container">
      <h2 style="color: var(--agro-primario)">Catálogo de la Región</h2>
      <p style="color: #666; font-size: 0.9em;">(Preact corriendo sin Webpack vía CDN)</p>
      
      <div class="agro-cat-grid">
        ${productos.map(p => html`
          <div class="agro-cat-card" key=${p.id}>
            <h3>${p.nombre}</h3>
            <p class="agro-cat-precio">$${p.precio}</p>
            <p><small>Por: ${p.productor}</small></p>
            <button class="agro-cat-btn" onClick=${() => agregarAlCarrito(p)}>
              Agregar al Carrito
            </button>
          </div>
        `)}
      </div>
    </div>
  `;
}
