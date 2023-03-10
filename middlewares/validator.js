const { body, validationResult, check } = require('express-validator');


const registerRules = () => {
    return [
        body('username').trim().escape().not().isEmpty(),
        body('email').isEmail(),
        body('password').isLength({ min: 8 }),
        body('confirmPass').isLength({ min: 8 }),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = { registerRules, validate };