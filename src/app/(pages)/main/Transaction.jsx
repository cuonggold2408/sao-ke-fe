"use client";

import { useState } from "react";
import Search from "./Search";
import User from "./User";

export default function Transaction() {
  // Trạng thái lưu trữ các thông tin lọc
  const [filterParams, setFilterParams] = useState({});

  // Hàm cập nhật filterParams
  const handleFilterChange = (filters) => {
    setFilterParams(filters);
  };
  return (
    <div>
      {/* Truyền handleFilterChange để Search có thể cập nhật filterParams */}
      <Search onFilterChange={handleFilterChange} />

      {/* Truyền filterParams cho User để thực hiện lọc */}
      <User filterParams={filterParams} />
    </div>
  );
}
