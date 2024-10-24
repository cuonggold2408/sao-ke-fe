import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  getKeyValue,
} from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useAsyncList } from "@react-stately/data";
import { fetcher } from "@/lib/fetcher";
import { API_ROOT } from "@/app/constants/api";

export default function User({ filterParams }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [noTransactions, setNoTransactions] = useState(false);
  const prevFilterParams = useRef(filterParams);

  console.log("user filterParams: ", filterParams);

  // Hàm xây dựng query URL với filterParams
  const buildQueryURL = (page) => {
    let url = `${API_ROOT}/search?page=${page}`;
    console.log("url: ", url);

    if (filterParams.amount) {
      console.log("filterParams.amount: ", filterParams.amount);

      url += `&money=${filterParams.amount}`;
    }
    if (filterParams.date) {
      // Tách phần ngày, tháng và năm từ filterParams.date
      const [day, month, year] = filterParams.date.split("/");

      // Kiểm tra nếu năm là 2024
      if (year === "2024") {
        const dateForApi = `${day}/${month}`;
        url += `&date=${dateForApi}`;
      }
    }
    if (filterParams.banks && filterParams.banks.length > 0) {
      url += `&bank=${filterParams.banks.join(",")}`;
    }
    if (filterParams.search) {
      url += `&description=${filterParams.search}`;
    }
    console.log("url: ", url);

    return url;
  };

  // Dùng useAsyncList để fetch dữ liệu giao dịch
  let list = useAsyncList({
    async load({ signal, cursor }) {
      const page = cursor ? cursor : 1; // cursor đại diện cho trang
      setIsLoading(true);

      try {
        const url = buildQueryURL(page);
        const res = await fetcher(url, { signal });

        if (res.status === 404) {
          // Nếu trả về 404, nghĩa là không có giao dịch hợp lệ
          setNoTransactions(true);
          setIsLoading(false);
          setHasMore(false);
          return {
            items: [],
          };
        }

        // const json = await res.json();

        // console.log("json: ", json);

        const transactions = res.message.transactions;

        // Cập nhật `hasMore` thành `false` nếu không còn dữ liệu
        if (transactions.length === 0) {
          setHasMore(false);
        } else {
          setHasMore(page < res.message.totalPages); // Kiểm tra xem còn trang nữa không
        }
        setIsLoading(false);
        setNoTransactions(transactions.length === 0);
        return {
          items: transactions,
          cursor: page + 1, // Cập nhật cursor (trang tiếp theo)
        };
      } catch (error) {
        if (error.name === "AbortError") {
          // Nếu là lỗi do abort (request bị huỷ), không cần xử lý thêm
          console.warn("Request bị huỷ:", error.message);
        } else {
          console.error("Lỗi khi tải dữ liệu:", error);
        }
        setIsLoading(false);
        setIsLoading(false);
        setHasMore(false);
        setNoTransactions(true);
        return {
          items: [], // Trả về mảng rỗng nếu gặp lỗi để tránh lỗi "not iterable"
        };
      }
    },
  });

  // Cấu hình Infinite Scroll
  // const [loaderRef, scrollerRef] = useInfiniteScroll({
  //   hasMore,
  //   onLoadMore: list.loadMore,
  // });
  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore: hasMore, // Kiểm tra `hasMore` để dừng gọi API khi hết dữ liệu
    onLoadMore: () => {
      if (hasMore && !isLoading) {
        list.loadMore();
      }
    },
  });

  useEffect(() => {
    if (
      JSON.stringify(prevFilterParams.current) !== JSON.stringify(filterParams)
    ) {
      // Chỉ gọi list.reload() nếu giá trị filterParams thay đổi khác với trước đó
      list.reload();
      prevFilterParams.current = filterParams;
    }
  }, [filterParams, list]);

  // Hàm làm nổi bật từ khóa trong mô tả
  const highlightText = (text, highlight) => {
    if (!highlight) return text;

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <>
      {noTransactions ? (
        <div className="flex justify-center items-center h-[520px]">
          <p>Không có giao dịch hợp lệ.</p>
        </div>
      ) : (
        <Table
          isHeaderSticky
          aria-label="Bảng giao dịch"
          baseRef={scrollerRef}
          bottomContent={
            hasMore ? (
              <div className="flex w-full justify-center">
                <Spinner ref={loaderRef} color="primary" />
              </div>
            ) : null
          }
          classNames={{
            base: "max-h-[520px] overflow-scroll",
            table: "min-h-[400px]",
          }}
        >
          <TableHeader>
            <TableColumn key="transaction_code">Mã giao dịch</TableColumn>
            <TableColumn key="date">Ngày giao dịch</TableColumn>
            <TableColumn key="money">Số tiền</TableColumn>
            <TableColumn key="bank">Ngân hàng</TableColumn>
            <TableColumn key="description">Nội dung</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            items={list.items}
            loadingContent={<Spinner color="primary" />}
          >
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.transaction_code}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.money} VNĐ</TableCell>
                <TableCell>{item.bank}</TableCell>
                <TableCell>
                  {highlightText(item.description, filterParams.search)}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
