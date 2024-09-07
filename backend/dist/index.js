"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
const swagger_1 = __importDefault(require("./swagger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({ credentials: true }));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
// Routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/posts', postRoutes_1.default);
app.use('/api/comments', commentRoutes_1.default);
app.use('/api/notifications', notificationRoutes_1.default);
// Swagger Documentation
(0, swagger_1.default)(app);
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/edu-db-plug';
// mongoose.connect(MONGO_URL);
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch((error: Error) => console.error('MongoDB connection error:', error));
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
mongoose_1.default.connect(MONGO_URL)
    .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure code
});