// Servicio para manejar los datos de la collection de "users" en Firestore.

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * 
 * @param {string} id 
 * @returns {Promise<{id: string, email: string}>}
 */
export async function getUserProfileById(id) {
    // En esta ocasión queremos traer los datos de un usuario, es decir, un documento
    // específico, y no de una collection. Para esto creamos la referencia usando doc()
    // en vez de collection().
    const userRef = doc(db, `users/${id}`);

    try {
        const userDoc = await getDoc(userRef);

        return {
            id: userDoc.id,
            email: userDoc.data().email,
        }
    } catch (error) {
        // TODO: Manejar el error.
        console.error('[user-profile.js getUserProfileById] Error al traer el perfil del usuario. ', error);
    }
}

/**
 * 
 * @param {string} id - El id del usuario.
 * @param {{}} data - La data que queremos asociar.
 * @returns {Promise}
 */
export async function createUserProfile(id, data) {
    const userRef = doc(db, `users/${id}`);

    return setDoc(userRef, {...data});
}