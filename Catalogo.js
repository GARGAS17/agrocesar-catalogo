import { html, useState, useEffect } from 'https://unpkg.com/htm/preact/standalone.module.js';

// ── Productos iniciales del catálogo ──────────────────────────────────────────
const PRODUCTOS_INICIALES = [
  {
    id: 1, nombre: 'Saco de Papa Pastusa', precio: 45000,
    productor: 'Finca El Sol', categoria: 'Tubérculos',
    cantidad: 120, unidad: 'kg', municipio: 'Pasto',
    imagen: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2, nombre: 'Canasta de Tomates', precio: 12000,
    productor: 'Granja Verde', categoria: 'Hortalizas',
    cantidad: 80, unidad: 'kg', municipio: 'Villa de Leyva',
    imagen: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3, nombre: 'Plátano Hartón', precio: 25000,
    productor: 'Finca La Esperanza', categoria: 'Frutas',
    cantidad: 200, unidad: 'kg', municipio: 'Turbo',
    imagen: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 4, nombre: 'Yuca Costeña Premium', precio: 8500,
    productor: 'Hacienda del Norte', categoria: 'Tubérculos',
    cantidad: 300, unidad: 'kg', municipio: 'Valledupar',
    imagen: 'https://images.unsplash.com/photo-1578020190125-f4f7c18bc9cb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5, nombre: 'Mango Tommy', precio: 6000,
    productor: 'Finca Manguito', categoria: 'Frutas',
    cantidad: 150, unidad: 'Unidad', municipio: 'Fundación',
    imagen: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6, nombre: 'Cebolla Junca', precio: 4500,
    productor: 'Campos Altos', categoria: 'Hortalizas',
    cantidad: 60, unidad: 'kg', municipio: 'Aquitania',
    imagen: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80'
  },
];

const CATEGORIAS = ['Todas', 'Tubérculos', 'Hortalizas', 'Frutas', 'Procesados', 'Granos', 'Hierbas'];

// ── Colores por categoría ─────────────────────────────────────────────────────
const CAT_COLOR = {
  'Tubérculos': { bg: 'rgba(245,158,11,0.12)', color: '#b45309' },
  'Hortalizas': { bg: 'rgba(16,185,129,0.12)', color: '#065f46' },
  'Frutas':     { bg: 'rgba(239,68,68,0.12)',  color: '#991b1b' },
  'Procesados': { bg: 'rgba(99,102,241,0.12)', color: '#3730a3' },
  'Granos':     { bg: 'rgba(234,179,8,0.12)',  color: '#713f12' },
  'Hierbas':    { bg: 'rgba(34,197,94,0.12)',  color: '#14532d' },
};

