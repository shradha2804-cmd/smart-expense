import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/UserController.js";

const router = express.Router();

router.route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;