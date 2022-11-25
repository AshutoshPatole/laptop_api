import { Router } from "express";
import analytics from "./analytics";
import bulkInsert from "./bulk-upload";
import rankingSystem from "./rankingSystem";
import updatePricing from "./updatePricing";

const adminRouter = Router();

adminRouter.get("/ranking", rankingSystem);
adminRouter.get("/analytics", analytics);
adminRouter.get("/update-pricing", updatePricing);
adminRouter.get("/bulk-insert", bulkInsert);


export default adminRouter;
