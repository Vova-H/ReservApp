import Router from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import ReservationController from "../controllers/ReservationController.js";

const reservationRouter = new Router()

reservationRouter.post('/reservation', authMiddleware, ReservationController.create)
reservationRouter.get('/reservation', authMiddleware, ReservationController.index)
reservationRouter.put('/reservation/:id', authMiddleware, ReservationController.update)
reservationRouter.delete('/reservation/:id', authMiddleware, ReservationController.delete)

export default reservationRouter
