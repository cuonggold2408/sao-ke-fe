"use client";

import React, { useState } from "react";
import Header from "./header/Header";
import SideBar from "./main/SideBar";
import Transaction from "./main/Transaction";

const HomePage = () => {
  const [dataFilter, setDataFilter] = useState({});
  const handleDataFilterChange = (data) => {
    setDataFilter(data);
  };
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header onDataFilterChange={handleDataFilterChange} />
      <div className="flex flex-grow">
        <div className="w-[15%] border-r-2  border-gray-200 p-4">
          <SideBar />
        </div>

        <div className="w-[85%] p-4">
          <Transaction filterParams={dataFilter} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
