import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";

import {
  subeStorage
} from "../lib/storage.js";

import {
  muestraAlumnos
} from "./navegacion.js";

import {
  tieneRol
} from "./seguridad.js";

const daoAlumno =
  getFirestore().
    collection("Jugador");
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
    const fechaNacim = getString(formData, "fechaNacim").trim();
    const equipo = getString(formData, "equipo").trim();
    const domicilio = getString(formData, "domicilio").trim();
    const correo =  getString(formData, "correo").trim();
    
    /**
     * @type {
        import("./tipos.js").
                Alumno} */
   
    await daoAlumno.doc(id).set(

      nombre,
      fechaNacim,
      equipo,
      domicilio


    )     
      const avatar =
      formData.get("avatar");
      document
    await subeStorage(correo, avatar);
    muestraAlumnos();
  } catch (e) {
    muestraError(e);
  }
}

