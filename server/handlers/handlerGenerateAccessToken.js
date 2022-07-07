import jsonwebtoken from "jsonwebtoken";
import secret from "../config.js";

const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles
    }
    const expiration = '30m'
    return jsonwebtoken.sign(payload, secret, {expiresIn: expiration})
}

export default generateAccessToken
