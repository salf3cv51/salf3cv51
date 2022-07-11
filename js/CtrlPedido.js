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

/**  obbtiene la autorizacion para que el usuario haga cambios
*/
getAuth().onAuthStateChanged(
  protege, muestraError);
 
/** pregunta si el usuario es administrador reliza la busqueda
*/
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
    /** pregunta el id y si el documento existe*/
    if (doc.exists) {
      /*Rellena los campos con los datos del documento existente
      */
      const data = doc.data();
      forma.resumen.value = data.concepto || "";
      forma.fecha.value = data.fecha || "";
      forma.numeroPedido.value = data.numeroPedido|| "";
      forma.total.value = data.total || "";
      /** agrega los eventos a los botones del formulario y les asocia la funcion guarda y elimina
      */
      forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
   
    } else {
      /**si no se cumple
      muestra un error*/
      throw new Error(
        "No se encontró.");
    }
  } catch (e) {
    /**invoca a las funciones */
    muestraError(e);
    muestraPedidos();
  }
}

/** funcion que gaurda los datos modificados*/
async function guarda(evt) {
  try {
    evt.preventDefault();
    /**liga el formulario al documento */
    const formData =
      new FormData(forma);
    
    
/** obtiene los datos del formulario creando constantes y ligandolo a su id con entre comillas */
    const concepto = getString(formData, "resumen");
    const total = getString(formData, "total").trim();
    const numeroPedido = getString(formData, "numeroPedido").trim();
    const fecha = getString(formData, "fecha").trim();
   
    const modelo = {
      numeroPedido,fecha,concepto,total    
    };
    /**inserta los nuevos datos en la base de datos
    en firebase
    */
    await datoPedido.
      doc(id).
      set(modelo);
   muestraPedidos()
  } catch (e) {
    muestraError(e);
  }
}


async function elimina() {
  /** muestra el nmensaje de confirmacion en pantalla 
  */
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      /** elimina el pedido en la base de datos
      */
      await datoPedido.
        doc(id).
        delete();
      muestraPedidos();
    }
  } catch (e) {
    muestraError(e);
  }
}

