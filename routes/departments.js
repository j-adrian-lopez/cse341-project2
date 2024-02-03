const express = require('express');
const router = express.Router();

const departmentsController = require('../controllers/departments');
const {
  validate,
  departmentValidationRules,
} = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// route to get all departments from db
router.get('/', departmentsController.getAll);

// route to get a single department by Id
router.get('/:id', isAuthenticated, departmentsController.getById);

//route to load department
router.post(
  '/',
  isAuthenticated,
  departmentValidationRules(),
  validate,
  departmentsController.createDepartment
);

//route to update department
router.put(
  '/:id',
  isAuthenticated,
  departmentValidationRules(),
  validate,
  departmentsController.updateDepartment
);

// route to delete department
router.delete('/:id', isAuthenticated, departmentsController.deleteById);

module.exports = router;
