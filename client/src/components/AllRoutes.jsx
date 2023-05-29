import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import EditProfileModal from './EditProfileModal'
import Profile from './Profile'
import Home from './Home'
import PrivateRoute from './PrivateRoute'
import Navbar from './Navbar'
import PagenotFound from './PagenotFound'



export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>

        } />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route path='/profile' element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />

        <Route path='/edit-profile' element={<EditProfileModal />} />
        <Route path="/*" element={<PagenotFound/>} />
      </Routes>
    </div>
  )
}
