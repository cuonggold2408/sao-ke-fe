import React from "react";
import Header from "./header/Header";
import SideBar from "./main/SideBar";
import Transaction from "./main/Transaction";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <div className="w-[15%] border-r-2  border-gray-200 p-4">
          <SideBar />
        </div>

        <div className="w-[85%] p-4">
          <Transaction />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
