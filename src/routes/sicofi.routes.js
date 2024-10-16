import { Router } from "express";
import * as sicofiController from "../controllers/sicofi.controllers"
import * as middlewares from "../middlewares/index"

const router=Router()

router.post("/cfdiTraslado", [middlewares.verifyJwtToken, middlewares.verifyUser], sicofiController.cfdiTraslado)
router.post("/cfdiIngreso", [middlewares.verifyJwtToken, middlewares.verifyUser], sicofiController.cfdiIngreso)
router.post("/cfdiTrasladoCP", [middlewares.verifyJwtToken, middlewares.verifyUser], sicofiController.cfdiTrasladoCP)
router.post("/cfdiIngresoCP", [middlewares.verifyJwtToken, middlewares.verifyUser], sicofiController.cfdiIngresoCP)

export default router




