const Car = require("../models/Car");
const Booking = require("../models/Booking");
const cloudinary = require("cloudinary").v2;
async function getCars(req, res) {
  try {
    const cars = await Car.find();

    res.status(201).json({ success: true, cars });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function getCarSearch(req, res) {
  const { search } = req.body;
  try {
    const cars = await Car.find({
      $or: [
        { brand: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    });
    if (!cars) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }
    res.status(201).json({ success: true, cars });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function addCar(req, res) {
  const {
    brand,
    model,
    year,
    category,

    transmission,
    fuelType,
    description,
    seats,
    pricePerDay,

    location,
  } = req.body;

  const userId = req.user.id;

  if (
    !brand ||
    !model ||
    !year ||
    !category ||
    !transmission ||
    !fuelType ||
    !description ||
    !seats ||
    !pricePerDay ||
    !location
  ) {
    return res.status(400).json({
      success: false,
      message: "all feildes are required",
    });
  }

  try {
    const imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });

        imageUrls.push(result.secure_url);
      }
    }

    const car = await Car.create({
      owner: userId,
      brand: brand,
      model: model,
      year: year,
      category: category || "",

      transmission: transmission || "",
      fuelType: fuelType || "",
      description: description || "",
      seats: seats || 4,
      pricePerDay: pricePerDay || 100,
      images: imageUrls || [],
      location: location || "",
    });

    return res.status(201).json({
      success: true,
      car,
      message: "succesfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function getSpecificCar(req, res) {
  const carId = req.params.id;
  try {
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }
    res.status(201).json({ success: true, car });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function getMyCars(req, res) {
  const userId = req.user.id;

  try {
    const cars = await Car.find({ owner: userId });
    console.log("cars:", cars);
    if (cars.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No car found",
      });
    }
    res.status(201).json({ success: true, cars });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateCar(req, res) {
  const carId = req.params.id;

  const { available } = req.body;

  if (available === undefined) {
    return res.status(400).json({
      success: false,
      message: "available is required",
    });
  }

  try {
    const car = await Car.findById(carId);
    if (car.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
    const booking = await Booking.find({ car: carId });
    if (booking.length !== 0) {
      return res.status(403).json({
        success: false,
        message: "it is allready booked",
      });
    }
    car.available = available;

    await car.save();
    return res.status(201).json({
      success: true,
      car,
      message: "succesfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function deleteCar(req, res) {
  const carId = req.params.id;

  try {
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }
    if (car.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
    const booking = await Booking.find({ car: carId });
    if (booking.length !== 0) {
      return res.status(403).json({
        success: false,
        message: "it is allready booked",
      });
    }
    await car.deleteOne();
    return res.status(201).json({
      success: true,
      car,
      message: "succesfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
module.exports = {
  getCars,
  getSpecificCar,
  addCar,
  updateCar,
  deleteCar,
  getCarSearch,
  getMyCars,
};
