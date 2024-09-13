const swaggerJsDoc = require('./swagger-jsdoc');
const swaggerUi = require('./swagger-ui-express');

const swaggerDocs = (app: any) => {
  const swaggerSpec = swaggerJsDoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'EduPlug API',
        version: '1.0.0',
      },
    },
    apis: ['./routes/*.ts'], // Adjust path if needed
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
