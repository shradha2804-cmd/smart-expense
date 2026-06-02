import dotenv from "dotenv";

dotenv.config();

import { Resend } from "resend";

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  );

// SEND EMAIL
const sendEmail =
  async ({
    to,
    subject,
    html,
  }) => {

    try {

      const response =
        await resend.emails.send({

          from:
            "Finora <onboarding@resend.dev>",

          to,

          subject,

          html,

        });

      console.log(
        "EMAIL SENT SUCCESSFULLY"
      );

      console.log(
        response
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