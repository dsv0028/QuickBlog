import express from 'express'
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard, adminDeleteBlog, adminTogglePublish, getAllUsers } from '../controllers/adminController.js'
import adminAuth from '../middleware/adminAuth.js'

const adminRouter = express.Router()

adminRouter.post("/login", adminLogin)
adminRouter.get("/comments", adminAuth, getAllComments)
adminRouter.get("/blogs", adminAuth, getAllBlogsAdmin)
adminRouter.post("/delete-comment", adminAuth, deleteCommentById)
adminRouter.post("/approve-comment", adminAuth, approveCommentById)
adminRouter.get("/dashboard", adminAuth, getDashboard)
adminRouter.post("/delete-blog", adminAuth, adminDeleteBlog)
adminRouter.post("/toggle-publish", adminAuth, adminTogglePublish)
adminRouter.get("/users", adminAuth, getAllUsers)

export default adminRouter;