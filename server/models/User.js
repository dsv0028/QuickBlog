import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, default: 'https://via.placeholder.com/100/cccccc/000000?text=U'},
    bio: {type: String, default: ''},
    isAdmin: {type: Boolean, default: false},
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;