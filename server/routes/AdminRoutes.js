import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getAdminDashboard,
  getUsers,
  deleteUser,
} from "../controllers/AdminController.js";

const router =
  express.Router();


// DASHBOARD
router.get(
  "/dashboard",
  protect,
  getAdminDashboard
);


// USERS
router.get(
  "/users",
  protect,
  getUsers
);


// DELETE USER
router.delete(
  "/users/:id",
  protect,
  deleteUser
);

export default router;