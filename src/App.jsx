import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homePage'
import AdminPage from './pages/adminPage'
import TestPage from './pages/test'
import LoginPage from './pages/loginPage'

function App() {

  return (
    <>
      <div className='w-full h-screen flex items-center justify-center bg-primary text-secondary'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/admin/*' element={<AdminPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
