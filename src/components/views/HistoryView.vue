<template>
  <div class="space-y-6 m-10" style="width: 50em">
    <StatisticsCards
      :totalScans="scanHistory.length"
      :validScans="validScansCount"
      :invalidScans="invalidScansCount" />
    <HistoryControls
      :searchQuery="searchQuery"
      :filterValid="filterValid"
      @update:searchQuery="$emit('update:searchQuery', $event)"
      @update:filterValid="$emit('update:filterValid', $event)"
      @export-history="$emit('export-history')"
      @clear-history="$emit('clear-history')" />
    <HistoryList :history="filteredHistory" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import StatisticsCards from "../StatisticsCards.vue";
import HistoryControls from "../HistoryControls.vue";
import HistoryList from "../HistoryList.vue";
import type { QRScan } from "../../types/QRScanTypes";

const props = defineProps<{
  scanHistory: QRScan[];
  searchQuery: string;
  filterValid: string;
}>();

defineEmits([
  "update:searchQuery",
  "update:filterValid",
  "export-history",
  "clear-history",
]);

const filteredHistory = computed(() => {
  let filtered = props.scanHistory;

  if (props.searchQuery) {
    const q = props.searchQuery.toLowerCase();
    filtered = filtered.filter((item) => item.code.toLowerCase().includes(q));
  }

  if (props.filterValid !== "all") {
    const isValid = props.filterValid === "valid";
    filtered = filtered.filter((item) => item.isValid === isValid);
  }

  return filtered;
});

const validScansCount = computed(
  () => props.scanHistory.filter((i) => i.isValid).length
);
const invalidScansCount = computed(
  () => props.scanHistory.filter((i) => !i.isValid).length
);
</script>
