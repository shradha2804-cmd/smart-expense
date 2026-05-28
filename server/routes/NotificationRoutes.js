import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getNotifications,
  createNotification,
  deleteNotification,
  markAsRead,
} from "../controllers/NotificationController.js";

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

      res.status(403).json({
        message:
          "Admin access only",
      });

    }

  };

// GET USER NOTIFICATIONS
router.get(
  "/",
  protect,
  getNotifications
);

// CREATE NOTIFICATION
// ADMIN ONLY
router.post(
  "/",
  protect,
  adminOnly,
  createNotification
);

// MARK AS READ
router.put(
  "/:id/read",
  protect,
  markAsRead
);

// DELETE NOTIFICATION
router.delete(
  "/:id",
  protect,
  deleteNotification
);

export default router;