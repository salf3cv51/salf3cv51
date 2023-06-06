import {
    getAuth,
    getFirestore
  } from "../lib/fabrica.js";
  import {
    cod,getString,
    muestraError
  } from "../lib/util.js";
  import {
    subeStorage,eliminaStorage
  } from "../lib/storage.js";
  import {
    urlStorage
  } from "../lib/storage.js";
  import {
    muestraAvisos, muestraSanciones
  } from "./navegacion.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  const daoAviso =
    getFirestore().
      collection("Aviso");
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
        await daoAviso.
          doc(id).
          get();
          
      if (doc.exists) {
        /**
         * @type {
            import("./tipos.js").
                    Aviso} */
        const data = doc.data();   
        
        img.src = await urlStorage(data.titulo);
        
        forma.fecha.value = data.fecha|| "";
        forma.titulo.value = data.titulo|| "";
        
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
      muestraAvisos();
    }
  }
  
  /** @param {Event} evt */
  async function guarda(evt) {
    try {
      evt.preventDefault();
      const formData =
        new FormData(forma);
      
   
      const fecha = getString(formData, "fecha").trim();
      const titulo = getString(formData, "titulo").trim();
      /**
       * @type {
          import("./tipos.js").
                  Alumno} */
      const modelo = {

        fecha,titulo
      };
      await daoAviso.
        doc(id).
        set(modelo);
        const avatar =
      formData.get("avatar");
      await subeStorage(titulo, avatar);
      muestraAvisos();
    } catch (e) {
      muestraError(e);
    }
  }
  
  async function elimina() {
    try {
      if (confirm("Confirmar la " +
        "eliminación")) {
        await daoAviso.
          doc(id).
          delete();
          const doc =
          await daoAviso.
            doc(id).
            get();
             /**
         * @type {
            import("./tipos.js").
                    Aviso} */
          const data = doc.data(); 
          console.log(doc.data);
          const formData =
        new FormData(forma);
          const titulo = getString(formData, "titulo").trim();
          console.log(titulo);
          await eliminaStorage(titulo);
        muestraAvisos();
      }
    } catch (e) {
      muestraError(e);
    }
  }
  
  
  
  
  