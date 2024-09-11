"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocs = (app) => {
    const swaggerSpec = (0, swagger_jsdoc_1.default)({
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'EduPlug API',
                version: '1.0.0',
            },
        },
        apis: ['./routes/*.ts'], // Adjust path if needed
    });
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
};
exports.default = swaggerDocs;
