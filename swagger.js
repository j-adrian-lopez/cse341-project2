const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Project 2',
    description: 'New Employees API',
  },
  host: 'cse341-project02-32p3.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);
