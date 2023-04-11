const { PreparedStatement: PS } = require('pg-promise');

// These are the prepared statements for the shifts table
// Handles CRUD operations for shifts/employee shifts
const getEmpShiftsById = new PS({ name: 'find-shifts-by-empid', text: 'SELECT * FROM shifts WHERE empId = $1 ORDER BY shiftId DESC' });
const getLatestEmpShift = new PS({ name: 'get-latest-shift', text: 'SELECT * FROM shifts WHERE empId=$1 ORDER BY shiftStart DESC LIMIT 1' });
const getAllEmpShiftByDate = new PS({ name: 'find-shifts-by-date', text: 'SELECT * FROM shifts WHERE shiftStart=$1, shiftStart=$2 ORDER BY empId, shiftId DESC' });
const punchIn = new PS({ name: 'punch-in', text: 'INSERT INTO shifts(empId, shiftStart) VALUES($1, current_timestamp) RETURNING *' });
const punchOut = new PS({ name: 'punch-out', text: 'UPDATE shifts SET shiftEnd=current_timestamp WHERE shiftId=$1 RETURNING *' });

module.exports = { getEmpShiftsById, getLatestEmpShift, getAllEmpShiftByDate, punchIn, punchOut };