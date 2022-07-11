import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
 muestraPedidos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const datoPedido =
  getFirestore().
    collection("Pedido");
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
    ["Administrador"])) {
    busca();
  }
}

/** Busca y muestra los datos que
 * corresponden al id recibido. */
async function busca() {
  try {
    const doc =
      await datoPedido.
        doc(id).
        get();
    if (doc.exists) {
      /**
       * @type {
          import("./tipos.js").
                  Alumno} */
      const data = doc.data();
      forma.resumen.value = data.concepto || "";
      forma.fecha.value = data.fecha || "";
      forma.numeroPedido.value = data.numeroPedido|| "";
      forma.total.value = data.total || "";
      
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
    muestraPedidos();
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    
    

    const concepto = getString(formData, "resumen");
    const total = getString(formData, "total").trim();
    const numeroPedido = getString(formData, "numeroPedido").trim();
     const fecha = getString(formData, "fecha").trim();
   
    const modelo = {
      numeroPedido,fecha,concepto,total
      
    };
    await datoPedido.
      doc(id).
      set(modelo);
   muestraPedidos()
  } catch (e) {
    muestraError(e);
  }
}


async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      await datoPedido.
        doc(id).
        delete();
      muestraPedidos();
    }
  } catch (e) {
    muestraError(e);
  }
}

