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
    muestraAvisos
  } from "./navegacion.js";
  
  import {
    tieneRol
  } from "./seguridad.js";
  
  const daoAlumno =
    getFirestore().
      collection("Aviso");
  /** @type {HTMLFormElement} */
  const forma = document["forma"];
  const params =
  new URL(location.href).
    searchParams;
  const id = params.get("id");
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
      
      const fecha = getString(formData, "fecha").trim();
      const titulo= getString(formData, "titulo").trim();
      
      /**
       * @type {
          import("./tipos.js").
                  Alumno} */
     
   const modelo = {
   
    fecha,titulo
                  };
                  await daoAlumno.
                    add(modelo);
        const avatar =
        formData.get("avatar");
       
      await subeStorage(titulo, avatar);
      muestraAvisos();
    } catch (e) {
      muestraError(e);
    }
  }
  
  