import User from "../models/auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../libs/send-email.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("error in register controller", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "username or password is incorrect" });
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return res
        .status(400)
        .json({ message: "username or password is incorrect" });
    }
    const token = jwt.sign(
      { userId: user._id, purpose: "login" },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    return res
      .status(200)
      .json({ message: "User logged in successfully", user, token });
  } catch (error) {
    console.log("error in login controller", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetPasswordToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );
    const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password?tk=${resetPasswordToken}`;
    const emailSubject = "Password Reset Request";
    const emailBody = `Click the link below to reset your password: ${resetPasswordLink}`;
    const isEmailSent = await sendEmail(email, emailSubject, emailBody);
    // if (!isEmailSent) {
    //   return res.status(500).json({ message: "Error sending email" });
    // }
    return res.status(200).json({ message: "Password reset request sent" });
  } catch (error) {
    console.log("error in request password reset", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!payload) {
      return res.status(404).json({ message: "Unauthorized request" });
    }
    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log("error in reset password", error.message);
    return res.status(500).json({ message: error.message });
  }
};

