
import { ERoutes, ERoutesNames } from './routes.ts';
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

import LoginView from '../views/LoginView.vue';
import MainView  from '../views/MainView.vue';
import UnknownView from '../views/UnknownView.vue';

// Define las rutas
const routes: Array<RouteRecordRaw> = [
    {
        path:  ERoutes.LOGIN_VIEW,
        name:  ERoutesNames.LOGIN_VIEW,
        component: LoginView,
        meta: { needsToken: false}, /// Indicamos que esta vista no requiere token
       // beforeEnter: isLogged,       // Aplica el guardia isLogged para esta ruta
    },
    {
        path:  ERoutes.MAIN_VIEW,
        name:  ERoutesNames.MAIN_VIEW,
        component: MainView,
       // meta: { needsToken: true} /// Indicamos que esta vista SI requiere token
    },
    {
        path:  ERoutes.UNKNOWN_VIEW,
        name:  ERoutesNames.UNKNOWN_VIEW,
        component: UnknownView,
       // meta: { needsToken: true} /// Indicamos que esta vista SI requiere token
    },
  

];

// Crear el router
const router = createRouter({
  history: createWebHashHistory(), // Usar el historial de navegación
  routes, // Rutas definidas
});

///router.beforeEach(requireAuth)


export default router;