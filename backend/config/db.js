import mongoose from 'mongoose';

const dbConnect = () => {
  const dbConnection = mongoose.connect(process.env.MONGO_URI);

  if (!dbConnection) {
    console.error('Database Connection failed');
  }

  console.log('Database Connected');
};

export default dbConnect;
