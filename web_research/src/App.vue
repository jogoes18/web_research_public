<script setup lang="ts">
import { ERoutes} from './router/routes'
</script>

<template>
  <nav>
      <ul>
        <li>
          <!-- Usar router-link con la ruta definida en el enum -->
          <router-link :to="{ path: ERoutes.LOGIN_VIEW }">Login</router-link>
        </li>
        <li>
          <router-link :to="{ path: ERoutes.MAIN_VIEW }">Main</router-link>
        </li>
        <li>
          <router-link :to="{ path: ERoutes.UNKNOWN_VIEW }">Unknown</router-link>
        </li>
      </ul>
    </nav>

  <RouterView/>
</template>

<style scoped>

</style>
