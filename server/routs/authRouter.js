import Router from "express";
import AuthController from "../controllers/AuthController.js";
import {check} from "express-validator";

const authRouter = new Router()

authRouter.post('/registration', [
    check('name', "Имя не может быть пустым").notEmpty({ignore_whitespace: true}),
    check('surname', "Фамилия не может быть пустым").notEmpty({ignore_whitespace: true}),
    check('password', "Пароль не может быть пустой строкой").notEmpty({ignore_whitespace: true}),
    check('password', "Пароль должен быть не меньше 4 символов").isLength({min: 4, max: 15}),
    check('email', "Введен некорректный email").isEmail()
], AuthController.registration)
authRouter.post('/login', AuthController.login)

export default authRouter;
