import Router from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import ReservationController from "../controllers/ReservationController.js";
import tryCatchMiddleware from "../middleware/tryCatchMiddleware.js";
import IdReqMiddleware from "../middleware/idReqMiddleware.js";
import {check} from "express-validator";

const reservationRouter = new Router()

reservationRouter.get('/reservation',
    authMiddleware,
    tryCatchMiddleware(ReservationController.index.bind(ReservationController)))


reservationRouter.post('/reservation', [
        check('date', "Date is require").notEmpty({ignore_whitespace: true}),
        check('time', "Time is require").notEmpty({ignore_whitespace: true}),
        check('action', "Action is require").notEmpty({ignore_whitespace: true}),
    ],
    authMiddleware,
    tryCatchMiddleware(ReservationController.create.bind(ReservationController)))


reservationRouter.post('/reservation-checkTime', [
        check('date', "Date is require").notEmpty({ignore_whitespace: true}),
    ],
    authMiddleware,
    tryCatchMiddleware(ReservationController.checkFreeTime.bind(ReservationController)))


reservationRouter.put('/reservation/:id', [
        check('date', "Date is require").notEmpty({ignore_whitespace: true}),
        check('time', "Time is require").notEmpty({ignore_whitespace: true}),
        check('action', "Action is require").notEmpty({ignore_whitespace: true}),
    ],
    authMiddleware,
    IdReqMiddleware,
    tryCatchMiddleware(ReservationController.update.bind(ReservationController)))


reservationRouter.delete('/reservation/:id',
    authMiddleware,
    IdReqMiddleware,
    tryCatchMiddleware(ReservationController.delete.bind(ReservationController)))

export default reservationRouter
