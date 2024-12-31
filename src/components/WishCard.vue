<script setup lang="ts">
import type { WishOption } from "../config/wishes";
import { computed } from "vue";
interface Props {
  category: string;
  categoryTitle: string;
  selectedTime: WishOption | null;
  selectedMethod: WishOption | null;
  selectedGoal: WishOption | null;
  theme?: "default" | "dark" | "light"; // 支持多种主题风格
}

const props = withDefaults(defineProps<Props>(), {
  theme: "default",
});

// 主题样式配置
const themeStyles = {
  default: {
    wrapper: "bg-black-50 text-white",
    title: "text-green-400",
    underline: "border-green-400",
  },
  dark: {
    wrapper: "bg-gray-900 text-white",
    title: "text-purple-400",
    underline: "border-purple-400",
  },
  light: {
    wrapper:
      "bg-white/10 text-gray-800 text-white backdrop-blur-md backdrop-saturate-150 backdrop-brightness-125",
    title: "text-red-600",
    underline: "border-red-600",
  },
};

const currentTheme = computed(() => themeStyles[props.theme]);
</script>

<template>
  <div
    class="relative pt-6 pb-12 px-12 rounded-lg shadow-2xl"
    :class="currentTheme.wrapper"
  >
    <div class="text-center space-y-8">
      <h2 class="text-4xl font-bold" :class="currentTheme.title">
        {{ categoryTitle }}
      </h2>

      <div class="text-xl space-y-4">
        <p>
          我希望在
          <span
            class="inline-block min-w-20 mx-2 pb-1 text-center border-b-2"
            :class="currentTheme.underline"
          >
            {{ selectedTime?.text || "_____" }}
          </span>
        </p>
        <p>
          通过
          <span
            class="inline-block min-w-20 mx-2 pb-1 text-center border-b-2"
            :class="currentTheme.underline"
          >
            {{ selectedMethod?.text || "_____" }}
          </span>
        </p>
        <p>
          实现
          <span
            class="inline-block min-w-20 mx-2 pb-1 text-center border-b-2"
            :class="currentTheme.underline"
          >
            {{ selectedGoal?.text || "_____" }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
