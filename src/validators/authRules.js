const { body } = require('express-validator');


const registerRules = () => [
    body('username').isLength({ min: 3 }).withMessage('Must be at least 3 characters long').trim().escape(),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Must be at least 8 characters long'),
    // body('confirmPass').isLength({ min: 8 }).withMessage('Must be at least 8 characters long').custom((value, { req }) => {
    //     if (value !== req.body.password) throw new Error('Confirm password and password mismatches');
    // }),
];


const loginRules = () => [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must contain atmost 8 characters'),
];


module.exports = {
    registerRules: registerRules(),
    loginRules: loginRules()
};