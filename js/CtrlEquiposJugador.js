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
  const daoAlumno = firestore.
    collection("Equipo");
  const daoUsuario = firestore.
    collection("Jugador");
  
  getAuth().onAuthStateChanged(
    protege, muestraError);
  
  /** @param {import(
      "../lib/tiposFire.js").User}
      usuario */
  async function protege(usuario) {
    if (tieneRol(usuario,
      ["Jugador"])) {
      consulta();
    }
  }
  
  function consulta() {
    daoUsuario.onSnapshot(
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
          -- No estas registrado en ningun equipo. --
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
      const equipo = cod(data.equipo);
      const domicilio = cod(data.domicilio);
      const nombre = cod(data.nombre);
        
   
    const parámetros =
      new URLSearchParams();
    parámetros.append("id", doc.id);
   
    return (/* html */
      `<li>       
            <span
                class="texto">
                
              ${equipo}
              
            </span>
 
      </li>`);
  }
  
  /** Recupera el html de un
   * alumno en base a su id.
   * @param {string} id */
  async function
    buscaEquipo(id) {
    if (id) {
      const doc =
        await daoUsuario.
          doc(id).
          get();
      if (doc.exists) {
        /**
         * @type {import(
            "./tipos.js").
              Alumno} */
        const data = doc.data();
        return (/* html */
          `${cod(data.nombre)}`);
      }
    }
    return " ";
  }
  

  /** @param {Error} e */
  function errConsulta(e) {
    muestraError(e);
    consulta();
  }
  