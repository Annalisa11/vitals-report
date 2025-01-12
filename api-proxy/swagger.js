const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vitals Report API',
      description: 'API endpoints for the vitals report website',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:5000/',
        description: 'Local server',
      },
      {
        url: 'https://vitals-report.onrender.com',
        description: 'Live server',
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

module.exports = swaggerDocs;
