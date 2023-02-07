import mongoose from 'mongoose';
import dotenv from 'dotenv';

const dbName = 'yourMongoDatabaseName';

dotenv.config();

const connectDB = async () => {
  try {
    mongoose.set({ strictQuery: false });
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_app');

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
