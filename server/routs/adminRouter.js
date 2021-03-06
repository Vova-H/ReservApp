import Router from "express";
import roleMiddleware from "../middleware/roleMiddleware.js";
import AdminController from "../controllers/AdminController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import tryCatchMiddleware from "../middleware/tryCatchMiddleware.js";

const adminRouter = new Router()

adminRouter.get('/admin-users',
    AuthMiddleware,
    roleMiddleware(["ADMIN"]),
    tryCatchMiddleware(AdminController.getAllUsers.bind(AdminController)))
adminRouter.get('/admin-reservations',
    AuthMiddleware,
    roleMiddleware(["ADMIN"]),
    tryCatchMiddleware(AdminController.getAllReservations.bind(AdminController)))


export default adminRouter;
