const express = require('express')
const router = express.Router();


router.get('/login', (req, res) => {
    // TODO: implement database
    let emp = {
        id: 1,
        name: 'Aaron Cruz',
        job: 'Cashier'
    }

    res.send(JSON.stringify(emp, null, 4));
});

module.exports = router;