// ── Componente tarjeta ────────────────────────────────────────────────────────
function ProductCard({ producto, onAgregarCarrito, isNuevo }) {
  const catStyle = CAT_COLOR[producto.categoria] || { bg: 'rgba(100,116,139,0.1)', color: '#334155' };
  const stockBajo = producto.cantidad && producto.cantidad < 50;

  return html`
    <div class=${'agro-cat-card' + (isNuevo ? ' agro-cat-card--nuevo' : '')}>
      <div class="agro-cat-image-container">
        <img class="agro-cat-image" src=${producto.imagen} alt=${producto.nombre} loading="lazy" />
        ${isNuevo && html`<span class="agro-cat-badge-nuevo">✨ Nuevo</span>`}
        ${stockBajo && html`<span class="agro-cat-badge-stock">⚠️ Poco stock</span>`}
      </div>

      <div class="agro-cat-content">
        <span class="agro-cat-tag"
          style=${{ background: catStyle.bg, color: catStyle.color }}>
          ${producto.categoria}
        </span>

        <h3 class="agro-cat-name">${producto.nombre}</h3>

        <div class="agro-cat-producer">
          <svg viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.83L19.17 12H17v6H7v-6H4.83L12 4.83z"/></svg>
          <span>${producto.productor}</span>
        </div>

        <div class="agro-cat-meta">
          ${producto.cantidad != null && html`
            <span class="agro-cat-meta-item">
              📦 ${producto.cantidad} ${producto.unidad || 'unid'}
            </span>
          `}
          ${producto.municipio && html`
            <span class="agro-cat-meta-item">
              📍 ${producto.municipio}
            </span>
          `}
        </div>

        <div class="agro-cat-footer">
          <div class="agro-cat-price-wrapper">
            <span class="agro-cat-price-label">Precio</span>
            <span class="agro-cat-price">$${producto.precio.toLocaleString('es-CO')}</span>
            ${producto.unidad && html`<span class="agro-cat-price-unit">por ${producto.unidad}</span>`}
          </div>

          <button class="agro-cat-btn" aria-label="Agregar al carrito"
            onClick=${() => onAgregarCarrito(producto)}>
            <svg viewBox="0 0 24 24">
              <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ── Componente principal ──────────────────────────────────────────────────────
export function Catalogo({ bffUrl }) {
  const [productos,    setProductos]    = useState(PRODUCTOS_INICIALES);
  const [nuevosIds,    setNuevosIds]    = useState(new Set());
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [busqueda,     setBusqueda]     = useState('');
  const [contadorCart, setContadorCart] = useState(0);

  // ── Escuchar eventos de Operaciones ──────────────────────────────────────
  useEffect(() => {
    const handleNuevoProducto = (event) => {
      const p = event.detail;
      console.log('[Catálogo] ✅ producto:publicado recibido:', p);
      setProductos(prev => [...prev, p]);
      setNuevosIds(prev => new Set(prev).add(p.id));
      // Quitar badge "Nuevo" después de 8 segundos
      setTimeout(() => {
        setNuevosIds(prev => { const s = new Set(prev); s.delete(p.id); return s; });
      }, 8000);
    };
    window.addEventListener('producto:publicado', handleNuevoProducto);
    return () => window.removeEventListener('producto:publicado', handleNuevoProducto);
  }, []);

  // ── Agregar al carrito ────────────────────────────────────────────────────
  const agregarAlCarrito = (producto) => {
    window.dispatchEvent(new CustomEvent('carrito:agregado', {
      detail: { idProducto: producto.id, cantidad: 1, nombre: producto.nombre, precio: producto.precio }
    }));
    setContadorCart(c => c + 1);

    // Toast
    const toast = document.createElement('div');
    toast.className = 'agro-cat-toast';
    toast.innerHTML = `🛒 <strong>${producto.nombre}</strong> agregado al carrito`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.classList.add('agro-cat-toast--out'); setTimeout(() => toast.remove(), 400); }, 2500);
  };

  // ── Filtrado combinado ────────────────────────────────────────────────────
  const productosFiltrados = productos.filter(p => {
    const matchCat = categoriaFiltro === 'Todas' || p.categoria === categoriaFiltro;
    const matchBus = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                     (p.productor || '').toLowerCase().includes(busqueda.toLowerCase()) ||
                     (p.municipio || '').toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchBus;
  });

  return html`
    <div class="agro-cat-wrapper">

      <!-- HEADER -->
      <div class="agro-cat-header">
        <h1 class="agro-cat-title">AgroCesar Marketplace</h1>
        <p class="agro-cat-subtitle">Del campo a tu mesa, sin intermediarios.</p>

        <!-- Barra de búsqueda -->
        <div class="agro-cat-search-bar">
          <span class="agro-cat-search-icon">🔍</span>
          <input
            class="agro-cat-search-input"
            type="text"
            placeholder="Buscar por producto, productor o municipio..."
            value=${busqueda}
            onInput=${e => setBusqueda(e.target.value)}
          />
          ${contadorCart > 0 && html`
            <div class="agro-cat-cart-badge">
              🛒 <strong>${contadorCart}</strong>
            </div>
          `}
        </div>

        <!-- Filtros por categoría -->
        <div class="agro-cat-filters">
          ${CATEGORIAS.map(cat => html`
            <button key=${cat}
              class=${'agro-cat-filter-btn' + (categoriaFiltro === cat ? ' active' : '')}
              onClick=${() => setCategoriaFiltro(cat)}>
              ${cat}
            </button>
          `)}
        </div>

        <!-- Contador de resultados -->
        <p class="agro-cat-count">
          ${productosFiltrados.length} producto${productosFiltrados.length !== 1 ? 's' : ''} encontrado${productosFiltrados.length !== 1 ? 's' : ''}
        </p>
      </div>

      <!-- GRID DE PRODUCTOS -->
      ${productosFiltrados.length === 0
        ? html`
          <div class="agro-cat-empty">
            <span>🌾</span>
            <p>No se encontraron productos con esos filtros.</p>
            <button class="agro-cat-filter-btn active" onClick=${() => { setCategoriaFiltro('Todas'); setBusqueda(''); }}>
              Ver todos
            </button>
          </div>
        `
        : html`
          <div class="agro-cat-grid">
            ${productosFiltrados.map(p => html`
              <${ProductCard}
                key=${p.id}
                producto=${p}
                onAgregarCarrito=${agregarAlCarrito}
                isNuevo=${nuevosIds.has(p.id)}
              />
            `)}
          </div>
        `
      }
    </div>
  `;
}
