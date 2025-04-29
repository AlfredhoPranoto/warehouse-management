import mongoose from "mongoose";
import Inventory from "../models/inventory.schema.js";
import isEqual from "lodash/isEqual.js";
import omit from "lodash/omit.js";
export const getAllProduct = async (req, res) => {
  try {
    const inventory = await Inventory.find({});
    res
      .status(200)
      .json({ success: true, message: "Success get data", data: inventory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Inventory.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Success get data", data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  if (
    !product.name ||
    !product.description ||
    !product.price ||
    !product.stock ||
    !product.warehouse
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  try {
    const newProduct = await Inventory.create(product);

    return res.status(201).json({
      success: true,
      message: "Success created product",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  try {
    const existingProduct = await Inventory.findById(id);

    const updatedProduct = await Inventory.findByIdAndUpdate(id, product, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product Updated",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  try {
    await Inventory.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
