import express from "express";
import { setBooking, getBooking } from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/set", authMiddleware, setBooking);
router.get("/get", authMiddleware, getBooking);

export default router;
