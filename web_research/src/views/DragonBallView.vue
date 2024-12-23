<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import DragonBallCharactersService from '../services/DragonBall/DragonBallCharactersService';
import { IDragonBallPlanet } from '../models/DragonBall/IDragonBallPlanet';
import DragonBallPlanetCard from '../components/DragonBall/DragonBallPlanetCard.vue';

// Crear una instancia del servicio
const dragonBallService = new DragonBallCharactersService();

const planets = ref<IDragonBallPlanet[]>([]); // Lista de planetas
const selectedPlanetId = ref<number>(1); // ID seleccionado para el fetch
const planet = ref<IDragonBallPlanet | null>(null); // Planeta seleccionado individualmente

// Usar onMounted
onMounted(async () => {
  console.log('El componente se ha montado');
  await fetchPlanets(); // Llamamos a fetchPlanets cuando el componente se monta
});

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

// Función para obtener todos los planetas
const fetchPlanets = async () => {
  try {
    const data = await dragonBallService.fetchPlanets(); // Obtener todos los planetas
    planets.value = data || []; // Aseguramos que `data` no sea null
    console.log('Fetched planets:', toRaw(planets.value));
  } catch (error) {
    console.error('Error fetching planets:', error);
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
    <v-btn @click="fetchPlanets" color="primary">Fetch Planets</v-btn>
  </v-card>

  <!-- Mostrar el componente con los datos del planeta seleccionado -->
  <v-card class="elevation-12" v-if="planet">
    <DragonBallPlanetCard
      :id="planet.id"
      :name="planet.name"
      :description="planet.description"
      :image="planet.image"
    />
  </v-card>

  <!-- Mostrar todos los planetas -->
  <v-card class="elevation-12">
    <v-row>
      <v-col v-for="planetItem in planets" :key="planetItem.id" cols="12" md="4">
        <DragonBallPlanetCard
          :id="planetItem.id"
          :name="planetItem.name"
          :description="planetItem.description"
          :image="planetItem.image"
        />
      </v-col>
    </v-row>
    <!-- Mensaje si no hay planetas -->
    <v-list-item v-if="planets.length === 0">
      <h1>No planets found.</h1>
    </v-list-item>
  </v-card>
</template>
