import jsonwebtoken from "jsonwebtoken";
import secret from "../sign.js"
import handlerGetToken from "../handlers/handlerGetToken.js";

export default function (req, res, next) {

    try {
        const token = handlerGetToken(req)
        if (!token || token === "" || token === undefined) {
            return res.status(403).json({"message": "User not authorized"})
        }
        req.user = jsonwebtoken.verify(token, secret)
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({"message": "User not authorized"})
    }
}
