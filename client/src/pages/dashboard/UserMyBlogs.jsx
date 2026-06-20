import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'

const UserMyBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const { axios } = useAppContext()

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blog/user/my-blogs')
      if(data.success) setBlogs(data.blogs)
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteBlog = async (id) => {
    if(!window.confirm("Delete this blog?")) return
    try {
      const { data } = await axios.post('/api/blog/delete', {id})
      if(data.success) { toast.success(data.message); fetchBlogs() }
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const togglePublish = async (id) => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', {id})
      if(data.success) { toast.success(data.message); fetchBlogs() }
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => { fetchBlogs() }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 overflow-auto'>
      <h1 className='text-xl font-semibold text-gray-700 mb-4'>My Blogs</h1>
      <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg bg-white'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-600 uppercase'>
            <tr>
              <th className='px-4 py-4 text-left'>#</th>
              <th className='px-4 py-4 text-left'>Title</th>
              <th className='px-4 py-4 text-left max-sm:hidden'>Date</th>
              <th className='px-4 py-4 text-left'>Status</th>
              <th className='px-4 py-4 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, i) => (
              <tr key={blog._id} className='border-t border-gray-100'>
                <td className='px-4 py-3'>{i + 1}</td>
                <td className='px-4 py-3'>{blog.title}</td>
                <td className='px-4 py-3 max-sm:hidden'>{new Date(blog.createdAt).toDateString()}</td>
                <td className='px-4 py-3'>
                  <span className={`text-xs ${blog.isPublished ? 'text-green-600' : 'text-orange-600'}`}>
                    {blog.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className='px-4 py-3 flex items-center gap-3'>
                  <button onClick={() => togglePublish(blog._id)} className='text-xs border px-2 py-0.5 rounded cursor-pointer hover:bg-gray-50'>
                    {blog.isPublished ? 'Unpublish' : 'Publish'}
                  </button>
                  <img onClick={() => deleteBlog(blog._id)} className='w-7 cursor-pointer hover:scale-110 transition-all' src={assets.cross_icon} alt="delete" />
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr><td colSpan={5} className='text-center py-8 text-gray-400'>You haven't written any blogs yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserMyBlogs
