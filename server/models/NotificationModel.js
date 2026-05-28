import mongoose from "mongoose";

const notificationSchema =
  mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        default: null,

        index: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      message: {
        type: String,
        required: true,
        trim: true,
      },

      sender: {
        type: String,

        enum: [
          "system",
          "admin",
        ],

        default: "system",
      },

      isRead: {
        type: Boolean,
        default: false,
      },
    },

    {
      timestamps: true,
    }
  );

const Notification =
  mongoose.model(
    "Notification",
    notificationSchema
  );

export default Notification;