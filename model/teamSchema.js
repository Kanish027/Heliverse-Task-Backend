// Import Mongoose for MongoDB interactions
import mongoose from "mongoose";

// Define the team schema using Mongoose
const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true, // Team name is a required field
  },
  selectedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model for selected users
    },
  ],
  teamLeader: {
    type: String,
    required: true, // Team leader is a required field
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default creation date is the current date/time
  },
});

// Create a Mongoose model based on the team schema
const team = mongoose.model("Team", teamSchema);

// Export the team model for use in other parts of the application
export default team;
