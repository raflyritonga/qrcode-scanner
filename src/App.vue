<template>
  <div class="min-h-screen bg-gray-100">
    <AppHeader
      :currentView="currentView"
      @view-change="currentView = $event as 'scanner' | 'history'" />
    <main class="max-w-full mx-auto px-4 py-8">
      <ScannerView
        v-if="currentView === 'scanner'"
        :isScanning="isScanning"
        :lastScanResult="lastScanResult"
        :cameraPermission="cameraPermission"
        @start-scan="handleStartScan"
        @stop-scan="handleStopScan"
        @scan-result="handleScanResult" />
      <HistoryView
        v-else
        :scanHistory="scanHistory"
        :searchQuery="searchQuery"
        :filterValid="filterValid"
        @update:searchQuery="searchQuery = $event"
        @update:filterValid="filterValid = $event"
        @export-history="exportHistory"
        @clear-history="clearHistory" />
    </main>
    <NotificationComponent :notification="notification" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import AppHeader from "./components/AppHeader.vue";
import NotificationComponent from "../src/components/NotificationComponent.vue";
import ScannerView from "../src/components/views/ScannerView.vue";
import HistoryView from "../src/components/views/HistoryView.vue";
import { QRCodeStorage } from "./services/QRCodeStorage";
import { QRCodeValidator } from "./services/QRCodeValidator";
import { NotificationType, type QRScan } from "./types/QRScanTypes";

const currentView = ref<"scanner" | "history">("scanner");
const isScanning = ref(false);
const lastScanResult = ref<QRScan | null>(null);
const scanHistory = ref<QRScan[]>([]);
const searchQuery = ref("");
const filterValid = ref("all");
const notification = ref<{ message: string; type: NotificationType } | null>(
  null
);
const cameraPermission = ref<"granted" | "denied" | null>(null);

onMounted(() => {
  scanHistory.value = QRCodeStorage.getHistory();
});

function handleStartScan(success = true) {
  if (success) {
    isScanning.value = true;
    cameraPermission.value = "granted";
  } else {
    cameraPermission.value = "denied";
    showNotification("Camera access denied.", NotificationType.ERROR);
  }
}

function handleStopScan() {
  isScanning.value = false;
}

function handleScanResult(code: string) {
  const isValid = QRCodeValidator.validateFormat(code);
  const scan = QRCodeStorage.saveQRCode(code, isValid);
  lastScanResult.value = scan;
  scanHistory.value = QRCodeStorage.getHistory();
  showNotification(
    isValid ? "Valid QR Code scanned!" : "Invalid QR Code format",
    isValid ? NotificationType.SUCCESS : NotificationType.ERROR
  );
  setTimeout(() => (isScanning.value = false), 1000);
}

function clearHistory() {
  if (confirm("Are you sure to clear all history?")) {
    QRCodeStorage.clearHistory();
    scanHistory.value = [];
    showNotification("History cleared.", NotificationType.SUCCESS);
  }
}

function exportHistory() {
  if (scanHistory.value.length === 0) {
    showNotification("No history to export.", NotificationType.WARNING);
    return;
  }
  QRCodeStorage.exportHistory();
  showNotification("Exported successfully.", NotificationType.SUCCESS);
}

function showNotification(message: string, type: NotificationType) {
  notification.value = { message, type };
  setTimeout(() => (notification.value = null), 3000);
}
</script>
