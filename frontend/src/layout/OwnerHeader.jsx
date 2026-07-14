import React from "react";
import Logo from "../assets/logo-CF3gF4eH.svg";
import { NavLink } from "react-router-dom";
import useAuthStore from "../contexts/AuthStore";
const OwnerHeader = () => {
  const user = useAuthStore((state) => state.userInfo);
  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-3 text-gray-500 border-b border-borderColor  transition-all">
      <NavLink to="/">
        <img src={Logo} alt="CarRental Logo" className="h-8" />
      </NavLink>{" "}
      <span>Welcome, {user?.name}</span>
    </div>
  );
};

export default OwnerHeader;
