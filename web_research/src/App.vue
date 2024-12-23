<script setup lang="ts">
import { onMounted, toRaw } from 'vue';
import { ERoutes } from './router/routes';
import DragonBallCharactersService from './services/DragonBall/DragonBallCharactersService';

// Crear una instancia del servicio
const dragonBallService = new DragonBallCharactersService();

// Usar onMounted
onMounted(async () => {
  // Aquí puedes realizar acciones cuando el componente se monte
  console.log('El componente se ha montado');
  fetchDragonBallCharacter()
});

const fetchDragonBallCharacter = async() => {
    try {
        await dragonBallService.fetchData();
        const data = toRaw(dragonBallService.getData().value); /// si no paso a raw me salen proxy Objects. que es esto? ToRa y UnWrapRef
        console.log('Fetch on App')
        console.log(data)
       
    } catch(error) {
       alert('FETCH ERROR')
    }
}

</script>


<template>

  <v-app>
   
    <v-card class="elevation-12">
      <v-btn color="primary">Botón</v-btn>
    </v-card>
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
  </v-app>
</template>

<style scoped>

</style>
