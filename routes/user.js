import express from "express";
import {
  AllUsers,
  DeleteUser,
  SpecificUser,
  UpdateUser,
  getAllUsers,
  newUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/user", newUser);

router.get("/users", AllUsers);

router.get("/user/:id", SpecificUser);

router.put("/user/:id", UpdateUser);

router.delete("/user/:id", DeleteUser);

router.get("/users/all", getAllUsers);

export default router;
