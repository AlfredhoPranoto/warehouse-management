import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProduct,
  updateProduct,
} from "../controllers/inventory.controller.js";
import { adminOnly, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getProducts);
router.get("/:id", authMiddleware, getProduct);
router.post("/", authMiddleware, adminOnly, createProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminOnly, deleteProduct);

export default router;
