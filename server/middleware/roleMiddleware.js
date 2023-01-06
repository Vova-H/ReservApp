import jsonwebtoken from "jsonwebtoken";
import secret from "../sign.js";
import handlerGetToken from "../handlers/handlerGetToken.js";

export default function (role) {

    return function (req, res, next) {
        try {
            const token = handlerGetToken(req)
            const {role: userRole} = jsonwebtoken.verify(token, secret)
            let hasRole = false
            if (userRole.nameOfRole.includes(role)) {
                hasRole = true
            }
            if (!hasRole) {
                return res.status(403).json({"message": "Access denied"})
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({"message": "Access denied"})
        }
    }
}
