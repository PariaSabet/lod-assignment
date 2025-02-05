<template>
  <div class="p-5 font-sans">
    <!-- If there's an error, show it -->
    <div v-if="error" class="text-red-600 mb-5">{{ error }}</div>

    <!-- If we have energyData, show the card(s) -->
    <div v-else-if="energyData">
      <EnergyCard v-for="(item, index) in energyData.data.realtime" :key="index" :data="item" />
    </div>

    <!-- Otherwise show a loading message -->
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { fetchEnergyData } from '@/services/lincoinApi.js'
import EnergyCard from '@/components/EnergyCard.vue'

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
  const intervalId = setInterval(loadData, 60000)
  onUnmounted(() => clearInterval(intervalId))
})
</script>
