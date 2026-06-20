import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'
import User from '../models/User.js'

export const adminLogin = async (req, res) => {
    try{
        const{email, password} = req.body;
        if(email != process.env.ADMIN_EMAIL || password != process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Invalid Credentials"})
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({success: true, token})
    }catch (error){
        res.json({success: false, message: error.message})
    }
}

// All blogs with author info
export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('author', 'name email avatar').sort({createdAt: -1})
        res.json({success: true, blogs})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// All comments with blog info
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate("blog", "title").sort({createdAt: -1})
        res.json({success: true, comments})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

// Admin dashboard — shows ALL activity across all users
export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).populate('author', 'name avatar').sort({createdAt: -1}).limit(5)
        const blogs = await Blog.countDocuments()
        const comments = await Comment.countDocuments()
        const drafts = await Blog.countDocuments({isPublished: false})
        const users = await User.countDocuments()
        const dashboardData = { blogs, comments, drafts, users, recentBlogs }
        res.json({success: true, dashboardData})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Admin can delete any blog (no ownership check)
export const adminDeleteBlog = async (req, res) => {
    try {
        const {id} = req.body
        await Blog.findByIdAndDelete(id)
        await Comment.deleteMany({blog: id})
        res.json({success: true, message: "Blog deleted successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Admin can toggle any blog
export const adminTogglePublish = async (req, res) => {
    try {
        const {id} = req.body
        const blog = await Blog.findById(id)
        if(!blog) return res.json({success: false, message: "Blog not found"})
        blog.isPublished = !blog.isPublished
        await blog.save()
        res.json({success: true, message: "Blog status updated"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const {id} = req.body
        await Comment.findByIdAndDelete(id)
        res.json({success: true, message: "Comment deleted successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const approveCommentById = async (req, res) => {
    try {
        const {id} = req.body
        await Comment.findByIdAndUpdate(id, {isApproved: true})
        res.json({success: true, message: "Comment approved successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Get all registered users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({createdAt: -1})
        const usersWithStats = await Promise.all(users.map(async (u) => {
            const blogCount = await Blog.countDocuments({author: u._id})
            return {...u.toObject(), blogCount}
        }))
        res.json({success: true, users: usersWithStats})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}