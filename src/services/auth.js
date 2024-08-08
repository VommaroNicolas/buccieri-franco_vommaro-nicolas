// Servicio de autenticación con Firebase Authentication.

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { createUserProfile } from "./user-profile";

const AUTH_EMPTY_STATE = {
    id: null,
    email: null,
};

let authUser = AUTH_EMPTY_STATE;

// Definimos una lista de "observers".
let observers = [];

if(localStorage.getItem('user')) {
    authUser = JSON.parse(localStorage.getItem('user'));
}

onAuthStateChanged(auth, user => {
    if(user) {
        // Hay un usuario autenticado.
        authUser = {
            id: user.uid,
            email: user.email,
        };

        // Guardamos en localStorage el usuario.
        localStorage.setItem('user', JSON.stringify(authUser));
    } else {
        // No hay un usuario autenticado.
        authUser = AUTH_EMPTY_STATE;
        localStorage.removeItem('user');
    }
    // Notificamos los cambios ocurridos en el estado de autenticación.
    notifyAll();
});

/**
 * Crea un usuario y lo autentica automáticamente.
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {string} name 
 * @returns {Promise<{id: string, email: string}>}
 */
export async function register(email, password, name) {
    try {
        // Registramos el usuario en Auth.
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        
        // Actualizamos el perfil del usuario con el nombre.
        await updateProfile(userCredentials.user, {
            displayName: name
        });

        // Creamos el perfil el usuario en Firestore.
        await createUserProfile(userCredentials.user.uid, {email, name});

        console.log('Usuario creado: ', userCredentials);
        return {
            id: userCredentials.user.uid,
            email: userCredentials.user.email,
            name: userCredentials.user.displayName
        };
    } catch (error) {
        // TODO: Manejar el error.
        console.error('[auth.js register] Error al crear el usuario: ', error);
    }
}

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{id: string, email: string}>}
 */
export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            console.log("Usuario autenticado: ", user);
            return {
                id: user.uid,
                email: user.email,
                name: user.displayName
            }
        });
}

/**
 * @returns {Promise<void>}
 */
export function logout() {
    return signOut(auth);
}

/**
 * Actualiza el perfil del usuario.
 * 
 * @returns {Promise<void>}
 */
export async function updateProfileInfo(email, newPassword, name) {
    try {
        const user = auth.currentUser;
        if (user) {
            if (email) {
                await updateEmail(user, email);
            }
            if (newPassword) {
                await updatePassword(user, newPassword);
            }
            if (name) {
                await updateProfile(user, { displayName: name });
            }
            console.log('Perfil actualizado exitosamente.');
        } else {
            console.error('No se encontró el usuario o el usuario no está autenticado.');
        }
    } catch (error) {
        console.error('Error al actualizar el perfil:', error.message);
    }
}

/**
 * Agrega un observer para la autenticación, y lo ejecuta inmediatamente.
 * 
 * @param {(user) => void} callback 
 * @returns {() => void} - Función para cancelar la suscripción.
 */
export function subscribeToAuth(callback) {
    // Agregamos el callback al array de observers
    observers.push(callback);

    notify(callback);

  
    return () => observers = observers.filter(obs => obs !== callback);
}

/**
 * Ejecuta el observer y le pasa los datos del usuario.
 * 
 * @param {(user) => void} observer 
 */
function notify(observer) {
    observer({...authUser});
}

function notifyAll() {
    observers.forEach(obs => notify(obs));
}
