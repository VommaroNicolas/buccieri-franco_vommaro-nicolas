<template>
  <div class="container mx-auto py-8">
    <div class="bg-white shadow-lg rounded-lg p-8">
      <div class="flex flex-col items-center">
        <div class="relative h-80 w-64 rounded-full overflow-hidden mb-4">
          <img v-if="player.photoUrl" :src="player.photoUrl" alt="Foto del jugador" class="h-full w-full object-cover">
        </div>
        <h2 class="text-3xl font-bold mb-4">{{ player.name }}</h2>
        <p class="text-gray-600"><strong>División:</strong> {{ player.division }}</p>
        <p class="text-gray-600"><strong>Fecha de Nacimiento:</strong> {{ player.dob }}</p>
        <p class="text-gray-600 mt-4"><strong>Descripción:</strong> {{ player.description }}</p>
        <div class="mt-4 w-full">
          <h3 class="text-2xl font-bold mb-4">Virtudes:</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(virtud, index) in player.virtudes" :key="index" class="mb-4">
              <div class="flex justify-between mb-1">
                <span class="text-gray-700 font-semibold">{{ virtud.name }}</span>
                <span class="text-gray-600">{{ virtud.rating }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-4">
                <div :style="{ width: `${virtud.rating}%` }" class="bg-blue-500 h-full rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      
      </div>
      <div class="mt-8">
        <h3 class="text-2xl font-bold mb-4">Comentarios</h3>
        <ul>
          <li v-for="(comment, index) in player.comments" :key="index" class="border-b border-gray-200 py-2">
            <p><strong>{{ comment.userEmail }}:</strong> {{ comment.text }}</p>
            <p class="text-sm text-gray-500">{{ formatDate(comment.createdAt) }}</p>
          </li>
        </ul>
        <form v-if="authUser" @submit.prevent="addComment">
          <input v-model="newCommentText" type="text" placeholder="Escribe un comentario..." class="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 focus:outline-none mt-2">Agregar Comentario</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from '../services/firebase';
import { doc, getDoc, addDoc, collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'PlayerDetailInf',
  data() {
    return {
      player: null,
      authUser: null,
      newCommentText: '',
    };
  },
  created() {
    this.fetchPlayerDetails();
    this.checkAuth();
  },
  methods: {
    async fetchPlayerDetails() {
      const playerId = this.$route.params.id;
      const playerDoc = await getDoc(doc(db, 'playersInf', playerId));
      if (playerDoc.exists()) {
        const player = playerDoc.data();
        player.id = playerDoc.id;
        const commentsSnapshot = await getDocs(collection(db, 'playersInf', player.id, 'comments'));
        player.comments = commentsSnapshot.docs.map(commentDoc => {
          const data = commentDoc.data();
          data.createdAt = data.createdAt.toDate(); // Convert Firebase Timestamp to JavaScript Date
          return data;
        });
        this.player = player;
      } else {
        console.error('Player not found');
      }
    },
    checkAuth() {
      onAuthStateChanged(auth, (user) => {
        this.authUser = user;
      });
    },
    async addComment() {
      if (!this.authUser) return;

      try {
        const newComment = {  
          text: this.newCommentText,
          userId: this.authUser.uid,
          userEmail: this.authUser.email,
          createdAt: new Date()
        };
        await addDoc(collection(db, 'playersInf', this.player.id, 'comments'), newComment);
        this.player.comments.push(newComment);
        this.newCommentText = '';
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },
    formatDate(date) {
      return new Intl.DateTimeFormat('es-ES', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(date);
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

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.p-8 {
  padding: 2rem;
}

.object-cover {
  object-fit: cover;
}

.text-gray-600 {
  color: #718096;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-8 {
  margin-top: 2rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.text-blue-500 {
  color: #3b82f6;
}

.text-blue-500:hover {
  color: #2563eb;
}

.border-b {
  border-bottom-width: 1px;
  border-color: #e5e7eb;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.text-sm {
  font-size: 0.875rem;
}

.bg-gray-200 {
  background-color: #edf2f7;
}

.bg-blue-500 {
  background-color: #4299e1;
}

.rounded-full {
  border-radius: 9999px;
}

.h-4 {
  height: 1rem;
}

.h-full {
  height: 100%;
}
</style>
