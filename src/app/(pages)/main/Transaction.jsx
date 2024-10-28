"use client";

import { useEffect, useState } from "react";
import Search from "./Search";
import User from "./User";

export default function Transaction({ filterParams }) {
  // Trạng thái lưu trữ các thông tin lọc
  // const [filterParams, setFilterParams] = useState(filterParams);
  const [filterState, setFilterState] = useState(filterParams);

  // Hàm cập nhật filterParams
  const handleFilterChange = (filters) => {
    setFilterState(filters);
  };
  useEffect(() => {
    setFilterState(filterParams);
  }, [filterParams]);
  return (
    <div>
      {/* Truyền handleFilterChange để Search có thể cập nhật filterParams */}
      <Search onFilterChange={handleFilterChange} />

      {/* Truyền filterParams cho User để thực hiện lọc */}
      <User filterParams={filterState} />
    </div>
  );
}
