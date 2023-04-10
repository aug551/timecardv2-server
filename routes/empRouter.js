const express = require('express');
const { logger } = require('../logger');
const router = express.Router();

router.post('/login', (req, res) => {
    logger.info(`Login requested for: ${"test"}`)

    // TODO: implement database
    let emp = {
        id: 1,
        name: 'Aaron Cruz',
        job: 'Cashier'
    }

    res.send(JSON.stringify(emp, null, 4));
});

module.exports = router;
