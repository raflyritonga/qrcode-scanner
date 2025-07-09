<template>
  <header
    class="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900">
          QR Code Reader
        </h1>
        <nav class="flex space-x-2 sm:space-x-4">
          <button
            @click="$emit('view-change', 'scanner')"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
              currentView === 'scanner'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
            ]">
            Scanner
          </button>
          <button
            @click="$emit('view-change', 'history')"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
              currentView === 'history'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
            ]">
            History
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{ currentView: string }>();
defineEmits<{
  (e: "view-change", view: string): void;
}>();
</script>
