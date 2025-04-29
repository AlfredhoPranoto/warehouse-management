import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  warehouse: {
    type: String,
    required: true,
    enum: ["A", "B", "C"],
  },
  role: {
    type: String,
    enum: ["admin", "staff"],
    required: true,
    default: "staff",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
