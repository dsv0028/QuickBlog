
import fs from 'fs'
import imagekit from '../configs/imageKit.js'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'
import main from '../configs/gemini.js';

// Add a new blog — stores author from logged-in user
export const addBlog = async (req, res) => {
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog)
        const imageFile = req.file

        if(!title || !description || !category || !imageFile) {
            return res.json({success: false, message: "Missing required fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname || 'blog.jpg',
            folder: "/blogs"
        })
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'},
                {format: 'webp'},
                {width: '1280'}
            ]
        })
        try { fs.unlinkSync(imageFile.path) } catch(_) {}

        await Blog.create({title, subTitle, description, category, image: optimizedImageUrl, isPublished, author: req.userId})
        res.json({success: true, message: "Blog added successfully"})
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}

// Get all published blogs (public)
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true}).populate('author', 'name avatar')
        res.json({success: true, blogs})
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params
        const blog = await Blog.findById(blogId).populate('author', 'name avatar')
        if(!blog) return res.json({success: false, message: "Blog not found"})
        res.json({success: true, blog})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Delete blog — user can only delete their own
export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body
        const blog = await Blog.findById(id)
        if(!blog) return res.json({success: false, message: "Blog not found"})
        if(blog.author && blog.author.toString() !== req.userId) {
            return res.json({success: false, message: "You can only delete your own blogs"})
        }
        await Blog.findByIdAndDelete(id)
        await Comment.deleteMany({blog: id})
        res.json({success: true, message: "Blog deleted successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Toggle publish — user can only toggle their own
export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body
        const blog = await Blog.findById(id)
        if(!blog) return res.json({success: false, message: "Blog not found"})
        if(blog.author && blog.author.toString() !== req.userId) {
            return res.json({success: false, message: "You can only manage your own blogs"})
        }
        blog.isPublished = !blog.isPublished
        await blog.save()
        res.json({success: true, message: "Blog status updated"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body
        await Comment.create({blog, name, content})
        res.json({success: true, message: "Comment added for review"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1})
        res.json({success: true, comments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// ── User-specific dashboard endpoints ───────────────────────────────────────

// Get current user's own blogs
export const getUserBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({author: req.userId}).sort({createdAt: -1})
        res.json({success: true, blogs})
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}

// User dashboard stats (only their own data)
export const getUserDashboard = async (req, res) => {
    try {
        const totalBlogs = await Blog.countDocuments({author: req.userId})
        const drafts = await Blog.countDocuments({author: req.userId, isPublished: false})
        const recentBlogs = await Blog.find({author: req.userId}).sort({createdAt: -1}).limit(5)
        const userBlogIds = await Blog.find({author: req.userId}).distinct('_id')
        const comments = await Comment.countDocuments({blog: {$in: userBlogIds}})
        res.json({success: true, dashboardData: {blogs: totalBlogs, drafts, comments, recentBlogs}})
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}

// Comments on the current user's blogs
export const getUserComments = async (req, res) => {
    try {
        const userBlogIds = await Blog.find({author: req.userId}).distinct('_id')
        const comments = await Comment.find({blog: {$in: userBlogIds}}).populate('blog', 'title').sort({createdAt: -1})
        res.json({success: true, comments})
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}

// User can approve comment on their own blog
export const approveUserComment = async (req, res) => {
    try {
        const {id} = req.body
        const comment = await Comment.findById(id).populate('blog')
        if(!comment) return res.json({success: false, message: "Comment not found"})
        if(comment.blog.author && comment.blog.author.toString() !== req.userId) {
            return res.json({success: false, message: "Not authorized"})
        }
        await Comment.findByIdAndUpdate(id, {isApproved: true})
        res.json({success: true, message: "Comment approved"})
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}

// User can delete comment on their own blog
export const deleteUserComment = async (req, res) => {
    try {
        const {id} = req.body
        const comment = await Comment.findById(id).populate('blog')
        if(!comment) return res.json({success: false, message: "Comment not found"})
        if(comment.blog.author && comment.blog.author.toString() !== req.userId) {
            return res.json({success: false, message: "Not authorized"})
        }
        await Comment.findByIdAndDelete(id)
        res.json({success: true, message: "Comment deleted"})
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}

export const generateContent = async (req, res) => {
    try {
        const{prompt} = req.body;
        const content = await main(prompt + ' Generate a blog content for this topic in simple text format')
        res.json({success: true, content})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}