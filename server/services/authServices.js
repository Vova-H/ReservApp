import {Gender, Role, User} from "../models/models.js";
import bcrypt from "bcrypt";
import generateAccessToken from "../handlers/handlerGenerateAccessToken.js";

export default class AuthServices {
    async registration(name, surname, phone, email, password, gender) {
        const candidate = await User.findOne({where: {email: email}})
        if (candidate) {
            return {"message": "User with this email already exists"}
        }
        const genderDB = await Gender.findOne({where: {nameOfGender: gender}})
        const hashPassword = await bcrypt.hashSync(password, 7)
        const user = await User.create({
            name,
            surname,
            phone,
            email,
            password: hashPassword,
            roleId: 1,
            genderId: genderDB.dataValues.id
        })
        await user.save()
        return {"message": "The user has been successfully registered"}
    }

    async login(email, password) {
        const userDB = await User.findOne({where: {email: email}})
        if (!userDB) {
            return {"message": "This user does not exist"}
        }
        const encryptPassword = await bcrypt.compareSync(password, userDB.password)
        if (!encryptPassword) {
            return {"message": "Wrong password"}
        }
        const roleDB = await Role.findOne({where: {id: userDB.roleId}})
        return [
            generateAccessToken(userDB.id, roleDB),
            {
                name: userDB.name,
                surname: userDB.surname,
                email: userDB.email,
                role: roleDB.nameOfRole
            }
        ]
    }
}

