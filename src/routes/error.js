const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    try {
        setTimeout(function () {
            var err = new Error('uncaughtException');
            throw err;
        }, 1000);
    }
    catch (err) {
        res.status(500).end(err);
    }
});


module.exports = router;