import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  register,
  login,
  getAllUsers,
  getMyProfile,
  logout
} from "../controllers/user.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/all", getAllUsers);
router.get("/logout", logout);
router.get("/me", isAuthenticated, getMyProfile);
export default router;
