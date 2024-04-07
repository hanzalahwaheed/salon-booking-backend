// Import required modules
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";

// Load environment variables from .env file
dotenv.config();

// Create Express appI
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Salon Booking API");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
