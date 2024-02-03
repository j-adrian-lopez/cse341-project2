const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees');
const { validate, employeeValidationRules } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// route to get all employees from db
router.get('/', employeesController.getAll);

// route to get a single employee by Id
router.get('/:id', isAuthenticated, employeesController.getById);

//route to load employee
router.post(
  '/',
  isAuthenticated,
  employeeValidationRules(),
  validate,
  employeesController.createEmployee
);

//route to update employee
router.put(
  '/:id',
  isAuthenticated,
  employeeValidationRules(),
  validate,
  employeesController.updateEmployee
);

// route to delete employee
router.delete('/:id', isAuthenticated, employeesController.deleteById);

module.exports = router;
