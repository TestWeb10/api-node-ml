import { Router } from "express";
import * as dbController from "../controllers/db.controllers"
import * as middlewares from "../middlewares/index"

const router=Router()

router.post("/calendar/setCalendar", [middlewares.verifyJwtToken, middlewares.verifyUser], dbController.setCalendar)
router.post("/calendar/addRoutesByDate", [middlewares.verifyJwtToken, middlewares.verifyUser], dbController.addRoutesByDate)
router.post("/calendar/deleteRoutesByDate", [middlewares.verifyJwtToken, middlewares.verifyUser], dbController.deleteRoutesByDate)
router.post("/calendar/deleteRoutesBySpecificDate", [middlewares.verifyJwtToken, middlewares.verifyUser], dbController.deleteRoutesBySpecificDate)
router.post("/invoices/deleteInvoicesByDate", [middlewares.verifyJwtToken, middlewares.verifyUser], dbController.deleteInvoicesByDate)
router.post("/autoTransport/addAutoTransport", [middlewares.verifyJwtToken, middlewares.verifyUser], dbController.addAutoTransport)
router.post("/autoTransport/deleteAutoTransport", [middlewares.verifyJwtToken, middlewares.verifyUser], dbController.deleteAutoTransport)
router.post("/figureTransport/addFigureTransport", [middlewares.verifyJwtToken, middlewares.verifyUser], dbController.addFigureTransport)
router.post("/figureTransport/deleteFigureTransport", [middlewares.verifyJwtToken, middlewares.verifyUser], dbController.deleteFigureTransport)

export default router




