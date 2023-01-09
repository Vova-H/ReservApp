import Router from "express";
import roleMiddleware from "../middleware/roleMiddleware.js";
import AdminController from "../controllers/AdminController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import tryCatchMiddleware from "../middleware/tryCatchMiddleware.js";
import {check} from "express-validator";

const adminRouter = new Router()

adminRouter.get('/admin-users',
    AuthMiddleware,
    roleMiddleware(["ADMIN"]),
    tryCatchMiddleware(AdminController.getAllUsers.bind(AdminController)))
adminRouter.get('/admin-reservations',
    AuthMiddleware,
    roleMiddleware(["ADMIN"]),
    tryCatchMiddleware(AdminController.getAllReservations.bind(AdminController)))
adminRouter.get('/admin-time',
    AuthMiddleware,
    roleMiddleware(["ADMIN"]),
    tryCatchMiddleware(AdminController.getWorkingTime.bind(AdminController)))
adminRouter.put('/admin-time', [
        check('startOfDay', "Start of day  is require").notEmpty({ignore_whitespace: true}),
        check('endOfDay', "End of day is require").notEmpty({ignore_whitespace: true}),
    ],
    AuthMiddleware,
    roleMiddleware(["ADMIN"]),
    tryCatchMiddleware(AdminController.changeWorkingTime.bind(AdminController)))


export default adminRouter;
