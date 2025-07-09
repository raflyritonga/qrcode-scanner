<template>
  <div
    class="bg-white rounded-lg shadow p-8 max-w-4xl mx-auto w-full mt-10"
    style="width: 30em">
    <h2 class="text-xl font-semibold mb-4 text-black">QR Code Scanner</h2>
    <div
      class="relative bg-black rounded-lg overflow-hidden"
      style="height: 400px; width: 100%">
      <video
        ref="videoElement"
        v-show="isScanning"
        class="w-full h-full object-cover"
        autoplay
        muted
        playsinline></video>
      <ScanOverlay v-if="isScanning" />
      <div v-if="!isScanning" class="flex items-center justify-center h-full">
        <div class="text-center text-white">
          <div
            class="w-16 h-16 mx-auto mb-4 bg-gray-600 rounded-full flex items-center justify-center">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p class="text-lg font-medium">Ready to scan</p>
          <p class="text-sm text-gray-300">Click start to begin scanning</p>
        </div>
      </div>
    </div>

    <div class="mt-4 flex justify-center space-x-4">
      <button
        v-if="!isScanning"
        @click="startScanning"
        class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
        Start Scanning
      </button>
      <button
        v-if="isScanning"
        @click="stopScanning"
        class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
        Stop Scanning
      </button>
    </div>

    <div
      v-if="cameraPermission === 'denied'"
      class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-700">
        Camera access is required. Please enable camera permissions and refresh
        the page.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import ScanOverlay from "./ScanOverlay.vue";
import QrScanner from "qr-scanner";

const props = defineProps<{
  isScanning: boolean;
  cameraPermission: string | null;
}>();

const emit = defineEmits<{
  (e: "start-scan", success?: boolean): void;
  (e: "stop-scan"): void;
  (e: "scan-result", data: string): void;
}>();

const videoElement = ref<HTMLVideoElement | null>(null);
const qrScanner = ref<QrScanner | null>(null);

async function startScanning() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach((track) => track.stop());
    emit("start-scan", true);

    if (!videoElement.value) {
      emit("start-scan", false);
      return;
    }

    qrScanner.value = new QrScanner(
      videoElement.value,
      (result: any) => {
        emit("scan-result", result.data);
        stopScanning();
      },
      {
        highlightScanRegion: false,
        highlightCodeOutline: false,
      }
    );

    await qrScanner.value.start();
  } catch (error) {
    emit("start-scan", false);
  }
}

function stopScanning() {
  qrScanner.value?.stop();
  qrScanner.value?.destroy();
  qrScanner.value = null;
  emit("stop-scan");
}

onUnmounted(() => {
  stopScanning();
});
</script>
