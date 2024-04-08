import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  day: String,
  date: Date,
  slots: [
    {
      start: String,
      end: String,
      maxCapacity: Number,
      currentCapacity: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const Availability = mongoose.model("Availability", availabilitySchema);

export default Availability;
