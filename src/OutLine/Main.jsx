import React from "react";
import { Outlet } from "react-router-dom";
import Banner from "../pages/Home/Banner";
import Navbar from "../pages/Nav/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="w-[25%] mt-20 border-r-2">
          <div className="sticky top-20 left-0">SidBar</div>
        </div>
        <div className="w-[50%] mt-20 text-center border-r-2">
          <Outlet />
        </div>
        <div className="w-[25%] mt-20">
          <div className="sticky top-20 left-0">
            <Banner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
