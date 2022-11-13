import { Router } from "express";
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
lapRouter.get("/", getAllLaptops);
lapRouter.get("/:laptopID", fetchSingleLaptop);
lapRouter.get("/pricing", updatePricing);
lapRouter.get("/dups", getDuplicates);

export default lapRouter;
