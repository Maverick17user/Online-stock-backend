const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {EMPLOYEE, EMPLOYEE_OPERATOR, EMPLOYEE_CONTROLLER, EMPLOYEE_MANAGER} = require('../constants/roles');
const {createTTN, getTTN, editTTN} = require('../controllers/ttnControllers');

router.post('', auth.AUTH([EMPLOYEE], EMPLOYEE_OPERATOR), createTTN);
router.post('/:id', auth.AUTH([EMPLOYEE], EMPLOYEE_CONTROLLER, EMPLOYEE_MANAGER), editTTN);
router.get('/:id', auth.AUTH([EMPLOYEE], EMPLOYEE_MANAGER), getTTN);

module.exports = router;