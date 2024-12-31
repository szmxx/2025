<script setup lang="ts">
import type { WishOption } from "../config/wishes";
import { categories } from "../config/categories";
import { ref, computed } from "vue";
import WishCard from "./WishCard.vue";

const props = defineProps<{
  selectedTime: WishOption | null;
  selectedMethod: WishOption | null;
  selectedGoal: WishOption | null;
  category: string;
}>();

const wishRef = ref<HTMLDivElement | null>(null);
const selectedTheme = ref<"default" | "dark" | "light">("default");

const downloadImage = async () => {
  if (!wishRef.value) return;

  try {
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(wishRef.value, {
      backgroundColor: selectedTheme.value === "light" ? "#ffffff" : "#000000",
      scale: 2,
    });

    const link = document.createElement("a");
    link.download = "我的2025愿望.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    console.error("Failed to generate image:", error);
  }
};

const categoryTitle = computed(
  () => categories.find((c) => c.id === props.category)?.title
);
</script>

<template>
  <div>
    <!-- 愿望卡片 -->
    <div ref="wishRef" class="max-w-2xl mx-auto">
      <WishCard
        :category="category"
        :category-title="categoryTitle || ''"
        :selected-time="selectedTime"
        :selected-method="selectedMethod"
        :selected-goal="selectedGoal"
        :theme="'light'"
      />
    </div>

    <!-- 下载按钮 -->
    <div class="mt-6 text-center">
      <button
        @click="downloadImage"
        class="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors text-white"
      >
        保存愿望卡片
      </button>
    </div>
  </div>
</template>
