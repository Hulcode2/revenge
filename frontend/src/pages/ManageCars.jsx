import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Eye, EyeClosed, Trash2 } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
const ManageCars = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    async function getCars() {
      try {
        const { data } = await axiosInstance.get(API_PATHS.CARS.MY_CARS);

        setCars(data.cars);
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message || err.message || "Something went wrong";
        toast.error(errorMessage);
      }
    }
    getCars();
  }, []);
  async function deleteHandler(id) {
    try {
      await axiosInstance.delete(API_PATHS.CARS.DELETE(id));
      setCars((prev) => prev.filter((car) => car._id !== id));
      toast.success("Deleted successfully");
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(errorMessage);
    }
  }
  async function availabltyHandler(id, avail) {
    try {
      const { data } = await axiosInstance.put(API_PATHS.CARS.UPDATE(id), {
        available: avail,
      });
      setCars((prev) => prev.map((car) => (car._id === id ? data.car : car)));
      toast.success("Updated successfully");
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
        <h1 className="text-4xl font-bold">Manage Cars</h1>

        <p className="text-muted-foreground mt-2">
          View all listed cars, update their details, or remove them from the
          booking platform.
        </p>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cars.map((car) => (
              <TableRow key={car._id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <img
                      src={car.images?.[0]}
                      className="w-16 h-12 rounded-md object-cover"
                    />

                    <div>
                      <p className="font-semibold">
                        {car.brand} {car.model}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        ${car.pricePerDay}/day
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>{car.category}</TableCell>

                <TableCell>${car.pricePerDay}/day</TableCell>

                <TableCell>
                  <Badge variant={car.available ? "default" : "destructive"}>
                    {car.available ? "Available" : "Unavailable"}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() => {
                        availabltyHandler(car._id, !car.available);
                      }}
                      size="icon"
                      variant="outline"
                    >
                      {car.available ? (
                        <EyeClosed className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>

                    <Button
                      onClick={() => {
                        deleteHandler(car._id);
                      }}
                      size="icon"
                      variant="destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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

export default ManageCars;
