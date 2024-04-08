import Availability from "../models/Availability.js";
import User from "../models/User.js";

export const setAvailability = async (req, res) => {
  const email = req.email;

  const user = await User.findOne({ email });
  if (!user) return res.json("User not Found");
  if (!user.isAdmin) return res.json("User unauthorized");

  const { date, day, slotStart, slotEnd, maxCapacity } = req.body;

  try {
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

    res
      .status(200)
      .json({
        status: true,
        message: "availability set",
        availability: availability,
      });
  } catch (error) {
    res.status(500).json({ error: "Failed to set availability" });
  }
};

export const getAvailability = async (req, res) => {
  const date = req.params.date;
  try {
    const availability = await Availability.findOne({ date });
    console.log(availability);

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
    res.status(500).json({ message: "Internal server error" });
  }
};
