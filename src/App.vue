<template>
  <div class="flex flex-col h-full">
    <nav class="flex justify-between items-center py-4 px-6 bg-gray-800 text-white shadow-lg w-full">
      <div class="flex items-center">
        <router-link to="/">
          <img src="/logo_tipografia_nv.png" alt="Logo" class="w-60">
        </router-link>
      </div>
      <ul :class="isDesktop ? 'flex space-x-6 items-center flex-grow justify-center' : 'hidden'">
        <li class="transition duration-300 hover:text-gray-300">
          <router-link to="/">Inicio</router-link>
        </li>
        <li class="transition duration-300 hover:text-gray-300">
          <router-link :to="authUser.id ? '/chat' : '/iniciar-sesion'">Canal</router-link>
        </li>
        <li class="transition duration-300 hover:text-gray-300">
          <router-link :to="authUser.id ? '/infantiles' : '/iniciar-sesion'">Infantiles</router-link>
        </li>
        <li class="transition duration-300 hover:text-gray-300">
          <router-link :to="authUser.id ? '/reserva' : '/iniciar-sesion'">Reserva</router-link>
        </li>
        <template v-if="authUser.id !== null">
          <li class="transition duration-300 hover:text-gray-300">
            <router-link to="/perfil">Mi Perfil</router-link>
          </li>
        </template>
      </ul>
      <div :class="isDesktop ? 'flex space-x-4 items-center' : 'hidden'">
        <template v-if="authUser.id === null">
          <router-link to="/iniciar-sesion" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Iniciar Sesión</router-link>
          <router-link to="/registro" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">Registrarse</router-link>
        </template>
        <template v-else>
          <form @submit.prevent="handleLogout" class="inline">
            <button class="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded transition duration-300">
              <span class="font-semibold">{{ authUser.email }}</span> (Cerrar Sesión)
            </button>
          </form>
        </template>
      </div>
      <button @click="toggleMenu" class="lg:hidden p-2 text-white bg-red-600 rounded">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </nav>
    <div v-if="isMenuOpen" class="bg-gray-800 text-white lg:hidden w-full">
      <ul class="flex flex-col space-y-2 p-4">
        <li class="transition duration-300 hover:text-gray-300">
          <router-link @click="toggleMenu" to="/">Inicio</router-link>
        </li>
        <li class="transition duration-300 hover:text-gray-300">
          <router-link @click="toggleMenu" :to="authUser.id ? '/chat' : '/iniciar-sesion'">Canal</router-link>
        </li>
        <li class="transition duration-300 hover:text-gray-300">
          <router-link @click="toggleMenu" :to="authUser.id ? '/infantiles' : '/iniciar-sesion'">Infantiles</router-link>
        </li>
        <li class="transition duration-300 hover:text-gray-300">
          <router-link @click="toggleMenu" :to="authUser.id ? '/reserva' : '/iniciar-sesion'">Reserva</router-link>
        </li>
        <template v-if="authUser.id !== null">
          <li class="transition duration-300 hover:text-gray-300">
            <router-link @click="toggleMenu" to="/perfil">Mi Perfil</router-link>
          </li>
          <li>
            <form @submit.prevent="handleLogout" class="inline">
              <button class="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded transition duration-300 w-full text-left">
                <span class="font-semibold">{{ authUser.email }}</span> (Cerrar Sesión)
              </button>
            </form>
          </li>
        </template>
        <template v-else>
          <li class="transition duration-300 hover:text-gray-300">
            <router-link @click="toggleMenu" to="/iniciar-sesion">Iniciar Sesión</router-link>
          </li>
          <li class="transition duration-300 hover:text-gray-300">
            <router-link @click="toggleMenu" to="/registro">Registrarse</router-link>
          </li>
        </template>
      </ul>
    </div>
    <main class="flex-grow container mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg">
      <LoadingOverlay :isLoading="isLoading" />
      <router-view />
    </main>
    <footer class="bg-gray-900 text-white py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <img src="/logo_tipografia_nv.png" alt="Logo" class="w-40">
          </div>
          <div class="flex space-x-6">
            <router-link class="hover:underline" to="/">Inicio</router-link>
            <router-link class="hover:underline" to="/chat">Canal</router-link>
            <router-link class="hover:underline" to="/infantiles">Infantiles</router-link>
            <router-link class="hover:underline" to="/reserva">Reserva</router-link>
            <router-link class="hover:underline" to="/perfil">Mi Perfil</router-link>
          </div>
        </div>
        <div class="flex justify-center mt-4 space-x-6">
          <a href="https://facebook.com" target="_blank" class="hover:underline">Facebook</a>
          <a href="https://twitter.com" target="_blank" class="hover:underline">Twitter</a>
          <a href="https://instagram.com" target="_blank" class="hover:underline">Instagram</a>
        </div>
        <div class="text-center mt-4">
          <p>&copy; SanSemillero 2024. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
    <!-- Notificación -->
    <div v-if="notificationMessage" :class="notificationClass" class="fixed top-4 right-4 text-white py-2 px-4 rounded shadow-lg">
      {{ notificationMessage }}
    </div>
  </div>
