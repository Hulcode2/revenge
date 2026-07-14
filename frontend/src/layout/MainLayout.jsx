import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "motion/react";
function MainLayout() {
  return (
    <>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Header />
      </motion.div>

      <main className="">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
