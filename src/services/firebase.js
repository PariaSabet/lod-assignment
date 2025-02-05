import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCHbbhJjLKQu_HwzaZK7j65ablQceaZgbo',
  authDomain: 'lot-assignment.firebaseapp.com',
  projectId: 'lot-assignment',
  storageBucket: 'lot-assignment.firebasestorage.app',
  messagingSenderId: '276916960949',
  appId: '1:276916960949:web:b93f6fd041ceb8f957c8fc',
  measurementId: 'G-LJ7TDVHF48',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }
