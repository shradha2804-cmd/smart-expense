import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getAdminDashboard,
  getUsers,
  deleteUser,
} from "../controllers/AdminController.js";

const router =
  express.Router();

router.get(
  "/dashboard",
  protect,
  getAdminDashboard
);

router.get(
  "/users",
  protect,
  getUsers
);

router.delete(
  "/users/:id",
  protect,
  deleteUser
);

export default router;