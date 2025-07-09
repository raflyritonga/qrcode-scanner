<template>
  <transition name="slide-up">
    <div v-if="notification" class="fixed bottom-4 right-4 z-50">
      <div
        :class="{
          'bg-green-500': notification.type === 'success',
          'bg-red-500': notification.type === 'error',
          'bg-blue-500': notification.type === 'info',
          'bg-yellow-500': notification.type === 'warning',
        }"
        class="text-white px-6 py-3 rounded-lg shadow-lg">
        {{ notification.message }}
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{ notification: { message: string; type: string } | null }>();
</script>
