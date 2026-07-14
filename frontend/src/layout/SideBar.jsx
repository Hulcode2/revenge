import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusSquare,
  CarFront,
  ClipboardList,
  Plus,
} from "lucide-react";
import { toast } from "react-hot-toast";

import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/paths";
import useAuthStore from "../contexts/AuthStore";

import DefaultImage from "../assets/car_image4.png";

const links = [
  {
    name: "Dashboard",
    path: "/owner",
    icon: LayoutDashboard,
  },
  {
    name: "Add Car",
    path: "/owner/add-car",
    icon: PlusSquare,
  },
  {
    name: "Manage Cars",
    path: "/owner/manage-cars",
    icon: CarFront,
  },
  {
    name: "Manage Bookings",
    path: "/owner/manage-bookings",
    icon: ClipboardList,
  },
];

const SideBar = () => {
  const fileRef = useRef(null);
  const [active, setActive] = useState("Dashboard");
  const user = useAuthStore((state) => state.userInfo);

  const [preview, setPreview] = useState(user?.image);

  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Preview image immediately
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axiosInstance.put(API_PATHS.AUTH.UPDATE_IMAGE, formData);

      toast.success("Profile image updated.");
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    }
  };

  return (
    <aside className="min-h-screen w-16 md:w-60 border-r flex flex-col">
      {/* Profile */}
      <div className="flex flex-col items-center mt-6">
        <div
          className="relative group cursor-pointer"
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleImage}
          />

          <img
            src={preview}
            alt="Profile"
            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
          />

          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <Plus className="text-white w-5 h-5" />
          </div>
        </div>

        <h3 className="hidden md:block mt-4 font-medium">
          {user?.name || "Guest"}
        </h3>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex flex-col gap-2">
        {links.map(({ name, path, icon: Icon }) => (
          <NavLink
            onClick={() => {
              setActive(name);
            }}
            key={path}
            to={path}
          >
            {
              <div
                className={`relative flex items-center gap-4 px-5 py-4 rounded-lg transition-all
                  ${
                    active === name
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
              >
                <Icon className="w-5 h-5 shrink-0" />

                <span className="hidden md:block">{name}</span>

                {active === name && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-600 rounded-l-full" />
                )}
              </div>
            }
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
