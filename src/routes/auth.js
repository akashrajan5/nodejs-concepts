const express = require('express');
const controller = require('../controllers/index');
const { validate } = require('../middlewares/expressValidator');
const authRules = require('../validators/authRules');
const router = express.Router();


router.post('/register', authRules.registerRules, validate, controller.auth.register);

router.post('/login', authRules.loginRules, validate, controller.auth.login);

router.get('/verify-token', controller.auth.verify);

router.get('/logout', controller.auth.logout);


module.exports = router;