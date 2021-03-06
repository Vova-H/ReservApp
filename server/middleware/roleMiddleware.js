import jsonwebtoken from "jsonwebtoken";
import secret from "../config.js";
import handlerGetToken from "../handlers/handlerGetToken.js";

export default function (roles) {

    return function (req, res, next) {
        try {
            const token = handlerGetToken(req)
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
                return res.status(403).json({"message": "Access denied"})
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({"message": "Access denied"})
        }
    }
}
