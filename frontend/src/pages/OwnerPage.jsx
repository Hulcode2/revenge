import { CarFront, ClipboardList, CircleAlert, BadgeCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { motion } from "motion/react";
const OwnerPage = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  useEffect(() => {
    async function fetchMyBooking() {
      try {
        const { data } = await axiosInstance.get(
          API_PATHS.BOOKINGS.GET_MY_OWNER_BOOKINGS,
        );
        const { data: data2 } = await axiosInstance.get(API_PATHS.CARS.MY_CARS);
        let pending = 0;
        let confirmed = 0;

        data.bookings.forEach((booking) => {
          if (booking.status === "pending") {
            pending++;
          } else if (booking.status === "approved") {
            confirmed++;
          }
        });
        const stats = [
          {
            title: "Total Cars",
            value: data2.cars.length,
            icon: CarFront,
          },
          {
            title: "Total Bookings",
            value: data.bookings.length,
            icon: ClipboardList,
          },
          {
            title: "Pending",
            value: pending,
            icon: CircleAlert,
          },
          {
            title: "Confirmed",
            value: confirmed,
            icon: BadgeCheck,
          },
        ];
        console.log(data);
        setStats(stats);
        setBookings(data.bookings.slice(0, 9));
        setMonthlyIncome(
          data.bookings
            .slice(0, 9)
            .reduce((total, booking) => total + booking.totalPrice, 0),
        );
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message || err.message || "Something went wrong";
        toast.error(errorMessage);
      }
    }
    fetchMyBooking();
  }, []);
  return (
    <motion.main
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.4 }}
      className="p-8 flex-1"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Owner Dashboard</h1>

        <p className="text-muted-foreground mt-3">
          Monitor overall platform performance including total cars, bookings,
          revenue and recent activities.
        </p>
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, icon: Icon }) => (
          <Card key={title}>
            <CardContent className="flex justify-between items-center py-6">
              <div>
                <p className="text-muted-foreground">{title}</p>

                <h2 className="text-3xl font-bold mt-2">{value}</h2>
              </div>

              <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
                <Icon className="text-blue-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom */}

      <div className="grid xl:grid-cols-3 gap-6 mt-8">
        {/* Recent Bookings */}

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>

            <p className="text-sm text-muted-foreground">
              Latest customer bookings
            </p>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking._id}</TableCell>
                    <TableCell>{booking.user.name}</TableCell>
                    <TableCell>{`${booking.car.brand} . ${booking.car.model}`}</TableCell>

                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs
                        ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </TableCell>

                    <TableCell>{booking.totalPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Revenue */}

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>

            <p className="text-sm text-muted-foreground">
              Revenue for current month
            </p>
          </CardHeader>

          <CardContent>
            <h2 className="text-5xl font-bold text-blue-600">
              {monthlyIncome}
            </h2>

            <p className="text-muted-foreground mt-3">
              +12.6% compared to last month
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.main>
  );
};

export default OwnerPage;
