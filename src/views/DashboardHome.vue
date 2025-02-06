<template>
  <div class="p-5 font-sans flex flex-col items-center justify-center min-h-max">
    <!-- Error Message -->
    <ErrorMessage v-if="error" :error="error" :retry="loadData" />

    <!-- Show Cards if Data Exists -->
    <div
      v-else-if="energyData"
      class="flex flex-col items-center justify-center min-h-max space-y-4"
    >
      <EnergyCard v-for="(item, index) in energyData.data.realtime" :key="index" :data="item" />
    </div>

    <!-- Loading State -->
    <div v-else class="flex flex-col items-center justify-center min-h-screen gap-3">
      <svg
        class="animate-spin h-8 w-8 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <p class="text-sm text-gray-500">Loading data...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { fetchEnergyData } from '@/services/lincoinApi.js'
import EnergyCard from '@/components/EnergyCard.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const energyData = ref(null)
const error = ref(null)

const loadData = async () => {
  try {
    energyData.value = await fetchEnergyData()
    console.log(energyData.value)
    error.value = null
  } catch {
    error.value = 'Failed to load energy data.'
  }
}

onMounted(() => {
  loadData()
  // Reload data every minute
  const intervalId = setInterval(loadData, 60000)
  onUnmounted(() => clearInterval(intervalId))
})
</script>
