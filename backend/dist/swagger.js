<<<<<<< HEAD
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerJsDoc = require('./swagger-jsdoc');
const swaggerUi = require('./swagger-ui-express');
=======
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
const swaggerDocs = (app) => {
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
<<<<<<< HEAD
exports.default = swaggerDocs;
//# sourceMappingURL=swagger.js.map
=======
export default swaggerDocs;
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
