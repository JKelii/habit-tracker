import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import React from "react";

type TablePaginationType = {
  totalItems: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  page: number;
};

export const TodoPagination = ({
  totalItems,
  handleNextPage,
  handlePreviousPage,
  page,
}: TablePaginationType) => {
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
          <PaginationNext href="#" onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
