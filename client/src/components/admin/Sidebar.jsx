
import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
      <NavLink end={true} to='/admin' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""}`}>
        <img className='min-w-4 w-5' src={assets.home_icon} alt="" />
        <p className='hidden md:inline-block'>Dashboard</p>
      </NavLink>
      <NavLink to='/admin/blogs' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""}`}>
        <img className='min-w-4 w-5' src={assets.list_icon} alt="" />
        <p className='hidden md:inline-block'>All Blogs</p>
      </NavLink>
      <NavLink to='/admin/comments' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""}`}>
        <img className='min-w-4 w-5' src={assets.comment_icon} alt="" />
        <p className='hidden md:inline-block'>All Comments</p>
      </NavLink>
      <NavLink to='/admin/users' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""}`}>
        <img className='min-w-4 w-5' src={assets.dashboard_icon_1} alt="" />
        <p className='hidden md:inline-block'>All Users</p>
      </NavLink>
    </div>
  )
}

export default Sidebar