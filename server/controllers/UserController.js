import bcrypt from "bcryptjs";

import User from "../models/UserModel.js";

import Notification from "../models/NotificationModel.js";

// GET PROFILE
export const getUserProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        ).select(
          "-password"
        );

      if (!user) {

        return res
          .status(404)
          .json({
            message:
              "User not found",
          });

      }

      res.json(user);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// UPDATE PROFILE
export const updateUserProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {

        return res
          .status(404)
          .json({
            message:
              "User not found",
          });

      }

      let profileUpdated =
        false;

      // UPDATE NAME
      if (req.body.name) {

        user.name =
          req.body.name;

        profileUpdated =
          true;

      }

      // UPDATE PHONE
      if (req.body.phone) {

        user.phone =
          req.body.phone;

        profileUpdated =
          true;

      }

      // PROFILE IMAGE
      if (req.file) {

        user.profileImage =
          `${req.protocol}://${req.get(
            "host"
          )}/uploads/${
            req.file.filename
          }`;

        profileUpdated =
          true;

      }

      // CHANGE PASSWORD
      if (
        req.body.currentPassword &&
        req.body.newPassword
      ) {

        // VALIDATION
        if (
          req.body.newPassword
            .length < 6
        ) {

          return res
            .status(400)
            .json({
              message:
                "New password must be at least 6 characters",
            });

        }

        const isMatch =
          await bcrypt.compare(
            req.body.currentPassword,
            user.password
          );

        if (!isMatch) {

          return res
            .status(400)
            .json({
              message:
                "Current password incorrect",
            });

        }

        const salt =
          await bcrypt.genSalt(
            10
          );

        user.password =
          await bcrypt.hash(
            req.body.newPassword,
            salt
          );

      }

      // SAVE USER
      const updatedUser =
        await user.save();

      // CREATE NOTIFICATION
      if (
        profileUpdated
      ) {

        await Notification.create({

          user:
            updatedUser._id,

          title:
            "Profile Updated",

          message:
            "Your profile information was updated successfully",

          sender:
            "system",

        });

      }

      // RESPONSE
      res.json({

        _id:
          updatedUser._id,

        name:
          updatedUser.name,

        email:
          updatedUser.email,

        phone:
          updatedUser.phone,

        profileImage:
          updatedUser.profileImage,

        isAdmin:
          updatedUser.isAdmin,

      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };