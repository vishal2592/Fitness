
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import LoginPage from './Pages/LoginPage'

function App() {
 

  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
