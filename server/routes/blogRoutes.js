import express from 'express'
import { addBlog, addComment, getBlogComments, getAllBlogs, getBlogById, deleteBlogById, togglePublish, generateContent, getUserBlogs, getUserDashboard, getUserComments, approveUserComment, deleteUserComment} from '../controllers/blogController.js'
import upload from '../middleware/multer.js'
import auth from '../middleware/auth.js'

const blogRouter = express.Router();

// ── User-specific dashboard routes (MUST be before /:blogId wildcard) ────────
blogRouter.get("/user/my-blogs", auth, getUserBlogs)
blogRouter.get("/user/my-dashboard", auth, getUserDashboard)
blogRouter.get("/user/my-comments", auth, getUserComments)
blogRouter.post("/user/approve-comment", auth, approveUserComment)
blogRouter.post("/user/delete-comment", auth, deleteUserComment)

// ── Public routes ─────────────────────────────────────────────────────────────
blogRouter.get("/all", getAllBlogs)
blogRouter.post("/add-comment", addComment)
blogRouter.post("/comments", getBlogComments)

// ── User-authenticated routes ─────────────────────────────────────────────────
blogRouter.post("/add", upload.single('image'), auth, addBlog)
blogRouter.post("/delete", auth, deleteBlogById)
blogRouter.post("/toggle-publish", auth, togglePublish)
blogRouter.post("/generate", auth, generateContent)

// ── Wildcard — MUST be last so it doesn't swallow specific routes ─────────────
blogRouter.get("/:blogId", getBlogById)

export default blogRouter;
