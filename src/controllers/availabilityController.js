import Availability from "../models/Availability.js";
import User from "../models/User.js";
import { setAvailabilitySchema, getAvailabilitySchema } from "../utils/validation.js";

export const setAvailability = async (req, res) => {
  const email = req.email;

  const user = await User.findOne({ email });
  if (!user) return res.json("User not Found");
  if (!user.isAdmin) return res.json("User unauthorized");

  try {
    const { date, day, slotStart, slotEnd, maxCapacity } =
      setAvailabilitySchema.safeParse(req.body);

    const availability = await Availability.findOne({ date, day });

    if (!availability) {
      await Availability.create({
        date,
        day,
        maxCapacity,
        slots: [{ start: slotStart, end: slotEnd, maxCapacity }],
      });
    } else {
      availability.slots.push({ start: slotStart, end: slotEnd, maxCapacity });
      await availability.save();
    }

    res.status(200).json({
      status: true,
      message: "availability set",
    });
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

export const getAvailability = async (req, res) => {
  try {
    const { date } = getAvailabilitySchema.safeParse(req.params);

    const availability = await Availability.findOne({ date });

    if (!availability) {
      // No availability found for the given date
      return res
        .status(404)
        .json({ message: "No availability found for the given date" });
    }

    const freeSlots = availability.slots.filter(
      (slot) => slot.currentCapacity < slot.maxCapacity
    );
    res.status(200).json(freeSlots);
  } catch (error) {
    console.error("Error retrieving availability:", error);
    res.status(400).json({ error: error.errors });
  }
};
