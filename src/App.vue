<script setup lang="ts">
import ParticleField from "./components/effects/ParticleField.vue";
import Fireworks from "./components/effects/Fireworks.vue";
import Stars from "./components/effects/Stars.vue";
import WishGenerator from "./components/WishGenerator.vue";
</script>

<template>
  <div class="min-h-screen bg-black">
    <Stars />
    <ParticleField />
    <Fireworks />
    <WishGenerator />
  </div>
</template>
