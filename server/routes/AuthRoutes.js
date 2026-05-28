import express from "express";

import {
  registerUser,
  loginUser,
  forgotPassword,
} from "../controllers/AuthController.js";

const router =
  express.Router();

// REGISTER
router.post(
  "/register",
  registerUser
);

// LOGIN
router.post(
  "/login",
  loginUser
);

// FORGOT PASSWORD
router.post(
  "/forgot-password",
  forgotPassword
);

export default router;