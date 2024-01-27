const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees');
const { validate, employeeValidationRules } = require('../middleware/validate');

// route to get all employees from db
router.get('/', employeesController.getAll);

// route to get a single employee by Id
router.get('/:id', employeesController.getById);

//route to load employee
router.post(
  '/',
  employeeValidationRules(),
  validate,
  employeesController.createEmployee
);

//route to update employee
router.put(
  '/:id',
  employeeValidationRules(),
  validate,
  employeesController.updateEmployee
);

// route to delete employee
router.delete('/:id', employeesController.deleteById);

module.exports = router;
