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
    forma.addEventListener(
      "submit", guarda);
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
      add(modelo);
    muestraEquipos();
  } catch (e) {
    muestraError(e);
  }
}

