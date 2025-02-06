<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="bg-[#2e2e2e] min-h-screen text-white flex flex-col">
    <header
      v-if="authStore.isAuthenticated"
      class="p-4 flex items-center justify-between border-b border-zinc-600"
    >
      <h1 class="text-xl font-bold">Energy Dashboard</h1>
      <nav>
        <button
          @click="handleLogout"
          class="px-5 py-2.5 bg-[#212121] hover:bg-[#313131] text-white text-md font-medium rounded-md shadow-md transition hover:brightness-110"
        >
          Logout
        </button>
      </nav>
    </header>
    <main class="flex-1 p-6">
      <RouterView />
    </main>
  </div>
</template>
