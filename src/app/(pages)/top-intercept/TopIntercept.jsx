import Link from "next/link";
import React from "react";

const TopIntercept = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-3">
      <div className="text-3xl text-red-500">
        Hiện chưa có data nên chưa làm được hihi
      </div>
      <Link href="/">Go Home</Link>
    </div>
  );
};

export default TopIntercept;
