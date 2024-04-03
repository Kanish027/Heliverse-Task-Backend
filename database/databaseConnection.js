// Import Mongoose for MongoDB interactions
import mongoose from "mongoose";

// Define an asynchronous function for establishing database connection
const databaseConnection = async () => {
  try {
    // Connect to MongoDB using the provided MONGO_URI environment variable
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "heliverse",
    });
    // Log a successful database connection message
    console.log(`Database Connection Established on ${connection.host}`);
  } catch (error) {
    // Log any errors that occur during database connection
    console.log(error);
  }
};

// Export the database connection function for use in other parts of the application
export default databaseConnection;
