const { body, validationResult } = require('express-validator');

const employeeValidationRules = () => {
  return [
    // employeeId must be a number
    body('employeeId').notEmpty().isNumeric(),
    // first name must be a string
    body('firstName').notEmpty().isString(),
    // last name must be a string
    body('lastName').notEmpty().isString(),
    // email must be an email
    body('email').notEmpty().isEmail(),
    // position must be a string
    body('position').notEmpty().isString(),
    // department must be a string
    body('department').notEmpty().isString(),
    // salary must be a number
    body('salary').notEmpty().isNumeric(),
  ];
};

const departmentValidationRules = () => {
  return [
    body('department').notEmpty().isString(),
    body('employees')
      .notEmpty()
      .isNumeric()
      .withMessage('Employees must be a number'),
    body('average_salary')
      .isNumeric()
      .withMessage('The average salary must be a number'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  employeeValidationRules,
  departmentValidationRules,
  validate,
};
