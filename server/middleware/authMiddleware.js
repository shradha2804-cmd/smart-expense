import jwt from "jsonwebtoken";

import User from "../models/UserModel.js";

const protect =
  async (req, res, next) => {

    try {

      let token;

      // CHECK TOKEN
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith(
          "Bearer"
        )
      ) {

        token =
          req.headers.authorization.split(
            " "
          )[1];

      }

      // NO TOKEN
      if (!token) {

        return res
          .status(401)
          .json({
            message:
              "No token provided",
          });

      }

      // VERIFY TOKEN
      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      // FIND USER
      const user =
        await User.findById(
          decoded.id
        ).select(
          "-password"
        );

      // USER NOT FOUND
      if (!user) {

        return res
          .status(401)
          .json({
            message:
              "User not found",
          });

      }

      // ATTACH USER
      req.user = user;

      next();

    } catch (error) {

      return res
        .status(401)
        .json({
          message:
            "Not authorized",
        });

    }

  };

export default protect;