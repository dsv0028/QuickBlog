import multer from 'multer'
import os from 'os'
import path from 'path'

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, os.tmpdir())
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            cb(null, uniqueSuffix + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})

export default upload