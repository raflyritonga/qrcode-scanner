<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div
      class="flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0">
      <div
        class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          :value="searchQuery"
          @input="$emit('update:searchQuery', ($event.target as HTMLInputElement)?.value || '')"
          type="text"
          placeholder="Search QR codes..."
          class="px-4 py-2 border border-gray-300 rounded-lg" />
        <select
          :value="filterValid"
          @change="$emit('update:filterValid', ($event.target as HTMLSelectElement)?.value || '')"
          class="px-4 py-2 border border-gray-300 rounded-lg">
          <option value="all">All Scans</option>
          <option value="valid">Valid Only</option>
          <option value="invalid">Invalid Only</option>
        </select>
      </div>
      <div class="flex space-x-4">
        <button
          @click="$emit('export-history')"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Export
        </button>
        <button
          @click="$emit('clear-history')"
          class="bg-red-500 text-white px-4 py-2 rounded-lg">
          Clear All
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  searchQuery: string;
  filterValid: string;
}>();

defineEmits([
  "update:searchQuery",
  "update:filterValid",
  "export-history",
  "clear-history",
]);
</script>
