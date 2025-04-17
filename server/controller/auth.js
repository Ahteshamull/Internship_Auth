import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../Utils/generateTokenAndSetCookie.js";
import {sendVerificationEmail, sendWelcomeEmail} from "../mailtrap/emails.js";

export const registration = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000)
      .toString()
      .padStart(6, "0");

    const user = await User.create({
      name,
      email,
      password: hashPass,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    generateTokenAndSetCookie(user._id, res);
    await sendVerificationEmail(user.email, verificationToken);

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  res.send("registration");
};
export const logout = async (req, res) => {
  res.send("logout");
};
export const verifyEmail = async (req, res) => {
  const { code } = req.body
  try {
    const user = await User.findOne({
      verificationToken: code,
    verificationTokenExpiresAt: {
      $gt: Date.now(),
    }
    })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }
    user.isVerify = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.name);
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    
  }
};