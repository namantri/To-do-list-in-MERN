import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log(token);
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Invalid access",
    });
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData._id);
  next();
};
