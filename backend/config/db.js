import mongoose from 'mongoose';

// connect to the database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });

    console.log(`MongoDB connected: ${conn.connection.host}`.yellow);
  } catch (error) {
    console.error(`DB ERROR: ${error.message}`.red.bold);
    // exit with failure
    process.exit(1);
  }
};

export default connectDB;
