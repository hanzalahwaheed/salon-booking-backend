import express from "express";
import { setAvailability } from "../controllers/availabilityController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/set", authMiddleware, setAvailability);

export default router;
