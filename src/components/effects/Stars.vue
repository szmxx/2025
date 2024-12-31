<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrame: number;

interface Star {
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  brightness: number;
  increasing: boolean;
}

const stars: Star[] = [];

const createStar = (width: number, height: number): Star => ({
  x: Math.random() * width,
  y: Math.random() * height,
  size: Math.random() * 2 + 0.5,
  twinkleSpeed: Math.random() * 0.02 + 0.01,
  brightness: Math.random(),
  increasing: true
});

const initStars = () => {
  if (!canvas.value) return;
  const starCount = Math.floor((canvas.value.width * canvas.value.height) / 10000);
  for (let i = 0; i < starCount; i++) {
    stars.push(createStar(canvas.value.width, canvas.value.height));
  }
};

const animate = () => {
  if (!ctx || !canvas.value) return;
  
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  
  stars.forEach(star => {
    // Update star brightness
    if (star.increasing) {
      star.brightness += star.twinkleSpeed;
      if (star.brightness >= 1) {
        star.increasing = false;
      }
    } else {
      star.brightness -= star.twinkleSpeed;
      if (star.brightness <= 0.3) {
        star.increasing = true;
      }
    }

    // Draw star with gradient
    const gradient = ctx!.createRadialGradient(
      star.x, star.y, 0,
      star.x, star.y, star.size * 2
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${star.brightness})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx!.fillStyle = gradient;
    ctx!.beginPath();
    ctx!.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
    ctx!.fill();
  });

  animationFrame = requestAnimationFrame(animate);
};

const handleResize = () => {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  stars.length = 0;
  initStars();
};

onMounted(() => {
  if (!canvas.value) return;
  ctx = canvas.value.getContext('2d');
  handleResize();
  window.addEventListener('resize', handleResize);
  animate();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  cancelAnimationFrame(animationFrame);
});
</script>

<template>
  <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full pointer-events-none opacity-50"></canvas>
</template>