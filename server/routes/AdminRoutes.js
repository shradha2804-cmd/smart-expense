import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getAdminDashboard,
  getUsers,
  deleteUser,
} from "../controllers/AdminController.js";

const router =
  express.Router();

// ADMIN MIDDLEWARE
const adminOnly =
  (req, res, next) => {

    if (
      req.user &&
      req.user.isAdmin
    ) {

      next();

    } else {

      return res
        .status(403)
        .json({
          message:
            "Admin access only",
        });

    }

  };

// DASHBOARD
router.get(
  "/dashboard",
  protect,
  adminOnly,
  getAdminDashboard
);

// USERS
router.get(
  "/users",
  protect,
  adminOnly,
  getUsers
);

// DELETE USER
router.delete(
  "/users/:id",
  protect,
  adminOnly,
  deleteUser
);

export default router;