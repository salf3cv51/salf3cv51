// @ts-nocheck
import {
  cargaRoles
} from "../js/seguridad.js";
import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";

class MiNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<ul>
        <li>
          <a href="index.html">
            Sesión</a>
        </li>
      </ul>`;
    this.ul =
      this.querySelector("ul");
    getAuth().onAuthStateChanged(
      usuario => this.
        cambiaUsuario(usuario),
      muestraError);
  }

  /**
   * @param {import(
      "../lib/tiposFire.js").User}
      usu */
      async cambiaUsuario(usu) {
        if (usu && usu.email) {
          let html = "";
          const roles =
            await cargaRoles(
              usu.email);
          /* Enlaces para solo
           * para clientes. */
          if (roles.has("Cliente")) {
            html += /* html */
              `<li>
                <a href=
                  "chat.html">Chat</a>
              </li>`;
          }
          if (roles.has("Jugador")) {
            html += /* html */
           `<li>
                <a href="tareas_alumno.html">Tareas</a>
          </li>`;
          }
          if (roles.has("Delegado")) {
            html += /* html */
            `<li>
              <a href="equiposDelegado.html">Mis Equipos</a>
            </li>`;
          }
          if (roles.has("Arbitro")) {
            html += /* html */
            `<li>
              <a href="sanciones.html">Sanciones</a>
            </li>`;
          }
          /* Enlaces para solo
           * administradores.
           */
          if (roles.has(
            "Administrador")) {
            html += /* html */
              `<li>
                <a href="equipos.html">Tareas</a>
              </li>
       
              <li>
                <a href="avisos.html">Avisos</a>
              </li>
           <li>
            <a href="registro_alumno.html">Registro</a>
          </li>`;
              
          }
          this.ul.innerHTML += html;
        }
      }
    }


customElements.define("mi-nav", MiNav);
