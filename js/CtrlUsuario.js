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
  urlStorage
} from "../lib/storage.js";
import {
  muestraAlumnos, muestraUsuarios
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoAlumno =
  getFirestore().
    collection("Jugador");
const params =
  new URL(location.href).
    searchParams;
    const img = document.
  querySelector("img");
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
      await daoAlumno.
        doc(id).
        get();
    if (doc.exists) {
      /**
       * @type {
          import("./tipos.js").
                  Jugador} */
      const data = doc.data();
      img.src = await urlStorage(id);
      forma.nombre.value = data.nombre|| "";
      forma.fechaNacim.value = data.fechaNacim|| "";
      forma.equipo.value = data.equipo || "";
      forma.domicilio.value = data.domicilio || "";
      forma.correo.value = id || "";
      forma.cue.value = id || "";
      console.log(data.id);
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
    muestraUsuarios();
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
    
    /**
     * @type {
        import("./tipos.js").
                Alumno} */
    const modelo = {
      nombre,
      fechaNacim,
      equipo,
      domicilio
    };
    await daoAlumno.
      doc(id).
      set(modelo);
      const avatar =
    formData.get("avatar");
    await subeStorage(id, avatar);
    muestraUsuarios();
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      await daoAlumno.
        doc(id).
        delete();
      muestraAlumnos();
    }
  } catch (e) {
    muestraError(e);
  }
}




