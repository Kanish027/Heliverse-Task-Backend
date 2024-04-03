// Import Express for handling HTTP requests
import express from "express";
// Import controller functions for team operations
import {
  createTeam,
  getAllTeams,
  teamDetails,
} from "../controllers/teamController.js";

// Create an Express router instance
const router = express.Router();

// Route for creating a new team via POST request
router.post("/team", createTeam);

// Route for getting details of a specific team via GET request
router.get("/team/:id", teamDetails);

// Route for getting all teams via GET request
router.get("/teams", getAllTeams);

// Export the router for use in other parts of the application
export default router;
