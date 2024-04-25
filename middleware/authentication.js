const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    try {
        let token = ''
        if(req.headers.cookie){
            token = req.headers.cookie.split('=')[1]
        } else if (req.headers['x-auth-token']){
            token = req.headers['x-auth-token']
        } else return res.status(403).send("Access denied.1");
        if (!token) return res.status(403).send("Access denied.2");

        const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
        req.body.userID = decoded._id;
        next();
    } catch (error) {
        console.log("error")
        console.log(error)
        res.status(400).send("Invalid token");
    }
};

const isOwner = (req, res, next) => {
    try {
        if(!req.headers.cookie) return res.status(403).send("Access denied.");
        const token = req.headers.cookie.split('=');
        const decoded = jwt.verify(token[1], process.env.JWTSECRETKEY);
        if(decoded.userType !== 1) throw("Access denied.")
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, error})
    }
};

module.exports = {
    isAuthenticated,
    isOwner
}