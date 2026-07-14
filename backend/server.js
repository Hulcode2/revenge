const authRoutes = require("./routes/authRoutes");
const carsRoutes = require("./routes/carsRoutes");
const bookingsRoutes = require("./routes/bookingsRoutes");

const cookieParser = require("cookie-parser");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const mongoose = require("mongoose");
const connect = require("./config/DB");
const connectCloudinary = require("./config/cloudinary");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN, // e.g. "http://localhost:5173"

    credentials: true,
  }),
);
connect();
connectCloudinary();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/", carsRoutes);
app.use("/", bookingsRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
