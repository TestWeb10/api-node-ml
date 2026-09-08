import { Router } from "express";
import * as sicofiDataController from "../controllers/sicofiData.controllers"

const router=Router()

router.post("/changePassword", sicofiDataController.changePassword)

export default router




