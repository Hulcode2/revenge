import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import logo from "../assets/logo-CF3gF4eH.svg";
import AuthButton from "../components/AuthBotton";
import { Button } from "../components/ui/button";
import useAuthStore from "../contexts/AuthStore";
const navLinks = [
  { name: "Home", path: "/", requirePermition: false },
  { name: "Cars", path: "/cars", requirePermition: false },
  { name: "My Bookings", path: "/my-bookings", requirePermition: true },
  { name: "Dashboard", path: "/owner", requirePermition: true },
];

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const user = useAuthStore((state) => state.userInfo);
  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-18 px-5 md:px-12 lg:px-20 xl:px-28 flex items-center justify-between">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="h-8" />
        </NavLink>

        {/* Desktop Navigation */}

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              onClick={(e) => {
                if (link.requirePermition && !user) {
                  e.preventDefault();
                  toast.error("You need to log in first.");
                }
              }}
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600 transition-colors"
              }
            >
              {link.name}
            </NavLink>
          ))}

          <AuthButton />
        </nav>

        {/* Mobile Menu Button */}

        <Button
          variant="ghost"
          className="md:hidden w-10 h-10"
          onClick={() => setOpenNav((prev) => !prev)}
        >
          <AnimatePresence mode="wait">
            {openNav ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Menu />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* Mobile Navigation */}

      <AnimatePresence>
        {openNav && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-18 right-0 w-full h-screen bg-white md:hidden"
          >
            <nav className="flex flex-col gap-6 p-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpenNav(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 text-lg"
                      : "text-gray-700 hover:text-blue-600 text-lg"
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <AuthButton />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
