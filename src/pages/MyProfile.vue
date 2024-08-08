<template>
  <div class="flex justify-center items-start min-h-screen py-8 bg-gray-100">
    <div class="w-full max-w-lg">
      <h2 class="text-4xl font-bold mb-8 text-center text-blue-800">Mi Perfil</h2>
      <div class="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-6">
        <div class="mb-6">
          <label for="name" class="block text-gray-800 font-semibold mb-2">Nombre:</label>
          <input v-model="name" id="name" type="text" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled>
        </div>
        <div class="mb-6">
          <label for="email" class="block text-gray-800 font-semibold mb-2">Email:</label>
          <input v-model="email" id="email" type="email" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled>
        </div>
        <div class="flex justify-between">
          <button @click="enableEditMode" class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">Editar Perfil</button>
          <button @click="editPasswordMode = true" class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">Cambiar Contraseña</button>
        </div>
      </div>

      <!-- Formulario para editar el perfil -->
      <div v-if="editMode" class="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-6">
        <div class="mb-6">
          <label for="newName" class="block text-gray-800 font-semibold mb-2">Nuevo Nombre:</label>
          <input v-model="newName" id="newName" type="text" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-6">
          <label for="newEmail" class="block text-gray-800 font-semibold mb-2">Nuevo Email:</label>
          <input v-model="newEmail" id="newEmail" type="email" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex items-center justify-between">
          <button @click="updateProfile" class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">Guardar</button>
          <button @click="cancelEdit" class="ml-2 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancelar</button>
        </div>
      </div>

      <!-- Formulario para cambiar la contraseña -->
      <div v-if="editPasswordMode" class="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-6">
        <div class="mb-6">
          <label for="newPassword" class="block text-gray-800 font-semibold mb-2">Nueva Contraseña:</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" v-model="newPassword" id="newPassword" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10">
            <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 px-3 py-2 text-gray-700 focus:outline-none">
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.97 0-9-3.58-9-8 0-1.01.176-1.98.49-2.878M4.838 4.338A10.07 10.07 0 0112 3c4.97 0 9 3.58 9 8 0 1.01-.176 1.98-.49 2.878M9.293 9.293a1 1 0 011.414 1.414m0 0a1 1 0 011.414-1.414m-1.414 1.414a1 1 0 011.414 1.414M3 3l18 18" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h.01M12 12h.01M9 12h.01M12 4.5a7.5 7.5 0 110 15 7.5 7.5 0 010-15zM12 12a3 3 0 110 6 3 3 0 010-6z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <button @click="updatePassword" class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">Guardar</button>
          <button @click="cancelEditPassword" class="ml-2 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancelar</button>
        </div>
      </div>

      <!-- Notificaciones -->
      <div v-if="notificationMessage" :class="notificationClass" class="fixed top-4 right-4 text-white py-2 px-4 rounded shadow-lg">
        {{ notificationMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../services/firebase';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';

export default {
  name: 'MyProfile',
  data() {
    return {
      name: '',
      email: '',
      newName: '',
      newEmail: '',
      newPassword: '',
      showPassword: false,
      editMode: false,
      editPasswordMode: false,
      notificationMessage: '',
      notificationClass: ''
    };
  },
  created() {
    this.loadUserData();
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async loadUserData() {
      const user = auth.currentUser;
      if (user) {
        this.name = user.displayName || '';
        this.email = user.email;
      }
    },
    enableEditMode() {
      this.newName = this.name;
      this.newEmail = this.email;
      this.editMode = true;
    },
    async updateProfile() {
      try {
        const user = auth.currentUser;
        if (user) {
          if (this.newName) {
            await updateProfile(user, { displayName: this.newName });
          }
          if (this.newEmail) {
            await updateEmail(user, this.newEmail);
          }
          // Actualización exitosa
          this.editMode = false;
          this.name = this.newName || this.name;
          this.email = this.newEmail || this.email;
          this.newName = '';
          this.newEmail = '';
          this.showNotification('Perfil actualizado exitosamente.', 'bg-green-500');
        }
      } catch (error) {
        console.error('Error al actualizar el perfil:', error.message);
        this.showNotification('Error al actualizar el perfil.', 'bg-red-500');
      }
    },
    async updatePassword() {
      try {
        const user = auth.currentUser;
        if (user && this.newPassword) {
          // Actualizar la contraseña directamente
          await updatePassword(user, this.newPassword);
          // Actualización exitosa
          this.editPasswordMode = false;
          this.newPassword = '';
          this.showNotification('Contraseña actualizada exitosamente.', 'bg-green-500');
        }
      } catch (error) {
        console.error('Error al actualizar la contraseña:', error.message);
        this.showNotification('Error al actualizar la contraseña.', 'bg-red-500');
      }
    },
    cancelEdit() {
      this.editMode = false;
      this.newName = '';
      this.newEmail = '';
    },
    cancelEditPassword() {
      this.editPasswordMode = false;
      this.newPassword = '';
    },
    showNotification(message, color) {
      this.notificationMessage = message;
      this.notificationClass = color;
      setTimeout(() => {
        this.notificationMessage = '';
      }, 3000);
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.items-start {
  align-items: flex-start;
}

.min-h-screen {
  min-height: 100vh;
}

.w-full {
  width: 100%;
}

.max-w-lg {
  max-width: 32rem;
}

.bg-gray-100 {
  background-color: #f7fafc;
}

.bg-white {
  background-color: #ffffff;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.pt-6 {
  padding-top: 1.5rem;
}

.pb-8 {
  padding-bottom: 2rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.text-center {
  text-align: center;
}

.text-gray-800 {
  color: #2d3748;
}

.text-gray-700 {
  color: #4a5568;
}

.text-gray-600 {
  color: #718096;
}

.text-gray-700 {
  color: #4a5568;
}

.leading-tight {
  line-height: 1.25;
}

.focus\:outline-none {
  outline: 0;
}

.focus\:shadow-outline {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.bg-blue-600 {
  background-color: #3182ce;
}

.hover\:bg-blue-800:hover {
  background-color: #2b6cb0;
}

.bg-green-600 {
  background-color: #38a169;
}

.hover\:bg-green-800:hover {
  background-color: #2f855a;
}

.text-white {
  color: #ffffff;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
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

.ml-2 {
  margin-left: 0.5rem;
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

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.inset-y-0 {
  top: 0;
  bottom: 0;
}

.right-0 {
  right: 0;
}

.pr-10 {
  padding-right: 2.5rem;
}
</style>
