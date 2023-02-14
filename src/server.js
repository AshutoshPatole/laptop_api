import express from 'express'
import ROUTES from './constants/routes'
import connectDatabase from './connectDB'
import cors from 'cors'
import dotenv from 'dotenv'
import admin from 'firebase-admin'
import multer from 'multer'
import storage from './helper/multer_config'

dotenv.config()
const app = express()

connectDatabase()
const upload = multer({ storage: storage })

let serviceAccount = require('../key.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

/*  Middlewares */
app.use(cors())
app.use(express.json())

/* Routes */

app.use('/laptop', ROUTES.LAPTOP)
app.use('/admin', ROUTES.ADMIN)

app.post('/upload', upload.single('file'), function (req, res, next) {
    // Handle the file upload here
    console.log(req.body)
    return res.send('Uploaded')
})

/* 
    Dummy route to check if the API works after deployment
*/
app.get('/', (_req, res) => {
    return res.send('LAPIFY BACKEND Triggered from dev branch')
})

/* 
    Refer .env-template file for PORT and MONGO_URI
*/

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`[INFO] Live at ${PORT}`)
})
