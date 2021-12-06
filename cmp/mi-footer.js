class MiFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Juan Fernando Martinez Bojorges.
      </p>`;
  }
}

customElements.define("mi-footer", MiFooter);
