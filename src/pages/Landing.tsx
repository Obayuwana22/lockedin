import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto px-20 py-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Landing;
