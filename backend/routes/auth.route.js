import express from "express";
import { loginStaff } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginStaff);

export default router;
