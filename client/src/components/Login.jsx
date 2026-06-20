import React from 'react'
import { useAppContext } from '../context/AppContext'
import Navbar from './Navbar'

const Login = () => {
  const { navigate } = useAppContext()

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center min-h-screen'>
        <div className='w-full max-w-sm p-6 max-md:m-6'>
          <div className='flex flex-col items-center justify-center'>
            <div className='w-full py-6 text-center'>
              <h1 className='text-3xl font-bold'>Welcome to <span className='text-primary'>QuickBlog</span></h1>
              <p className='font-light text-gray-600 mt-2'>Choose your login type</p>
            </div>
            
            <div className='mt-8 w-full space-y-4'>
              <button 
                onClick={() => navigate('/login/user')} 
                className='w-full py-4 px-6 font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg'
              >
                <div className='text-lg font-semibold'>Login as User</div>
                <div className='text-sm opacity-90'>Access your blog and comments</div>
              </button>
              
              <button 
                onClick={() => navigate('/login/admin')} 
                className='w-full py-4 px-6 font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all shadow-md hover:shadow-lg'
              >
                <div className='text-lg font-semibold'>Login as Admin</div>
                <div className='text-sm opacity-90'>Manage blogs, users & comments</div>
              </button>
            </div>

            <p className='mt-6 text-sm text-gray-600'>
              Don't have an account? <span onClick={() => navigate('/register')} className='text-primary cursor-pointer font-medium'>Register here</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
