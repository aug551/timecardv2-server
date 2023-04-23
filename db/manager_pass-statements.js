const { PreparedStatement: PS } = require('pg-promise');

// Prepared statments for manager passwords
const getManagerPwd = new PS({ name: 'find-pwd', text: 'SELECT * FROM manager_pass WHERE empId = $1' });
const setManagerPwd = new PS({ name: 'new-pass', text: 'INSERT INTO manager_pass(empId, pwd) VALUES($1, $2)' });

module.exports = { getManagerPwd, setManagerPwd };