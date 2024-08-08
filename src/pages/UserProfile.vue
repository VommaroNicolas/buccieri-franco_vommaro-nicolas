<script>
import Loader from '../components/Loader.vue';
import MainH1 from '../components/MainH1.vue';
import { getUserProfileById } from '../services/user-profile';

export default {
    name: 'UserProfile',
    components: { MainH1, Loader },
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            loadingUser: false,
        }
    },
    async mounted() {
        this.loadingUser = true;
        // Leemos el id del parámetro de la ruta ":id".
        // Para acceder a los datos de la ruta podíamos usar la propiedad especial $route.
        this.user = await getUserProfileById(this.$route.params.id);
        this.loadingUser = false;
    }
}
</script>

<template>
    <Loader v-if="loadingUser" />
    <template v-else>
        <MainH1>Perfil de {{ user.email }}</MainH1>

        <hr class="mb-4">

        <router-link 
            class="text-blue-600 underline"
            :to="`/usuario/${user.id}/chat`"
        >Chatear con {{ user.email }}</router-link>
    </template>
</template>