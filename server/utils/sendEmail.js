import dotenv from "dotenv";

dotenv.config();

import nodemailer from "nodemailer";

// CREATE TRANSPORTER
const transporter =
  nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    requireTLS: true,

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },

  });

// SEND EMAIL
const sendEmail =
  async ({
    to,
    subject,
    html,
  }) => {

    try {

      const info =
        await transporter.sendMail({

          from: `"Finora" <${process.env.EMAIL_USER}>`,

          to,

          subject,

          html,

        });

      console.log(
        "EMAIL SENT SUCCESSFULLY"
      );

      console.log(
        info.response
      );

    } catch (error) {

      console.log(
        "FULL EMAIL ERROR:"
      );

      console.log(error);

      throw error;

    }

  };

export default sendEmail;