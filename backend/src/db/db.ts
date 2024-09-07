import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  emanil: {type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false},
    salt: {type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUser = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionTocken =(sessionTocken: string) => UserModel.findOne({
  'authentication.sessionTocken,': sessionTocken,
});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values)
  .save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});
export const updateUserById = (id: string, values: Record<string, any>) => {
    return UserModel.findByIdAndUpdate(id, values);
};

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