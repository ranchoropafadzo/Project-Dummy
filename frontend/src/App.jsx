import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  const [page, setPage] = useState('dashboard') // change to 'login' when wiring auth

  if (page === 'login') {
    return <LoginPage onLogin={() => setPage('dashboard')} />
  }

  return <DashboardPage onLogout={() => setPage('login')} />
}

export default App
