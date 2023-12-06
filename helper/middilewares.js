const numCheck = async (req, res, next) => {
    console.log("numCheck middleware", req.body);
    const num = req.params.num 
    if (
        num>2
    ) {
        return res.status(401).send(num + "is grater than 2");
    }
    next();
};


export {numCheck}