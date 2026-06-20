import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const StatCard = ({ icon, value, label }) => (
  <div className='flex items-center bg-white gap-4 p-4 min-w-52 rounded shadow cursor-pointer hover:scale-105 transition-all'>
    <img src={icon} alt="" />
    <div>
      <p className='text-xl font-semibold text-gray-600'>{value}</p>
      <p className='text-gray-400 font-light'>{label}</p>
    </div>
  </div>
)

const UserDashboard = () => {
  const [data, setData] = useState({ blogs: 0, drafts: 0, comments: 0, recentBlogs: [] })
  const { axios } = useAppContext()
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const { data: res } = await axios.get('/api/blog/user/my-dashboard')
      if(res.success) setData(res.dashboardData)
      else toast.error(res.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50 overflow-auto'>
      <h2 className='text-xl font-semibold text-gray-700 mb-6'>My Dashboard</h2>
      <div className='flex flex-wrap gap-4 mb-8'>
        <StatCard icon={assets.dashboard_icon_1} value={data.blogs} label="My Blogs" />
        <StatCard icon={assets.dashboard_icon_2} value={data.comments} label="Comments" />
        <StatCard icon={assets.dashboard_icon_3} value={data.drafts} label="Drafts" />
      </div>

      <div>
        <p className='text-gray-600 mb-3 font-medium'>My Recent Blogs</p>
        <div className='bg-white rounded-lg shadow overflow-x-auto'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-600 uppercase'>
              <tr>
                <th className='px-4 py-3 text-left'>#</th>
                <th className='px-4 py-3 text-left'>Title</th>
                <th className='px-4 py-3 text-left max-sm:hidden'>Date</th>
                <th className='px-4 py-3 text-left'>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentBlogs.map((blog, i) => (
                <tr key={blog._id} className='border-t border-gray-100 hover:bg-gray-50'>
                  <td className='px-4 py-3'>{i + 1}</td>
                  <td className='px-4 py-3 cursor-pointer hover:text-primary' onClick={() => navigate(`/blog/${blog._id}`)}>{blog.title}</td>
                  <td className='px-4 py-3 max-sm:hidden'>{new Date(blog.createdAt).toDateString()}</td>
                  <td className='px-4 py-3'>
                    <span className={`text-xs px-2 py-1 rounded-full ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                </tr>
              ))}
              {data.recentBlogs.length === 0 && (
                <tr><td colSpan={4} className='text-center py-8 text-gray-400'>No blogs yet. <span className='text-primary cursor-pointer' onClick={() => navigate('/dashboard/addBlog')}>Write your first blog!</span></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
