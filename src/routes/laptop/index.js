import { Router } from "express";
import cache from "../../helper/express_cache";
import deleteLaptop from "./deleteLaptop";
import getDuplicates from "./fetchDuplicates";
import getAllLaptops from "./getLaptops";
import fetchSingleLaptop from "./getSingleLaptop";
import updateLaptop from "./updateLaptop";
import updatePricing from "./updatePricing";
import laptopValidate from "./validations";
const lapRouter = Router();

lapRouter.delete("/:laptopID", deleteLaptop);
lapRouter.patch("/:laptopID", laptopValidate, updateLaptop);
lapRouter.get("/", cache.route(), getAllLaptops);
lapRouter.get("/single/:laptopID",  cache.route(),fetchSingleLaptop);
lapRouter.get("/pricing", cache.route(),updatePricing);
lapRouter.get("/duplicate",cache.route(), getDuplicates);

export default lapRouter;
