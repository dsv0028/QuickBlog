import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const { axios, adminAxiosConfig } = useAppContext()

  useEffect(() => {
    axios.get('/api/admin/users', adminAxiosConfig())
      .then(({ data }) => { if(data.success) setUsers(data.users); else toast.error(data.message) })
      .catch(e => toast.error(e.message))
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 overflow-auto'>
      <h1 className='text-xl font-semibold text-gray-700 mb-4'>All Users ({users.length})</h1>
      <div className='max-w-4xl bg-white rounded-lg shadow overflow-x-auto'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-600 uppercase'>
            <tr>
              <th className='px-4 py-3 text-left'>#</th>
              <th className='px-4 py-3 text-left'>User</th>
              <th className='px-4 py-3 text-left max-sm:hidden'>Email</th>
              <th className='px-4 py-3 text-left'>Blogs</th>
              <th className='px-4 py-3 text-left max-sm:hidden'>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id} className='border-t border-gray-100'>
                <td className='px-4 py-3'>{i + 1}</td>
                <td className='px-4 py-3'>
                  <div className='flex items-center gap-3'>
                    <img src={u.avatar && !u.avatar.includes('placeholder') ? u.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&size=32&background=random`}
                      alt="" className='w-8 h-8 rounded-full object-cover'/>
                    <span>{u.name}</span>
                  </div>
                </td>
                <td className='px-4 py-3 max-sm:hidden'>{u.email}</td>
                <td className='px-4 py-3'>
                  <span className='bg-primary/10 text-primary text-xs px-2 py-1 rounded-full'>{u.blogCount} blogs</span>
                </td>
                <td className='px-4 py-3 max-sm:hidden'>{new Date(u.createdAt).toDateString()}</td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan={5} className='text-center py-8 text-gray-400'>No users registered yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUsers
