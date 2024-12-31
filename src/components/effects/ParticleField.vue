<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrame: number;

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const particles: Particle[] = [];

const createParticle = (x: number, y: number): Particle => ({
  x,
  y,
  size: Math.random() * 3 + 1,
  speedX: Math.random() * 2 - 1,
  speedY: Math.random() * 2 - 1,
  opacity: Math.random() * 0.5 + 0.3
});

const initParticles = () => {
  if (!canvas.value) return;
  
  const particleCount = Math.floor((canvas.value.width * canvas.value.height) / 15000);
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(
      createParticle(
        Math.random() * canvas.value.width,
        Math.random() * canvas.value.height
      )
    );
  }
};

const animate = () => {
  if (!ctx || !canvas.value) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  
  particles.forEach((particle) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < 0) particle.x = canvas.value!.width;
    if (particle.x > canvas.value!.width) particle.x = 0;
    if (particle.y < 0) particle.y = canvas.value!.height;
    if (particle.y > canvas.value!.height) particle.y = 0;

    ctx!.beginPath();
    ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx!.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
    ctx!.fill();
  });

  animationFrame = requestAnimationFrame(animate);
};

const handleResize = () => {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  particles.length = 0;
  initParticles();
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