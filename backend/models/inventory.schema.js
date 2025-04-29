import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  warehouse: {
    type: String,
    required: true,
    enum: ["A", "B", "C"],
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema, "inventory");

export default Inventory;
