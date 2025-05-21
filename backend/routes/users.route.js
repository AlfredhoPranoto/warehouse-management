import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import { adminOnly, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminOnly, getUsers);
router.get("/:id", authMiddleware, adminOnly, getUser);
router.post("/", authMiddleware,adminOnly, createUser);
router.put("/:id", authMiddleware,adminOnly, updateUser);
router.delete("/:id", authMiddleware,adminOnly, deleteUser);

export default router;
