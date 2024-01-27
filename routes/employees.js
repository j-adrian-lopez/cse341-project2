const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees');

// route to get all employees from db
router.get('/', employeesController.getAll);

//route to post contact
router.post('/', employeesController.createEmployee);

module.exports = router;
