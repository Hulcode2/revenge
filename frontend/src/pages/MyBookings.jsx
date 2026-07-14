import React from "react";
import BookingCard from "../components/BookingCard";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchMyBooking() {
      try {
        const { data } = await axiosInstance.get(
          API_PATHS.BOOKINGS.GET_MY_BOOKINGS,
        );
        console.log(data.bookings);
        setBookings(data.bookings);
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message || err.message || "Something went wrong";
        toast.error(errorMessage);
      }
    }
    fetchMyBooking();
  }, [bookings]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-6 py-20"
    >
      <h1 className="text-4xl text-center font-bold">My Bookings</h1>

      <p className="text-muted-foreground text-center mt-3 text-lg">
        View and manage all your car bookings.
      </p>

      <div className="mt-12 space-y-8">
        {bookings.map((booking, index) => (
          <BookingCard
            key={booking._id}
            setBookings={setBookings}
            booking={booking}
            index={index + 1}
          />
        ))}
      </div>
    </motion.main>
  );
};

export default MyBookings;
