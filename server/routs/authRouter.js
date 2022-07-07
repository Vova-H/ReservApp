import Router from "express";
import AuthController from "../controllers/AuthController.js";
import {check} from "express-validator";
import TryCatchMiddleware from "../middleware/tryCatchMiddleware.js";

const authRouter = new Router()

authRouter.post('/registration', [
    check('name', "Name cannot be empty").notEmpty({ignore_whitespace: true}),
    check('surname', "Last name cannot be empty").notEmpty({ignore_whitespace: true}),
    check('password', "Password cannot be an empty string").notEmpty({ignore_whitespace: true}),
    check('password', "Password must be at least 4 characters").isLength({min: 4, max: 15}),
    check('email', "Invalid email entered").isEmail()
], TryCatchMiddleware(AuthController.registration.bind(AuthController)))
authRouter.post('/login', TryCatchMiddleware(AuthController.login.bind(AuthController)))
authRouter.get('/logout', TryCatchMiddleware(AuthController.logout.bind(AuthController)))

export default authRouter;
