const jwt = require("jsonwebtoken");
const { splitToken } = require("../utils/main");

const verifyToken = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) return res.status(403).send("A token is required for authentication");
    try {
        let token = splitToken(bearerToken);
        jwt.verify(token, process.env.JWT_SECRET, { algorithm: 'HS512' }, (err, data) => {
            if (err) throw err;
            return next();
        });
    } catch (err) {
        return res.status(401).send(err.message);
    }
};


module.exports = { verifyToken: verifyToken };