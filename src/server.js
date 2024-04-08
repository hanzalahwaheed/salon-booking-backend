// Import required modules
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Create Express appI
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());

// Default route
app.get("/", (req, res) => {
  res.send("Salon Booking API");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/availability", availabilityRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
