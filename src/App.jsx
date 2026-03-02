import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homePage'
import AdminPage from './pages/adminPage'
import TrendingProducts from './components/trendingProducts'

function App() {

  return (
    <>
      <div className='w-full h-screen border-[6px] flex items-center justify-center'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/admin' element={<AdminPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
