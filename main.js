import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import { Catalogo } from './Catalogo.js';

// Inyectamos el CSS dinámicamente para garantizar que los estilos solo carguen si el MFE se monta.
const injectStyles = () => {
  if (!document.getElementById('agro-cat-styles')) {
    const link = document.createElement('link');
    link.id = 'agro-cat-styles';
    link.rel = 'stylesheet';
    
    // 🧠 TÉCNICA AVANZADA (IMPORT META): 
    // Como este MFE será llamado por el Shell (Walter) desde OTRO dominio, 
    // un href="./styles.css" normal fallaría porque buscaría el CSS en el dominio de Walter.
    // Usar 'import.meta.url' garantiza que el CSS se descargue siempre del servidor de Camilo.
    link.href = new URL('./styles.css', import.meta.url).href; 
    
    document.head.appendChild(link);
  }
};

/**
 * Función global de MONTAJE.
 * Cumple la regla de Inversión de Control (IoC).
 */
window.mountAgroCatalogo = (containerId, props) => {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`[MFE Catálogo] ❌ Error: El Shell intentó montar el catálogo en un div inexistente ('${containerId}').`);
    return;
  }
  
  injectStyles();
  
  // Renderizamos la app de Preact pasándole las propiedades del entorno (ej. urls del backend)
  render(html`<${Catalogo} ...${props} />`, container);
  console.info(`[MFE Catálogo] ✅ Montado exitosamente en el DOM bajo #${containerId}`);
};

/**
 * Función global de DESMONTAJE.
 * Crítica para evitar fugas de memoria (Memory Leaks) en celulares gama baja.
 */
window.unmountAgroCatalogo = (containerId) => {
  const container = document.getElementById(containerId);
  if (container) {
    // Al pedirle a Preact que renderice 'null', este desencadena el ciclo de destrucción:
    // 1. Elimina todos los nodos del DOM.
    // 2. Desvincula el "producto:publicado" del EventListener (definido en el useEffect).
    render(null, container); 
    console.info(`[MFE Catálogo] 🧹 Desmontado. DOM limpiado y memoria liberada.`);
  }
};
