import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../Utils/generateTokenAndSetCookie.js";
import {
  resetSuccessEmail,
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";

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
export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: {
        $gt: Date.now(),
      },
    });
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
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }
    generateTokenAndSetCookie(user._id, res);
    user.lastLogin = Date.now();
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
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
export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    await user.save();
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`
    );
    return res.status(200).json({
      success: true,
      message: "Password reset link sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
export const resetPassword = async (req, res) => {
  const { resetPasswordToken } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpiresAt: {
        $gt: Date.now(),
      },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset password token",
      });
    }
    const hashPass = await bcrypt.hash(password, 10);
    user.password = hashPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    await resetSuccessEmail(user.email);
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
