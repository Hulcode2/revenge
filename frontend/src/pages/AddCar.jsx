import { useRef, useState } from "react";
import { Upload, Check } from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { toast } from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import { motion } from "motion/react";
const categories = ["Sedan", "SUV", "Hatchback", "Luxury", "Sports"];
const transmissions = ["Automatic", "Manual", "Semi-Automatic"];
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
const locations = ["Cairo", "Alexandria", "Giza", "Mansoura", "Tanta"];

const AddCar = () => {
  const fileRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    category: "",
    transmission: "",
    fuelType: "",
    seats: "",
    location: "",
    description: "",
  });

  const handleImage = (e) => {
    if (!e.target.files.length) return;

    setImages(Array.from(e.target.files));
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  async function submitHandler(e) {
    e.preventDefault();

    const data = new FormData();
    if (images.length > 5) {
      return toast.error("5 pictures is the maximum");
    }
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    images.forEach((image) => {
      data.append("images", image);
    });

    try {
      setLoading(true);
      const { data: data2 } = await axiosInstance.post(
        API_PATHS.CARS.ADD,
        data,
      );

      toast.success(data2.message);
      setFormData({
        brand: "",
        model: "",
        year: "",
        pricePerDay: "",
        category: "",
        transmission: "",
        fuelType: "",
        seats: "",
        location: "",
        description: "",
      });
      setImages([]);
      fileRef.current.value = "";
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl p-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Add New Car</h1>

        <p className="text-muted-foreground mt-2">
          Fill in details to list a new car for booking, including pricing,
          availability, and specifications.
        </p>
      </div>

      <form onSubmit={submitHandler} className="space-y-6">
        {/* Upload */}

        <div className="flex items-center gap-5">
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            ref={fileRef}
            onChange={handleImage}
          />

          <div
            onClick={() => fileRef.current.click()}
            className="w-24 h-20 rounded-lg border cursor-pointer flex items-center justify-center overflow-hidden"
          >
            {images.length > 0 ? (
              <img
                src={URL.createObjectURL(images[0])}
                className="w-full h-full object-cover"
              />
            ) : (
              <Upload className="text-muted-foreground" />
            )}
          </div>

          <p className="text-muted-foreground">Upload a picture of your car</p>
        </div>

        {/* Brand / Model */}

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label>Brand</label>
            <Input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="BMW"
            />
          </div>

          <div>
            <label>Model</label>

            <Input
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="e.g. X5, E-Class..."
            />
          </div>
        </div>

        {/* Year */}

        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <label>Year</label>
            <Input
              min={1500}
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Daily Price ($)</label>
            <Input
              name={"pricePerDay"}
              min={1}
              type="number"
              value={formData.pricePerDay}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full h-10 rounded-md border px-3 bg-background"
            >
              <option value="">Select a category</option>

              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Transmission */}

        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <label>Transmission</label>

            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="w-full h-10 rounded-md border px-3 bg-background"
            >
              <option value="">Select transmission</option>

              {transmissions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Fuel Type</label>

            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="w-full h-10 rounded-md border px-3 bg-background"
            >
              <option value="">Select fuel type</option>

              {fuelTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Seating Capacity</label>
            <Input
              name="seats"
              min={1}
              value={formData.seats}
              onChange={handleChange}
              type="number"
            />
          </div>
        </div>

        {/* Location */}

        <div>
          <label>Location</label>

          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full h-10 rounded-md border px-3 bg-background"
          >
            <option value="">Select location</option>

            {locations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        {/* Description */}

        <div>
          <label>Description</label>

          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine."
          />
        </div>

        <Button type="submit" className="px-8" disabled={loading}>
          {loading ? (
            "Adding..."
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              List Your Car
            </>
          )}
        </Button>
      </form>
    </motion.main>
  );
};

export default AddCar;
