import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  const { setAdminToken, navigate } = useAppContext()

  const logout = () => {
    localStorage.removeItem('adminToken')
    setAdminToken(null)
    navigate('/')
  }

  return (
    <>
      <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <img onClick={() => navigate('/')} className='w-32 sm:w-40 cursor-pointer' src={assets.logo} alt="" />
        <div className='flex items-center gap-3'>
          <span className='text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium'>Admin Panel</span>
          <button onClick={logout} className='text-sm px-6 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
        </div>
      </div>
      <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar/>
        <Outlet/>
      </div>
    </>
  )
}

export default Layout