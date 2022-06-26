import Router from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import ReservationController from "../controllers/ReservationController.js";
import tryCatchMiddleware from "../middleware/tryCatchMiddleware.js";
import IdReqMiddleware from "../middleware/idReqMiddleware.js";

const reservationRouter = new Router()


reservationRouter.get('/reservation',
    authMiddleware,
    tryCatchMiddleware(ReservationController.index.bind(ReservationController)))
reservationRouter.get('/reservation/:id',
    authMiddleware,
    IdReqMiddleware,
    tryCatchMiddleware(ReservationController.show.bind(ReservationController)))
reservationRouter.post('/reservation',
    authMiddleware,
    tryCatchMiddleware(ReservationController.create.bind(ReservationController)))
reservationRouter.put('/reservation/:id',
    authMiddleware,
    IdReqMiddleware,
    tryCatchMiddleware(ReservationController.update.bind(ReservationController)))
reservationRouter.delete('/reservation/:id',
    authMiddleware,
    IdReqMiddleware,
    tryCatchMiddleware(ReservationController.delete.bind(ReservationController)))

export default reservationRouter
