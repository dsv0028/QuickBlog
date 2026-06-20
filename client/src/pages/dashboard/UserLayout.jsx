import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const UserSidebar = () => (
  <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
    <NavLink end={true} to='/dashboard' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""}`}>
      <img className='min-w-4 w-5' src={assets.home_icon} alt="" />
      <p className='hidden md:inline-block'>My Dashboard</p>
    </NavLink>
    <NavLink to='/dashboard/addBlog' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""}`}>
      <img className='min-w-4 w-5' src={assets.add_icon} alt="" />
      <p className='hidden md:inline-block'>Add Blog</p>
    </NavLink>
    <NavLink to='/dashboard/myBlogs' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""}`}>
      <img className='min-w-4 w-5' src={assets.list_icon} alt="" />
      <p className='hidden md:inline-block'>My Blogs</p>
    </NavLink>
    <NavLink to='/dashboard/myComments' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""}`}>
      <img className='min-w-4 w-5' src={assets.comment_icon} alt="" />
      <p className='hidden md:inline-block'>My Comments</p>
    </NavLink>
  </div>
)

const UserLayout = () => {
  const { axios, setToken, setUser, navigate } = useAppContext()

  const logout = () => {
    localStorage.removeItem('token')
    axios.defaults.headers.common['Authorization'] = ''
    setToken(null)
    setUser(null)
    navigate('/')
  }

  return (
    <>
      <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <img onClick={() => navigate('/')} className='w-32 sm:w-40 cursor-pointer' src={assets.logo} alt="" />
        <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
      </div>
      <div className='flex h-[calc(100vh-70px)]'>
        <UserSidebar />
        <Outlet />
      </div>
    </>
  )
}

export default UserLayout
