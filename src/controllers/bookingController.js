import Availability from "../models/Availability.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { setBookingSchema } from "./validations.js";

export const setBooking = async (req, res) => {
  try {
    const email = req.email;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userId = user._id;

    const { day, date, slotStart, slotEnd, bookingCount } =
      setBookingSchema.safeParse(req.body);
    if (!day || !date || !slotStart || !slotEnd || !bookingCount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Future Scope: Convert into Transaction
    const availability = await Availability.findOne({ date });
    if (!availability) {
      return res.status(404).json({ error: "Availability not found" });
    }

    const slotIndex = availability.slots.findIndex((slot) => {
      return slot.start == slotStart && slot.end == slotEnd;
    });

    if (slotIndex === -1) {
      return res
        .status(404)
        .json({ error: "Slot not found for the specified time" });
    }

    const slot = availability.slots[slotIndex];

    const availableCapacity = slot.maxCapacity - slot.currentCapacity;

    if (availableCapacity < bookingCount) {
      return res.status(400).json({ error: "Not enough capacity in the slot" });
    }

    // Update availability slot's current capacity
    slot.currentCapacity += bookingCount;

    // Save the updated availability
    await availability.save();

    // Create a new booking
    const newBooking = await Booking.create({
      userId,
      date,
      day,
      bookingCount,
      slot: [{ start: slotStart, end: slotEnd }],
    });

    // Return the new booking
    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export const getBooking = async (req, res) => {
  try {
    const allBookings = await Booking.find({});
    res.json(allBookings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
