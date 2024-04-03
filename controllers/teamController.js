import team from "../model/teamSchema.js";
import user from "../model/userSchema.js";

const createTeam = async (req, res) => {
  try {
    const { teamName, selectedUserIds, teamLeaderName } = req.body;

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

    // Check if team leader name is provided
    if (!teamLeaderName) {
      return res
        .status(400)
        .json({ success: false, message: "Team leader name is required" });
    }

    // Fetch selected users from the database
    const selectedUsers = await user.find({ _id: { $in: selectedUserIds } });

    // Check if selected users are valid
    if (!selectedUsers || selectedUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Selected users not found",
      });
    }

    // Ensure unique domains among selected users
    const domains = new Set();
    for (const user of selectedUsers) {
      if (domains.has(user.domain)) {
        return res.status(400).json({
          success: false,
          message: `Users must have unique domains. Duplicate domain found: ${user.domain}`,
        });
      }
      domains.add(user.domain);
    }

    // Create the team
    const newTeam = new team({
      teamName,
      selectedUsers: selectedUserIds,
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
    const teams = await team.find({}).sort({ createdAt: -1 });

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
