import express from "express";
import login from "../models/login.js";
import errorhandler from "../helper/errorhandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    // return next(new errorhandler("Please provide all required fields", 400));
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields " });
  }

  const user = await login.find({ name: req.body.name });
  const image = req.file ? "/uploads/" + req.file.filename : null;
  req.body.Image = image;

  if (user.length > 0) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
    // return next(new errorhandler("User already exists", 400));
  }

  const hasPass = await bcrypt.hash(password, 10);
  req.body.password = hasPass;
  const newUser = await login.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "User created successfully", newUser });
};

export const Login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    // return next(new errorhandler("Please provide all required fields", 400));
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields " });
  }
  const user = await login.findOne({
    $or: [{ name: req.body.name }, { email: req.body.name }],
  });
  //   console.log(user);
  if (!user) {
    // return next(new errorhandler("Invalid user", 400));
    return res.status(400).json({ success: false, message: "Invalid user" });
  }

  const ismatch = await bcrypt.compare(req.body.password, user.password);

  if (!ismatch) {
    // return next(new errorhandler("Invalid password", 400));
    return res
      .status(400)
      .json({ success: false, message: "Invalid password" });
  }

  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  await res.cookie("token", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
  });

  res.status(200).json({ success: true, message: "Login successful", token });
};

export const getUserDetails = async (req, res) => {
  const user = await login.findById(req.user);

  res.status(200).json({ success: true, user });
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "logout Success" });
};

export const uploaded = async (req, res) => {
  try {
    const image = req.file ? "/uploads/" + req.file.filename : null;
    const user = await login.findByIdAndUpdate(req.user, { Image: image });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log(error.message);
  }
};
