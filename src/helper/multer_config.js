import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
        const currentDate = new Date().toISOString().slice(0, 10)
        cb(null, currentDate + '.json')
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
