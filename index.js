// Import dependencies
import express from "express";
import "dotenv/config"; // Load environment variables
import databaseConnection from "./database/databaseConnection.js"; // Database connection setup
import userRouter from "./routes/user.js"; // User route handlers
import teamRouter from "./routes/team.js"; // Team route handlers

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Initialize database connection
databaseConnection();

// Route registration
app.use("/api/v1", userRouter);
app.use("/api/v1", teamRouter);

// Start the server4
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on PORT ${process.env.PORT}`); // Log server start
});
