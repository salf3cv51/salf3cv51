import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraAlumnos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoAlumno =
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
    const cat = getString(formData, "categoria").trim();
    const del = getString(formData, "delegado").trim();
    /**
     * @type {
        import("./tipos.js").
                Alumno} */
    const modelo = {
      
      nombre,
      cat,
      del
      
    };
    await daoAlumno.
      add(modelo);
    muestraAlumnos();
  } catch (e) {
    muestraError(e);
  }
}

