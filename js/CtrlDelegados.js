import {
    getAuth,
    getFirestore
  } from "../lib/fabrica.js";
  import {
    urlStorage
  } from "../lib/storage.js";
  import {
    cod,
    muestraError
  } from "../lib/util.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  /** @type {HTMLUListElement} */
  // @ts-ignore
  const lista = document.
    querySelector("#lista");
  const firestore = getFirestore();
  const daoRol = firestore.
    collection("Rol");
  const daoDelegado = firestore.
    collection("Delegado");
  const daoUsuario = firestore.
    collection("Delegado");
  
  getAuth().onAuthStateChanged(
    protege, muestraError);
  
  /** @param {import(
      "../lib/tiposFire.js").User}
      usuario */
  async function protege(usuario) {
    if (tieneRol(usuario,
      ["Administrador"])) {
      consulta();
    }
  }
  
  function consulta() {
    daoDelegado.onSnapshot(
      htmlLista, errConsulta);
  }
  
  /**
   * @param {import(
      "../lib/tiposFire.js").
      QuerySnapshot} snap */
  async function htmlLista(snap) {
    let html = "";
    if (snap.size > 0) {
      /** @type {
            Promise<string>[]} */
      let usuarios = [];
      snap.forEach(doc => usuarios.
        push(htmlFila(doc)));
      const htmlFilas =
        await Promise.all(usuarios);
      /* Junta el todos los
       * elementos del arreglo en
       * una cadena. */
      html += htmlFilas.join("");
    } else {
      html += /* html */
        `<li class="vacio">
          -- No hay delegados
          registrados. --
        </li>`;
    }
    lista.innerHTML = html;
  }
  
  /**
   * @param {import(
      "../lib/tiposFire.js").
      DocumentSnapshot} doc */
  async function htmlFila(doc) {
    /**
     * @type {import("./tipos.js").
                        Usuario} */
    const data = doc.data();
    
    const img = cod(
      await urlStorage(data.correo));
      const rfc = cod(data.rfc);
      const domicilio = cod(data.domicilio);
      const nombre = cod(data.nombre);
      const edad = cod(data.edad);
      const telefono = cod(data.telefono);
    const roles =
      await buscaRoles(data.rolIds);
    const parámetros =
      new URLSearchParams();
    parámetros.append("id", doc.id);
   
    return (/* html */
      `<li>
        <a class="fila conImagen"
            href=
      "delegado.html?${parámetros}">
          <span class="marco">
            <img src="${img}"
              alt="Falta el Avatar">
          </span>
          <span class="texto">
            <strong
                class="primario">
              ${nombre}
            </strong>
            <span
                class="secundario">
              ${telefono}<br>
              ${domicilio}
            </span>
          </span>
        </a>
      </li>`);
  }
  

  
  /** Recupera el html de los
   * roles en base a sus id
   * @param {string[]} ids */
  async function buscaRoles(ids) {
    let html = "";
    if (ids && ids.length > 0) {
      for (const id of ids) {
        const doc = await daoRol.
          doc(id).
          get();
        /**
         * @type {
        import("./tipos.js").Rol} */
        const data = doc.data();
        html += /* html */
          `<em>${cod(doc.id)}</em>
          <br>
          ${cod(data.descripción)}
          <br>`;
      }
      return html;
    } else {
      return "-- Sin Roles --";
    }
  }
  
  /** @param {Error} e */
  function errConsulta(e) {
    muestraError(e);
    consulta();
  }
  
