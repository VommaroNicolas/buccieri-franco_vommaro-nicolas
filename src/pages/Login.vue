<template>
  <div class="flex justify-center items-start min-h-screen py-8 bg-gray-50">
    <div class="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 mt-16">
      <MainH1 class="text-center text-3xl font-bold text-gray-800 mb-6">Ingresar con tu Cuenta</MainH1>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <MainLabel for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</MainLabel>
          <MainInput
            type="email"
            id="email"
            v-model="user.email"
            placeholder="ejemplo@correo.com"
            :class="{'border-red-500': errors.email}"
            class="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="errors.email" class="text-red-500 text-xs italic mt-2">{{ errors.email }}</p>
        </div>
        <div class="relative">
          <MainLabel for="password" class="block text-gray-700 text-sm font-bold mb-2">Contraseña</MainLabel>
          <MainInput
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="user.password"
            placeholder="********"
            :class="{'border-red-500': errors.password}"
            class="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="button" @click="togglePassword" class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <svg v-if="!showPassword" class="h-6 text-gray-700" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m0 0V6m0 6v6m0-6h6m-6 0H6"/>
            </svg>
            <svg v-else class="h-6 text-gray-700" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825c-1.035.575-2.177.825-3.375.825s-2.34-.25-3.375-.825M12 14.625c-1.035.575-2.177.825-3.375.825s-2.34-.25-3.375-.825M12 6.75a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5zM9.75 9.75a2.25 2.25 0 113.5 3.5 2.25 2.25 0 01-3.5-3.5z"/>
            </svg>
          </button>
          <p v-if="errors.password" class="text-red-500 text-xs italic mt-2">{{ errors.password }}</p>
        </div>
        <div>
          <MainButton
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Ingresar
          </MainButton>
        </div>
      </form>
      <p class="text-center text-gray-600 mt-4">
        ¿No tenes una cuenta? 
        <router-link to="/registro" class="text-blue-500 hover:text-blue-700">Registrate ahora!</router-link>
      </p>
      <transition name="fade">
        <div v-if="notificationMessage" :class="notificationClass" class="fixed top-4 right-4 text-white py-2 px-4 rounded-lg shadow-lg">
          {{ notificationMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import MainButton from '../components/MainButton.vue';
import MainH1 from '../components/MainH1.vue';
import MainInput from '../components/MainInput.vue';
import MainLabel from '../components/MainLabel.vue';
import { login } from '../services/auth';

export default {
  name: "Login",
  components: { MainH1, MainLabel, MainInput, MainButton },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      loading: false,
      notificationMessage: '',
      notificationClass: '',
      showPassword: false,
      errors: {}
    }
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.user.email) {
        this.errors.email = 'El email es requerido';
      }
      if (!this.user.password) {
        this.errors.password = 'La contraseña es requerida';
      }
      return Object.keys(this.errors).length === 0;
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        return;
      }
      this.loading = true;
      this.notificationMessage = '';
      this.notificationClass = '';
      try {
        await login(this.user.email, this.user.password);
        this.notificationMessage = 'Inicio de sesión exitoso';
        this.notificationClass = 'bg-green-500';
        this.$router.push({ path: '/perfil' });
      } catch (error) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          this.notificationMessage = 'Email o contraseña incorrectos';
          this.errors.email = ' ';
          this.errors.password = ' ';
        } else {
          this.notificationMessage = 'Error en la cargar los datos. Inténtalo de nuevo';
        }
        this.notificationClass = 'bg-red-500';
      } finally {
        this.loading = false;
        setTimeout(() => {
          this.notificationMessage = '';
        }, 3000);
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
}
</style>
