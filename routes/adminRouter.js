const express = require('express');
const logger = require('../logger');
const router = express.Router();
const bcrypt = require('bcrypt');
const { query, queryMultiple } = require('../db/db');
const { getManagerPwd, setManagerPwd } = require('../db/manager_pass-statements');
const { getEmployeeById, getAllEmployees, addEmployee } = require('../db/emp-statements');
const saltRounds = 10;

router.use(express.json());

router.post('/login', async (req, res) => {
    let adminId = req.body.empId;
    let adminPw = req.body.password;

    // Check if this one has password
    try {
        if (adminPw == 'kiku') {
            let data = await query(getEmployeeById, [adminId]);
            let emp = JSON.stringify(data);
            res.status(200).send(emp);
        }
        else {
            res.sendStatus(204);
        }

        // Password validation
        // let data = await query(getManagerPwd, [adminId]);
        // let pwd = JSON.stringify(data);
        // const pwdMatch = await bcrypt.compare(adminPw, pwd.pwd);
        // if (pwdMatch) {

        // }
        // else {
        //     res.sendStatus(401);
        // }
    }
    catch (err) {
        if (err.message == "No data returned from the query.") {
            if (adminPw == 'kiku') {
                return res.status(200).send({
                    message: "Change password"
                });
            }
            return res.sendStatus(204);
        }
        else {
            return res.sendStatus(500);
        }
    }
});

router.post('/set-pwd', async (req, res) => {
    let adminId = req.body.empId;
    let adminPwd = req.body.password;
    let hashPwd = await bcrypt.hash(adminPwd, saltRounds);

    try {
        let data = await query(setManagerPwd, [adminId, hashPwd]);
        res.send(JSON.stringify(data));
    }
    catch (err) {
        res.sendStatus(500);
    }
})

router.get('/getallemps', async (req, res) => {
    try {
        let data = await queryMultiple(getAllEmployees);
        res.send(JSON.stringify(data));
    }
    catch (err) {
        logger.error(err);
        res.send(err);
    }
});


router.post('/add-emp', async (req, res) => {

    try {
        let data = await query(addEmployee, [req.body.empName, req.body.empJob, req.body.isManager]);
        res.send(JSON.stringify(data));
    }
    catch (err) {
        logger.error(err);
        res.send(err);
    }
})


module.exports = router;