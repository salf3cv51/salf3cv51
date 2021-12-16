import {
    getAuth,
    getFirestore
  } from "../lib/fabrica.js";
  import {
    getString,
    muestraError
  } from "../lib/util.js";
  import {
    muestraAlumnos, muestraSanciones
  } from "./navegacion.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  const daoAlumno =
    getFirestore().
      collection("Sancion");
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
      const fecha= getString(formData, "fecha").trim();
      const tipo = getString(formData, "tipo").trim();
      const motivo = getString(formData, "motivo").trim();
      const arbitro = getString(formData, "arbitro").trim();
      /**
       * @type {
          import("./tipos.js").
                  Alumno} */
      
        
        const modelo = {
            fecha,tipo,nombre,motivo,arbitro
            
          };
        
      
      await daoAlumno.
        add(modelo);
      muestraSanciones();
    } catch (e) {
      muestraError(e);
    }
  }
  
  