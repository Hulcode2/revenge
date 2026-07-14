import { Search } from "lucide-react";
import LocationSelect from "./LocationSelect";
import DateInput from "./DateInput";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const SearchBookings = () => {
  const [returnDate, setReturnDate] = useState(null);
  const [pickUpDate, setPickUpDate] = useState(null);

  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const SearchHandle = () => {
    if (!location || !pickUpDate || !returnDate) {
      toast.error("Please fill all fields");
      return;
    }

    const params = new URLSearchParams({
      pickupLocation: location,
      pickupDate: pickUpDate,
      returnDate: returnDate,
    });

    navigate(`/cars?${params.toString()}`);
  };
  return (
    <div className="bg-white md:rounded-full rounded shadow-lg px-8 py-6 flex flex-col md:flex-row items-center gap-8 justify-between max-w-4xl">
      <LocationSelect location={location} setLocation={setLocation} />

      <DateInput
        value={pickUpDate}
        onChange={setPickUpDate}
        label="Pick-up Date"
        name="pickupDate"
      />

      <DateInput
        value={returnDate}
        onChange={setReturnDate}
        label="Return Date"
        name="returnDate"
      />

      <Button
        onClick={SearchHandle}
        className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-full px-10 py-7 flex items-center gap-2"
      >
        <Search size={22} />
        Search
      </Button>
    </div>
  );
};

export default SearchBookings;
