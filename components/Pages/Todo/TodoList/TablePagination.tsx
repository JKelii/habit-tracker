import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import React, { Dispatch, SetStateAction } from "react";

type TablePaginationType = {
  totalPages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export const TodoPagination = ({
  totalPages,
  page,
  setPage,
}: TablePaginationType) => {
  const handleNextPage = (totalPages: number) => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <Pagination className="mt-1">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePreviousPage}
            className={page === 1 ? "cursor-not-allowed opacity-50" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#">{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handleNextPage(totalPages)}
            className={totalPages > page ? "" : "cursor-not-allowed opacity-50"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
