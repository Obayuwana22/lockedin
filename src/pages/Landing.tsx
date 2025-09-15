import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const Landing = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
      </div>
    </div>
  );
};

export default Landing;
