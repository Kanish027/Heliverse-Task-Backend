// Import Mongoose for MongoDB interactions
import mongoose from "mongoose";

// Define the user schema using Mongoose
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true, // ID is a required field
  },
  first_name: {
    type: String,
    required: true, // First name is a required field
  },
  last_name: {
    type: String,
    required: true, // Last name is a required field
  },
  email: {
    type: String,
    required: true, // Email is a required field
  },
  gender: {
    type: String,
    required: true, // Gender is a required field
  },
  avatar: {
    type: String,
    required: true, // Avatar URL is a required field
  },
  domain: {
    type: String,
    required: true, // Domain is a required field
  },
  available: {
    type: Boolean,
    default: true, // Default availability is true
  },
});

// Create a Mongoose model based on the user schema
const user = mongoose.model("User", userSchema);

// Export the user model for use in other parts of the application
export default user;
