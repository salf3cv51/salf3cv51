import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraEquipos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoEquipo =
  getFirestore().
    collection("Equipo");
const params =
  new URL(location.href).
    searchParams;
const id = params.get("id");
/** @type {HTMLFormElement} */
const forma = document["forma"];

getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    busca();
  }
}

/** Busca y muestra los datos que
 * corresponden al id recibido. */
async function busca() {
  try {
    const doc =
      await daoEquipo.
        doc(id).
        get();
    if (doc.exists) {
      /**
       * @type {
          import("./tipos.js").
                  Alumno} */
      const data = doc.data();
      forma.nombre.value = data.nombre || "";
      forma.categoria.value = data.categoria|| "";
      forma.delegado.value = data.delegado || "";
      
      forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
    } else {
      throw new Error(
        "No se encontró.");
    }
  } catch (e) {
    muestraError(e);
    muestraEquipos();
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    
    const nombre = getString(formData, "nombre").trim();
    const categoria = getString(formData, "categoria").trim();
    const delegado = getString(formData, "delegado").trim();
    
    /**
     * @type {
        import("./tipos.js").
                Alumno} */
    const modelo = {
      nombre,
      categoria,
      delegado
    };
    await daoEquipo.
      doc(id).
      set(modelo);
    muestraEquipos();
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      await daoEquipo.
        doc(id).
        delete();
      muestraEquipos();
    }
  } catch (e) {
    muestraError(e);
  }
}

