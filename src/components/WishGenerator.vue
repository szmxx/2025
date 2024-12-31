<script setup lang="ts">
import { ref, computed } from 'vue';
import { timeOptions, methodOptions, goalOptions } from '../config/wishes';
import type { WishOption } from '../config/wishes';
import CategorySelector from './CategorySelector.vue';
import WishDisplay from './WishDisplay.vue';

const selectedCategory = ref('wealth');
const selectedTime = ref<WishOption | null>(null);
const selectedMethod = ref<WishOption | null>(null);
const selectedGoal = ref<WishOption | null>(null);

const filteredMethods = computed(() => 
  methodOptions.filter(method => 
    !method.category || method.category.includes(selectedCategory.value)
  )
);

const filteredGoals = computed(() => 
  goalOptions.filter(goal => 
    !goal.category || goal.category.includes(selectedCategory.value)
  )
);

const generateRandom = () => {
  selectedTime.value = timeOptions[Math.floor(Math.random() * timeOptions.length)];
  selectedMethod.value = filteredMethods.value[
    Math.floor(Math.random() * filteredMethods.value.length)
  ];
  selectedGoal.value = filteredGoals.value[
    Math.floor(Math.random() * filteredGoals.value.length)
  ];
};

const reset = () => {
  selectedTime.value = null;
  selectedMethod.value = null;
  selectedGoal.value = null;
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4 relative z-9999">
    <CategorySelector v-model="selectedCategory" />
    
    <WishDisplay
      :category="selectedCategory"
      :selected-time="selectedTime"
      :selected-method="selectedMethod"
      :selected-goal="selectedGoal"
    />

    <div class="mt-8 space-x-4">
      <button
        @click="generateRandom"
        class="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors text-white"
      >
        生成愿望
      </button>
      <button
        @click="reset"
        class="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-full transition-colors text-white"
      >
        重置
      </button>
    </div>
  </div>
</template>