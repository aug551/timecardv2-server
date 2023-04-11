require('dotenv').config();
const pgp = require('pg-promise')({});
const db = pgp(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`);

// This file handles the postgres connection & queries
// The statements for emps and shifts are in their own files
async function query(statement, values) {
    try {
        let result = await db.one(statement, values);
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function queryMultiple(statement, values) {
    try {
        let result = await db.many(statement, values);
        return result;
    }
    catch (err) {
        throw err;
    }
}

module.exports = { query, queryMultiple };