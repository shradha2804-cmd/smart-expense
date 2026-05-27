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


// GET
router.get(
  "/",
  protect,
  getNotifications
);


// CREATE
router.post(
  "/",
  protect,
  createNotification
);


// MARK READ
router.put(
  "/:id/read",
  protect,
  markAsRead
);


// DELETE
router.delete(
  "/:id",
  protect,
  deleteNotification
);

export default router;