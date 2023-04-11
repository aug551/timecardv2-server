const { PreparedStatement: PS } = require('pg-promise');

// These are the prepared statements for employees
// Handles CRUD operations for employees
const getEmployeeById = new PS({ name: 'find-emp', text: 'SELECT * FROM employees WHERE empId = $1' });
const getAllEmployees = new PS({ name: 'all-emps', text: 'SELECT * FROM employees' });
const addEmployee = new PS({ name: 'add-emp', text: 'INSERT INTO employees(empName, empJob, isManager) VALUES($1, $2, $3) RETURNING *' });
const updateEmployee = new PS({ name: 'update-emp', text: 'UPDATE employees SET empName=$1, empJob=$2, isManager=$3 WHERE empId=$4 RETURNING *' });
const deleteEmployee = new PS({ name: 'delete-emp', text: 'DELETE FROM employees WHERE empId=$1' });

module.exports = { getEmployeeById, getAllEmployees, addEmployee, updateEmployee, deleteEmployee };