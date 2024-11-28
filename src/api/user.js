import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth'
import { config } from '../config/config'

async function CreateUser(name, email, password) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  }

  const url = config.isDevelopmentEnv
    ? `${config.apiBaseUrl.development}/createUser`
    : `https://createUser${config.apiBaseUrl.production}`

  const response = await fetch(url, options)
  const responseData = await response.json()

  if (responseData.status !== 'success') {
    throw new Error(responseData.message)
  }

  return responseData
}

async function LoginWithEmail(email, password) {
  const auth = getAuth()

  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }

  const url = config.isDevelopmentEnv
    ? `${config.apiBaseUrl.development}/user?email=${email}`
    : `https://user${config.apiBaseUrl.production}?email=${email}`

  try {
    const loginAuth = await signInWithEmailAndPassword(auth, email, password)
    const response = await fetch(url, options)
    const responseData = await response.json()

    if (responseData.status !== 'success') {
      throw new Error(responseData.message)
    }
    return { accessToken: loginAuth.user.accessToken, user: responseData.data[0] }
  } catch (error) {
    console.error('Failed to fetch user:', error.message)
  }
}

async function SignInWithGoogle() {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  const result = await signInWithPopup(auth, provider)
  const user = result.user
  const idToken = await user.getIdToken()

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: idToken }),
  }

  const url = config.isDevelopmentEnv
    ? `${config.apiBaseUrl.development}/google`
    : `https://google${config.apiBaseUrl.production}`

  const response = await fetch(url, options)
  const responseData = await response.json()

  if (responseData.status !== 'success') {
    throw new Error(responseData.message)
  }

  return { idToken, responseData }
}

export { CreateUser, SignInWithGoogle, LoginWithEmail }
