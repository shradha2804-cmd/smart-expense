import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import crypto from "crypto";

import User from "../models/UserModel.js";

import sendEmail from "../utils/sendEmail.js";

// GENERATE TOKEN
const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

};

// REGISTER USER
export const registerUser =
  async (req, res) => {

    try {

      const {
        name,
        email,
        phone,
        password,
      } = req.body;

      // VALIDATION
      if (
        !name ||
        !email ||
        !phone ||
        !password
      ) {

        return res.status(400).json({
          message:
            "Please fill all fields",
        });

      }

      // EMAIL VALIDATION
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailRegex.test(email)
      ) {

        return res.status(400).json({
          message:
            "Invalid email address",
        });

      }

      // PASSWORD VALIDATION
      if (
        password.length < 6
      ) {

        return res.status(400).json({
          message:
            "Password must be at least 6 characters",
        });

      }

      // CHECK USER
      const userExists =
        await User.findOne({
          email,
        });

      if (userExists) {

        return res.status(400).json({
          message:
            "User already exists",
        });

      }

      // HASH PASSWORD
      const salt =
        await bcrypt.genSalt(10);

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        );

      // CREATE USER
      const user =
        await User.create({
          name,
          email,
          phone,
          password:
            hashedPassword,
        });

      // SEND WELCOME EMAIL
      try {

        await sendEmail({

          to: email,

          subject:
            "Welcome to Finora 🎉",

          html: `

  <div style="margin:0;padding:0;background:#f4f7ff;font-family:Arial,sans-serif;">

  <div style="max-width:650px;margin:40px auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

  <div style="background:linear-gradient(135deg,#2563EB,#1E40AF);padding:40px;text-align:center;">

  <h1 style="margin:0;color:#ffffff;font-size:34px;">
    💰 Finora
  </h1>

  <p style="margin-top:10px;color:#dbeafe;font-size:16px;">
    Smart Expense Management System
  </p>

</div>

<div style="padding:40px;">

  <h2 style="color:#111827;margin-top:0;">
    Welcome ${name} 👋
  </h2>

  <p style="font-size:16px;line-height:1.8;color:#4b5563;">
    Thank you for joining <strong>Finora</strong>.
    Your account has been created successfully and you're ready to take control of your finances.
  </p>

  <div style="background:#eff6ff;border-left:5px solid #2563EB;padding:20px;border-radius:12px;margin:25px 0;">

    <h3 style="margin-top:0;color:#1E40AF;">
      Account Details
    </h3>

    <p style="margin:8px 0;">
      <strong>Name:</strong> ${name}
    </p>

    <p style="margin:8px 0;">
      <strong>Email:</strong> ${email}
    </p>

  </div>

  <div style="margin-top:30px;">

    <h3 style="color:#111827;">
      What You Can Do With Finora
    </h3>

    <ul style="line-height:2;color:#4b5563;padding-left:20px;">

      <li>📊 Track expenses and income</li>

      <li>📈 Visualize spending patterns</li>

      <li>💡 Monitor financial growth</li>

      <li>🔔 Receive important notifications</li>

      <li>📱 Access your data anywhere</li>

    </ul>

  </div>

  <div style="text-align:center;margin-top:40px;">

    <a
      href="${process.env.CLIENT_URL}/login"
      style="
        display:inline-block;
        background:#2563EB;
        color:#ffffff;
        padding:15px 35px;
        border-radius:12px;
        text-decoration:none;
        font-weight:bold;
        font-size:16px;
      "
    >
      Login to Finora
    </a>

  </div>

</div>

<div style="background:#f9fafb;padding:25px;text-align:center;border-top:1px solid #e5e7eb;">

  <p style="margin:0;color:#6b7280;font-size:14px;">
    Finora Expense Management System
  </p>

  <p style="margin:10px 0 0;color:#9ca3af;font-size:13px;">
    Manage Smarter • Save Better • Grow Faster
  </p>

  <p style="margin-top:15px;font-size:12px;color:#9ca3af;">
    © 2026 Finora. All Rights Reserved.
  </p>

  </div>

  </div>

</div>

`,

        
        });

      } catch (emailError) {

        console.log(
          emailError.message
        );

      }

      // RESPONSE
      res.status(201).json({

        message:
          "Registration successful",

        token:
          generateToken(
            user._id
          ),

        isAdmin:
          user.isAdmin,

      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// LOGIN USER
export const loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      if (
        !email ||
        !password
      ) {

        return res.status(400).json({
          message:
            "Please fill all fields",
        });

      }

      const user =
        await User.findOne({
          email,
        });

      if (
        user &&
        (
          await bcrypt.compare(
            password,
            user.password
          )
        )
      ) {

        res.json({

          message:
            "Login successful",

          token:
            generateToken(
              user._id
            ),

          isAdmin:
            user.isAdmin,

        });

      } else {

        res.status(401).json({
          message:
            "Invalid email or password",
        });

      }

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// FORGOT PASSWORD
export const forgotPassword =
  async (req, res) => {

    try {

      const { email } =
        req.body;

      const user =
        await User.findOne({
          email,
        });

      // SECURITY
      if (!user) {

        return res.json({
          message:
            "If this email exists, reset instructions have been sent",
        });

      }

      // GENERATE TOKEN
      const resetToken =
        crypto
          .randomBytes(32)
          .toString("hex");

      // SAVE TOKEN
      user.resetPasswordToken =
        resetToken;

      user.resetPasswordExpire =
        Date.now() +
        1000 * 60 * 15;

      await user.save();

      // RESET URL
      const resetUrl =
        `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

      // SEND EMAIL
      await sendEmail({

        to: user.email,

        subject:
          "Reset Your Finora Password 🔐",
    html: `

  <div style="margin:0;padding:0;background:#f4f7ff;font-family:Arial,sans-serif;">

  <div style="max-width:650px;margin:40px auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

  <div style="background:linear-gradient(135deg,#DC2626,#B91C1C);padding:40px;text-align:center;">

  <h1 style="margin:0;color:#ffffff;font-size:34px;">
    🔐 Finora
  </h1>

  <p style="margin-top:10px;color:#FECACA;font-size:16px;">
    Password Reset Request
  </p>

</div>

<div style="padding:40px;">

  <h2 style="color:#111827;">
    Reset Your Password
  </h2>

  <p style="font-size:16px;line-height:1.8;color:#4b5563;">

    We received a request to reset your Finora account password.

  </p>

  <div style="background:#FEF2F2;border-left:5px solid #DC2626;padding:20px;border-radius:12px;margin:25px 0;">

    <strong>Security Notice</strong>

    <p style="margin-top:10px;color:#555;">

      This reset link will expire in 15 minutes.

      If you did not request a password reset, you can safely ignore this email.

    </p>

  </div>

  <div style="text-align:center;margin-top:35px;">

    <a
      href="${resetUrl}"
      style="
        display:inline-block;
        background:#DC2626;
        color:#ffffff;
        padding:15px 35px;
        border-radius:12px;
        text-decoration:none;
        font-weight:bold;
        font-size:16px;
      "
    >
      Reset Password
    </a>

  </div>

  <p style="margin-top:35px;color:#6b7280;font-size:14px;line-height:1.7;">

    If the button doesn't work, copy and paste this URL into your browser:

  </p>

  <p style="word-break:break-all;color:#2563EB;font-size:13px;">

    ${resetUrl}

  </p>

</div>

<div style="background:#f9fafb;padding:25px;text-align:center;border-top:1px solid #e5e7eb;">

  <p style="margin:0;color:#6b7280;font-size:14px;">

    Finora Expense Management System

  </p>

  <p style="margin-top:10px;color:#9ca3af;font-size:12px;">

    Protecting your account security

  </p>

</div>

</div>

`,


      });

      res.json({
        message:
          "Password reset email sent",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// RESET PASSWORD
export const resetPassword =
  async (req, res) => {

    try {

      const { token } =
        req.params;

      const { password } =
        req.body;

      const user =
        await User.findOne({

          resetPasswordToken:
            token,

          resetPasswordExpire:
            {
              $gt: Date.now(),
            },

        });

      if (!user) {

        return res.status(400).json({
          message:
            "Invalid or expired token",
        });

      }

      // HASH PASSWORD
      const salt =
        await bcrypt.genSalt(10);

      user.password =
        await bcrypt.hash(
          password,
          salt
        );

      // CLEAR TOKEN
      user.resetPasswordToken =
        null;

      user.resetPasswordExpire =
        null;

      await user.save();

      res.json({
        message:
          "Password reset successful",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };