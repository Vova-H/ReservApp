import Router from "express";
import roleMiddleware from "../middleware/roleMiddleware.js";
import AdminController from "../controllers/AdminController.js";

const adminRouter = new Router()

adminRouter.get('/admin-users', roleMiddleware(["ADMIN"]), AdminController.getAllUsers)
adminRouter.get('/admin-reservations', roleMiddleware(["ADMIN"]), AdminController.getAllReservations)


export default adminRouter;
