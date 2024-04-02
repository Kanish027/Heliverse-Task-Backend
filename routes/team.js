import express from "express";
import {
  createTeam,
  getAllTeams,
  teamDetails,
} from "../controllers/teamController.js";

const router = express.Router();

router.post("/team", createTeam);

router.get("/team/:id", teamDetails);

router.get("/teams", getAllTeams);

export default router;
