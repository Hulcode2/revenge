import { Outlet } from "react-router-dom";
import OwnerHeader from "./OwnerHeader";
import SideBar from "./SideBar";

function OwnerLayout() {
  return (
    <>
      <OwnerHeader />
      <main className="flex">
        <SideBar />
        <Outlet />
      </main>
    </>
  );
}

export default OwnerLayout;
