import React from "react";
import TopServerHomePage from "../top-server/page";
import Link from "next/link";

const Header = () => {
  return (
    <div
      style={{
        height: "60px",
      }}
      className="border-b-2 border-gray-200 p-4"
    >
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          <Link href="/">Sao kê MTTQVN</Link>
        </h1>
        <div className="flex gap-3">
          <span className="bg-gradient-to-r from-[#fab005] to-[#e64980] bg-clip-text text-transparent">
            bởi CuongNguyen
          </span>
          <Link href="/top-server" className="cursor-pointer">
            Top Server
          </Link>
          <Link href="/top-intercept">Top ăn chặn</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
