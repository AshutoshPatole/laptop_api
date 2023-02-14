import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

const fileFilter = function (req, file, cb) {
    const extname = path.extname(file.originalname)
    if (extname !== '.json') {
        return cb(new Error('Only JSON files are allowed'))
    }
    cb(null, true)
}

export { storage, fileFilter }
