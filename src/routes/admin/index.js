import { Router } from "express";
import rankingSystem from "./rankingSystem";

const adminRouter = Router();

adminRouter.get("/ranking", rankingSystem);


export default adminRouter;
