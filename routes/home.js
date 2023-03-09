const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).send("home path");
});


router.get('/slow', (req, res) => {
    for (let i = 0; i <= 10000000000; i++) { }
    res.status(200).send("Slow loading");
});


module.exports = router;