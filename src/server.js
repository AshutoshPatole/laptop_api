import express from "express";
import ROUTES from "./constants/routes";
import connectDatabase from './connectDB';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const app = express();

connectDatabase();

/*  Middlewares */
app.use(cors());
app.use(express.json());


/* Routes */

app.use("/laptop", ROUTES.LAPTOP);
// app.use("/filter", ROUTES.FILTER);

/* 
    Dummy route to check if the API works after deployment
*/
app.get("/", (_req, res) => {
    return res.send("LAPIFY BACKEND")
})

/* 
    Refer .env-template file for PORT and MONGO_URI
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[INFO] Live at ${PORT}`)
});