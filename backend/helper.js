const Booking = require("./models/Booking");
const Car = require("./models/Car");

async function bookingUpdate(returnDate, booking, pickupDate, carData) {
  try {
    const pickup = new Date(pickupDate ?? booking.pickupDate);

    const returned = new Date(returnDate ?? booking.returnDate);
    if (returned <= pickup) {
      return {
        success: false,
        message: "Return date must be after pickup date",
      };
    }
    const existingBooking = await Booking.findOne({
      car: booking.car,

      pickupDate: { $lt: returned },

      returnDate: { $gt: pickup },
      _id: { $ne: booking._id },
    });
    if (existingBooking) {
      return {
        success: false,
        message: "Car is already booked for these dates.",
      };
    }
    const totalDays = Math.ceil((returned - pickup) / (1000 * 60 * 60 * 24));

    const totalPrice = totalDays * carData.pricePerDay;

    booking.pickupDate = pickup;
    booking.returnDate = returned;
    booking.totalDays = totalDays;
    booking.totalPrice = totalPrice;

    await booking.save();
    return {
      success: true,
      booking,
      message: "succesfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}

module.exports = { bookingUpdate };
