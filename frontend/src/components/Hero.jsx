import SearchBookings from "./SearchBookings";
import image from "../assets/main_car.png";
import { motion } from "motion/react";
const Hero = () => {
  return (
    <section className="min-h-screen  ">
      <div className="max-w-7xl mx-auto px-6 bg-hero flex flex-col  items-center">
        {/* Heading */}
        <div className="text-center max-w-3xl mb-7">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl mt-5  font-bold text-gray-900 leading-tight"
          >
            Luxury cars on
            <span className="text-blue-600"> Rent</span>
          </motion.h1>
        </div>
        {/* Search */}
        <SearchBookings />
        {/* Car Image */}

        <motion.img
          src={image}
          alt="Luxury Car"
          className="w-full max-w-4xl mx-auto object-contain"
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
