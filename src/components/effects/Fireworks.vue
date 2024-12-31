<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrame: number;

class Firework {
  x: number;
  y: number;
  targetY: number;
  speed: number;
  particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    color: string;
    size: number;
    sparkTrail: Array<{ x: number; y: number; alpha: number }>;
  }> = [];
  color: string;
  exploded: boolean = false;
  trail: Array<{ x: number; y: number; alpha: number }> = [];
  private readonly fadeRate = 0.985;
  private readonly trailLength = 25;
  private readonly particleGravity = 0.05;
  private readonly maxParticles = 180;
  private isValid: boolean = true;

  constructor(canvasWidth: number, canvasHeight: number) {
    if (!canvasWidth || !canvasHeight) {
      this.isValid = false;
      return;
    }
    this.x = Math.random() * canvasWidth;
    this.y = canvasHeight;
    this.targetY = Math.random() * (canvasHeight * 0.3) + canvasHeight * 0.2;
    this.speed = 1.2 + Math.random() * 1.8;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;

    this.trail.push({ x: this.x, y: this.y, alpha: 1 });
  }

  explode() {
    if (!this.isValid || this.exploded) return;
    
    const particleCount = Math.min(180, this.maxParticles);
    const colors = [
      this.color,
      `hsl(${
        Math.random() * 30 - 15 + parseInt(this.color.match(/\d+/)[0])
      }, 100%, 70%)`,
      `hsl(${
        Math.random() * 30 - 15 + parseInt(this.color.match(/\d+/)[0])
      }, 90%, 75%)`,
      "#FFD700",
      "#FFFFFF",
    ];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity =
        (1.5 + Math.random() * 1.8) *
        (1 + Math.cos(i * 6) * 0.3) *
        (0.85 + Math.random() * 0.3);

      this.particles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 1 + Math.random() * 1.5,
        sparkTrail: [],
      });
    }
    this.exploded = true;
  }

  update() {
    if (!this.isValid) return;

    if (!this.exploded) {
      this.trail.push({ x: this.x, y: this.y, alpha: 1 });
      if (this.trail.length > this.trailLength) this.trail.shift();
      this.trail.forEach((point) => (point.alpha *= this.fadeRate));

      this.y -= this.speed;
      if (this.y <= this.targetY) {
        this.explode();
      }
    } else {
      this.particles.forEach((p) => {
        if (p.alpha <= 0.02) return;
        p.sparkTrail.push({ x: p.x, y: p.y, alpha: p.alpha });
        if (p.sparkTrail.length > 8) p.sparkTrail.shift();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += this.particleGravity;
        p.vx *= 0.99;
        p.alpha *= this.fadeRate;
      });
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.isValid || !ctx) return;

    if (!this.exploded) {
      this.trail.forEach((point, index) => {
        ctx.beginPath();
        const trailAlpha = (point.alpha * 0.3) * (1 - index / this.trailLength);
        ctx.fillStyle = `rgba(255, 220, 180, ${trailAlpha})`;
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      this.particles.forEach((p) => {
        if (p.alpha <= 0.02) return;
        p.sparkTrail.forEach((trail, index) => {
          const gradientAlpha = (index / p.sparkTrail.length) * p.alpha;
          ctx.fillStyle = `rgba(255, 255, 255, ${gradientAlpha * 0.2})`;
          ctx.beginPath();
          ctx.arc(trail.x, trail.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.save();
        ctx.globalAlpha = p.alpha;
        
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 4
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * 0.3})`);
        gradient.addColorStop(0.6, `rgba(255, 255, 200, ${p.alpha * 0.12})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });
    }
  }

  isDead(): boolean {
    return !this.isValid || (this.exploded && this.particles.every((p) => p.alpha < 0.02));
  }
}

const fireworks: Firework[] = [];
let isAnimating = false;

const animate = () => {
  if (!ctx || !canvas.value) return;
  if (isAnimating) return;
  isAnimating = true;

  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

  for (let i = fireworks.length - 1; i >= 0; i--) {
    if (fireworks[i].isDead()) {
      fireworks.splice(i, 1);
    }
  }

  if (fireworks.length < 10 && Math.random() < 0.02) {
    fireworks.push(new Firework(canvas.value.width, canvas.value.height));
    if (Math.random() < 0.2) {
      setTimeout(() => {
        fireworks.push(new Firework(canvas.value.width, canvas.value.height));
      }, 100 + Math.random() * 200);
    }
  }

  fireworks.forEach((fw) => {
    fw.update();
    fw.draw(ctx!);
  });

  isAnimating = false;
  animationFrame = requestAnimationFrame(animate);
};

const handleResize = () => {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
};

onMounted(() => {
  if (!canvas.value) return;
  ctx = canvas.value.getContext("2d");
  handleResize();
  window.addEventListener("resize", handleResize);
  animate();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  cancelAnimationFrame(animationFrame);
});
</script>

<template>
  <canvas
    ref="canvas"
    class="fixed top-0 left-0 w-full h-full pointer-events-none"
  ></canvas>
</template>
