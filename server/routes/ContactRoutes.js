import express from "express";

import protect from "../middleware/authMiddleware.js";

import {

  createContactMessage,

  getContactMessages,

  markMessageRead,

  deleteMessage,

} from "../controllers/ContactController.js";

const router =
  express.Router();

// GUEST SEND MESSAGE
router.post(
  "/",
  createContactMessage
);

// ADMIN GET ALL MESSAGES
router.get(
  "/",
  protect,
  getContactMessages
);

// ADMIN MARK READ
router.put(
  "/:id/read",
  protect,
  markMessageRead
);

// ADMIN DELETE
router.delete(
  "/:id",
  protect,
  deleteMessage
);

export default router;