"use client";

import React, { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher"; // Đảm bảo bạn có phương thức `fetcher` để gọi API
import { API_ROOT } from "@/app/constants/api";

const TopServer = () => {
  const [topDonations, setTopDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopDonations = async () => {
      try {
        const response = await fetcher(`${API_ROOT}/top-server`); // Đường dẫn tới API của bạn
        if (response.status === 200) {
          setTopDonations(response.message);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopDonations();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="mt-4 w-[1200px]">
        <h2 className="text-center text-3xl font-semibold">Top Server</h2>
        <div className="w-full mt-4 border-gray-200 divide-y divide-gray-200">
          {topDonations.length > 0 ? (
            topDonations.map((donation, index) => (
              <div
                key={index}
                className="flex w-full py-4 px-4 bg-gray-50 hover:bg-gray-100 transition-all"
              >
                <div className="w-[5%] flex justify-center items-start text-xl font-semibold">
                  {index + 1}
                </div>
                <div className="flex-grow ml-4">
                  <p className="text-2xl font-bold text-gray-800 mb-2">
                    {parseInt(donation.money).toLocaleString("en-US")} VNĐ
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Nội dung:</strong> {donation.description}
                  </p>
                  <p className="text-gray-600">
                    <strong>Ngân hàng:</strong> {donation.bank}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 mt-4">
              Không có dữ liệu để hiển thị.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopServer;
