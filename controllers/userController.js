import user from "../model/userSchema.js";
import ApiFeature from "../utils/ApiFeature.js";

const newUser = async (req, res) => {
  try {
    const {
      id,
      first_name,
      last_name,
      email,
      gender,
      avatar,
      domain,
      available,
    } = req.body;
    const User = await user.findOne({ email });
    if (User) {
      return res.status(403).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const newUser = new user({
      id: id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      gender: gender,
      avatar: avatar,
      domain: domain,
      available: available,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const AllUsers = async (req, res) => {
  try {
    const resultPerPage = process.env.RESULT_PER_PAGE;
    const userCount = await user.countDocuments();

    const apiFeature = new ApiFeature(user.find(), req.query).search().filter();

    let users = await apiFeature.query;

    let filteredUsersCount = users.length;

    apiFeature.pagination(resultPerPage);

    users = await apiFeature.query.clone();

    res.status(200).json({
      success: true,
      users,
      filteredUsersCount,
      resultPerPage,
      userCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const SpecificUser = async (req, res) => {
  try {
    const specificUser = await user.find({ id: req.params.id });
    res.status(200).json({
      success: true,
      specificUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const User = await user.findOne({ id: req.params.id });
    if (!User) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    const { first_name, last_name, email, gender, avatar, domain, available } =
      req.body;

    if (first_name) {
      User.first_name = first_name;
    }

    if (last_name) {
      User.last_name = last_name;
    }

    if (email) {
      User.email = email;
    }

    if (gender) {
      User.gender = gender;
    }

    if (avatar) {
      User.avatar = avatar;
    }

    if (available) {
      User.available = available;
    }

    if (domain) {
      User.domain = domain;
    }

    await User.save();

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const deletedUser = await user.findOne({ id: req.params.id });

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    await deletedUser.deleteOne();

    res.status(200).json({
      success: true,
      message: "User Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await user.find({});

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { newUser, AllUsers, SpecificUser, UpdateUser, DeleteUser, getAllUsers };
