const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const {
  emptyDbError,
  notFoundError,
  internalServerError,
} = require('../middleware/errors');

// get all employees
const getAll = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDatabase()
      .db('project2')
      .collection('part1')
      .find();

    if (!result || result.length === 0) {
      throw emptyDbError();
    }

    result.toArray().then((employees) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(employees);
    });
  } catch (error) {
    next(error);
  }
};

// get contact by ID
const getById = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to get a contact.');
      return;
    }

    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db('project2')
      .collection('part1')
      .find({ _id: userId })
      .toArray();

    if (!result || result.length === 0) {
      throw notFoundError();
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    next(error);
  }
};

// create one contact
const createEmployee = async (req, res, next) => {
  try {
    const employee = {
      employeeId: req.body.employeeId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      position: req.body.position,
      department: req.body.department,
      salary: req.body.salary,
    };

    const response = await mongodb
      .getDatabase()
      .db('project2')
      .collection('part1')
      .insertOne(employee);

    if (response.acknowledged > 0) {
      res.status(204).send();
    } else {
      throw internalServerError();
    }
  } catch (error) {
    next(error);
  }
};

// update employee by id
const updateEmployee = async (req, res, next) => {
  //#swagger.tags=['Employees']
  try {
    const userId = new ObjectId(req.params.id);
    const employee = {
      employeeId: req.body.employeeId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      position: req.body.position,
      department: req.body.department,
      salary: req.body.salary,
    };

    const response = await mongodb
      .getDatabase()
      .db('project2')
      .collection('part1')
      .replaceOne({ _id: userId }, employee);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      throw internalServerError();
    }
  } catch (error) {
    next(error);
  }
};

// delete contact by ID
const deleteById = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to delete a contact.');
      return;
    }

    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db('project2')
      .collection('part1')
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      throw notFoundError();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  createEmployee,
  updateEmployee,
  getById,
  deleteById,
};
