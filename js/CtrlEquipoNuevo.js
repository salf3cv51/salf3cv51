import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraEquipos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoEquipo =
  getFirestore().
    collection("Pedido");
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
      forma.btn_agregaProducto.addEventListener(
      "click", agregaProducto);
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
    /**
     * @type {
        import("./tipos.js").
                Alumno} */
    const modelo = {
      
     cantidad,producto
      
    };
    await daoEquipo.
      add(modelo);
    muestraEquipos();
  } catch (e) {
    muestraError(e);
  }
}

async function agregaProducto(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    
     const producto= getString(formData, "producto");
    const cantidad = getString(formData, "cantidad").trim();
    const estado = getString(formData, "estado").trim();
    const precio = getString(formData, "precio").trim();
    
    /**
     * @type {
        import("./tipos.js").
                Alumno} */
   
      
      
    
    alert("EL EVENTO DEL BOTON FUNCIONA")
    forma.resumen.value+=numeroPedido,fecha,concepto,total
  } catch (e) {
    muestraError(e);
  }
}

