<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import DragonBallCharactersService from '../services/DragonBall/DragonBallCharactersService';
import { IDragonBallPlanet } from '../models/DragonBall/IDragonBallPlanet';

// Crear una instancia del servicio
const dragonBallService = new DragonBallCharactersService();

const planet = ref<IDragonBallPlanet | null>(null);

// Usar onMounted
onMounted(async () => {
  console.log('El componente se ha montado');
  await fetchDragonBallCharacter();
});

const fetchDragonBallCharacter = async () => {
  try {
    await dragonBallService.fetchData();
    const data = toRaw(dragonBallService.getData().value);
    console.log('Fetch on App');
    console.log(data);
  } catch (error) {
    alert('FETCH ERROR');
  }
};

const fetchPlanet = async () => {
  try {
    const data = await dragonBallService.fetchPlanet('1');
    planet.value = data;
    console.log('Fetched planet:', toRaw(planet.value)); // Muestra el valor sin Proxy
  } catch (error) {
    console.error('Error fetching planet:', error);
  }
};
</script>

<template>
  <h1>DragonBallView</h1>
  <v-card class="elevation-12">
    <v-btn @click="fetchPlanet" color="primary">Fetch Planet</v-btn>
  </v-card>
  <v-card class="elevation-12">
    <h1>Planet</h1>
    <!-- Condicional para evitar errores si planet es null -->
    <template v-if="planet">
      <h2>id: {{ planet.id }}</h2>
      <h2>name: {{ planet.name }}</h2>
      <p>{{ planet.description }}</p>
      <img :src="planet.image" alt="Planet Image" width="200" />
    </template>
    <template v-else>
      <p>No planet data available. Click "Fetch Planet" to load a planet.</p>
    </template>
  </v-card>
</template>
