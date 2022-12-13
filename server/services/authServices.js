import {User} from "../models/models.js";
import bcrypt from "bcrypt";
import generateAccessToken from "../handlers/handlerGenerateAccessToken.js";

export default class AuthServices {
    async registration(name, surname, email, password) {
        const candidate = await User.findOne({where: {email: `${email}`}})

        if (candidate) {
            return {"message": "User with this email already exists"}
        }
        const hashPassword = await bcrypt.hashSync(password, 7)
        const roles = ["USER"]
        const user = await User.create({name, surname, email, password: hashPassword, roles: roles})
        await user.save()
        return {"message": "The user has been successfully registered"}
    }

    async login(email, password) {
        const user = await User.findOne({where: {email: `${email}`}})
        if (!user) {
            return {"message": "This user does not exist"}
        }
        const encryptPassword = await bcrypt.compareSync(password, user.password)
        if (!encryptPassword) {
            return {"message": "Wrong password"}
        }
        return [
            generateAccessToken(user.id, user.roles),
            {
                name: user.name,
                surname: user.surname,
                email: user.email,
                roles: user.roles
            }
        ]
    }

}

