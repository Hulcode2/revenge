import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Users,
  Fuel,
  Car,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
const features = [
  "360 Camera",
  "GPS",
  "Rear View Mirror",
  "Bluetooth",
  "Heated Seats",
];

const CarDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  useEffect(() => {
    async function fetchCar() {
      try {
        const { data } = await axiosInstance.get(API_PATHS.CARS.GET_ONE(id));

        setCar(data.car);
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message || err.message || "Something went wrong";
        toast.error(errorMessage);
      }
    }

    fetchCar();
  }, []);
  async function submitHandler() {
    if (!pickupDate || !returnDate || !car) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.BOOKINGS.CREATE, {
        pickupDate,
        returnDate,
        car,
      });
      toast.success("The Booking is added succesfully");
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
      className="max-w-7xl  mx-auto px-20 py-10"
    >
      <button
        onClick={() => {
          navigate("/");
        }}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8"
      >
        <ArrowLeft size={18} />
        Back to all cars
      </button>

      <div className="grid lg:grid-cols-[2fr_400px] gap-12">
        {/* LEFT */}
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {(car.images?.length ? car.images : ["/placeholder-car.jpg"]).map(
                (image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={`${car.model}-${index}`}
                      className="w-full  object-cover"
                    />
                  </CarouselItem>
                ),
              )}
            </CarouselContent>

            <CarouselPrevious className="left-3" />
            <CarouselNext className="right-3" />
          </Carousel>
          <div className="mt-8">
            <h1 className="text-3xl font-bold">
              {car.brand} {car.model}
            </h1>

            <p className="text-muted-foreground  mt-2">
              {car.category} • {car.year}
            </p>
          </div>

          <hr className="my-8" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <Card className="bg-hero ">
              <CardContent className=" flex flex-col items-center gap-3">
                <Users className="text-primary" />
                <p>{car.seats} Seats</p>
              </CardContent>
            </Card>

            <Card className="bg-hero ">
              <CardContent className="flex flex-col items-center gap-3">
                <Fuel className="text-primary" />
                <p>{car.fuelType}</p>
              </CardContent>
            </Card>

            <Card className="bg-hero ">
              <CardContent className=" flex flex-col items-center gap-3">
                <Car className="text-primary" />
                <p>{car.transmission}</p>
              </CardContent>
            </Card>

            <Card className="bg-hero ">
              <CardContent className=" flex flex-col items-center gap-3">
                <MapPin className="text-primary" />
                <p>{car.location}</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold mb-4">Description</h2>

            <p className="text-muted-foreground leading-8">{car.description}</p>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold mb-5">Features</h2>

            <div className="grid sm:grid-cols-2 ">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex  items-center gap-3 text-gray-500"
                >
                  <CheckCircle2 className="text-[#2664eb] w-5 h-5" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <Card className="sticky top-24 h-fit rounded-2xl">
          <CardContent className="p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-bold">${car.pricePerDay}</h2>

              <span className="text-muted-foreground text-lg">per day</span>
            </div>

            <hr />

            <div className="space-y-2 text-gray-500">
              <label className="font-medium">Pickup Date</label>

              <Input
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                type="date"
              />
            </div>

            <div className="space-y-2 text-gray-500">
              <label className="font-medium">Return Date</label>

              <Input
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                type="date"
              />
            </div>

            <Button
              onClick={submitHandler}
              className="w-full bg-blue-500 h-12 text-lg"
            >
              Book Now
            </Button>

            <p className="text-center text-muted-foreground text-sm">
              No credit card required to reserve
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.main>
  );
};

export default CarDetails;
