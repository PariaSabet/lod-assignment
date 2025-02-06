import { Handler } from '@netlify/functions'
import fetch from 'node-fetch'
import * as admin from 'firebase-admin'

const API_ENDPOINT = 'https://app.lincoin.com/v3/api'
const API_KEY = process.env.API_KEY

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: 'lot-assignment',
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

export const handler: Handler = async (event) => {
  //   if (event.httpMethod === 'OPTIONS') {
  //     return {
  //       statusCode: 200,
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  //         'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  //       },
  //       body: '',
  //     }
  //   }

  const path = event.path.replace('/.netlify/functions/proxy', '')
  const queryString = event.rawQuery ? `?${event.rawQuery}` : ''
  const token = event.headers.authorization

  if (!token || !token.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized - No token provided' }),
    }
  }

  try {
    const idToken = token.split('Bearer ')[1]
    await admin.auth().verifyIdToken(idToken)

    const response = await fetch(`${API_ENDPOINT}${path}${queryString}`, {
      method: event.httpMethod,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: event.body ? JSON.stringify(event.body) : undefined,
    })

    const data = await response.json()

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    }
  } catch (error) {
    if (error.code === 'auth/id-token-expired' || error.code === 'auth/argument-error') {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized - Invalid token' }),
      }
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    }
  }
}
