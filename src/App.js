import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from './components/MainPage'
import { Toaster } from 'react-hot-toast'
import './App.css'
import { AuthProvider } from './provider/auth-provider'

function App() {
  return (
    <AuthProvider>
      <MainPage />
      <Toaster position="bottom-right" />
    </AuthProvider>
  )
}

export default App
