import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { toast } from "react-hot-toast";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import { motion } from "motion/react";
const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    async function getBooking() {
      try {
        const { data } = await axiosInstance.get(
          API_PATHS.BOOKINGS.GET_MY_OWNER_BOOKINGS,
        );

        setBookings(data.bookings);
        console.log(data);
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message || err.message || "Something went wrong";
        toast.error(errorMessage);
      }
    }
    getBooking();
  }, [bookings]);
  async function cancelBooking(id) {
    try {
      const { data } = await axiosInstance.delete(
        API_PATHS.BOOKINGS.DELETE(id),
      );
      toast.success("Cancel successfully");

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === data.booking._id ? data.booking : booking,
        ),
      );
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(errorMessage);
    }
  }
  async function approveBooking(id) {
    try {
      const { data } = await axiosInstance.patch(
        API_PATHS.BOOKINGS.APPROVE(id),
      );
      toast.success("Cancel successfully");

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === data.booking._id ? data.booking : booking,
        ),
      );
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(errorMessage);
    }
  }
  return (
    <motion.main
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.4 }}
      className="p-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Manage Bookings</h1>

        <p className="text-muted-foreground mt-2">
          Track all customer bookings, approve or cancel requests, and manage
          booking statuses.
        </p>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car</TableHead>
              <TableHead>Date Range</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <img
                      src={booking?.car?.images[0]}
                      className="w-16 h-12 rounded-md object-cover"
                    />

                    <p className="font-medium">{booking.car.brand}</p>
                  </div>
                </TableCell>

                <TableCell>
                  {booking.pickupDate.split("T")[0]} →{" "}
                  {booking.returnDate.split("T")[0]}
                </TableCell>

                <TableCell>${booking.totalPrice}</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      booking.paymentStatus === "Paid" ? "default" : "secondary"
                    }
                  >
                    {booking.paymentStatus}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    {booking.status === "pending" ? (
                      <>
                        <Button
                          onClick={() => approveBooking(booking._id)}
                          size="sm"
                        >
                          Approve
                        </Button>

                        <Button
                          onClick={() => cancelBooking(booking._id)}
                          size="sm"
                          variant="destructive"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Badge>{booking.status}</Badge>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.main>
  );
};

export default ManageBookings;
