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
/** @type {HTMLFormElement} */
const forma = document["forma"];
getAuth().onAuthStateChanged(
  protege, muestraError);

/** verifica que el usuario sea administrador y agrega el evento al boton y le liga la funcion guarda */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guarda);
  }
}

/**funcion que guarda los datos en la base de datos */
async function guarda(evt) {
  try {
    evt.preventDefault();
    /**Se liga el formulario con los datos registrados*/
    const formData =
    new FormData(forma); 
    
   /** se obtiene cada uno de los strings de los campos ligandolos con su id en el documento html*/
    const concepto = getString(formData, "resumen");
    const total = getString(formData, "total").trim();
    const numeroPedido = getString(formData, "numeroPedido").trim();
     const fecha = getString(formData, "fecha").trim();

    const modelo = {
      
     numeroPedido,fecha,concepto,total
      
    };
    /** se agregan los datos del pedido a la bd */
    await datoPedido.
      add(modelo);
    muestraPedidos();
  } catch (e) {
    muestraError(e);
  }
}
