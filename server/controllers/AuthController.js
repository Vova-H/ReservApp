import bcrypt from "bcrypt"
import {validationResult} from "express-validator";
import jsonwebtoken from "jsonwebtoken";
import secret from "../config.js"
import {User} from "../models/models.js";


const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles
    }
    const expiration = '30m'
    return jsonwebtoken.sign(payload, secret, {expiresIn: expiration})
}

class AuthController {

    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({"message": "Ошибка при регистрации", errors})
            }
            const {name, surname, email, password} = req.body
            const candidate = await User.findOne({where: {email: `${email}`}})

            if (candidate) {
                return res.status(400).json({"message": "Пользователь с такой почтой уже сущесвтует"})
            }
            const hashPassword = await bcrypt.hashSync(password, 7)
            const roles = ["ADMIN"]
            const user = await User.create({name, surname, email, password: hashPassword, roles: roles})
            await user.save()
            return res.json({"message": "Пользователь был успешно зареестрирован"})

        } catch (e) {
            console.log(e)
            return res.status(400).json({"message": "registration failed"})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email: `${email}`}})
            if (!user) {
                return res.status(400).json({"message": "Такого пользователя не существует"})
            }
            const encryptPassword = await bcrypt.compareSync(password, user.password)
            if (!encryptPassword) {
                return res.status(400).json({"message": "Пароль не верный"})
            }
            const token = await generateAccessToken(user.id, user.roles)
            return res.json(token)
        } catch (e) {
            console.log(e)
            return res.status(400).json({"message": "log in failed"})
        }
    }

}

export default new AuthController()
