import Home from '../pages/Home.vue';
import Chat from '../pages/Chat.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import MyProfile from '../pages/MyProfile.vue';
import UserProfile from '../pages/UserProfile.vue';
import PrivateChat from '../pages/PrivateChat.vue';
import Reserva from '../pages/Reserva.vue';
import Infantiles from '../pages/Infantiles.vue';
import PlayerDetail from '../pages/PlayerDetail.vue';
import PlayerDetailInf from '../pages/PlayerDetailInf.vue'; // Importa el nuevo componente
import { createRouter, createWebHashHistory } from 'vue-router';
import { subscribeToAuth } from '../services/auth';

const routes = [
    { path: '/',                    component: Home },
    { path: '/iniciar-sesion',      component: Login },
    { path: '/registro',            component: Register },
    { path: '/chat',                component: Chat,        meta: { requiresAuth: true } },
    { path: '/perfil',              component: MyProfile,   meta: { requiresAuth: true } },
    { path: '/usuario/:id',         component: UserProfile, meta: { requiresAuth: true } },
    { path: '/usuario/:id/chat',    component: PrivateChat, meta: { requiresAuth: true } },
    { path: '/reserva',             component: Reserva },
    { path: '/infantiles',          component: Infantiles },
    { path: '/player/:id',          component: PlayerDetail, name: 'PlayerDetail' },
    { path: '/playerInf/:id',       component: PlayerDetailInf, name: 'PlayerDetailInf' }, // Añade la nueva ruta
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

let authUser = {
    id: null,
    email: null,
}

subscribeToAuth(newUserData => authUser = newUserData);

router.beforeEach((to, from) => {
    if(authUser.id === null && to.meta.requiresAuth) {
        return {
            path: '/iniciar-sesion',
        };
    }
});

export default router;
