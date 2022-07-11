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
    const concepto = getString(formData, "resumen");
    const total = getString(formData, "total").trim();
    const numeroPedido = getString(formData, "numeroPedido").trim();
     const fecha = getString(formData, "fecha").trim();

    const modelo = {
      
     numeroPedido,fecha,concepto,total
      
    };
    await datoPedido.
      add(modelo);
    muestraPedidos();
  } catch (e) {
    muestraError(e);
  }
}
