import dotenv from "dotenv";

dotenv.config();

import nodemailer from "nodemailer";

// CREATE TRANSPORTER
const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },

    tls: {
      rejectUnauthorized: false,
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

      console.log(info.response);

    } catch (error) {

      console.log(
        "FULL EMAIL ERROR:"
      );

      console.log(error);

    }

  };

export default sendEmail;