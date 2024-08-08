<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-50 py-8">
    <MainH1 class="text-3xl font-bold text-gray-800 mb-6">Canal Global</MainH1>

    <div class="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
      <!-- Mensajes -->
      <section class="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 class="sr-only">Lista de Mensajes</h2>

        <div class="min-h-[400px] max-h-[600px] p-4 border border-gray-200 rounded-lg overflow-y-auto">
          <ul v-if="!loadingMessages" class="space-y-4">
            <li v-for="message in messages" :key="message.id" class="bg-gray-100 p-4 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <router-link 
                  class="text-blue-600 underline"
                  :to="userRoute(message.userId)"
                >
                  <b>{{ message.email }}</b>
                </router-link>
                <span class="text-sm text-gray-500">{{ formatDate(message.created_at) }}</span>
              </div>
              <p>{{ message.content }}</p>
            </li>
          </ul>
          <Loader v-else class="flex justify-center items-center h-full" />
        </div>
      </section>

      <!-- Enviar Mensaje -->
      <section class="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Enviar un Mensaje</h2>

        <form @submit.prevent="sendMessage" class="space-y-4">
          <div>
            <span class="block text-sm font-medium text-gray-700 mb-1">Email</span>
            <span class="block text-gray-800">{{ authUser.email }}</span>
          </div>
          <div>
            <MainLabel for="message">Mensaje</MainLabel>
            <textarea
              id="message"
              class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="newMessage.content"
              rows="4"
            ></textarea>
          </div>
          <MainButton type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            Enviar Mensaje
          </MainButton>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue';
import MainButton from '../components/MainButton.vue';
import MainH1 from '../components/MainH1.vue';
import MainLabel from '../components/MainLabel.vue';
import { subscribeToAuth } from '../services/auth';
import { saveChatMessage, subscribeToChatMessages } from '../services/chat';

export default {
  name: "Chat",
  components: { MainH1, Loader, MainLabel, MainButton },
  data() {
    return {
      messages: [],
      loadingMessages: true,
      unsubscribeFromChat: () => {},
      newMessage: {
        content: '',
      },
      authUser: {
        id: null,
        email: null,
      },
      unsubscribeFromAuth: () => {},
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.content.trim() === '') return;

      saveChatMessage({
        userId: this.authUser.id,
        email: this.authUser.email,
        content: this.newMessage.content,
      });
      this.newMessage.content = '';
    },
    formatDate(date) {
      return Intl.DateTimeFormat('es-AR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
      }).format(new Date(date)).replace(',', '');
    },
    userRoute(id) {
      return id !== this.authUser.id ? `/usuario/${id}` : '/perfil';
    }
  },
  mounted() {
    this.unsubscribeFromChat = subscribeToChatMessages(newMessages => {
      this.messages = newMessages;
      this.loadingMessages = false;
      this.$nextTick(() => {
        const container = this.$el.querySelector('.overflow-y-auto');
        container.scrollTop = container.scrollHeight;
      });
    });
    this.unsubscribeFromAuth = subscribeToAuth(newUserData => this.authUser = newUserData);
  },
  unmounted() {
    this.unsubscribeFromAuth();
    this.unsubscribeFromChat();
  }
}
</script>

<style scoped>
.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
}
</style>
