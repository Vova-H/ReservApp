import jsonwebtoken from "jsonwebtoken";
import secret from "../config.js";

export default function (roles) {

    return function (req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const {roles: userRoles} = jsonwebtoken.verify(token, secret)
            let hasRole = false
            if (typeof userRoles === "string")
                if (userRoles.includes(roles)) {
                    hasRole = true
                }
            if (typeof userRoles === "object") userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({"message": "Отказано в доступе"})
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({"message": "Отказано в доступе"})
        }
    }
}
