
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Register from './components/Register'
import UserLogin from './components/UserLogin'
import Profile from './components/Profile'

// User dashboard
import UserLayout from './pages/dashboard/UserLayout'
import UserDashboard from './pages/dashboard/UserDashboard'
import UserMyBlogs from './pages/dashboard/UserMyBlogs'
import UserMyComments from './pages/dashboard/UserMyComments'

// Admin panel
import AdminLogin from './components/admin/Login'
import AdminLayout from './pages/admin/Layout'
import AdminDashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import AdminComments from './pages/admin/Comments'
import AdminUsers from './pages/admin/AdminUsers'

import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {
  const { token, adminToken } = useAppContext()

  return (
    <div>
      <Toaster/>
      <Routes>
        {/* Public */}
        <Route path='/' element={<Home/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>

        {/* User Dashboard — any logged-in user */}
        <Route path='/dashboard' element={token ? <UserLayout/> : <UserLogin/>}>
          <Route index element={<UserDashboard/>}/>
          <Route path='addBlog' element={<AddBlog/>}/>
          <Route path='myBlogs' element={<UserMyBlogs/>}/>
          <Route path='myComments' element={<UserMyComments/>}/>
        </Route>

        {/* Admin Panel — admin credentials only */}
        <Route path='/admin' element={adminToken ? <AdminLayout/> : <AdminLogin/>}>
          <Route index element={<AdminDashboard/>}/>
          <Route path='blogs' element={<ListBlog/>}/>
          <Route path='comments' element={<AdminComments/>}/>
          <Route path='users' element={<AdminUsers/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App