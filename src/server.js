import express from 'express'
import ROUTES from './constants/routes'
import connectDatabase from './connectDB'
import cors from 'cors'
import dotenv from 'dotenv'
import admin from 'firebase-admin'

dotenv.config()
const app = express()

connectDatabase()

const serviceAccount = require('../key.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

/*  Middlewares */
app.use(cors())
app.use(express.json())

/* Routes */

app.use('/laptop', ROUTES.LAPTOP)
app.use('/admin', ROUTES.ADMIN)

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
