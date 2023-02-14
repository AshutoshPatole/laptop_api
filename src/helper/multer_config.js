/* 
This file contains configuration for storing files uploaded from '/admin/upload' endpoint
*/

import multer from 'multer'
import path from 'path'

// Using the diskStorage for storing files in uploads directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'))
    },
    // the filename will be <date>.json format. This format is used by '/admin/update-pricing' endpoint
    filename: function (req, file, cb) {
        const currentDate = new Date().toISOString().slice(0, 10)
        cb(null, currentDate + '.json')
    },
})

// only json files are allowed
const fileFilter = function (req, file, cb) {
    const extname = path.extname(file.originalname)
    if (extname !== '.json') {
        return cb(new Error('Only JSON files are allowed'))
    }
    cb(null, true)
}

export { storage, fileFilter }
