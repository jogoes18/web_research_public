<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import DragonBallCharactersService from '../services/DragonBall/DragonBallCharactersService';
import { IDragonBallPlanet } from '../models/DragonBall/IDragonBallPlanet';
import DragonBallPlanetCard from '../components/DragonBall/DragonBallPlanetCard.vue';

// Crear una instancia del servicio
const dragonBallService = new DragonBallCharactersService();

const planet = ref<IDragonBallPlanet | null>(null);
const selectedPlanetId = ref<number>(1); // ID seleccionado para el fetch

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

// Función para obtener el planeta basado en el ID
const fetchPlanet = async () => {
  try {
    const data = await dragonBallService.fetchPlanet(selectedPlanetId.value); // Usar el ID seleccionado
    planet.value = data;
    console.log('Fetched planet:', toRaw(planet.value)); // Muestra el valor sin Proxy
  } catch (error) {
    console.error('Error fetching planet:', error);
  }
};
</script>

<template>
  <h1>DragonBallView</h1>
  
  <!-- Selector de ID del planeta -->
  <v-card class="elevation-12">
    <v-select
      v-model="selectedPlanetId"
      :items="[1, 2, 3, 4, 5]"
      label="Select Planet ID"
      @update:modelValue="fetchPlanet"
    />
  </v-card>

  <!-- Botón para realizar el fetch -->
  <v-card class="elevation-12">
    <v-btn @click="fetchPlanet" color="primary">Fetch Planet</v-btn>
  </v-card>

  <!-- Mostrar el componente con los datos del planeta -->
  <v-card class="elevation-12">
    <DragonBallPlanetCard
      :id="planet?.id || -1"
      :name="planet?.name || 'Default Title'"
      :description="planet?.description || 'Default text content goes here.\nThis is a new line.'"
      :image="planet?.image || 'Default image'"
    />
  </v-card>
</template>
