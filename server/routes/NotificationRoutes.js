import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getNotifications,
  createNotification,
  deleteNotification,
} from "../controllers/NotificationController.js";

const router =
  express.Router();

router.get(
  "/",
  protect,
  getNotifications
);

router.post(
  "/",
  protect,
  createNotification
);

router.delete(
  "/:id",
  protect,
  deleteNotification
);

export default router;