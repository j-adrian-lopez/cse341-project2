const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const {
  emptyDbError,
  notFoundError,
  internalServerError,
} = require('../middleware/errors');

// get all department info
const getAll = async (req, res, next) => {
  //#swagger.tags=['Departments']
  try {
    const result = await mongodb
      .getDatabase()
      .db('project2')
      .collection('part2')
      .find();

    if (!result || result.length === 0) {
      throw emptyDbError();
    }

    result.toArray().then((departments) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(departments);
    });
  } catch (error) {
    next(error);
  }
};

// get department by ID
const getById = async (req, res, next) => {
  //#swagger.tags=['Departments']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res
        .status(400)
        .json('Must use a valid department id to get a department.');
      return;
    }

    const departmentID = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db('project2')
      .collection('part2')
      .find({ _id: departmentID })
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
const createDepartment = async (req, res, next) => {
  //#swagger.tags=['Departments']
  try {
    const department = {
      department: req.body.department,
      employees: req.body.employees,
      average_salary: req.body.average_salary,
    };

    const response = await mongodb
      .getDatabase()
      .db('project2')
      .collection('part2')
      .insertOne(department);

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
const updateDepartment = async (req, res, next) => {
  //#swagger.tags=['Departments']
  try {
    const departmentID = new ObjectId(req.params.id);
    const department = {
      department: req.body.department,
      employees: req.body.employees,
      average_salary: req.body.average_salary,
    };

    const response = await mongodb
      .getDatabase()
      .db('project2')
      .collection('part2')
      .replaceOne({ _id: departmentID }, department);
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
  //#swagger.tags=['Departments']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res
        .status(400)
        .json('Must use a valid department id to delete a department.');
      return;
    }

    const departmentID = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db('project2')
      .collection('part2')
      .deleteOne({ _id: departmentID });

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
  createDepartment,
  updateDepartment,
  getById,
  deleteById,
};
