const express = require('express');
const { home, error, auth } = require('./src/routes/index');
const { authVerify, cors } = require('./src/middlewares/index');
const app = express();
const helmet = require('helmet');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.disable('x-powered-by');
app.use(cors);


app.use('/auth', auth);
app.use('/', home);
app.use('/error', error);


module.exports = app;