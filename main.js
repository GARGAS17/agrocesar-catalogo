import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import { Catalogo } from './Catalogo.js';

// Inyectamos el CSS dinámicamente al montar para asegurar aislamiento
const injectStyles = () => {
  if (!document.getElementById('agro-cat-styles')) {
    const link = document.createElement('link');
    link.id = 'agro-cat-styles';
    link.rel = 'stylesheet';
    // Nota: en producción esto debe apuntar a la URL pública del CSS de Camilo
    link.href = './styles.css'; 
    document.head.appendChild(link);
  }
};

window.mountAgroCatalogo = (containerId, props) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  injectStyles();
  render(html`<${Catalogo} ...${props} />`, container);
  console.log(`[MFE Catálogo] Montado en #${containerId}`);
};

window.unmountAgroCatalogo = (containerId) => {
  const container = document.getElementById(containerId);
  if (container) {
    render(null, container); // Destruye Preact y limpia memoria
    console.log(`[MFE Catálogo] Desmontado`);
  }
};
