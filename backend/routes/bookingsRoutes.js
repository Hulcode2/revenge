const express = require("express");

const {
  setBooking,
  getBookinds,
  getBookind,
  changeBooking,
  deleteBooking,
  searchBooking,
  getMyBookinds,
  getMyBookindsAsOwner,
  approveBooking,
} = require("../controllers/bookingsController.js");
const jwtCheck = require("../middleware/jwtProtection.js");

const router = express.Router();
router.post("/bookings", jwtCheck, setBooking);
router.post("/bookings/search", jwtCheck, searchBooking);
router.get("/bookings", jwtCheck, getBookinds);
router.get("/bookings/my-bookings", jwtCheck, getMyBookinds);
router.get("/bookings/owner-bookings", jwtCheck, getMyBookindsAsOwner);
router.get("/bookings/:id", jwtCheck, getBookind); // protected
router.patch("/bookings/:id", jwtCheck, changeBooking); // protected
router.delete("/bookings/:id", jwtCheck, deleteBooking); // protected
router.patch("/bookings/approve/:id", jwtCheck, approveBooking); // protected

module.exports = router;
