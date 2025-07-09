<template>
  <div class="bg-white rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold">Scan History</h3>
      <p class="text-sm text-gray-500">{{ history.length }} scans found</p>
    </div>

    <div v-if="history.length === 0" class="p-8 text-center text-gray-500">
      <p>No scans found matching your criteria.</p>
    </div>

    <div v-else class="divide-y divide-gray-200">
      <div
        v-for="scan in history"
        :key="scan.id"
        class="p-6 hover:bg-gray-50 transition-colors">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <span
                :class="
                  scan.isValid
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                "
                class="px-2 py-1 rounded-full text-xs font-medium">
                {{ scan.isValid ? "Valid" : "Invalid" }}
              </span>
              <span class="text-sm text-gray-500"
                >{{ scan.date }} at {{ scan.time }}</span
              >
            </div>
            <p class="font-mono text-lg text-gray-900">{{ scan.code }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QRScan } from "../types/QRScanTypes";
defineProps<{ history: QRScan[] }>();
</script>
