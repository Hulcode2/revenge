const mongoose = require("mongoose");
const CarSchema = new mongoose.Schema(
  {
    brand: { type: String, Required: true },
    model: { type: String, required: true },
    year: { type: Number, Required: true },
    category: {
      type: String,
      enum: ["SUV", "Sedan", "Luxury", "Sports", "Hatchback", "Truck"],
    }, //string or numberic index to array in the frontend?
    color: { type: String },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic", "Semi-Automatic"],
    }, //string or numberic index to array in the frontend?
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Hybrid", "Electric"],
    }, //string or numberic index to array in the frontend?
    description: { type: String },
    seats: { type: Number, min: 1 },
    pricePerDay: { type: Number, min: 1 },
    images: [
      {
        type: String,
        validate: {
          validator: (v) => v.length > 0,
        },
      },
    ],
    location: { type: String }, //string or numberic index to array in the frontend?

    available: { type: Boolean, default: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
