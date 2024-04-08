import express from "express";
import {
  login,
  register,
  logout,
  limiter,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", limiter, register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
