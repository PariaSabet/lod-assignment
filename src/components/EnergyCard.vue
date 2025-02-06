<template>
  <div class="w-[428px] bg-[#151515] rounded-[12px] p-4 flex flex-col gap-2 text-white">
    <div class="flex justify-between">
      <div class="flex flex-col gap-1">
        <div class="flex flex-row items-center gap-5">
          <span class="text-[10px] leading-[12px] font-normal text-[#A7A6A6]"> Start time </span>
          <span class="text-[10px] leading-[12px] font-normal text-[#A7A6A6]">
            {{ formattedStartDate }}
          </span>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex flex-row items-center gap-7">
          <span class="text-[10px] leading-[12px] font-normal text-[#A7A6A6]"> End time </span>
          <span class="text-[10px] leading-[12px] font-normal text-[#A7A6A6]">
            {{ formattedEndDate }}
          </span>
        </div>
        <div class="flex flex-row items-center gap-1">
          <img src="@/assets/icons/alarm.svg" alt="alarm" class="w-4 h-4" />
          <span class="text-[10px] leading-[12px] font-normal text-[#A7A6A6]">
            {{ duration }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-row items-center justify-between gap-[9px] w-full pb-1">
      <div class="flex-1 bg-[#212121] rounded-[15px] flex flex-col items-center p-1">
        <div class="flex justify-center items-center w-full p-1">
          <span class="text-[10px] leading-[12px] font-normal text-[#A7A6A6]"> Power Latest </span>
        </div>
        <div class="flex justify-center items-center w-full p-1">
          <span class="text-[16px] leading-[19px] font-normal text-white">
            {{ data.power_latest.toFixed(1) }}
          </span>
        </div>
      </div>

      <div class="flex-1 bg-[#212121] rounded-[15px] flex flex-col items-center p-1">
        <div class="flex justify-center items-center w-full p-1">
          <span class="text-[10px] leading-[12px] font-normal text-[#A7A6A6]"> Power Min </span>
        </div>
        <div class="flex justify-center items-center w-full p-1">
          <span class="text-[16px] leading-[19px] font-normal text-white">
            {{ data.power_min }}
          </span>
        </div>
      </div>

      <div class="flex-1 bg-[#212121] rounded-[15px] flex flex-col items-center p-1">
        <div class="flex justify-center items-center w-full p-1">
          <span class="text-[10px] leading-[12px] font-normal text-[#A7A6A6]"> Power Max </span>
        </div>
        <div class="flex justify-center items-center w-full p-1">
          <span class="text-[16px] leading-[19px] font-normal text-white">
            {{ data.power_max }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const formattedStartDate = computed(() => dayjs(props.data.start_date).format('YYYY-MM-DD'))

const formattedEndDate = computed(() => dayjs(props.data.end_datetime).format('YYYY-MM-DD'))

const duration = computed(() => {
  const start = dayjs(props.data.start_date)
  const end = dayjs(props.data.end_datetime)
  const diffMinutes = end.diff(start, 'minute')
  const hours = Math.floor(diffMinutes / 60)
  const minutes = diffMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`
})
</script>
