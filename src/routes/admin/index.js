import { Router } from "express";
import analytics from "./analytics";
import rankingSystem from "./rankingSystem";

const adminRouter = Router();

adminRouter.get("/ranking", rankingSystem);
adminRouter.get("/analytics", analytics);


export default adminRouter;
