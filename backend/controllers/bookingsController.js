const { bookingUpdate } = require("../helper");

const User = require("../models/User");

const Booking = require("../models/Booking");
const Car = require("../models/Car");
async function setBooking(req, res) {
  const { pickupDate, returnDate, car } = req.body;
  const userId = req.user.id;

  if (!pickupDate || !returnDate || !car) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const carData = await Car.findById(car);

    if (!carData) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    const pickup = new Date(pickupDate);
    const returned = new Date(returnDate);

    if (returned <= pickup) {
      return res.status(400).json({
        success: false,
        message: "Return date must be after pickup date",
      });
    }

    const existingBooking = await Booking.findOne({
      car,
      status: { $ne: "cancelled" },
      pickupDate: { $lt: returned },
      returnDate: { $gt: pickup },
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Car is already booked for these dates.",
      });
    }

    const totalDays = Math.ceil((returned - pickup) / (1000 * 60 * 60 * 24));

    const totalPrice = totalDays * carData.pricePerDay;

    const booking = await Booking.create({
      user: userId,
      car,
      pickupDate,
      returnDate,
      totalDays,
      totalPrice,
    });

    return res.status(201).json({
      success: true,
      booking,

      message: "succesfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function searchBooking(req, res) {
  const { pickupDate, returnDate, location } = req.body;

  if (!pickupDate || !returnDate || !location) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const pickup = new Date(pickupDate);
    const returned = new Date(returnDate);

    if (returned <= pickup) {
      return res.status(400).json({
        success: false,
        message: "Return date must be after pickup date",
      });
    }

    const bookedCars = await Booking.find({
      pickupDate: { $lt: returned },
      returnDate: { $gt: pickup },
    }).select("car");

    const bookedCarIds = bookedCars.map((booking) => booking.car);

    const cars = await Car.find({
      location,
      _id: { $nin: bookedCarIds },
    });

    return res.status(201).json({
      success: true,
      cars,
      message: "succesfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function getBookinds(req, res) {
  try {
    const bookings = await Booking.find();

    res.status(201).json({ success: true, bookings });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function getMyBookinds(req, res) {
  const userId = req.user.id;
  try {
    const bookings = await Booking.find({ user: userId }).populate(
      "car",
      "brand model images location pricePerDay category",
    );
    if (bookings.length === 0) {
      return res.status(400).json({
        success: false,
        message: "no bookings ",
      });
    }
    res.status(201).json({ success: true, bookings });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function getMyBookindsAsOwner(req, res) {
  const userId = req.user.id;
  try {
    const cars = await Car.find({ owner: userId }).select("_id");

    const carIds = cars.map((car) => car._id);

    const bookings = await Booking.find({
      car: { $in: carIds },
    }).populate("car", "brand model images   ");

    res.status(201).json({ success: true, bookings });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function getBookind(req, res) {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findById(bookingId);

    res.status(201).json({ success: true, booking });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function changeBooking(req, res) {
  const { pickupDate, returnDate } = req.body;
  const userId = req.user.id;
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: true, message: "booking not found" });
    }
    if (booking.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "too late",
      });
    }
    const carData = await Car.findById(booking.car);
    if (!carData) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    const response = await bookingUpdate(
      returnDate,
      booking,
      pickupDate,
      carData,
    );
    if (!response.success) {
      return res.status(400).json(response);
    }

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function deleteBooking(req, res) {
  const bookingId = req.params.id;
  const userId = req.user.id;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "This booking can't be cancelled.",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    return res.status(200).json({
      success: true,
      booking,
      message: "Booking deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function approveBooking(req, res) {
  const bookingId = req.params.id;
  const userId = req.user.id;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const car = await Car.findById(booking.car);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    if (car.owner.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "This booking can't be approved.",
      });
    }

    booking.status = "approved";
    await booking.save();

    return res.status(200).json({
      success: true,
      booking,
      message: "Booking deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
module.exports = {
  setBooking,
  getBookinds,
  getBookind,
  changeBooking,
  deleteBooking,
  searchBooking,
  getMyBookinds,
  getMyBookindsAsOwner,
  approveBooking,
};
