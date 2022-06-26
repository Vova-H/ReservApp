const idReqMiddleware = (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id.match(/^\d+$/) || id < 1) {
            return res.status(400).json({"message": "invalid id"});
        }
        return next();
    } catch (e) {
        return res.status(400).json(e);
    }
};

export default idReqMiddleware;
