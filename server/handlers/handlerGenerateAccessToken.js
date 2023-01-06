import jsonwebtoken from "jsonwebtoken";
import secret from "../sign.js";

const generateAccessToken = (id, role) => {
    const payload = {
        id, role
    }
    const expiration = '30m'
    return jsonwebtoken.sign(payload, secret, {expiresIn: expiration})
}

export default generateAccessToken
