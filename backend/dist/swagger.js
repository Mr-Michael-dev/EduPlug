"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerJsDoc = require('./swagger-jsdoc');
const swaggerUi = require('./swagger-ui-express');
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
exports.default = swaggerDocs;
//# sourceMappingURL=swagger.js.map