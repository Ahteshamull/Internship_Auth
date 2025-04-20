import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
import nodemailer from "nodemailer";
import { mailtrapClient, sender } from "./mailtrap.js";

// export const sendVerificationEmail = async (email, verificationToken) => {
//   const recipient = [{ email }];
//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Verify Your Email",
//       html: VERIFICATION_EMAIL_TEMPLATE.replace(
//         "{verificationCode}",
//         verificationToken
//       ),
//       category: "Email Verification",
//     });
//   } catch (error) {
//     console.log("error", error);
//     throw new Error("Failed to send verification email");
//   }
// };
export const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.OTP_EMAIL,
      pass: process.env.OTP_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.OTP_EMAIL,
    to: email,
    subject: " Please Verify Your Email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    ),
  });
};

// export const sendWelcomeEmail = async (email, name) => {
//   const recipient = [{ email }];
//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       template_uuid: "5e46756b-33f0-4c8f-9f68-668da9fc729d",
//       template_variables: {
//         Hasan: name,
//       },
//     });
//   } catch (error) {
//     console.log("error", error);
//     throw new Error("Failed to send verification email");
//   }
// };

export const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OTP_EMAIL,
        pass: process.env.OTP_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.OTP_EMAIL,
      to: email,
      subject: " Welcome to our website",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", { Hasan: name }),
    });
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to send verification email");
  }
};

// export const sendPasswordResetEmail = async (email, resetPasswordLink) => {
//   const recipient = [{ email }];
//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Reset Your Password",
//       html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
//         "{resetURL}",
//         resetPasswordLink
//       ),
//       category: "Password Reset",
//     });
//   } catch (error) {
//     console.log("error", error);
//     throw new Error("Failed to send verification email");
//   }
// };

export const sendPasswordResetEmail = async (email, resetPasswordLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OTP_EMAIL,
        pass: process.env.OTP_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.OTP_EMAIL,
      to: email,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        resetPasswordLink
      ),
    });
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to send verification email");
  }
};

// export const resetSuccessEmail = async (email) => {
//   const recipient = [{ email }];
//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Reset Your Password Successfully",
//       html: PASSWORD_RESET_SUCCESS_TEMPLATE,
//       category: "Password Reset",
//     });
//   } catch (error) {
//     console.log("error", error);
//     throw new Error("Failed to send verification email");
//   }
// };

export const resetSuccessEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OTP_EMAIL,
        pass: process.env.OTP_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.OTP_EMAIL,
      to: email,
      subject: "Reset Your Password Successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to send verification email");
  }
};
