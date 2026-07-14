import CarCard from "./CarCard";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import { toast } from "react-hot-toast";
function FeaturedCars() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    async function getCars() {
      try {
        const { data } = await axiosInstance.get(API_PATHS.CARS.GET_ALL);

        setCars(data.cars.slice(0, 5));
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message || err.message || "Something went wrong";
        toast.error(errorMessage);
      }
    }
    getCars();
  }, []);

  return (
    <section className="max-w-6xl flex items-center flex-col px-20 mx-auto  py-20">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold">Featured Vehicles</h2>

        <p className="text-muted-foreground mt-4 text-lg">
          Explore our selection of premium vehicles available for your next
          adventure.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      <Button className="mt-15 bg-transparent border-[1px] border-slate-500 hover:bg-hero text-black p-5">
        <NavLink to="/cars">Explore all cars</NavLink>
        <MoveRight />
      </Button>
    </section>
  );
}
export default FeaturedCars;
