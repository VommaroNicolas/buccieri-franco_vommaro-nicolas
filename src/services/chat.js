// Acá vamos a definir todas las funcionalidades que tengan que 
// ver con el manejo de los datos del chat global.
// ¿Por qué usar estos "servicios"?
// Podríamos pensar inicialmente que sería una buena idea agregar
// directamente en el componente de Chat la funcionalidad con
// Firestore. En vez de hacer esto de separar en un archivo
// de "servicio" las funciones y que luego sean consumidas por
// el componente.
// Para aplicaciones simples, podría funcionar.
// A medida que la aplicación crezca en complejidad y tamaño,
// esto va a empezar a traer problemas de mantenimiento y testeo.
// La razón es que estamos violando un principio muy importante
// de la programación: El Principio de Responsabilidad Única,
//  o SRP por sus siglas en inglés (Single-Responsibility Principle).
// Este principio dicta que un elemento del sistema (ej: función,
// clase o módulo) debería tener una única responsabilidad, o
// dicho de otra forma, una única razón para cambiar.
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

/**
 * 
 * @param {{email: string, content: string}} data 
 * @returns {Promise<{id: string}>}
 */
export async function saveChatMessage(data) {
    // Primero, obtenemos la referencia a la collection donde queremos grabar.
    const refChat = collection(db, 'chat');

    // Ahora usamos la función addDoc() para agregar un documento a la collection.
    const doc = await addDoc(refChat, {
        ...data,
        // Agregamos la fecha de creación del mensaje.
        // Para unificar el criterio de la fecha para todos los usuarios, vamos a pedir que
        // el servidor de Firestore defina la fecha. Esto requiere que usemos la función
        // serverTimestamp().
        created_at: serverTimestamp(),
    });

    return {
        id: doc.id,
    }
}

/**
 * Retorna los mensajes de chat, y se reejecuta el callback cada vez que los mensajes en el 
 * backend cambien.
 * 
 * @param {() => {})} callback
 * @returns {Unsubscribe}
 */
export function subscribeToChatMessages(callback) {
    const refChat = collection(db, 'chat');

    // Queremos traer los mensajes ordenados por fecha de creación.
    // Cuando queremos leer una collection con algunas configuraciones (ej: filtros, 
    // ordenamientos o límites) vamos a necesitar crear un "query".
    // El query nos permite aclarar una collection, y luego uno por uno los extras que
    // queremos aplicar al mismo.
    const q = query(refChat, orderBy('created_at'));

    // Usamos onSnapshot para recibir los mensajes de la collection, y volver a ser notificados
    // de los mensajes en cada cambio que ocurra en el backend.
    return onSnapshot(q, snapshot => {
        // Transformamos los documentos del snapshot en objetos comunes.
        // console.log('Snapshot: ', snapshot);
        // console.log('Snapshot documents: ', snapshot.docs);
        // snapshot.docs retorna un array de objetos QueryDocumentSnapshot. Estos son unos objetos
        // propios de Firestore. Como no nos interesan esos objetos, sino solamente los datos
        // que contienen, usamos el método map() para transformar cada documento a un simple
        // objeto con los datos que nos interesan.
        const messages = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                // data() permite acceder a los datos del documento.
                userId: doc.data().userId,
                email: doc.data().email,
                content: doc.data().content,
                // Transformamos el Timestamp a un objeto Date.
                created_at: doc.data().created_at.toDate(),
            }
        });
        // console.log('Documents parsed: ', messages);

        // Finalmente, invocamos el callback que nos proveyeron por parámetro y le pasamos
        // los mensajes parseados.
        callback(messages);
    });
}