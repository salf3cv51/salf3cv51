class MiFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2022
        Todos los derechos reservados
      </p>`;
  }
}

customElements.define("mi-footer", MiFooter);
