const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 25 },
  email: {
    type: String,
    lowercase: true,
    required: [true, "Please enter an email"],
    unique: true,
    validate: [
      (val) => {
        return validator.isEmail(val);
      },
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },

  phone: {
    type: String,
  },
  image: { type: String, default: "" },
});
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (params) {
  return await bcrypt.compare(params, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
