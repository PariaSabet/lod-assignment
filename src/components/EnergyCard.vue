<template>
  <div class="bg-gray-900 rounded-lg p-6 text-white max-w-xl mx-auto shadow-lg">
    <div class="flex justify-between mb-4">
      <div class="flex items-center">
        <span class="text-gray-400 text-sm mr-2">Start time</span>
        <span class="font-semibold">{{ formattedStartDate }}</span>
      </div>
      <div class="flex items-center">
        <span class="text-gray-400 text-sm mr-2">End time</span>
        <span class="font-semibold">{{ formattedEndDate }}</span>
        <span class="ml-2">
          <img src="@/assets/icons/alarm.svg" alt="alarm" class="w-4 h-4" />
        </span>
        <span class="font-semibold ml-2">{{ duration }}</span>
      </div>
    </div>

    <div class="bg-gray-800 rounded-md p-4 flex justify-between">
      <div class="flex flex-col items-center flex-1 mx-2">
        <span class="text-gray-500 text-xs mb-1">Power Latest</span>
        <span class="text-lg font-semibold">{{ data.power_latest.toFixed(1) }}</span>
      </div>
      <div class="flex flex-col items-center flex-1 mx-2">
        <span class="text-gray-500 text-xs mb-1">Power Min</span>
        <span class="text-lg font-semibold">{{ data.power_min }}</span>
      </div>
      <div class="flex flex-col items-center flex-1 mx-2">
        <span class="text-gray-500 text-xs mb-1">Power Max</span>
        <span class="text-lg font-semibold">{{ data.power_max }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';

// The parent will pass in the "realtime" object as `data`
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

// Convert/format times with dayjs
const formattedStartDate = computed(() => {
  // The API has "start_date" as YYYY-MM-DD; just return it or format with dayjs
  return dayjs(props.data.start_date).format('YYYY-MM-DD');
});

const formattedEndDate = computed(() => {
  // The API's end_datetime might be an ISO date/time, e.g. "2025-02-05T02:45:00Z"
  return dayjs(props.data.end_datetime).format('YYYY-MM-DD');
});

// Example of showing duration in HH:mm:ss
const duration = computed(() => {
  const start = dayjs(props.data.start_date);
  const end = dayjs(props.data.end_datetime);
  // difference in minutes
  const diffMinutes = end.diff(start, 'minute');
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  // format: "00:15:00"
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
});
</script>

<style scoped>
/* Remove the existing CSS as Tailwind will handle styling */
</style>
  