import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import User from "../models/UserModel.js";

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