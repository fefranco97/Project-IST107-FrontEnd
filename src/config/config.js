import { initializeApp } from '@firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCfVDyHw9-eiA-wP2aNToYBZRPFyWNQSfw',
  authDomain: 'projectrecipesist107.firebaseapp.com',
  projectId: 'projectrecipesist107',
  storageBucket: 'projectrecipesist107.firebasestorage.app',
  messagingSenderId: '927015619683',
  appId: '1:927015619683:web:7340c980ea3f0acc567c56',
  measurementId: 'G-8WSF0W43D8',
}

export const app = initializeApp(firebaseConfig)

export const config = {
  isDevelopmentEnv: window.location.origin === 'http://localhost:3000',
  apiBaseUrl: {
    development: 'http://127.0.0.1:5001/projectrecipesist107/us-central1',
    production: '-3s22knfpgq-uc.a.run.app',
  },
}
