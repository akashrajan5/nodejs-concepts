const client = require('../config/mongodb');
const { splitToken } = require('../utils/main');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// add created column/key in table // database .catch err
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let db = client.db('app').collection("users");
        let emailExists = await db.findOne({ email }).catch(err => console.log(err)); // catch not sure
        if (emailExists != null) throw { custom: true, status: 409, message: "Email already exists" };
        let hashed = await bcrypt.hash(password, 10).catch(err => { throw err.message; });
        await db.insertOne({ username, email, password: hashed }).catch(err => { throw err; }); // not sure catch works and revert of jwt fails
        jwt.sign({ email }, "secretkey", { algorithm: 'HS512', expiresIn: "1hr" }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ status: 200, data: { token: token } });
        });
    } catch (err) {
        "custom" in err ? res.status(err.status).json(err) : res.status(500).json({ status: 500, message: err.message, error: [...err] });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let db = client.db('app').collection("users");
        let user = await db.findOne({ email }).catch(err => console.log(err));
        if (user == null) throw { isLoggedIn: false, message: "This user is not registered" };
        let checkPassword = await bcrypt.compare(password, user.password).catch(err => { throw err; });
        if (!checkPassword) throw { custom: true, status: 401, message: "Incorrect password" };
        jwt.sign({ email: user.email }, "secretkey", { algorithm: 'HS512', expiresIn: "1hr" }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ status: 200, data: { token: token } });
        });
    } catch (err) {
        "custom" in err ? res.status(err.status).json(err) : res.status(500).json({ status: 500, message: err.message, error: [...err] });
    }
};


const verifyToken = (req, res) => {
    try {
        const bearerToken = req.headers.authorization;
        let token = splitToken(bearerToken);
        jwt.verify(token, "secretkey", { algorithms: 'HS512' }, (err, data) => {
            if (err) throw err;
            let { email } = data;
            res.status(200).json({ status: 200, data: { email, token: token } });
        });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message, error: [...err] });
    }
};


const logout = (req, res) => {
    res.send("logout path");
};


module.exports = {
    register: register,
    login: login,
    verify: verifyToken,
    logout: logout
};