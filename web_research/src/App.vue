<script setup lang="ts">
import { ERoutes } from './router/routes';
import { ref } from 'vue';

const routes = [
  { name: 'Login', path: ERoutes.LOGIN_VIEW },
  { name: 'Main', path: ERoutes.MAIN_VIEW },
  { name: 'DragonBall', path: ERoutes.DRAGONBALL_VIEW },
  { name: 'Unknown', path: ERoutes.UNKNOWN_VIEW },
];

// Estado para controlar si el navigation drawer está visible
const drawerVisible = ref(false);

// Función para activar el navigation drawer cuando el mouse se acerca al borde izquierdo
const showDrawerOnMouseMove = (event: MouseEvent) => {
  if (event.clientX < 50) {  // Si el mouse está a menos de 50px del borde izquierdo
    drawerVisible.value = true;
  } else {
    drawerVisible.value = false;
  }
};

// Añadir el detector de movimiento del mouse
document.addEventListener('mousemove', showDrawerOnMouseMove);
</script>

<template>
  <v-app>
    <!-- Barra superior -->
    <v-app-bar app color="primary">
      <v-toolbar-title class="text-center">Web Research</v-toolbar-title>
    </v-app-bar>

    <!-- Menú lateral, solo visible cuando drawerVisible es true -->
    <v-navigation-drawer v-model="drawerVisible" temporary>
      <v-list>
        <v-list-item v-for="route in routes" :key="route.name">
          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="route.path">{{ route.name }}</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Contenido principal -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Barra inferior -->
    <v-footer color="primary" app>
      <v-spacer></v-spacer>
      <span class="text-center">© 2024 Web Research</span>
    </v-footer>
  </v-app>
</template>

<style scoped>
/* Puedes añadir estilos adicionales si es necesario */
</style>
