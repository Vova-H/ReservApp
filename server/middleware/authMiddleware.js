import jsonwebtoken from "jsonwebtoken";
import secret from "../config.js"

export default function (req, res, next) {

    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token || token === "") {
            res.status(403).json({"message": "Пользователь не авторизирован"})
        }
        req.user = jsonwebtoken.verify(token, secret)
        next()
    } catch (e) {
        console.log(e)
        res.status(403).json({"message": "Пользователь не авторизирован"})
    }
}
