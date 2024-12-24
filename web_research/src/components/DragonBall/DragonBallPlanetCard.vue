<script setup lang="ts">

interface IDragonBallPlanetCard {
  id?: number;
  name?: string;
  description?: string;
  image?: string;
}

// Props con valores por defecto
const props = withDefaults(defineProps<IDragonBallPlanetCard>(), {
  id: -1,
  name: 'Default Title',
  description: 'Default text content goes here.\nThis is a new line.',
  image: 'Default image'
});

</script>


<template>
 <v-card class="elevation-12">
    <h2>id: {{ props.id }}</h2>
    <h2>name: {{ props.name }}</h2>
    <p>{{ props.description }}</p>
    <img :src="props.image" alt="Planet Image" width="200" />
 </v-card>
</template>