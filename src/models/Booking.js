import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  day: String,
  date: Date,
  bookingCount: Number,
  slot: [
    {
      start: String,
      end: String,
    },
  ],
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
