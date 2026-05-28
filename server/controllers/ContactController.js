import Contact from "../models/ContactModel.js";

// CREATE CONTACT MESSAGE
export const createContactMessage =
  async (req, res) => {

    try {

      const {
        name,
        email,
        subject,
        message,
      } = req.body;

      // VALIDATION
      if (
        !name ||
        !email ||
        !subject ||
        !message
      ) {

        return res
          .status(400)
          .json({
            message:
              "Please fill all fields",
          });

      }

      // CREATE MESSAGE
      const contact =
        await Contact.create({

          name,

          email,

          subject,

          message,

        });

      res.status(201).json({

        message:
          "Message sent successfully",

        contact,

      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// GET ALL CONTACT MESSAGES
export const getContactMessages =
  async (req, res) => {

    try {

      const messages =
        await Contact.find()
          .sort({
            createdAt: -1,
          });

      res.json(messages);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// MARK AS READ
export const markMessageRead =
  async (req, res) => {

    try {

      const message =
        await Contact.findById(
          req.params.id
        );

      if (!message) {

        return res
          .status(404)
          .json({
            message:
              "Message not found",
          });

      }

      message.isRead = true;

      await message.save();

      res.json({
        message:
          "Message marked as read",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// DELETE MESSAGE
export const deleteMessage =
  async (req, res) => {

    try {

      const message =
        await Contact.findById(
          req.params.id
        );

      if (!message) {

        return res
          .status(404)
          .json({
            message:
              "Message not found",
          });

      }

      await message.deleteOne();

      res.json({
        message:
          "Message deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };