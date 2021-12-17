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
    muestraAlumnos, muestraDelegados, muestraUsuarios
  } from "./navegacion.js";
  
  import {
    tieneRol
  } from "./seguridad.js";
  
  const daoAlumno =
    getFirestore().
      collection("Delegado");
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
      const rfc = getString(formData, "rfc").trim();
      const edad= getString(formData, "edad").trim();
      const domicilio = getString(formData, "domicilio").trim();
      const correo =  getString(formData, "correo").trim();
      const telefono =  getString(formData, "tel").trim();
      
      /**
       * @type {
          import("./tipos.js").
                  Alumno} */
     
   const modelo = {
    nombre,
    rfc, edad,domicilio,correo,telefono
    
                  };
                  await daoAlumno.
                    add(modelo);
        const avatar =
        formData.get("avatar");
       
      await subeStorage(correo, avatar);
      muestraDelegados();
    } catch (e) {
      muestraError(e);
    }
  }
  
  