import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined');
  }

  try {
    await mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('MongoDB connected successfully');
  } catch (err) {
    if (err instanceof Error) {
      console.error('MongoDB connection error:', err.message);
    }
    process.exit(1);
  }
};

export { connectDB };
