const handlerGetToken = (req) => {
    return req.headers.authorization.split(" ")[1]
}
export default handlerGetToken
