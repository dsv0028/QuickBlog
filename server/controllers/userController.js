import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import imagekit from '../configs/imageKit.js'
import fs from 'fs'

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.json({success: false, message: "All fields are required"})
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.json({success: false, message: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({name, email, password: hashedPassword});
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        res.json({success: true, token, user: {name: user.name, email: user.email, avatar: user.avatar, bio: user.bio}});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.json({success: false, message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({success: false, message: "Invalid credentials"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({success: true, token, user: {name: user.name, email: user.email, avatar: user.avatar, bio: user.bio}});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if(!user) {
            return res.json({success: false, message: "User not found"})
        }
        res.json({success: true, user: {name: user.name, email: user.email, avatar: user.avatar, bio: user.bio}});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const {name, bio} = req.body;
        const avatarFile = req.file;

        const user = await User.findById(req.userId);
        if(!user) {
            return res.json({success: false, message: "User not found"})
        }

        if(name) user.name = name;
        if(bio !== undefined) user.bio = bio;

        if(avatarFile) {
            const fileBuffer = fs.readFileSync(avatarFile.path);
            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: avatarFile.originalname || 'avatar.jpg',
                folder: "/avatars"
            });
            user.avatar = response.url;
            // Clean up temp file after upload
            try { fs.unlinkSync(avatarFile.path); } catch(_) {}
        }

        await user.save();
        res.json({success: true, message: "Profile updated successfully", user: {name: user.name, email: user.email, avatar: user.avatar, bio: user.bio}});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}