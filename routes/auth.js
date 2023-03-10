const express = require('express');
var jwt = require('jsonwebtoken');
const { registerRules, validate } = require('../middlewares/validator');
const { splitToken } = require('../utils/main');
const router = express.Router();

router.post('/register', registerRules(), validate, (req, res) => {
    const { username, email, password, confirmPass } = req.body;
    res.send();
});

router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        const user = { email: email, id: 1 };
        jwt.sign(user, process.env.JWT_SECRET, { algorithm: 'HS512', expiresIn: "1hr" }, function (err, token) {
            if (err) throw err;
            res.status(200).json({ token: token });
        });
    } catch (err) {
        res.send(500).json(err);
    }
});

router.get('/verify-token', (req, res) => {
    try {
        const bearerToken = req.headers.authorization;
        let token = splitToken(bearerToken);
        jwt.verify(token, process.env.JWT_SECRET, { algorithms: 'HS512' }, (err, data) => {
            if (err) throw err;
            let { id, email } = data;
            res.status(200).json({ id, email, "Authorization": token });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/logout', (req, res) => {
    res.send("logout path");
});


module.exports = router;