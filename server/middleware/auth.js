const cookieParser = require('cookie-parser');

const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const token = req.header("token");
    if (!token) return res.status(401).json({ message: "Auth Error" });

    try {
        const decoded = jwt.verify(token, "randomString");
        req.hospital = decoded.hospital;
        
        console.log("logged in")
        res.cookie('token', token, { httpOnly: false })
        
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ messsage: "Invalid Token "});
    }
};