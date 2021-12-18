import {
    getAuth,
    getFirestore
  } from "../lib/fabrica.js";
  import {
    getString,
    muestraError
  } from "../lib/util.js";
  import {
    subeStorage,eliminaStorage
  } from "../lib/storage.js";
  import {
    urlStorage
  } from "../lib/storage.js";
  import {
    muestraDelegados, muestraUsuarios
  } from "./navegacion.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  const daoDelegado =
    getFirestore().
      collection("Delegado");
      const daoUsuario =
  getFirestore().
    collection("Usuario");
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
        await daoDelegado.
          doc(id).
          get();
      if (doc.exists) {
        /**
         * @type {
            import("./tipos.js").
                    Delegado} */
        const data = doc.data();
        const formData =
        new FormData(forma);
        const correo =  getString(formData, "correo").trim();
        img.src = await urlStorage(data.correo);
        forma.nombre.value = data.nombre|| "";
        forma.rfc.value = data.rfc|| "";
        forma.edad.value = data.edad || "";
        forma.domicilio.value = data.domicilio || "";
        forma.correo.value = data.correo || "";
        forma.tel.value = data.telefono || "";
        forma.cue.value = "Delegado: "+data.nombre || "";
        
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
      muestraDelegados();
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
        rfc,
        edad,
        domicilio,correo,telefono
      };
      await daoDelegado.
        doc(id).
        set(modelo);
        const avatar =
      formData.get("avatar");
      await subeStorage(id, avatar);
      muestraDelegados();
    } catch (e) {
      muestraError(e);
    }
  }
  
  async function elimina() {
    try {
      if (confirm("Confirmar la " +
        "eliminación")) {
        await daoDelegado.
          doc(id).
          delete();
          await daoUsuario.
        doc(id).delete();
          await eliminaStorage(id);
        muestraDelegados();
      }
    } catch (e) {
      muestraError(e);
    }
  }
  
  
  
  
  