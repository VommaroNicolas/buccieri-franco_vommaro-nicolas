/*
# Estructura de los chats privados en Firestore
Crear un chat privado entre dos usuarios requiere llevar un registro de:
a. Los usuarios que pertenecen a la conversación.
b. La lista de mensajes.

Los usuarios van a ser siempre 2 en nuestro caso.
Los mensajes pueden ser n.

¿Cómo nos conviene estructurar eso en Firestore?
https://firebase.google.com/docs/firestore/manage-data/structure-data

En ese documento, nos menciona de 3 alternativas:
1. Usar mapas (objetos) o arrays para guardar datos en el propio documento.
2. Usar subcollections.
3. Usar múltiples collections independientes en la raíz de la base.

Según lo que podemos ver de las pros y contras, podemos definir:
a. Para los usuarios nos conviene utilizar un mapa o array.
b. Para los mensajes, por su parte, nos conviene utilizar subcollections.

## Cómo queda la estructura
[C] => Collection
[D] => Document

[C] 'private-chats' {
    [D] idPrivateChat {
        // Los usuarios los guardamos como un mapa donde las claves son los
        // ids de los usuarios.
        users: {
            idUser1: true,
            idUser2: true,
        }

        [C] messages {
            [D] idMessage { 
                sender_id: idUser1,
                email: '...',
                content: '...',
                created_at: serverTimestamp(),

            }

            ...
        }
    }

    ...
}

Para simplificar el proceso de creación y lectura del chat privado, vamos a hacer que el id
del chat privado sea la combinación ordenada de los dos ids de los usuarios participantes.
Esta combinación va a unirse con un "_".

Por ejemplo, si los ids son:
- asd
- zxc

El id del chat será: asd_zxc

Es importante notar que dependiendo de quién sea el usuario que está autenticado, qué id
es el sender_id y cuál el receiver_id cambia.

Supongamos que tenemos 2 usuarios:
-   ID: asd
    Email: sara@za.com

-   ID: zxc
    Email: pepe@trueno.com

Si el usuario que está autenticado es sara@za.com, vamos a tener que:
    senderId = asd
    receiverId = zxc

Mientras que si el usuario autenticado es pepe@trueno.com, los ids quedan:
    senderId = zxc
    receiverId = asd

¿Por qué es esto relevante?
Porque nos marca que vamos a necesitar tener alguna función que ordene los ids antes de
concatenarlos.
No alcanza con decir que la concatenación es
    senderId + "_" + receiverId
*/
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";

// Creamos un caché donde guardar la lista de los chats que ya verificamos que existan.
const cachedChats = {};

export async function sendPrivateChatMessage({senderId, receiverId, content}) {
    const chatId = generatePrivateChatId(senderId, receiverId);
    
    await verifyOrCreatePrivateChatDocument(senderId, receiverId);
    
    // const chatRef = doc(db, `private-chats/${chatId}`);
    // // Creamos el documento para la conversación privada.
    // await setDoc(chatRef, {
    //     users: {
    //         [senderId]: true,
    //         [receiverId]: true,
    //     }
    // });

    // Ahora que sabemos que el documento de la conversación existe, agregamos el
    // mensaje.
    const messagesRef = collection(db, `private-chats/${chatId}/messages`);

    await addDoc(messagesRef, {
        sender_id: senderId,
        content,
        created_at: serverTimestamp(),
    });
}

export function subscribeToPrivateChat(senderId, receiverId, callback) {
    const chatId = generatePrivateChatId(senderId, receiverId);
    const messagesRef = collection(db, `private-chats/${chatId}/messages`);

    // Pedimos que se ordenen por fecha.
    const q = query(
        messagesRef,
        orderBy('created_at'),
    );

    return onSnapshot(q, snapshot => {
        const messages = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                sender_id: doc.data().sender_id,
                content: doc.data().content,
                created_at: doc.data().created_at?.toDate(),
            }
        });

        // Notificamos los mensajes al callback.
        callback(messages);
    });
}

/**
 * Verifica si existe el documento del chat privado.
 * Si no existe, lo crea.
 * 
 * @param {string} senderId 
 * @param {string} receiverId 
 * @returns {Promise<string>}
 */
async function verifyOrCreatePrivateChatDocument(senderId, receiverId) {
    const chatId = generatePrivateChatId(senderId, receiverId);

    // Preguntamos si ya está cacheado este chat.
    if(cachedChats[chatId]) return chatId;

    const chatRef = doc(db, `private-chats/${chatId}`);

    const chatDoc = await getDoc(chatRef);

    // Preguntamos si existe el documento. En caso negativo, lo creamos.
    if(!chatDoc.exists()) {
        await setDoc(chatRef, {
            users: {
                [senderId]: true,
                [receiverId]: true,
            }
        });
    }

    // Guardamos en caché que ya confirmamos que existe el documento del chat.
    cachedChats[chatId] = true;

    return chatId;
}

/**
 * Genera el id del chat privado a partir de ambos ids de los usuarios participantes.
 * 
 * @param {string} id1 
 * @param {string} id2 
 * @returns {string}
 */
function generatePrivateChatId(id1, id2) {
    // Metemos en un array ambos ids, los ordenamos, y al resultado lo unimos en un string con
    // "_".
    return [id1, id2].sort().join('_');
}