import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";
import {
  iniciaSesión,
  terminaSesión
} from "./seguridad.js";

import {
  urlStorage
} from "../lib/storage.js";

/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLImageElement} */
const avatar = document.
  querySelector("#avatar");

/* Escucha cambios de usuario.
 * El primer parámetro es una
 * función que se invoca cada que
 * hay un cambio de usuario y
 * recibe los datos del usuario.
 * El segundo parámetro es una
 * función que se invoca cuando se
 * presenta un error en un cambio
 * de usuario y recibe un Error.
 */
getAuth().onAuthStateChanged(
  muestraSesión, muestraError);

/** Muestra los datos del usuario
 * o manda a iniciar sesión en
 * caso de que no haya empezado.
 * @param {import(
    "../lib/tiposFire").
    User} usuario modelo con las
 *    características del usuario
 *    o null si no ha iniciado
 *    sesión. */
async function
  muestraSesión(usuario) {
  if (usuario && usuario.email) {
    // Usuario aceptado.
    forma.email.value =
      usuario.email || "";
    forma.nombre.value =
      usuario.displayName || "";
    avatar.src =
      usuario.photoURL || "";
    forma.terminarSesión.
      addEventListener(
        "click", terminaSesión);
  } else {
    // No ha iniciado sesión.
    iniciaSesión();
  }
}

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
  collection("Aviso");

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
        -- No hay avisos
        pendientes. --
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
    await urlStorage(data.id));
    const fecha = cod(data.fecha);
    
      
  const roles =
    await buscaRoles(data.rolIds);
  const parámetros =
    new URLSearchParams();
  parámetros.append("id", doc.id);
 
  return (/* html */
    `<li>
      <div class="fila1 conImagen"
       
        <span class="marco">
          <img src="${img}"
            alt="Falta el Avatar">
        </span>
        <span class="texto">
          <strong
              class="primario">
            ${fecha}
          </strong>
      </div>
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

