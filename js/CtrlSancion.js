import {
    getAuth,
    getFirestore
  } from "../lib/fabrica.js";
  import {
    getString,
    muestraError
  } from "../lib/util.js";
  import {
    muestraSanciones
  } from "./navegacion.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  const daoSancion =
    getFirestore().
      collection("Sancion");
  const params =
    new URL(location.href).
      searchParams;
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
      ["Administrador","Arbitro"])) {
      busca();
    }
  }
  
  /** Busca y muestra los datos que
   * corresponden al id recibido. */
  async function busca() {
    try {
      const doc =
        await daoSancion.
          doc(id).
          get();
      if (doc.exists) {
        /**
         * @type {
            import("./tipos.js").
                    Sancion} */
        const data = doc.data();
        forma.nombre.value = data.nombre || "";
        forma.fecha.value = data.fecha|| "";
        forma.tipo.value = data.tipo || "";
        forma.motivo.value = data.motivo|| "";
        forma.arbitro.value = data.arbitro|| "";

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
      muestraSanciones();
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
      await daoSancion.
        doc(id).
        set(modelo);
      muestraSanciones();
    } catch (e) {
      muestraError(e);
    }
  }
  
  async function elimina() {
    try {
      if (confirm("Confirmar la " +
        "eliminación")) {
        await daoSancion.
          doc(id).
          delete();
        muestraSanciones();
      }
    } catch (e) {
      muestraError(e);
    }
  }
  
  