import './index.css'
import './css/personaly.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/pages/Home'
import { Toaster } from './components/ui/toaster'
// La fonction App représente le composant principal de l'application React. Elle gère les routes de l'application et rend le contenu en fonction de l'URL actuelle.
function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
