import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    const token = req.headers.authorization

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id  // use req.userId instead of req.body.userId to avoid multer overwriting it
        next()
    } catch (error) {
        res.json({success: false, message: "Invalid Token"})
    }
}

export default auth;