</template>

<script>
import Home from './pages/Home.vue';
import LoadingOverlay from './components/LoadingOverlay.vue';
import { logout, subscribeToAuth } from './services/auth';

export default {
  name: 'App',
  components: { Home, LoadingOverlay },
  data() {
    return {
      authUser: {
        id: null,
        email: null,
      },
      notificationMessage: '',
      notificationClass: '',
      isMenuOpen: false,
      isDesktop: window.innerWidth >= 1024,
      isLoading: false,
    };
  },
  methods: {
    async handleLogout() {
      try {
        await logout();
        this.notificationMessage = 'Sesión cerrada exitosamente';
        this.notificationClass = 'bg-red-500';
        this.$router.push({ path: '/iniciar-sesion' });
        this.toggleMenu(); // Ensure menu closes on logout
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        this.notificationMessage = 'Error al cerrar sesión';
        this.notificationClass = 'bg-red-500';
      } finally {
        setTimeout(() => {
          this.notificationMessage = '';
        }, 3000);
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    updateWindowWidth() {
      this.isDesktop = window.innerWidth >= 1024;
      if (this.isDesktop) {
        this.isMenuOpen = false;
      }
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.isLoading = true;
      next();
    });

    this.$router.afterEach(() => {
      this.isLoading = false;
    });
  },
  mounted() {
    subscribeToAuth(newUserData => this.authUser = newUserData);
    window.addEventListener('resize', this.updateWindowWidth);
  },
  unmounted() {
    window.removeEventListener('resize', this.updateWindowWidth);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

nav {
  background-color: #2d3748;
  padding: 1rem 2rem;
  width: 100%;
}

ul {
  list-style: none;
  gap: 1.5rem;
  justify-content: center;
}

a {
  text-decoration: none;
  color: inherit;
  font-size: 1rem;
}

a:hover {
  color: #a0aec0;
}

button {
  cursor: pointer;
  background-color: #e53e3e;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #c53030;
}

main {
  padding: 2rem;
  max-width: 1000px;
  margin: 2rem auto;
}

footer {
  background-color: #1a202c;
  color: #ffffff;
  padding: 1rem;
  text-align: center;
}

.fixed {
  position: fixed;
}

.top-4 {
  top: 1rem;
}

.right-4 {
  right: 1rem;
}

.bg-red-500 {
  background-color: #f56565;
}

.text-white {
  color: #ffffff;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.rounded {
  border-radius: 0.375rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.bg-blue-500 {
  background-color: #4299e1;
}

.bg-blue-700 {
  background-color: #2b6cb0;
}

.bg-green-500 {
  background-color: #48bb78;
}

.bg-green-700 {
  background-color: #2f855a;
}
</style>
