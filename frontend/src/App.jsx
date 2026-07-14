import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import CarDetails from "./pages/CarDetails";
import OwnerPage from "./pages/OwnerPage";
import AddCar from "./pages/AddCar";
import ManageCars from "./pages/ManageCars";
import ManageBookings from "./pages/ManageBookings";
import useAuthStore from "./contexts/AuthStore";
import MainLayout from "./layout/MainLayout";
import OwnerLayout from "./layout/OwnerLayout";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
function App() {
  const getUser = useAuthStore((state) => state.getUser);
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="h-screen">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="cars" element={<Cars />} />
            <Route path="my-bookings" element={<MyBookings />} />
            <Route path="car-details/:id" element={<CarDetails />} />
          </Route>
          <Route path="owner" element={<OwnerLayout />}>
            <Route index element={<OwnerPage />} />
            <Route path="add-car" element={<AddCar />} />
            <Route path="manage-cars" element={<ManageCars />} />
            <Route path="manage-bookings" element={<ManageBookings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
