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
  muestraJugadores
} from "./navegacion.js";

import {
  tieneRol
} from "./seguridad.js";
import { guardaJugador } from "./usuarios.js";

const daoJugador =
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
   
 const modelo = {
  nombre,
  fechaNacim, equipo,domicilio,correo
  
                };
                await daoJugador.doc(correo).set(
                  modelo
                );
                  
      const avatar =
      formData.get("avatar");
     
    await subeStorage(correo, avatar);
    guardaJugador(correo,formData);
    muestraJugadores();
  } catch (e) {
    muestraError(e);
  }
}

