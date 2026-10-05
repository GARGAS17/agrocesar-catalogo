import { html, useState, useEffect } from 'https://unpkg.com/htm/preact/standalone.module.js';

export function Catalogo({ bffUrl }) {
  const [productos, setProductos] = useState([
    { 
      id: 1, 
      nombre: 'Saco de Papa Pastusa', 
      precio: 45000, 
      productor: 'Finca El Sol',
      categoria: 'Tubérculos',
      imagen: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600&auto=format&fit=crop'
    },
    { 
      id: 2, 
      nombre: 'Canasta de Tomates', 
      precio: 12000, 
      productor: 'Granja Verde',
      categoria: 'Hortalizas',
      imagen: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=600&q=80'
    },
    { 
      id: 3, 
      nombre: 'Plátano Hartón', 
      precio: 25000, 
      productor: 'Finca La Esperanza',
      categoria: 'Frutas',
      imagen: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=600&auto=format&fit=crop'
    }
  ]);

  useEffect(() => {
    const handleNuevoProducto = (event) => {
      console.log("[Catálogo] Detectado nuevo producto publicado:", event.detail);
      setProductos(prev => [...prev, event.detail]);
    };
    window.addEventListener('producto:publicado', handleNuevoProducto);
    return () => window.removeEventListener('producto:publicado', handleNuevoProducto);
  }, []);

  const agregarAlCarrito = (producto) => {
    const evento = new CustomEvent('carrito:agregado', {
      detail: { idProducto: producto.id, cantidad: 1, nombre: producto.nombre, precio: producto.precio }
    });
    window.dispatchEvent(evento);
    
    // Alerta estilizada simulada
    const toast = document.createElement('div');
    toast.textContent = `🛒 ${producto.nombre} agregado`;
    Object.assign(toast.style, {
      position: 'fixed', bottom: '20px', right: '20px', background: '#10b981', color: 'white',
      padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      transition: 'opacity 0.3s', zIndex: 9999
    });
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2500);
  };

  // SVG Icons
  const iconFarm = html`<svg viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.83L19.17 12H17v6H7v-6H4.83L12 4.83z"/></svg>`;
  const iconAdd = html`<svg viewBox="0 0 24 24"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z"/></svg>`;

  return html`
    <div class="agro-cat-wrapper">
      <div class="agro-cat-header">
        <h1 class="agro-cat-title">AgroCesar Marketplace</h1>
        <p class="agro-cat-subtitle">Del campo a tu mesa, sin intermediarios.</p>
      </div>
      
      <div class="agro-cat-grid">
        ${productos.map(p => html`
          <div class="agro-cat-card" key=${p.id}>
            <div class="agro-cat-image-container">
              <img class="agro-cat-image" src=${p.imagen} alt=${p.nombre} loading="lazy" />
            </div>
            
            <div class="agro-cat-content">
              <span class="agro-cat-tag">${p.categoria}</span>
              <h3 class="agro-cat-name">${p.nombre}</h3>
              
              <div class="agro-cat-producer">
                ${iconFarm}
                <span>${p.productor}</span>
              </div>
              
              <div class="agro-cat-footer">
                <div class="agro-cat-price-wrapper">
                  <span class="agro-cat-price-label">Precio</span>
                  <span class="agro-cat-price">$${p.precio.toLocaleString('es-CO')}</span>
                </div>
                
                <button class="agro-cat-btn" aria-label="Agregar al carrito" onClick=${() => agregarAlCarrito(p)}>
                  ${iconAdd}
                </button>
              </div>
            </div>
          </div>
        `)}
      </div>
    </div>
  `;
}
