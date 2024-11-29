import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from './components/MainPage'
import { Toaster } from 'react-hot-toast'
import './App.scss'
import { AuthProvider } from './provider/auth-provider'

function App() {
  return (
    <div className="bg-background">
      <AuthProvider>
        <MainPage />
        <Toaster position="bottom-right" />
      </AuthProvider>
    </div>
  )
}

export default App
