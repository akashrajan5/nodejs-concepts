const express = require('express');
const controller = require('../controllers/index');
const { validate } = require('../middlewares/expressValidator');
const { registerRules, loginRules } = require('../validators/authRules');
const router = express.Router();


router.post('/register', registerRules(), validate, controller.auth.register);

router.post('/login', loginRules(), validate, controller.auth.login);

router.get('/verify-token', controller.auth.verify);

router.get('/logout', controller.auth.logout);


module.exports = router;