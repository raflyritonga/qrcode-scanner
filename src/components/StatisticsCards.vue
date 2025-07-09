<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-sm font-medium text-gray-500">Total Scans</h3>
      <p class="text-2xl font-bold text-gray-900">{{ totalScans }}</p>
    </div>
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-sm font-medium text-gray-500">Valid Scans</h3>
      <p class="text-2xl font-bold text-green-600">{{ validScans }}</p>
    </div>
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-sm font-medium text-gray-500">Invalid Scans</h3>
      <p class="text-2xl font-bold text-red-600">{{ invalidScans }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalScans: number;
  validScans: number;
  invalidScans: number;
}>();
</script>
