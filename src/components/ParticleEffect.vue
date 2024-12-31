<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
let particles: Array<{x: number, y: number, speed: number, size: number}> = [];
let animationFrame: number;

const createParticles = () => {
  const ctx = canvas.value?.getContext('2d');
  if (!ctx || !canvas.value) return;

  particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.value!.width,
    y: Math.random() * canvas.value!.height,
    speed: 0.5 + Math.random(),
    size: Math.random() * 2
  }));
};

const animate = () => {
  const ctx = canvas.value?.getContext('2d');
  if (!ctx || !canvas.value) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

  particles.forEach(particle => {
    particle.y -= particle.speed;
    if (particle.y < 0) {
      particle.y = canvas.value!.height;
    }
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  });

  animationFrame = requestAnimationFrame(animate);
};

const handleResize = () => {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  createParticles();
};

onMounted(() => {
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
  <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full pointer-events-none"></canvas>
</template>