<template>
  <div class="min-h-screen flex items-center justify-center pb-28">
    <div class="w-96 p-8 bg-[#151515] rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-white text-center">Login</h2>

      <div
        v-if="error"
        class="mb-4 p-4 bg-red-500 bg-opacity-20 border-l-4 border-red-500 text-red-400 rounded"
        role="alert"
      >
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            :disabled="isLoading"
            class="w-full px-4 py-2 bg-[#212121] text-white border border-[#313131] rounded-md focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] disabled:bg-gray-800"
          />
        </div>

        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            :disabled="isLoading"
            class="w-full px-4 py-2 bg-[#212121] text-white border border-[#313131] rounded-md focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] disabled:bg-gray-800"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-2 px-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-md transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Logging in...
          </span>
          <span v-else>Login</span>
        </button>
      </form>

      <div class="mt-4 text-center">
        <router-link to="/signup" class="text-[#3B82F6] hover:underline">
          Don't have an account? Sign Up
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/services/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
if (authStore.isAuthenticated) {
  router.push('/')
}

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/')
  } catch (err) {
    switch (err.code) {
      case 'auth/user-not-found':
        error.value = 'No user found with this email address'
        break
      case 'auth/wrong-password':
        error.value = 'Incorrect password'
        break
      case 'auth/invalid-email':
        error.value = 'Invalid email address'
        break
      case 'auth/too-many-requests':
        error.value = 'Too many failed login attempts. Please try again later'
        break
      default:
        error.value = 'Failed to login. Please try again'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
