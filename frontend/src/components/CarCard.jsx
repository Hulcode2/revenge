import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

import { Users, Fuel, CarFront, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { useNavigate } from "react-router-dom";
export default function CarCard({ car }) {
  const navigate = useNavigate();
  return (
    <Card className="overflow-hidden pt-0 rounded-3xl shadow-md hover:shadow-xl hover:translate-y-1.5 transition-all duration-300">
      <div className="relative">
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

        <Badge
          className={`absolute left-4 top-4 ${car.available ? "bg-blue-600" : "bg-red-600"} rounded-full px-4 py-1 z-10`}
        >
          {car.available ? "Available Now" : "Not Available Now"}
        </Badge>

        <div className="absolute right-4 bottom-4 bg-zinc-900 text-white rounded px-3 py-1 z-10">
          <span className="text-lg font-bold">${car.pricePerDay}</span>
          <span className="text-sm"> / day</span>
        </div>
      </div>

      <div
        onClick={() => {
          navigate(`/car-details/${car._id}`);
        }}
        className="p-6"
      >
        <h3 className="text-xl font-semibold">
          {car.brand} {car.model}
        </h3>

        <p className="text-muted-foreground mt-1">
          {car.category} • {car.year}
        </p>

        <div className="grid grid-cols-2 gap-y-4 mt-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users size={18} />
            {car.seats} Seats
          </div>

          <div className="flex items-center gap-2">
            <Fuel size={18} />
            {car.fuelType}
          </div>

          <div className="flex items-center gap-2">
            <CarFront size={18} />
            {car.transmission}
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={18} />
            {car.location}
          </div>
        </div>
      </div>
    </Card>
  );
}
