<template>
  <div class="container mx-auto py-8">
    <h1 class="text-4xl font-extrabold mb-8 text-center text-gray-900">Jugadores de Reserva</h1>
    
    <div class="flex justify-center mb-8">
      <button v-if="isAdmin" @click="showForm = true" class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none">Agregar Jugador</button>
    </div>

    <form v-if="showForm" @submit.prevent="validateAndAddPlayer" class="mb-8 bg-white shadow-md rounded-lg p-6">
      <div :class="{'mb-6': true, 'border border-red-500': validationErrors.photo}">
        <label for="photo" class="block text-gray-700 font-bold mb-2">Foto del Jugador:</label>
        <div class="flex items-center justify-center w-full mb-4">
          <label for="photo" class="cursor-pointer">
            <div class="relative h-80 w-64 rounded-full overflow-hidden">
              <img v-if="photoUrl" :src="photoUrl" alt="Foto del jugador" class="h-full w-full object-cover">
              <div v-else class="h-full w-full bg-gray-200 flex items-center justify-center">
                <svg class="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
            </div>
          </label>
          <input type="file" id="photo" accept="image/*" class="hidden" @change="handlePhotoUpload">
        </div>
        <p v-if="validationErrors.photo" class="text-red-500 text-sm">La foto es obligatoria.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-bold mb-2">Nombre y Apellido:</label>
          <input v-model="name" id="name" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
        </div>
        <div class="mb-4">
          <label for="dob" class="block text-gray-700 font-bold mb-2">Fecha de Nacimiento:</label>
          <input v-model="dob" id="dob" type="date" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
        </div>
        <div class="mb-4 col-span-2">
          <label for="description" class="block text-gray-700 font-bold mb-2">Descripción del jugador:</label>
          <textarea v-model="description" id="description" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required></textarea>
        </div>
        <div class="mb-4 col-span-2">
          <label class="block text-gray-700 font-bold mb-2">Virtudes del jugador:</label>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="virtud in virtudes" :key="virtud.name" :class="{'border border-red-500 p-2': validationErrors.virtudes[virtud.name], 'p-2': !validationErrors.virtudes[virtud.name]}" class="mb-4">
              <label :for="virtud.name" class="block text-gray-700 font-bold">{{ virtud.name }}:</label>
              <input type="range" v-model="virtud.rating" min="0" max="100" class="w-full" />
              <div class="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div :style="{ width: virtud.rating + '%' }" class="h-full bg-blue-500"></div>
              </div>
              <p class="text-right text-sm text-gray-700">{{ virtud.rating }}%</p>
            </div>
          </div>
        </div>
        <div class="mb-4 col-span-2">
          <label for="position" class="block text-gray-700 font-bold mb-2">Posición:</label>
          <select v-model="position" id="position" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
            <option value="" disabled>Selecciona la posición</option>
            <option value="Arquero">Arquero</option>
            <option value="Defensor">Defensor</option>
            <option value="Mediocampista">Mediocampista</option>
            <option value="Delantero">Delantero</option>
          </select>
        </div>
      </div>
      <div class="flex justify-end gap-4">
        <button type="submit" class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none">Agregar Jugador</button>
        <button @click="cancelForm" type="button" class="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 focus:outline-none">Cancelar</button>
      </div>
      <p v-if="validationMessage" class="text-red-500 text-sm mt-4">{{ validationMessage }}</p>
    </form>

    <div class="mb-8">
      <label for="filter" class="block text-gray-700 font-bold mb-2">Filtrar por posición:</label>
      <div class="relative">
        <select v-model="selectedPosition" id="filter" class="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 appearance-none transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
          <option value="">Todas las posiciones</option>
          <option value="Arquero">Arquero</option>
          <option value="Defensor">Defensor</option>
          <option value="Mediocampista">Mediocampista</option>
          <option value="Delantero">Delantero</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </div>
      </div>
    </div>

    <h2 class="text-2xl font-bold mb-4">Publicaciones de Jugadores</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="(player, index) in filteredPlayers" :key="index" class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <div class="flex flex-col items-center">
          <div class="relative h-80 w-64 rounded-full overflow-hidden mb-4">
            <img v-if="player.photoUrl" :src="player.photoUrl" alt="Foto del jugador" class="h-full w-full object-cover">
          </div>
          <p class="text-xl font-semibold text-center">{{ player.name }}</p>
          <p class="text-gray-600"><strong>Posición:</strong> {{ player.position }}</p>
          <button @click="viewPlayerDetails(player.id)" class="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none">Ver Más</button>
        </div>
      </div>
    </div>

    <!-- Notificaciones -->
    <transition name="fade">
      <div v-if="isLoading" class="fixed top-16 right-4 bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-lg">
        Cargando...
      </div>
    </transition>
    <transition name="fade">
      <div v-if="notificationMessage" class="fixed top-16 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
        {{ notificationMessage }}
      </div>
    </transition>
    <transition name="fade">
      <div v-if="errorMessage" class="fixed top-16 right-4 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg">
        {{ errorMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
import { db, auth, storage } from '../services/firebase';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'Reserva',
  data() {
    return {
      name: '',
      dob: '',
      description: '',
      position: '',
      photo: null,
      photoUrl: '',
      players: [],
      isAdmin: false,
      authUser: null,
      newCommentText: '',
      selectedPosition: '',
      isLoading: false,
      notificationMessage: '',
      errorMessage: '',
      showForm: false,
      validationMessage: '',
      validationErrors: {
        photo: false,
        virtudes: {}
      },
      virtudes: [
        { name: 'Ritmo', rating: 0 },
        { name: 'Ataque', rating: 0 },
        { name: 'Pase', rating: 0 },
        { name: 'Defensa', rating: 0 },
        { name: 'Tiro al arco', rating: 0 },
        { name: 'Pierna mala', rating: 0 },
        { name: 'Regate', rating: 0 },
        { name: 'Fisico', rating: 0 }
      ]
    };
  },
  computed: {
    filteredPlayers() {
      if (this.selectedPosition) {
        return this.players.filter(player => player.position === this.selectedPosition);
      }
      return this.players;
    }
  },
  created() {
    this.fetchPlayers();
    this.checkUserRole();
    this.checkAuth();
  },
  methods: {
    validateAndAddPlayer() {
      this.validationMessage = '';
      this.validationErrors.photo = false;
      this.validationErrors.virtudes = {};

      if (!this.photo) {
        this.validationErrors.photo = true;
        this.validationMessage = 'Debe agregar una foto.';
      }

      this.virtudes.forEach(virtud => {
        if (virtud.rating === 0) {
          this.validationErrors.virtudes[virtud.name] = true;
        }
      });

      if (Object.values(this.validationErrors.virtudes).includes(true)) {
        this.validationMessage = 'Debe completar todas las virtudes.';
      }

      if (!this.validationErrors.photo && !Object.values(this.validationErrors.virtudes).includes(true)) {
        this.addPlayer();
      }
    },
    async addPlayer() {
      try {
        this.isLoading = true;
        this.notificationMessage = 'Cargando jugador...';

        if (this.photo) {
          const storageRef = ref(storage, `players/${this.photo.name}`);
          await uploadBytes(storageRef, this.photo);
          this.photoUrl = await getDownloadURL(storageRef);
        }

        const newPlayer = {
          name: this.name,
          dob: this.dob,
          description: this.description,
          virtudes: this.virtudes.map(virtud => ({ name: virtud.name, rating: virtud.rating })),
          position: this.position,
          photoUrl: this.photoUrl || ''
        };

        const playerRef = await addDoc(collection(db, 'players'), newPlayer);
        this.players.push({ ...newPlayer, id: playerRef.id, comments: [] });

        this.name = '';
        this.dob = '';
        this.description = '';
        this.position = '';
        this.photo = null;
        this.photoUrl = '';
        this.virtudes = [
          { name: 'Ritmo', rating: 0 },
          { name: 'Ataque', rating: 0 },
          { name: 'Pase', rating: 0 },
          { name: 'Defensa', rating: 0 },
          { name: 'Tiro al arco', rating: 0 },
          { name: 'Pierna mala', rating: 0 },
          { name: 'Regate', rating: 0 },
          { name: 'Fisico', rating: 0 }
        ];
        this.showForm = false;

        this.isLoading = false;
        this.notificationMessage = 'Jugador agregado exitosamente';
        setTimeout(() => {
          this.notificationMessage = '';
        }, 3000);
      } catch (error) {
        console.error('Error adding player:', error);
        this.isLoading = false;
        this.errorMessage = 'Error al agregar el jugador';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    },
    handlePhotoUpload(event) {
      const file = event.target.files[0];
      this.photo = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      this.validationErrors.photo = false;
    },
    async fetchPlayers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'players'));
        const players = [];
        for (const doc of querySnapshot.docs) {
          const player = doc.data();
          player.id = doc.id;
          const commentsSnapshot = await getDocs(collection(db, 'players', player.id, 'comments'));
          player.comments = commentsSnapshot.docs.map(commentDoc => commentDoc.data());
          players.push(player);
        }
        this.players = players;
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    },
    checkUserRole() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            this.isAdmin = userDoc.data().role === 'admin';
          }
        }
      });
    },
    checkAuth() {
      onAuthStateChanged(auth, (user) => {
        this.authUser = user;
      });
    },
    async addComment(playerId, text) {
      if (!this.authUser) return;

      try {
        const newComment = {  
          text,
          userId: this.authUser.uid,
          userEmail: this.authUser.email,
          createdAt: new Date()
        };
        await addDoc(collection(db, 'players', playerId, 'comments'), newComment);
        const player = this.players.find(p => p.id === playerId);
        player.comments.push(newComment);
        this.newCommentText = '';
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },
    viewPlayerDetails(playerId) {
      this.$router.push({ name: 'PlayerDetail', params: { id: playerId } });
    },
    cancelForm() {
      this.showForm = false;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.bg-white {
  background-color: #ffffff;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.p-6 {
  padding: 1.5rem;
}

.gap-8{
  gap: 100px;
}

.object-cover {
  object-fit: cover;
}

.text-gray-700 {
  color: #4a5568;
}

.text-gray-600 {
  color: #718096;
}

.text-blue-600 {
  color: #2563eb;
}

.text-blue-600:hover {
  color: #1e40af;
}

.text-center {
  text-align: center;
}

.leading-tight {
  line-height: 1.25;
}

.border {
  border-width: 1px;
  border-color: #e5e7eb;
}

.focus\:outline-none:focus {
  outline: 0;
}

.focus\:border-blue-500:focus {
  border-color: #3b82f6;
}

.focus\:ring {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.focus\:ring-blue-200:focus {
  box-shadow: 0 0 0 3px rgba(191, 219, 254, 0.5);
}

.bg-blue-600 {
  background-color: #2563eb;
}

.bg-blue-600:hover {
  background-color: #1e40af;
}

.bg-gray-600 {
  background-color: #4b5563;
}

.bg-gray-600:hover {
  background-color: #374151;
}

.text-white {
  color: #ffffff;
}

.font-semibold {
  font-weight: 600;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.rounded {
  border-radius: 0.375rem;
}

.transition {
  transition: all 0.3s ease-in-out;
}

.duration-300 {
  transition-duration: 0.3s;
}

.ease-in-out {
  transition-timing-function: ease-in-out;
}

.transform {
  transform: translateZ(0);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.fixed {
  position: fixed;
}

.top-16 {
  top: 4rem;
}

.right-4 {
  right: 1rem;
}

.bg-yellow-500 {
  background-color: #ecc94b;
}

.bg-green-500 {
  background-color: #48bb78;
}

.bg-red-500 {
  background-color: #f56565;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Slider styles */
input[type="range"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  background: transparent;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  background: transparent;
  border: none;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 8px;
  background: transparent;
  border: none;
}

input[type="range"]::-ms-track {
  width: 100%;
  height: 8px;
  background: transparent;
  border: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  background: #2563eb;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  height: 16px;
  width: 16px;
  background: #2563eb;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-ms-thumb {
  height: 16px;
  width: 16px;
  background: #2563eb;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: transparent;
}

input[type="range"]:focus::-moz-range-track {
  background: transparent;
}

input[type="range"]:focus::-ms-track {
  background: transparent;
}
</style>
