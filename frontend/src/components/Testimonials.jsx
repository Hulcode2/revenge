import { Card, CardContent } from "../components/ui/card";
import { Star } from "lucide-react";
import image1 from "../assets/car_image1.png";
import image2 from "../assets/car_image2.png";
import image3 from "../assets/car_image3.png";
const testimonials = [
  {
    id: 1,
    name: "Emma Rodriguez",
    location: "Barcelona, Spain",
    image: image1,
    review:
      "I've rented cars from various companies, but the experience with CarRental was exceptional.",
  },
  {
    id: 2,
    name: "John Smith",
    location: "New York, USA",
    image: image2,
    review:
      "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!",
  },
  {
    id: 3,
    name: "Ava Johnson",
    location: "Sydney, Australia",
    image: image3,
    review:
      "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service.",
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto py-24 px-20">
      <div className="text-center">
        <h2 className="text-4xl font-bold">What Our Customers Say</h2>

        <p className="mt-5 text-muted-foreground max-w-3xl mx-auto text-lg">
          Discover why discerning travelers choose CarRental for their luxury
          vehicle rentals around the world.
        </p>
      </div>

      <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <Card
            key={item.id}
            className="rounded-2xl p-0 hover:translate-y-1.5 transition-all duration-300  shadow-lg border-0"
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <h3 className=" text-xl">{item.name}</h3>

                  <p className="text-muted-foreground">{item.location}</p>
                </div>
              </div>

              <div className="flex gap-1 mt-6">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-blue-600 text-blue-600"
                  />
                ))}
              </div>

              <p className="mt-3 text-muted-foreground leading-6 ">
                "{item.review}"
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
