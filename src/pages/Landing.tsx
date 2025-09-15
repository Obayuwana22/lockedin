import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header />
        <main className="mx-20 mt-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Landing;
