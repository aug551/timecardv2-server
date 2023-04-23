const express = require('express');
const logger = require('../logger');
const { query, queryMultiple } = require('../db/db');
const { getEmployeeById } = require('../db/emp-statements');
const { getEmpShiftsById, punchIn, getLatestEmpShift, punchOut } = require('../db/shift-statements');
const router = express.Router();

router.use(express.json());

router.post('/login', async (req, res) => {
    let empId = req.body.empId;
    logger.info(`Login requested for: ${empId}`);

    try {
        let data = await query(getEmployeeById, [empId]);
        let emp = JSON.stringify(data);
        logger.info(`Found: ${emp}`);

        if (data.ismanager) return res.send(JSON.stringify({ requirePwd: true }));
        res.send(emp);
    }
    catch (error) {
        logger.error(error.message + ` Query: login(${empId})`);
        res.status(404).send({ error: "Could not find employee." });
    }
});

router.post('/shifts', async (req, res) => {
    let empId = req.body.empId;

    try {
        let data = await queryMultiple(getEmpShiftsById, [empId]);
        let shifts = JSON.stringify(data);
        logger.info(`Shifts queried for: ${empId}`);
        res.send(shifts);
    }
    catch (error) {
        if (error.message == 'No data returned from the query.') {
            return res.send([]);
        }
        logger.error(error.message + ` Query: shiftById(${empId})`);
        res.status(400).send(error.message);
    }
});

router.post('/punch-in', async (req, res) => {
    let empId = req.body.empId;

    try {
        let data = await query(punchIn, [empId]);
        let newShift = JSON.stringify(data);
        console.log(newShift);
        logger.info(`Inserted shift: ${newShift.shiftId}`);
        res.send(newShift);
    }
    catch (error) {
        logger.error(error.message + ` Query: new shift (emp: ${empId})`);
        res.status(400).send(error.message);
    }
});

router.post('/punch-out', async (req, res) => {
    let empId = req.body.empId;

    try {
        let latestShift = await query(getLatestEmpShift, [empId]);

        if (latestShift.shiftend != null) {
            throw new Error('Employee has no active shifts');
        }

        let data = await query(punchOut, [latestShift.shiftid]);
        let result = JSON.stringify(data);
        logger.info(`Updated shift: ${data.shiftid}`);
        return res.send(result);
    }
    catch (error) {
        logger.error(error.message + ` Query: punch-out (empId: ${empId})`);
        return res.status(400).send(error.message);
    }
});

module.exports = router;
