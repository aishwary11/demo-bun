import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error while connect', error);
    setTimeout(connectDB, 10000);
  }
};
export default connectDB;
