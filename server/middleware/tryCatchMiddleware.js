const tryCatchMiddleware = (controller) => {
    return async (req, res, next) => {
        try {
             res.status(200).send(await controller(req, res, next));
        } catch (error) {
            console.log(error)
            return res.status(400);
        }
    };
};

export default tryCatchMiddleware;
