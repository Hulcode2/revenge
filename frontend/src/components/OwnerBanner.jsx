import { useNavigate } from "react-router-dom";
import carImage from "../assets/banner_car_image.png"; // your car image
import useAuthStore from "../contexts/AuthStore";
import toast from "react-hot-toast";

export default function OwnerBanner() {
  const user = useAuthStore((state) => state.userInfo);
  const navigator = useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-16 py-5">
      <div className="bg-gradient-to-r px-12 grid lg:grid-cols-2 items-center from-blue-700 to-blue-300 rounded-3xl overflow-hidden">
        {/* Left Side */}
        <div className="py-12 ">
          <h2 className="text-3xl font-bold text-white">
            Do You Own a Luxury Car?
          </h2>

          <p className="text-blue-100 mt-2 max-w-xl">
            Monetize your vehicle effortlessly by listing it on CarRental. We
            take care of insurance, driver verification and secure payments — so
            you can earn passive income, stress-free.
          </p>

          <button
            onClick={(e) => {
              if (!user) {
                return toast.error("You need to log in first.");
              }
              navigator("/owner/add-car");
            }}
            className="mt-8 bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            List your car
          </button>
        </div>

        {/* Right Side */}
        <div className="flex justify-center lg:justify-end mt-20">
          <img
            src={carImage}
            alt="BMW"
            className="w-full max-w-[400px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
