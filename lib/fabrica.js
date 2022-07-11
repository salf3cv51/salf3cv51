/** Conexión a la base de datos
 * de Firebase.
 *  @returns {
      import("./tiposFire").
      Firestore} */
export function getFirestore() {
  // @ts-ignore
  return firebase.firestore();
}

/** Conexión al sistema de
 * autenticación de Firebase.
 *  @returns {
      import("./tiposFire").
      Auth} */
export function getAuth() {
  // @ts-ignore
  return firebase.auth();
}

