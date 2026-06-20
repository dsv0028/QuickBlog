import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import Navbar from './Navbar';

const Profile = () => {

  const {axios, user, setUser, navigate} = useAppContext()
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [loading, setLoading] = useState(false)

  const [avatarPreview, setAvatarPreview] = useState(null)

  useEffect(() => {
    if(user) {
      setName(user.name || '')
      setBio(user.bio || '')
    }
  }, [user])

  const handleSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', name)
      formData.append('bio', bio)
      if(avatar) formData.append('avatar', avatar)


      setLoading(true)
      try {
        const { data } = await axios.post('/api/user/update-profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.getItem('token')
          }
        })

        if(data.success) {
          setUser(data.user)
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
  }

  if(!user) {
    return (
      <>
        <Navbar/>
        <div className='text-center mt-20'>Please login to view your profile</div>
      </>
    )
  }
   
  return (
    <>
      <Navbar/>
      <div className='flex items-center justify-center min-h-screen'>
        <div className='w-full max-w-md p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
          <div className='flex flex-col items-center justify-center'>
              <div className='w-full py-6 text-center'>
                  <h1 className='text-3xl font-bold'>Your <span className='text-primary'>Profile</span></h1>
                  <p className='font-light'>Update your information</p>
              </div>
              <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
                  <div className='flex flex-col items-center mb-6'>
                    <img
                      src={avatarPreview || user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=random'}
                      alt="Avatar"
                      className='w-24 h-24 rounded-full object-cover mb-4 border-2 border-primary/30 shadow-md'
                    />
                    <label className='cursor-pointer bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-all text-sm'>
                      📷 Change Avatar
                      <input
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if(file) {
                            setAvatar(file);
                            setAvatarPreview(URL.createObjectURL(file));
                          }
                        }}
                        className='hidden'
                        type="file"
                        accept="image/*"
                      />
                    </label>
                    {avatarPreview && <p className='text-xs text-green-600 mt-2'>New avatar selected ✓</p>}
                  </div>

                  <div className='flex flex-col'>
                      <label> Name </label>
                      <input onChange={ (e) => setName(e.target.value) } value={name} className='border-b-2 border-gray-300 p-2 outline-none mb-6' type="text" required placeholder='your name'/>
                  </div>
                  
                  <div className='flex flex-col'>
                      <label> Bio </label>
                      <textarea onChange={ (e) => setBio(e.target.value) } value={bio} className='border-b-2 border-gray-300 p-2 outline-none mb-6' rows="3" placeholder='tell us about yourself'/>
                  </div>

                  <button disabled={loading} className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all disabled:opacity-50' type='submit'>
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
              </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile