import { useAuthStore } from '@/stores/auth'
import { auth } from '@/services/firebase'

// const API_URL =
//   'https://lod-assignment.netlify.app/.netlify/functions/proxy/energy?algorithm=sha256&mode=realtime'

export const fetchEnergyData = async () => {
  try {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
      throw new Error('User not authenticated')
    }

    // Get token from store
    let token = authStore.idToken

    // If token doesn't exist or is expired, refresh it
    if (!token) {
      const user = auth.currentUser
      if (user) {
        await authStore.updateIdToken(user)
        token = authStore.idToken
      }
    }

    const response = await fetch(
      '/.netlify/functions/proxy/energy?algorithm=sha256&mode=realtime',
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching energy data:', error)
    throw error
  }
}
