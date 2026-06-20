import jwt from 'jsonwebtoken'

// Admin token is signed with {email}, user token is signed with {id}
const adminAuth = (req, res, next) => {
    const token = req.headers.authorization
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded.email) {
            return res.json({success: false, message: "Admin access required"})
        }
        next()
    } catch(error) {
        res.json({success: false, message: "Invalid Token"})
    }
}

export default adminAuth
