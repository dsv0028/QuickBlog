import React from 'react'
import {assets} from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
    const {navigate, user, setToken, setUser} = useAppContext()

    const logout = () => {
      setToken(null)
      setUser(null)
      localStorage.removeItem('token')
      navigate('/')
    }

    const hasRealAvatar = user?.avatar && !user.avatar.includes('via.placeholder.com')

    const UserAvatar = () => {
      if (hasRealAvatar) {
        return <img src={user.avatar} alt="Avatar" className='w-7 h-7 rounded-full object-cover border border-gray-300 flex-shrink-0'/>
      }
      const initial = user?.name ? user.name.charAt(0).toUpperCase() : '?'
      return (
        <span className='w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0'>
          {initial}
        </span>
      )
    }

  return (
    <div className='flex justify-between items-center py-5 px-8 sm:mx-20 xl:mx-32'>
        <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className='w32 sm:w-44 cursor-pointer'/>
        <div className='flex items-center gap-4'>
          {user ? (
            <>
              <button onClick={()=>navigate('/dashboard')} className='text-sm cursor-pointer text-gray-600 hover:text-gray-800'>Dashboard</button>
              <button onClick={()=>navigate('/profile')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-gray-200 text-gray-700 px-3 py-2'>
                <UserAvatar />
                <span>Profile</span>
              </button>
              <button onClick={logout} className='text-sm cursor-pointer text-gray-600 hover:text-gray-800'>Logout</button>
            </>
          ) : (
            <>
              <button onClick={()=>navigate('/login')} className='text-sm cursor-pointer text-gray-600 hover:text-gray-800'>Login</button>
              <button onClick={()=>navigate('/register')} className='text-sm cursor-pointer bg-primary text-white px-4 py-2 rounded'>Register</button>
            </>
          )}
        </div>
    </div>
  )
}

export default Navbar;