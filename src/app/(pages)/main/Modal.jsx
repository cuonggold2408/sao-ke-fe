"use client";

import { DatePickerComponent } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { useState } from "react";

function formatDate(isoDate) {
  const date = new Date(isoDate);

  // Lấy ngày, tháng, năm
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  // Trả về định dạng dd/mm/yyyy
  return `${day}/${month}/${year}`;
}

export default function ModalButton({ onFilter }) {
  const [date, setDate] = useState(null); // Chọn ngày
  const [amount, setAmount] = useState(""); // Mức tiền
  const [banks, setBanks] = useState([]); // Ngân hàng

  // Hàm xử lý khi nhấn nút Lưu thay đổi
  const handleSave = () => {
    const result = {
      date: formatDate(date),
      amount,
      banks,
    };

    onFilter(result);
    setAmount(""); // Reset mức tiền
    setBanks([]); // Reset danh sách ngân hàng
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
              <path d="M4 6l8 0"></path>
              <path d="M16 6l4 0"></path>
              <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
              <path d="M4 12l2 0"></path>
              <path d="M10 12l10 0"></path>
              <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
              <path d="M4 18l11 0"></path>
              <path d="M19 18l1 0"></path>
            </svg>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Lọc tìm kiếm</DialogTitle>
          </DialogHeader>
          <div>
            <div className="flex flex-col gap-2">
              <p>Chọn ngày</p>
              <DatePickerComponent onChange={setDate} />{" "}
              {/* Gọi hàm setDate khi chọn ngày */}
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <p>Mức tiền</p>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />{" "}
              {/* Cập nhật giá trị mức tiền */}
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <p>Ngân hàng</p>
              <CheckboxGroup
                orientation="horizontal"
                color="warning"
                onChange={setBanks} // Cập nhật danh sách ngân hàng đã chọn
              >
                <Checkbox value="vcb">VCB</Checkbox>
                <Checkbox value="bidv">BIDV</Checkbox>
                <Checkbox value="agri">Agribank</Checkbox>
                <Checkbox value="vietin">Viettinbank</Checkbox>
              </CheckboxGroup>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={handleSave}>
                Lưu thay đổi
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
