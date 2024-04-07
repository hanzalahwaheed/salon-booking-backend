import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(username);
    if (user) res.json("user already exists");
    else {
      await User.create({
        username,
        password,
        email,
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
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.json("user doesnt exist");

    // implement bcrypt password comparison here

    const token = jwt.sign({ email: email }, "jwtkey", { expiresIn: "2hr" });
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
