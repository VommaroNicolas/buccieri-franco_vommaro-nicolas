<template>
  <div class="container mx-auto py-8">
    <h2 class="text-4xl font-extrabold mb-8 text-center text-gray-900">Jugadores de Divisiones Inferiores</h2>

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
          <input v-model="name" id="name" type="text" :class="{'border border-red-500': validationErrors.name, 'border border-gray-300': !validationErrors.name}" class="w-full p-3 rounded-lg focus:outline-none focus:border-blue-500" required>
        </div>
        <div class="mb-4">
          <label for="dob" class="block text-gray-700 font-bold mb-2">Fecha de Nacimiento:</label>
          <input v-model="dob" id="dob" type="date" :class="{'border border-red-500': validationErrors.dob, 'border border-gray-300': !validationErrors.dob}" class="w-full p-3 rounded-lg focus:outline-none focus:border-blue-500" required>
        </div>
        <div class="mb-4 col-span-2">
          <label for="description" class="block text-gray-700 font-bold mb-2">Descripción del jugador:</label>
          <textarea v-model="description" id="description" :class="{'border border-red-500': validationErrors.description, 'border border-gray-300': !validationErrors.description}" class="w-full p-3 rounded-lg focus:outline-none focus:border-blue-500" required></textarea>
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
          <label for="division" class="block text-gray-700 font-bold mb-2">División:</label>
          <select v-model="division" id="division" :class="{'border border-red-500': validationErrors.division, 'border border-gray-300': !validationErrors.division}" class="w-full p-3 rounded-lg focus:outline-none focus:border-blue-500" required>
            <option value="" disabled>Selecciona la división</option>
            <option value="4ta">4ta</option>
            <option value="5ta">5ta</option>
            <option value="6ta">6ta</option>
            <option value="7ma">7ma</option>
          </select>
        </div>
      </div>
      <div v-if="validationMessage" class="text-red-500 font-bold mb-4">{{ validationMessage }}</div>
      <div class="flex justify-end gap-4">
        <button type="submit" class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none">Agregar Jugador</button>
        <button @click="cancelForm" type="button" class="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 focus:outline-none">Cancelar</button>
      </div>
    </form>

    <div class="mb-8">
      <label for="filter" class="block text-gray-700 font-bold mb-2">Filtrar por división:</label>
      <div class="flex justify-center gap-4 mb-4">
        <button v-for="division in Object.keys(players)" :key="division" @click="selectedDivision = division" :class="{'bg-blue-600 text-white': selectedDivision === division, 'bg-gray-200 text-gray-700': selectedDivision !== division}" class="px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:text-white transition duration-300">
          {{ division }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(player, index) in filteredPlayers" :key="index" class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <div class="flex flex-col items-center">
          <img v-if="player.photoUrl" :src="player.photoUrl" alt="Foto del jugador" class="h-80 w-64 object-cover rounded-full shadow-lg mb-4">
          <p class="text-xl font-semibold text-center">{{ player.name }}</p>
          <p class="text-gray-600"><strong>Fecha de Nacimiento:</strong> {{ player.dob }}</p>
          <button @click="viewPlayerDetails(player.id)" class="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none">Ver Más</button>
        </div>
      </div>
    </div>

    <!-- Notificaciones -->
    <transition name="fade">
      <div v-if="isLoading" class="fixed top-4 right-4 bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-lg">
        Cargando...
      </div>
    </transition>
    <transition name="fade">
      <div v-if="notificationMessage" class="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
        {{ notificationMessage }}
      </div>
    </transition>
    <transition name="fade">
      <div v-if="errorMessage" class="fixed top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg">
        {{ errorMessage }}
      </div>
    </transition>

    <!-- Modal de bienvenida -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto">
          <h2 class="text-2xl font-bold mb-4">¡Bienvenidos!</h2>
          <p class="mb-4">¡Bienvenidos a nuestra página de Reserva Infantil! Queremos informarles que esta página está dedicada a mostrar a los pequeños jugadores de nuestras divisiones de 6ta, 7ma, 8va y 9na. Queremos asegurarles que todo el contenido aquí presente está supervisado y cuenta con el consentimiento de los padres y tutores de los niños. Estamos comprometidos con la seguridad y bienestar de nuestros jugadores más jóvenes, y cada publicación ha sido revisada para garantizar que cumple con nuestras políticas de protección infantil. Gracias por visitar nuestra página y por su apoyo continuo a nuestros pequeños atletas.</p>
          <button @click="closeModal" class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none">Cerrar</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { db, auth, storage } from '../services/firebase';
import { collection, addDoc, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'ReservaInfantil',
  data() {
    return {
      name: '',
      dob: '',
      description: '',
      virtudes: [
        { name: 'Ritmo', rating: 0 },
        { name: 'Ataque', rating: 0 },
        { name: 'Pase', rating: 0 },
        { name: 'Defensa', rating: 0 },
        { name: 'Tiro al arco', rating: 0 },
        { name: 'Pierna mala', rating: 0 },
        { name: 'Regate', rating: 0 },
        { name: 'Fisico', rating: 0 }
      ],
      photo: null,
      photoUrl: '',
      division: '',
      players: {
        '4ta': [],
        '5ta': [],
        '6ta': [],
        '7ma': []
      },
      selectedDivision: '6ta',
      isAdmin: false,
      authUser: null,
      newCommentText: '',
      isLoading: false,
      notificationMessage: '',
      errorMessage: '',
      showForm: false,
      showModal: true,
      validationErrors: {
        photo: false,
        name: false,
        dob: false,
        description: false,
        virtudes: {},
        division: false
      },
      validationMessage: ''
    };
  },
  created() {
    this.fetchPlayers();
    this.checkUserRole();
    this.checkAuth();
  },
  computed: {
    filteredPlayers() {
      return this.players[this.selectedDivision];
    }
  },
  methods: {
    validateAndAddPlayer() {
      let valid = true;
      this.validationErrors.photo = !this.photo;
      this.validationErrors.name = !this.name;
      this.validationErrors.dob = !this.dob;
      this.validationErrors.description = !this.description;
      this.validationErrors.division = !this.division;

      valid = valid && !this.validationErrors.photo;
      valid = valid && !this.validationErrors.name;
      valid = valid && !this.validationErrors.dob;
      valid = valid && !this.validationErrors.description;
      valid = valid && !this.validationErrors.division;

      for (let virtud of this.virtudes) {
        this.validationErrors.virtudes[virtud.name] = virtud.rating === 0;
        valid = valid && !this.validationErrors.virtudes[virtud.name];
      }
      if (valid) {
        this.addPlayer();
      } else {
        this.validationMessage = 'Por favor, completa todas las virtudes.';
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
          virtudes: this.virtudes,
          division: this.division,
          photoUrl: this.photoUrl || ''
        };

        const playerRef = await addDoc(collection(db, 'playersInf'), newPlayer);
        this.players[this.division].push({ ...newPlayer, id: playerRef.id, comments: [] });

        this.name = '';
        this.dob = '';
        this.description = '';
        this.virtudes = this.virtudes.map(v => ({ ...v, rating: 0 }));
        this.division = '';
        this.photo = null;
        this.photoUrl = '';
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
        this.validationErrors.photo = false;
      };
      reader.readAsDataURL(file);
    },
    async fetchPlayers() {
      try {
        const playersQuery = query(collection(db, 'playersInf'), where('division', 'in', ['4ta', '5ta', '6ta', '7ma']));
        const querySnapshot = await getDocs(playersQuery);
        querySnapshot.forEach(async (doc) => {
          const player = doc.data();
          player.id = doc.id;
          player.comments = [];
          const commentsSnapshot = await getDocs(collection(db, 'playersInf', player.id, 'comments'));
          commentsSnapshot.forEach(commentDoc => {
            player.comments.push(commentDoc.data());
          });
          this.players[player.division].push(player);
        });
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    },
    checkUserRole() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            this.isAdmin = userData.role === 'admin';
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
        await addDoc(collection(db, 'playersInf', playerId, 'comments'), newComment);
        for (let division in this.players) {
          const player = this.players[division].find(p => p.id === playerId);
          if (player) {
            player.comments.push(newComment);
            break;
          }
        }
        this.newCommentText = '';
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },
    viewPlayerDetails(playerId) {
      this.$router.push({ name: 'PlayerDetailInf', params: { id: playerId } });
    },
    closeModal() {
      this.showModal = false;
    },
    cancelForm() {
      this.showForm = false;
    }
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.focus\:outline-none:focus {
  outline: 0;
}

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

.gap-8 {
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
</style>
