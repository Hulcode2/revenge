import React from "react";
import Hero from "../components/Hero";
import FeaturedCars from "../components/FeaturedCars";
import OwnerBanner from "../components/OwnerBanner";
import Testimonials from "../components/Testimonials";
import SubscribeSection from "../components/SubscribeSection";
const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedCars />
      <OwnerBanner />
      <Testimonials />
      <SubscribeSection />
    </div>
  );
};

export default Home;
