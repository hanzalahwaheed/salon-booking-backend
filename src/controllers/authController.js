import jwt from "jsonwebtoken";
import User from "../models/User.js";
import rateLimit from "express-rate-limit";
import { registerSchema, loginSchema } from "../utils/validation.js";

export const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // maximum number of requests allowed in the windowMs
  message: "Too many requests, please try again later.",
});

export const register = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = registerSchema.safeParse(
      req.body
    );
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid input data" });
    }

    const user = await User.findOne({ email });

    if (user) res.json("user already exists");
    else {
      await User.create({
        username,
        password,
        email,
        isAdmin,
      });

      res.json({ status: true, message: "User created" });
    }
  } catch (error) {
    console.log("register", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = loginSchema.safeParse(req.body);
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid input data" });
    }

    const user = await User.findOne({ email });
    if (!user) res.json("user doesnt exist");

    // implement bcrypt password comparison here

    const token = jwt.sign({ email: email }, process.env.JWT_KEY, {
      expiresIn: "2hr",
    });

    console.log(token);

    res.cookie("token", token, { maxAge: 1000 * 60 * 60, httpOnly: true });

    res.json({ status: true, message: "login successful" });
  } catch (error) {
    console.log("login", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true, message: "logged out" });
};
