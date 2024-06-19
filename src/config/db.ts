// src/config/db.ts
import mongoose from 'mongoose';

const connectDB = async () => {
    const URI:string=process.env.MONGO_URI || 'mongodb://localhost:27017/bitespeed'
    console.log("mongodb",URI)
  try {
    await mongoose.connect(URI, {});
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
