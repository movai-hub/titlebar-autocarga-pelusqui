import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Creamos un Web Component que encapsula React
class AltraTitlebarElement extends HTMLElement {
  private root: Root | null = null;

  connectedCallback() {
    if (!this.root) {
      this.root = createRoot(this);
    }
    this.renderReactApp();
  }

  // Escuchamos si el Dashboard cambia estos atributos
  static get observedAttributes() {
    return ['titulo', 'migas'];
  }

  attributeChangedCallback() {
    this.renderReactApp();
  }

  renderReactApp() {
    const titulo = this.getAttribute('titulo') || 'Inicio';
    const migas = this.getAttribute('migas') || '';
    
    this.root?.render(
      <StrictMode>
        <App titulo={titulo} migas={migas} />
      </StrictMode>
    );
  }
}

// Registramos la etiqueta <altra-titlebar> en el navegador
if (!customElements.get('altra-titlebar')) {
  customElements.define('altra-titlebar', AltraTitlebarElement);
}
