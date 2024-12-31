<script setup lang="ts">
import { categories } from '../config/categories';

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <div class="flex gap-4 mb-8">
    <button
      v-for="category in categories"
      :key="category.id"
      class="px-4 py-2 rounded-full transition-colors"
      :class="[
        modelValue === category.id
          ? 'bg-green-500 text-white'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      ]"
      @click="emit('update:modelValue', category.id)"
    >
      {{ category.title }}
    </button>
  </div>
</template>