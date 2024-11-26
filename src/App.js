import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from './components/MainPage'
import { Toaster } from 'react-hot-toast'
import './App.css'

function App() {
  return (
    <div className="App">
      <MainPage />
      <Toaster position="bottom-right" />
    </div>
  )
}

export default App
