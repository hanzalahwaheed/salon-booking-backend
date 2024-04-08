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
        slots: [{ start: slotStart, end: slotEnd }],
      });
    } else {
      availability.slots.push({ start: slotStart, end: slotEnd });
      await availability.save();
    }

    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ error: "Failed to set availability" });
  }
};
