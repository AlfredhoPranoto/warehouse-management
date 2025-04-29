import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
export const getAllStaff = async (req, res) => {
  const staffs = await User.find({ role: "staff" }).select(
    "_id email firstName lastName age warehouse"
  );

  try {
    return res.status(200).json({
      success: true,
      message: "Success get staff",
      data: staffs,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getStaff = async (req, res) => {
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

export const createStaff = async (req, res) => {
  const staff = req.body;
  staff.password = await bcrypt.hash(staff.password, 10);

  if (
    !staff.email ||
    !staff.password ||
    !staff.firstName ||
    !staff.lastName ||
    !staff.age ||
    !staff.warehouse
  ) {
    return res.status(400).json({ message: "Please provide all fields" });
  }
  try {
    const newStaff = await User.create(staff);
    return res
      .status(201)
      .json({
        success: true,
        message: "Success created staff",
        data: newStaff,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export const updateStaff = async (req, res) => {
  const { id } = req.params;
  const staff = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Staff not found" });
  }

  try {
    const updatedStaff = await User.findByIdAndUpdate(id, staff, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      data: updatedStaff,
      message: "Staff Updated",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Staff not found" });
  }

  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Staff deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
