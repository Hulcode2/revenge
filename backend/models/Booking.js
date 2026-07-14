const mongoose = require("mongoose");
const BookingSchema = new mongoose.Schema(
  {
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded", "offline"],
      default: "offline",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "active", "completed", "cancelled"],
      default: "pending",
    },

    totalDays: { type: Number }, //we can get it from pickupDate ,returnDate should we store it or calculate it every time
    totalPrice: { type: Number }, //we can get it from pricePerDay *totalDays should we store it or calculate it every time

    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  },
  { timestamps: true },
);

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
