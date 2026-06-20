import express from 'express'
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'
import auth from '../middleware/auth.js'
import multer from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/profile", auth, getUserProfile)
userRouter.post("/update-profile", auth, multer.single('avatar'), updateUserProfile)

export default userRouter;