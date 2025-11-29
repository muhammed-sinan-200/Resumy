import './App.css'
import OverviewPage from './pages/OverviewPage'
import HelpSupportPage from './pages/HelpSupportPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import DashLayout from './components/DashLayout'
import UploadResumePage from './pages/UploadResumePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoutes from './components/ProtectedRoutes'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'

function App() {


  return (
    <>
      <Routes>
        {/* Public Routes*/}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<Navigate to='/login' replace />}/>

        <Route element={<ProtectedRoutes/>}>
        <Route element={<DashLayout/>}>
          <Route path='/overview' element={<OverviewPage />} />
          <Route path='/upload' element={<UploadResumePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/help' element={<HelpSupportPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
