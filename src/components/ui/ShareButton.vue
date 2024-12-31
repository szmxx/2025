<script setup lang="ts">
const shareUrl = window.location.href;

const share = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: '我的2025愿望',
        text: '来许下你的2025愿望吧！',
        url: shareUrl
      });
    } catch (error) {
      console.error('Share failed:', error);
    }
  } else {
    // Fallback: Copy URL to clipboard
    await navigator.clipboard.writeText(shareUrl);
    alert('链接已复制到剪贴板！');
  }
};
</script>

<template>
  <button
    @click="share"
    class="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors text-white shadow-lg"
  >
    分享愿望
  </button>
</template>