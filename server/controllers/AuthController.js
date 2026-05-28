import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

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

      // ================= SEND WELCOME EMAIL =================

      try {

        await sendEmail({

          to: email,

          subject:
            "Welcome to Finora 🎉",

          html: `
          
          <div style="font-family: Arial, sans-serif; background:#F5F7FF; padding:40px 20px;">

            <div style="max-width:600px; margin:auto; background:white; border-radius:20px; overflow:hidden;">

              <!-- HEADER -->
              <div style="background:#2563EB; padding:40px; text-align:center;">

                <h1 style="color:white; margin:0; font-size:38px;">

                  Finora

                </h1>

                <p style="color:#DBEAFE; margin-top:10px; font-size:16px;">

                  Smart Expense Management Platform

                </p>

              </div>

              <!-- BODY -->
              <div style="padding:40px; color:#0B132B;">

                <h2 style="margin-top:0; font-size:28px;">

                  Welcome, ${name} 👋

                </h2>

                <p style="font-size:16px; line-height:1.8; color:#4B5563;">

                  Thank you for joining <strong>Finora</strong>.

                  Your account has been created successfully and you're now ready to manage your finances smarter and faster.

                </p>

                <div style="margin:35px 0;">

                  <div style="background:#F3F4F6; padding:20px; border-radius:14px;">

                    <p style="margin:0 0 10px 0; font-weight:bold;">

                      Your Registered Email

                    </p>

                    <p style="margin:0; color:#2563EB; font-size:16px;">

                      ${email}

                    </p>

                  </div>

                </div>

                <!-- BUTTON -->
                <div style="text-align:center; margin-top:40px;">

                  <a
                    href="${process.env.CLIENT_URL}/login"
                    style="
                      background:#2563EB;
                      color:white;
                      padding:16px 32px;
                      text-decoration:none;
                      border-radius:12px;
                      display:inline-block;
                      font-weight:bold;
                      font-size:16px;
                    "
                  >

                    Login to Finora

                  </a>

                </div>

                <!-- FEATURES -->
                <div style="margin-top:45px;">

                  <h3 style="margin-bottom:20px;">

                    What you can do with Finora

                  </h3>

                  <ul style="padding-left:20px; color:#4B5563; line-height:2;">

                    <li>Track expenses & income</li>

                    <li>View analytics dashboards</li>

                    <li>Manage financial reports</li>

                    <li>Receive smart notifications</li>

                    <li>Monitor monthly spending</li>

                  </ul>

                </div>

              </div>

              <!-- FOOTER -->
              <div style="background:#F9FAFB; padding:25px; text-align:center;">

                <p style="margin:0; color:#6B7280; font-size:14px;">

                  © 2026 Finora. All rights reserved.

                </p>

              </div>

            </div>

          </div>

          `,
        });

      } catch (emailError) {

        console.log(
          "Welcome email failed:"
        );

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

      console.log(error);

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

      // VALIDATION
      if (
        !email ||
        !password
      ) {

        return res.status(400).json({
          message:
            "Please fill all fields",
        });

      }

      // FIND USER
      const user =
        await User.findOne({
          email,
        });

      // CHECK PASSWORD
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

      console.log(error);

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

      if (!email) {

        return res.status(400).json({
          message:
            "Email is required",
        });

      }

      const user =
        await User.findOne({
          email,
        });

      // SECURITY:
      // DON'T REVEAL USER EXISTENCE
      if (!user) {

        return res.json({
          message:
            "If this email exists, reset instructions have been sent",
        });

      }

      // FUTURE:
      // EMAIL SERVICE INTEGRATION
      // NODEMAILER / RESEND / SENDGRID

      return res.json({
        message:
          "Password reset instructions sent successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };