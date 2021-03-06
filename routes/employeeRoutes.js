const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {COMPANY_ADMIN, EMPLOYEE, EMPLOYEE_OPERATOR, EMPLOYEE_CONTROLLER, EMPLOYEE_MANAGER} = require('../constants/roles');
const {createEmployee, editEmployee, getEmployees, getEmployee, deleteEmployee} = require('../controllers/employeeControllers');

router.post('', auth.AUTH([COMPANY_ADMIN]), createEmployee);
router.post('/:id', auth.AUTH([COMPANY_ADMIN, EMPLOYEE], [EMPLOYEE_CONTROLLER,
    EMPLOYEE_OPERATOR, EMPLOYEE_MANAGER]), editEmployee);
router.get('', auth.AUTH([COMPANY_ADMIN]), getEmployees);
router.get('/:id', auth.AUTH([COMPANY_ADMIN, EMPLOYEE], [EMPLOYEE_CONTROLLER,
    EMPLOYEE_OPERATOR, EMPLOYEE_MANAGER]), getEmployee);
router.delete('/:id', auth.AUTH([COMPANY_ADMIN]), deleteEmployee);

module.exports = router;