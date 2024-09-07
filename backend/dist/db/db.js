"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUserById = exports.getUserBySessionTocken = exports.getUserByEmail = exports.getUser = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    emanil: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
const getUser = () => exports.UserModel.find();
exports.getUser = getUser;
const getUserByEmail = (email) => exports.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserBySessionTocken = (sessionTocken) => exports.UserModel.findOne({
    'authentication.sessionTocken,': sessionTocken,
});
exports.getUserBySessionTocken = getUserBySessionTocken;
const getUserById = (id) => exports.UserModel.findById(id);
exports.getUserById = getUserById;
const createUser = (values) => new exports.UserModel(values)
    .save().then((user) => user.toObject());
exports.createUser = createUser;
const deleteUserById = (id) => exports.UserModel.findOneAndDelete({ _id: id });
exports.deleteUserById = deleteUserById;
const updateUserById = (id, values) => {
    return exports.UserModel.findByIdAndUpdate(id, values);
};
exports.updateUserById = updateUserById;
// import dotenv from 'dotenv';
// dotenv.config();
// const connectDB = async () => {
//   const mongoUri = process.env.MONGO_URI;
//   if (!mongoUri) {
//     throw new Error('MONGO_URI is not defined');
//   }
//   try {
//     await mongoose.connect(mongoUri, {
//       useUnifiedTopology: true,
//     } as mongoose.ConnectOptions);
//     console.log('MongoDB connected successfully');
//   } catch (err) {
//     if (err instanceof Error) {
//       console.error('MongoDB connection error:', err.message);
//     }
//     process.exit(1);
//   }
// };
// export { connectDB };
