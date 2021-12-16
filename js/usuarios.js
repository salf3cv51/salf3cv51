import {
  getFirestore
} from "../lib/fabrica.js";
import {
  subeStorage
} from "../lib/storage.js";
import {
  cod, getForánea, muestraError
} from "../lib/util.js";
import {
  muestraUsuarios
} from "./navegacion.js";

const SIN_ALUMNOS = /* html */
  `<option value="">
    -- Sin Alumnos --
  </option>`;

const firestore = getFirestore();
const daoRol = firestore.
  collection("Rol");
const daoAlumno = firestore.
  collection("Equipo");
const daoUsuario = firestore.
  collection("Jugador");

/**
 * @param {
    HTMLSelectElement} select
 * @param {string} valor */
export function
  selectAlumnos(select,
    valor) {
  valor = valor || "";
  daoAlumno.
    orderBy("nombre").
    onSnapshot(
      snap => {
        let html = SIN_ALUMNOS;
        snap.forEach(doc =>
          html += htmlAlumno(
            doc, valor));
        select.innerHTML = html;
        console.log(html);
      },
      e => {
        muestraError(e);
        selectAlumnos(
          select, valor);
      }
    );
}

/**
 * @param {
  import("../lib/tiposFire.js").
  DocumentSnapshot} doc
 * @param {string} valor */
function
  htmlAlumno(doc, valor) {
  const selected =
    doc.id === valor ?
      "selected" : "";
  /**
   * @type {import("./tipos.js").
                  Equipo} */
  const data = doc.data();
  return (/* html */
    `<option
        value="${cod(doc.id)}"
        ${selected}>
      ${cod(data.nombre)}
    </option>`);
}



/**
 * @param {
    import("../lib/tiposFire.js").
    DocumentSnapshot} doc
 * @param {Set<string>} set */
export function
  checkRol(doc, set) {
  /**
   * @type {
      import("./tipos.js").Rol} */
  const data = doc.data();
  const checked =
    set.has(doc.id) ?
      "checked" : "";
  return (/* html */
    `<li>
      <label class="fila">
        <span class="texto">
          <strong
              class="primario">
            ${cod(doc.nombre)}
          </strong>
        </span>
      </label>
    </li>`);
}

/**
 * @param {Event} evt
 * @param {FormData} formData
 * @param {string} id  */
export async function
  guardaUsuario(evt, formData,
    id) {
  try {
    evt.preventDefault();
    const nombreEquipo =
      getForánea(formData,
        "nombre_equipo");
        const fechaNacim=
        formData.get("fecha");
        const nombre=
        formData.get("nombre");
        const domicilio=
        formData.get("domicilio");
    await daoUsuario.
      doc(id).
      set({
        nombre,fechaNacim,nombreEquipo,domicilio 
      });
    const avatar =
      formData.get("avatar");
    await subeStorage(id, avatar);
    muestraUsuarios();
  } catch (e) {
    muestraError(e);
  }
}
