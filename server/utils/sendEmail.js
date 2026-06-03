import dotenv from "dotenv";

dotenv.config();

import SibApiV3Sdk from "sib-api-v3-sdk";

// CONFIGURE BREVO API
const defaultClient =
  SibApiV3Sdk.ApiClient.instance;

const apiKey =
  defaultClient.authentications["api-key"];

apiKey.apiKey =
  process.env.BREVO_API_KEY;

const apiInstance =
  new SibApiV3Sdk.TransactionalEmailsApi();

// SEND EMAIL
const sendEmail =
  async ({
    to,
    subject,
    html,
  }) => {

    try {

      const result =
        await apiInstance.sendTransacEmail({

          sender: {
            email:
              process.env.BREVO_EMAIL,
            name:
              "Finora",
          },

          to: [
            {
              email: to,
            },
          ],

          subject,

          htmlContent: html,

        });

      console.log(
        "EMAIL SENT SUCCESSFULLY"
      );

      console.log(
        result
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