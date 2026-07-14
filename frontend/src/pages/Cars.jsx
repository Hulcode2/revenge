import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "../components/ui/input";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import { toast } from "react-hot-toast";
import { motion } from "motion/react";
const Cars = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    async function fetchCars() {
      const location = searchParams.get("pickupLocation");
      const pickupDate = searchParams.get("pickupDate");
      const returnDate = searchParams.get("returnDate");

      if (location && pickupDate && returnDate) {
        try {
          const { data } = await axiosInstance.post(API_PATHS.BOOKINGS.SEARCH, {
            location,
            pickupDate,
            returnDate,
          });

          setCars(data.cars);
        } catch (err) {
          const errorMessage =
            err?.response?.data?.message ||
            err.message ||
            "Something went wrong";
          toast.error(errorMessage);
        }
      } else {
        try {
          const { data } = await axiosInstance.get(API_PATHS.CARS.GET_ALL);

          setCars(data.cars);
        } catch (err) {
          const errorMessage =
            err?.response?.data?.message ||
            err.message ||
            "Something went wrong";
          toast.error(errorMessage);
        }
      }
    }
    fetchCars();
  }, [searchParams]);
  useEffect(() => {
    if (!searchTerm.trim()) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const { data } = await axiosInstance.post(API_PATHS.CARS.SEARCH, {
          search: searchTerm,
        });

        setCars(data.cars);
      } catch (err) {
        console.log(err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);
  return (
    <>
      {/* Hero */}
      <motion.main
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-100 border-b"
      >
        <div className="max-w-4xl mx-auto px-6 py-24 text-center ">
          <h1 className="text-4xl font-bold">Available Cars</h1>

          <p className="mt-4 text-muted-foreground text-lg">
            Browse our selection of premium vehicles available for your next
            adventure.
          </p>

          <div className="relative mt-10">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={22}
            />

            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by make, model, or features"
              className="h-12 rounded-full pl-14 pr-14 text-xl bg-white"
            />

            <SlidersHorizontal
              className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
              size={22}
            />
          </div>
        </div>
      </motion.main>

      {/* Cars */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-lg mb-8">
          Showing <span className="font-semibold">{cars.length}</span> Cars
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Cars;
