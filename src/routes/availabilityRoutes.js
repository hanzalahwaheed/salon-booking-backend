import express from "express";
import { setAvailability,getAvailability } from "../controllers/availabilityController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/set", authMiddleware, setAvailability);
router.get("/slots/:date", authMiddleware, getAvailability);

export default router;
