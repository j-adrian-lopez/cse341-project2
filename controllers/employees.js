const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// get all contacts
const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db('project2')
    .collection('part1')
    .find();

  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
  // .toArray((err, contacts) => {
  //   if (err) {
  //     res.status(400).json({ message: err });
  //   }
  //   res.setHeader('Content-Type', 'application/json');
  //   res.status(200).json(contacts);
  // });
};

// create one contact
const createEmployee = async (req, res) => {
  const user = {
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
    .insertOne(user);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while creating the user');
  }
};

module.exports = {
  getAll,
  createEmployee,
};
