import { Router } from "express";
import * as mlController from "../controllers/ml.controllers"
import * as middlewares from "../middlewares/index"

const router=Router()

router.post("/getShipments", [middlewares.verifyJwtToken, middlewares.verifyUser], mlController.getShipments)

export default router




