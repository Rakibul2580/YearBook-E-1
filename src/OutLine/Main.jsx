import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../pages/LeftSidebar/LeftSidebar/LeftSidebar";
import Navbar from "../pages/Nav/Navbar";
import RightSidebar from "../pages/RightSidebar/RightSidebar/RightSidebar";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="w-[25%]">
          <div className="sticky top-16 left-0">
            <LeftSidebar />
          </div>
        </div>
        <div className="w-[50%] mt-20 text-center">
          <Outlet />
        </div>
        <div className="w-[25%] mt-20">
          <div className="sticky top-20 left-0">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
