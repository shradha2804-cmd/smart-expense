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


// GET PROFILE
export const getUserProfile = async (
  req,
  res
) => {

  try {

    const user = await User.findById(
      req.user._id
    ).select("-password");

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// UPDATE PROFILE
export const updateUserProfile = async (
  req,
  res
) => {

  try {

    const user = await User.findById(
      req.user._id
    );

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    // UPDATE FIELDS
    user.name =
      req.body.name || user.name;

    user.email =
      req.body.email || user.email;

    user.phone =
      req.body.phone || user.phone;

   if (req.file) {

  user.profileImage =
    `http://localhost:5000/uploads/${req.file.filename}`;

}
    // CHANGE PASSWORD
    if (
      req.body.currentPassword &&
      req.body.newPassword
    ) {

      const isMatch =
        await bcrypt.compare(
          req.body.currentPassword,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          message:
            "Current password incorrect",
        });

      }

      const salt =
        await bcrypt.genSalt(10);

      user.password =
        await bcrypt.hash(
          req.body.newPassword,
          salt
        );

    }

    // ADD NOTIFICATION
    user.notifications.unshift({
      message:
        "Profile updated successfully",
    });

    const updatedUser =
      await user.save();
res.json({
  _id: updatedUser._id,
  name: updatedUser.name,
  email: updatedUser.email,
  phone: updatedUser.phone,
  profileImage:
    updatedUser.profileImage,
  notifications:
    updatedUser.notifications,
  token: generateToken(
    updatedUser._id
  ),
});

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};