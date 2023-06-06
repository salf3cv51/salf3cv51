/**
 * @typedef {Object} Rol
 * @property {string} descripción
 */

/**
 * @typedef {Object} Equipo
 * @property {string} nombre_equipo
 * @property {string} categoria
   @property {string} delegado
   */

  /**
 * @typedef {Object} Jugador
 * @property {string} nombre
 * @property {string} fechaNacim
   @property {string} equipo
   @property {string} domicilio
   */  

 /**
 * @typedef {Object} Sancion
 * @property {string} nombre
 * @property {string} fecha
   @property {string} tipo
   @property {string} motivo
    @property {string} arbitro
   */  

/**
 * @typedef {Object} Aviso
 * @property {string} titulo
 * @property {string} fecha

   */ 


     /**
 * @typedef {Object} Delegado
 *  @property {string} rfc
 * @property {string} nombre
   @property {string} edad
    @property {string} telefono
   @property {string} domicilio
   */  

       /**
 * @typedef {Object} Arbitro
 *  @property {string} rfc
 * @property {string} nombre
   @property {string} edad
    @property {string} telefono
   @property {string} domicilio
   */  

/**
 * @typedef {Object} Usuario
 * @property {string[]} rolIds
 * @property {string} alumnoId
 */

// @ts-nocheck
/**
 * @typedef {Object} Mensaje
 * @property {string} usuarioId
 * @property {string} texto
 * @property {firebase.firestore.Timestamp} timestamp
 */

export const __tipos = 0;
