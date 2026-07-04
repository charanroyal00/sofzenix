import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connString = process.env.MONGODB_URI || 'mongodb://localhost:27017/sofzenix';
    console.log(`Connecting to MongoDB...`);
    
    // Set connection timeout and buffering options to prevent hangs
    const conn = await mongoose.connect(connString, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn(`Continuing backend startup without database. Some API features may be limited.`);
  }
};

export default connectDB;
