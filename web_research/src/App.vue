<script setup lang="ts">
import { ERoutes } from './router/routes';
</script>

<template>
  <v-app>
    <nav>
        <ul>
          <li> <router-link :to="{ path: ERoutes.LOGIN_VIEW }">Login</router-link> </li>
          <li> <router-link :to="{ path: ERoutes.MAIN_VIEW }">Main</router-link>  </li>
          <li> <router-link :to="{ path: ERoutes.DRAGONBALL_VIEW }">DragonBall</router-link>  </li>
          <li> <router-link :to="{ path: ERoutes.UNKNOWN_VIEW }">Unknown</router-link> </li>
        </ul>
      </nav>
    <RouterView/>
  </v-app>
</template>

<style scoped>

</style>
