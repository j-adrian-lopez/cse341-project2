const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Project 2 Part 2',
    description: 'Example Company API',
  },
  host: 'cse341-project02-32p3.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);
