const express = require("express");
const upload = require("../middleware/multer.js");
const {
  getCars,
  getSpecificCar,
  addCar,
  updateCar,
  deleteCar,
  getCarSearch,
  getMyCars,
} = require("../controllers/carsController.js");
const jwtCheck = require("../middleware/jwtProtection.js");

const router = express.Router();
router.get("/cars", getCars);
router.get("/cars/my-cars", jwtCheck, getMyCars);
router.get("/cars/:id", getSpecificCar);
router.post("/cars/search", getCarSearch);
router.post("/cars", upload.array("images", 5), jwtCheck, addCar); // protected

router.put("/cars/:id", jwtCheck, updateCar);

router.delete("/cars/:id", jwtCheck, deleteCar);

module.exports = router;
