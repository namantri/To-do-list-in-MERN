import { User } from "../models/user.js";
import errorHandler from "../middlewares/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookies } from "../utils/features.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      users: users,
    });
  } catch (error) {
    next(error);
  }
};
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    let user = await User.findOne({ email });
    if (user) return next(new errorHandler("User already exist", 400));
    // if (user) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "User already exist",
    //   });
    // }
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    sendCookies(user, res, "Registered successfully", 201);
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new errorHandler("Wrong Password or email", 400));
    // if (!user) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Wrong Password or email",
    //   });
    // }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new errorHandler("Wrong Password or email", 400));
    // if (!isMatch) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Wrong Password or email",
    //   });
    // }
    sendCookies(user, res, `Welcome back, ${user.name}`, 201);
  } catch (error) {
    next(error);
  }
};
export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
