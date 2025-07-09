<template>
  <div v-if="scanResult" class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-semibold mb-4 text-black">Last Scan Result</h3>
    <div class="flex items-start space-x-4">
      <div
        :class="
          scanResult.isValid
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        "
        class="px-3 py-1 rounded-full text-sm font-medium">
        {{ scanResult.isValid ? "Valid" : "Invalid" }}
      </div>
      <div class="flex-1">
        <p class="font-mono text-lg text-black">{{ scanResult.code }}</p>
        <p class="text-sm text-black mt-1">
          {{ scanResult.date }} at {{ scanResult.time }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QRScan } from "../types/QRScanTypes";
defineProps<{ scanResult: QRScan | null }>();
</script>
