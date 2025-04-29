import express from "express";
import {
  createStaff,
  deleteStaff,
  getAllStaff,
  getStaff,
  updateStaff,
} from "../controllers/user.controller.js";
import { adminOnly, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminOnly, getAllStaff);
router.get("/:id", authMiddleware, adminOnly, getStaff);
router.post("/", authMiddleware,adminOnly, createStaff);
router.put("/:id", authMiddleware,adminOnly, updateStaff);
router.delete("/:id", authMiddleware,adminOnly, deleteStaff);

export default router;
