<template>
  <div class="min-h-screen flex items-center justify-center pb-28">
    <div class="w-96 p-8 bg-[#151515] rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-white text-center">Sign Up</h2>

      <form @submit.prevent="handleSignUp" class="space-y-4">
        <div>
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
            class="w-full px-4 py-2 bg-[#212121] text-white border border-[#313131] rounded-md focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
          />
        </div>

        <div>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
            class="w-full px-4 py-2 bg-[#212121] text-white border border-[#313131] rounded-md focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
          />
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-md transition-all"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleSignUp = async () => {
  try {
    await authStore.signUp(email.value, password.value)
    // Redirect to the Energy Dashboard
    router.push('/')
  } catch (error) {
    console.error('Sign up failed:', error)
  }
}
</script>

<style scoped></style>
