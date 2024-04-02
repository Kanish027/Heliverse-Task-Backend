import team from "../model/teamSchema.js";
import user from "../model/userSchema.js";

const createTeam = async (req, res) => {
  try {
    const { teamName, selectedUserIds, teamLeaderName } = req.body;

    console.log(teamLeaderName, teamName, selectedUserIds);

    // Check if team name is provided
    if (!teamName) {
      return res
        .status(400)
        .json({ success: false, message: "Team name is required" });
    }

    // Check if selected user IDs are provided
    if (
      !selectedUserIds ||
      !Array.isArray(selectedUserIds) ||
      selectedUserIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Select at least one user for the team",
      });
    }

    // Check if team leader ID is provided
    if (!teamLeaderName) {
      return res
        .status(400)
        .json({ success: false, message: "Team leader name is required" });
    }

    // Fetch selected users and team leader from the database
    const selectedUsers = await user.find({ _id: { $in: selectedUserIds } });
    const teamLeader = await user.findOne({ name: teamLeaderName });

    // Check if selected users and team leader are valid
    if (!selectedUsers || selectedUsers.length === 0 || !teamLeaderName) {
      return res.status(404).json({
        success: false,
        message: "Selected users or team leader not found",
      });
    }

    // Check for unique domains and availability of selected users
    const domains = new Set();
    const availabilityMap = new Map();

    for (const user of selectedUsers) {
      if (domains.has(user.domain)) {
        return res.status(400).json({
          success: false,
          message: `Duplicate domain found for user ${user.email}`,
        });
      }
      domains.add(user.domain);

      if (availabilityMap.has(user.available)) {
        return res.status(400).json({
          success: false,
          message: `Duplicate availability found for user ${user.email}`,
        });
      }
      availabilityMap.set(user.available, true);
    }

    // Create the team
    const newTeam = new team({
      teamName,
      selectedUsers: selectedUsers.map((user) => user._id),
      teamLeader: teamLeaderName,
    });

    await newTeam.save();

    res.status(201).json({
      success: true,
      message: "Team created successfully",
      team: newTeam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const teamDetails = async (req, res) => {
  try {
    const teamId = req.params.id;

    const teamDetail = await team
      .findById(teamId)
      .populate("selectedUsers teamLeader");

    if (!teamDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found" });
    }

    res.status(200).json({ success: true, teamDetail });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await team.find({});

    if (!teams || teams.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No teams found",
      });
    }

    res.status(200).json({
      success: true,
      teams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createTeam, teamDetails, getAllTeams };
