<template>
  <div class="space-y-6">
    <CameraView
      :isScanning="isScanning"
      :cameraPermission="cameraPermission"
      @start-scan="$emit('start-scan', $event)"
      @stop-scan="$emit('stop-scan')"
      @scan-result="$emit('scan-result', $event)" />
    <ScanResult :scanResult="lastScanResult" />
  </div>
</template>

<script setup lang="ts">

import CameraView from "../CameraView.vue";
import ScanResult from "../ScanResult.vue";
import type { QRScan } from "../../types/QRScanTypes";

defineProps<{
  isScanning: boolean;
  lastScanResult: QRScan | null;
  cameraPermission: string | null;
}>();

defineEmits(["start-scan", "stop-scan", "scan-result"]);
</script>
