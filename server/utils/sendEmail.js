import dotenv from "dotenv";

dotenv.config();

import nodemailer from "nodemailer";

// CREATE TRANSPORTER
const transporter =
  nodemailer.createTransport({

    host: "smtp-relay.brevo.com",

    port: 587,

    secure: false,

    auth: {

      user:
        process.env.BREVO_EMAIL,

      pass:
        process.env.BREVO_SMTP_KEY,

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

          from:
            `"Finora" <${process.env.BREVO_EMAIL}>`,

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