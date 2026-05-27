import Notification from "../models/NotificationModel.js";

import User from "../models/UserModel.js";


// GET USER NOTIFICATIONS
export const getNotifications =
  async (req, res) => {

    try {

      const notifications =
        await Notification.find({
          $or: [
            {
              user: req.user._id,
            },

            {
              user: null,
            },
          ],
        }).sort({
          createdAt: -1,
        });

      res.json(
        notifications
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };


// ADMIN SEND NOTIFICATION
export const createNotification =
  async (req, res) => {

    try {

      const {
        title,
        message,
        userId,
      } = req.body;

      // SEND TO ALL USERS
      if (!userId) {

        const notification =
          await Notification.create(
            {
              title,
              message,
              user: null,

              // ADMIN SENDER
              sender: "admin",
            }
          );

        return res
          .status(201)
          .json(
            notification
          );

      }

      // SEND TO SPECIFIC USER
      const user =
        await User.findById(
          userId
        );

      if (!user) {

        return res
          .status(404)
          .json({
            message:
              "User not found",
          });

      }

      const notification =
        await Notification.create(
          {
            title,
            message,
            user: userId,

            // ADMIN SENDER
            sender: "admin",
          }
        );

      res.status(201).json(
        notification
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };


// MARK AS READ
export const markAsRead =
  async (req, res) => {

    try {

      const notification =
        await Notification.findById(
          req.params.id
        );

      if (!notification) {

        return res
          .status(404)
          .json({
            message:
              "Notification not found",
          });

      }

      notification.isRead =
        true;

      await notification.save();

      res.json({
        message:
          "Marked as read",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };


// DELETE NOTIFICATION
export const deleteNotification =
  async (req, res) => {

    try {

      const notification =
        await Notification.findById(
          req.params.id
        );

      if (!notification) {

        return res
          .status(404)
          .json({
            message:
              "Notification not found",
          });

      }

      await notification.deleteOne();

      res.json({
        message:
          "Deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };