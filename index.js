import express from "express";
import "dotenv/config";
import databaseConnection from "./database/databaseConnection.js";
import userRouter from "./routes/user.js";
import teamRouter from "./routes/team.js";

const app = express();

app.use(express.json());

databaseConnection();

app.use("/api/v1", userRouter);
app.use("/api/v1", teamRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on PORT ${process.env.PORT}`);
});
