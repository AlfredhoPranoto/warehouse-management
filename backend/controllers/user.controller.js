import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
export const getUsers = async (req, res) => {
  const users = await User.find({ role: "staff" }).select(
    "_id email firstName lastName age warehouse"
  );

  try {
    return res.status(200).json({
      success: true,
      message: "Success get users",
      data: users,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Success get data", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;
  user.password = await bcrypt.hash(user.password, 10);

  if (
    !user.email ||
    !user.password ||
    !user.firstName ||
    !user.lastName ||
    !user.age ||
    !user.warehouse
  ) {
    return res.status(400).json({ message: "Please provide all fields" });
  }
  try {
    const newUser = await User.create(user);
    return res.status(201).json({
      success: true,
      message: "Success created user",
      data: newUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  try {
    const updateUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "User Updated",
      data: updateUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
