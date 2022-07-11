// @ts-nocheck
import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  cod,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";

/** @type {HTMLUListElement} */
const lista = document.
  querySelector("#lista");
const datoPedido =
  getFirestore().
    collection("Pedido");

getAuth().
  onAuthStateChanged(
    protege, muestraError);

/**verifica que el usuario sea administrador y realiza la consulta */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    consulta();
  }
}

/**funcion que hace la consulta de los datos y los ordena en este caso por fecha, si se logra muestra la lista, y si no muestra errConsulta */
function consulta() {
  datoPedido.
    orderBy("fecha")
    .onSnapshot(
      htmlLista, errConsulta);
}

/**
verifica si hay pedidos registrados en la base de datos y si no es asi muestra un mensaje  */
function htmlLista(snap) {
  let html = "";
  if (snap.size > 0) {
    snap.forEach(doc =>
      html += htmlFila(doc));
  } else {
    html += /* html */
      `<li class="vacio">
        -- No hay pedidos
        registrados. --
      </li>`;
  }
  lista.innerHTML = html;
}

/**
 *funcion que muestra los registros de la bd ordenandolo en filas */
function htmlFila(doc) {
  /**Crea constantes y a cada uno le asocia su valor registrado en la base de datos
  */
  const data = doc.data();
  const numeroPedido = cod(data.numeroPedido);
  const fecha = cod(data.fecha);
  const concepto = cod(data.concepto);
 const total = cod(data.total);
  
  var espacio="[   -   ]";
  /*agrega los parametros al id del documento asociado*/
  const parámetros =
    new URLSearchParams();
  parámetros.append("id", doc.id);
  /** muestra los datos en filas con los datos obtenidos anteriormente */
  return ( /* html */
    `<li>
      <a class="fila" href=
  "pedido.html?${parámetros}">
        <strong class="primario">
         Pedido # ${numeroPedido} Fecha: ${fecha} 
        </strong>
         <span class="secundario">
             Concepto: ${concepto} <br>
             Total: $ ${total}
            </span>
      </a>
     
    </li>`);
}

/** si hay erro en la consulta muestra el error */
function errConsulta(e) {
  muestraError(e);
  consulta();
}

