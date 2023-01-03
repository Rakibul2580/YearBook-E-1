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
        <div className="md:w-[25%] w-[10%]">
          <div className="fixed top-16 left-0 right-[90%] md:right-[75%]">
            <LeftSidebar />
          </div>
        </div>
        <div className="md:w-[50%] w-[65%] mt-16 text-center">
          <Outlet />
        </div>
        <div className="md:w-[25%] mt-16">
          <div className="fixed top-16 left-[75%] md:w-[25%]">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
