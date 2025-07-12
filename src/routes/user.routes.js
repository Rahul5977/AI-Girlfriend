import express from "express";
const userRouter = express.Router();
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyEmail
} from "../controllers/users.controllers.js";
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/profile", getUserProfile);
userRouter.get("/verify-email/:token", verifyEmail);
export default userRouter;
