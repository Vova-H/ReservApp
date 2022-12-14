import {validationResult} from "express-validator";
import AuthServices from "../services/authServices.js";


class AuthController {

    authService;

    constructor(authService) {
        this.authService = authService
    }

    async registration(req) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return {"message": "Registration error", errors}
        }
        const {name, surname, phone, email, password} = req.body
        return this.authService.registration(name, surname, phone, email, password)

    }

    async login(req) {
        const {email, password} = req.body
        return this.authService.login(email, password)
    }

    async logout(req) {
        if (req.headers.authorization !== undefined &&
            req.headers.authorization !== "") {
            req.headers.authorization.split(" ")[1] = ""
        }
    }
}

const authController = new AuthController(new AuthServices())
export default authController
