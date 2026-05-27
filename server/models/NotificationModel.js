import mongoose from "mongoose";

const notificationSchema =
  mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        default: null,
      },

      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      sender: {
        type: String,
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