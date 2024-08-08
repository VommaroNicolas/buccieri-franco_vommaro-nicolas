// Rutas de imports con npm
// Cuando ponemos un origen en un import (lo que sigue al from)
// en un proyecto de npm, podemos referirnos a archivos de nuestro
// proyecto, o a paquetes de npm.
// ¿Cómo sabe npm cuándo es un archivo local del proyecto, y
// cuándo un paquete?
// Si solo se pone un nombre, sin un identificador inicial de
// ruta, entonces automáticamente se asume que es un paquete.
// Por ejemplo, si escribimos:
//  import { createApp } from 'vue';
// 'vue' no tiene un comienzo con un identificador de ruta, así
// que reconoce que debe ser un paquete de npm.
// Si en cambio, queremos un archivo local, tenemos que empezar
// con una ruta.
// Si es un archivo que está en una carpeta anterior, entonces
// podemos empezar con el "../". Por ejemplo:
//  import App from '../components/App.vue'
// El "../" indica un origen de un directorio, con lo que npm
// sabe que es un archivo local y no un paquete.
// Si queremos importar un archivo que esta en la misma carpeta,
// tenemos que tener cuidado de asegurarnos de prefijar la
// ruta con "./". Por ejemplo:
//  import App from './App.vue';
// El "./" significa "directorio actual". Al estar presente, 
// npm sabe que es un archivo local. Si no lo ponemos, y 
// dejamos solo:
//  import App from 'App.vue';
// npm va a asumir que 'App.vue' es un paquete de npm que debe
// buscar en [node_modules]. Obviamente, no es el caso, por lo
// que va a tirar un error.
import './style.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';

// Creamos nuestra aplicación de Vue usando el componente App
// como raíz.
const app = createApp(App);
app.use(router);

// Montamos la aplicación en el elemento con el id "app" del HTML.
app.mount('#app');