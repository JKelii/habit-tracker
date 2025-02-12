import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TableCaption } from "@/components/ui/table";
import React, { Dispatch, SetStateAction } from "react";

type TablePaginationType = {
  startIndex: number;
  endIndex: number;
  setStartIndex: Dispatch<SetStateAction<number>>;
  setEndIndex: Dispatch<SetStateAction<number>>;
  rowPerPage: number;
  totalItems: number;
};

export const TablePagination = ({
  startIndex,
  endIndex,
  setStartIndex,
  setEndIndex,
  rowPerPage,
  totalItems,
}: TablePaginationType) => {
  const currentPage = Math.floor(startIndex / rowPerPage) + 1;
  const totalPages = Math.ceil(totalItems / rowPerPage);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePreviousPageClick = () => {
    if (startIndex >= 1) {
      setStartIndex(startIndex - rowPerPage);
      setEndIndex(endIndex - rowPerPage);
    }
  };

  const handleNextPageClick = () => {
    if (!isLastPage) {
      setStartIndex(startIndex + rowPerPage);
      setEndIndex(endIndex + rowPerPage);
    }
  };

  return (
    <TableCaption>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={handlePreviousPageClick}
              className={isFirstPage ? "cursor-not-allowed opacity-50" : ""}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">{currentPage}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={handleNextPageClick}
              className={isLastPage ? "cursor-not-allowed opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </TableCaption>
  );
};
