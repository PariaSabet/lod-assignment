<template>
  <div
    v-if="error"
    class="flex flex-col items-center justify-center bg-[#151515] border border-red-500 px-6 py-5 rounded-lg shadow-md w-[420px] mx-auto mt-12 animate-fadeIn"
  >
    <img src="@/assets/icons/error.svg" class="w-10 h-10 text-red-500 mb-3" alt="Error icon" />

    <p class="font-bold text-[#A7A6A6]">Oops! Something went wrong.</p>
    <p class="text-sm mt-1">{{ error }}</p>
    <button
      @click="retry"
      class="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-all hover:scale-105 hover:animate-wiggle"
    >
      Retry
    </button>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    required: true,
  },
  retry: {
    type: Function,
    required: true,
  },
})
</script>
