import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
// import { format } from "date-fns";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "../components/ui/dialog";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";
export default function BookingCard({ booking, setBookings, index }) {
  const { _id, status, totalPrice, bookedAt, pickupDate, returnDate, car } =
    booking;
  const [pickup, setPickup] = useState(null);
  const [returnD, setReturn] = useState(null);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const handleUpdate = async () => {
    if (!pickup || !returnD) {
      return toast.error("all fields are required");
    }

    try {
      const { data } = await axiosInstance.patch(
        API_PATHS.BOOKINGS.UPDATE(_id),
        {
          pickupDate: pickup,
          returnDate: returnD,
        },
      );
      toast.success("updated successfully");

      setBookings((prev) =>
        prev.map((booking) => (booking._id === data._id ? data : booking)),
      );
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(errorMessage);
    }

    // axios update booking
  };

  const handleCancel = async () => {
    try {
      const { data } = await axiosInstance.delete(
        API_PATHS.BOOKINGS.DELETE(_id),
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

    // axios update booking
  };
  if (!car) {
    return <></>;
  }
  return (
    <Card className="rounded-xl mx-auto max-w-5xl p-0">
      <CardContent className="p-5">
        <div className="grid gap-8 md:grid-cols-[260px_1fr_180px]">
          {/* Car */}

          <div>
            <img
              src={car?.images[0]}
              alt={car?.brand}
              className="w-full object-cover rounded-xl"
            />

            <h3 className="mt-4 text-2xl font-semibold">
              {car.brand} {car.model}
            </h3>

            <p className="text-muted-foreground">
              {car.year} • {car.category} • {car.location}
            </p>
          </div>

          {/* Booking Details */}
          <div>
            <div className="flex items-center gap-3">
              <h4 className="font-semibold">Booking #{index}</h4>

              <Badge className={statusColors[status]} variant="secondary">
                {status}
              </Badge>
            </div>

            <div className="mt-8 space-y-6">
              <div className="flex gap-3">
                <CalendarDays className="text-blue-600 mt-1" />

                <div>
                  <p className="text-muted-foreground">Rental Period</p>

                  <p className="font-medium">
                    {pickupDate.split("T")[0]} To {returnDate.split("T")[0]}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="text-blue-600 mt-1" />

                <div>
                  <p className="text-muted-foreground">Pick-up Location</p>

                  <p className="font-medium">{car.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Price */}

          <div className="text-right  flex-col justify-between flex ">
            {" "}
            <div>
              {" "}
              <p className="text-muted-foreground">Total Price</p>
              <h2 className="text-2xl font-bold text-blue-600">
                ${totalPrice}
              </h2>
              <p className="text-muted-foreground mt-2">Booked on {bookedAt}</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full py-4">Change Booking</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Booking</DialogTitle>

                  <DialogDescription>
                    Change your rental dates or cancel this booking.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-4">
                  <div className="space-y-2">
                    <Label>Pickup Date</Label>

                    <Input
                      type="date"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Return Date</Label>

                    <Input
                      type="date"
                      value={returnD}
                      onChange={(e) => setReturn(e.target.value)}
                    />
                  </div>
                </div>

                <DialogFooter className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={handleCancel}
                    className="mr-auto"
                  >
                    Cancel Booking
                  </Button>

                  <Button onClick={handleUpdate}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
