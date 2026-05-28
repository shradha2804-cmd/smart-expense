import mongoose from "mongoose";

const userSchema =
  mongoose.Schema(

    {

      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        default: "",
      },

      profileImage: {
        type: String,
        default: "",
      },

      isAdmin: {
        type: Boolean,
        default: false,
      },

      // RESET PASSWORD TOKEN
      resetPasswordToken: {
        type: String,
        default: null,
      },

      // RESET PASSWORD EXPIRE
      resetPasswordExpire: {
        type: Date,
        default: null,
      },

    },

    {
      timestamps: true,
    }

  );

const User =
  mongoose.model(
    "User",
    userSchema
  );

export default User;