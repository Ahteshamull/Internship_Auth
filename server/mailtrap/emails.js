import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email send successfully",response);
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to send verification email");
  }
};
export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "5e46756b-33f0-4c8f-9f68-668da9fc729d",
      template_variables: {
        
      "Hasan": name
    
      },
    });
    console.log("Welcome Email send successfully",response);
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to send verification email");
  }
};

