const express = require('express');
const { home, error, auth } = require('./routes/index');
const { authVerify } = require('./middlewares/index');
const app = express();
const helmet = require('helmet');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.disable('x-powered-by');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/auth', auth);
app.use('/', authVerify, home);
app.use('/error', error);


module.exports = app;