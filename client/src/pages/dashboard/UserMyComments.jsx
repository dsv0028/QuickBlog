import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'

const UserMyComments = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')
  const { axios } = useAppContext()

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/blog/user/my-comments')
      if(data.success) setComments(data.comments)
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const approveComment = async (id) => {
    try {
      const { data } = await axios.post('/api/blog/user/approve-comment', {id})
      if(data.success) { toast.success(data.message); fetchComments() }
      else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
  }

  const deleteComment = async (id) => {
    if(!window.confirm("Delete this comment?")) return
    try {
      const { data } = await axios.post('/api/blog/user/delete-comment', {id})
      if(data.success) { toast.success(data.message); fetchComments() }
      else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
  }

  useEffect(() => { fetchComments() }, [])

  const filtered = comments.filter(c => filter === 'Approved' ? c.isApproved : !c.isApproved)

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 overflow-auto'>
      <div className='flex justify-between items-center max-w-3xl mb-4'>
        <h1 className='text-xl font-semibold text-gray-700'>Comments on My Blogs</h1>
        <div className='flex gap-3'>
          <button onClick={() => setFilter('Approved')} className={`border rounded-full px-4 py-1 text-xs cursor-pointer ${filter === 'Approved' ? 'text-primary border-primary' : 'text-gray-600'}`}>Approved</button>
          <button onClick={() => setFilter('Not Approved')} className={`border rounded-full px-4 py-1 text-xs cursor-pointer ${filter === 'Not Approved' ? 'text-primary border-primary' : 'text-gray-600'}`}>Pending</button>
        </div>
      </div>
      <div className='relative max-w-3xl bg-white shadow rounded-lg overflow-x-auto'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase'>
            <tr>
              <th className='px-6 py-3 text-left'>Blog & Comment</th>
              <th className='px-6 py-3 text-left max-sm:hidden'>Date</th>
              <th className='px-6 py-3 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((comment) => (
              <tr key={comment._id} className='border-t border-gray-100'>
                <td className='px-6 py-4'>
                  <b className='text-gray-600'>Blog</b>: {comment.blog?.title}<br/><br/>
                  <b className='text-gray-600'>Name</b>: {comment.name}<br/><br/>
                  <b className='text-gray-600'>Comment</b>: {comment.content}
                </td>
                <td className='px-6 py-4 max-sm:hidden'>{new Date(comment.createdAt).toLocaleDateString()}</td>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-4'>
                    {!comment.isApproved
                      ? <img onClick={() => approveComment(comment._id)} className='w-5 cursor-pointer hover:scale-110' src={assets.tick_icon} alt="approve" />
                      : <span className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</span>
                    }
                    <img onClick={() => deleteComment(comment._id)} className='w-5 cursor-pointer hover:scale-110' src={assets.bin_icon} alt="delete" />
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={3} className='text-center py-8 text-gray-400'>No {filter.toLowerCase()} comments.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserMyComments
