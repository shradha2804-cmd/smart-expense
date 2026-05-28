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

          <div style="font-family:Arial,sans-serif;padding:40px;background:#F5F7FF;">

            <div style="max-width:600px;margin:auto;background:white;border-radius:20px;overflow:hidden;">

              <div style="background:#2563EB;padding:40px;text-align:center;">

                <h1 style="color:white;margin:0;">

                  Finora

                </h1>

              </div>

              <div style="padding:40px;">

                <h2>

                  Welcome ${name} 👋

                </h2>

                <p style="line-height:1.8;color:#555;">

                  Your Finora account has been created successfully.

                </p>

                <div style="text-align:center;margin-top:40px;">

                  <a
                    href="${process.env.CLIENT_URL}/login"
                    style="
                      background:#2563EB;
                      color:white;
                      padding:14px 28px;
                      border-radius:10px;
                      text-decoration:none;
                      font-weight:bold;
                    "
                  >

                    Login to Finora

                  </a>

                </div>

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

        <div style="font-family:Arial,sans-serif;padding:40px;background:#F5F7FF;">

          <div style="max-width:600px;margin:auto;background:white;border-radius:20px;overflow:hidden;">

            <div style="background:#2563EB;padding:40px;text-align:center;">

              <h1 style="color:white;margin:0;">

                Finora

              </h1>

            </div>

            <div style="padding:40px;">

              <h2>

                Password Reset Request

              </h2>

              <p style="line-height:1.8;color:#555;">

                Click the button below to reset your password.

                This link will expire in 15 minutes.

              </p>

              <div style="text-align:center;margin-top:40px;">

                <a
                  href="${resetUrl}"
                  style="
                    background:#2563EB;
                    color:white;
                    padding:14px 28px;
                    border-radius:10px;
                    text-decoration:none;
                    font-weight:bold;
                  "
                >

                  Reset Password

                </a>

              </div>

            </div>

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