const express = require("express");
const upload = require("../middleware/multer.js");
const {
  register,
  login,
  logout,
  me,
  updateImage,
} = require("../controllers/authController.js");
const jwtCheck = require("../middleware/jwtProtection.js");

const router = express.Router();
router.post("/signup", register);

router.post("/login", login);
router.post("/logout", logout); // protected

router.get("/me", jwtCheck, me); // protected
router.put("/updateImage", upload.single("image"), jwtCheck, updateImage); // protected
module.exports = router;
