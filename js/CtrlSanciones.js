// @ts-nocheck
import {
    getAuth,
    getFirestore
  } from "../lib/fabrica.js";
  import {
    cod,
    muestraError
  } from "../lib/util.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  /** @type {HTMLUListElement} */
  const lista = document.
    querySelector("#lista");
  const daoSancion =
    getFirestore().
      collection("Sancion");
  
  getAuth().
    onAuthStateChanged(
      protege, muestraError);
  
  /** @param {import(
      "../lib/tiposFire.js").User}
      usuario */
  async function protege(usuario) {
    if (tieneRol(usuario,
      ["Administrador","Arbitro"])) {
      consulta();
    }
  }
  
  function consulta() {
    daoSancion.
      orderBy("nombre")
      .onSnapshot(
        htmlLista, errConsulta);
  }
  
  /**
   * @param {import(
      "../lib/tiposFire.js").
      QuerySnapshot} snap */
  function htmlLista(snap) {
    let html = "";
    if (snap.size > 0) {
      snap.forEach(doc =>
        html += htmlFila(doc));
    } else {
      html += /* html */
        `<li class="vacio">
          -- No hay Sanciones
          registradas. --
        </li>`;
    }
    lista.innerHTML = html;
  }
  
  /**
   * @param {import(
      "../lib/tiposFire.js").
      DocumentSnapshot} doc */
  function htmlFila(doc) {
    /**
     * @type {import("./tipos.js").
                    Alumno} */
    const data = doc.data();
    const fecha = cod(data.fecha);
    const tipo = cod(data.tipo);
    const nombre = cod(data.nombre);
   
    var espacio="[   -   ]";
    
    const parámetros =
      new URLSearchParams();
    parámetros.append("id", doc.id);
    return ( /* html */
      `<li>
        <a class="fila" href=
    "sancion.html?${parámetros}">
          <strong class="primario">
            ${fecha} ${tipo} ${nombre}
          </strong>
        </a>
       
      </li>`);
  }
  
  /** @param {Error} e */
  function errConsulta(e) {
    muestraError(e);
    consulta();
  }
  
  