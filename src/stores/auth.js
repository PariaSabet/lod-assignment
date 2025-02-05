import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/services/firebase'
import { onAuthStateChanged, getIdToken } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const isAuthenticated = ref(!!localStorage.getItem('user'))
  const idToken = ref(localStorage.getItem('idToken') || null)

  // Function to update token
  const updateIdToken = async (firebaseUser) => {
    if (firebaseUser) {
      const token = await getIdToken(firebaseUser, true)
      idToken.value = token
      localStorage.setItem('idToken', token)
    }
  }

  // Initialize auth state and sync with localStorage
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      }
      user.value = userData
      isAuthenticated.value = true
      localStorage.setItem('user', JSON.stringify(userData))

      // Get and store the ID token
      await updateIdToken(firebaseUser)
    } else {
      user.value = null
      isAuthenticated.value = false
      idToken.value = null
      localStorage.removeItem('user')
      localStorage.removeItem('idToken')
    }
  })

  // Add logout function to clear localStorage
  const logout = async () => {
    try {
      await auth.signOut()
      user.value = null
      isAuthenticated.value = false
      idToken.value = null
      localStorage.removeItem('user')
      localStorage.removeItem('idToken')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return {
    user,
    isAuthenticated,
    idToken,
    updateIdToken,
    logout,
  }
})
