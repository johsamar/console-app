import React from "react";
import { Button } from "../primitives/Button";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center gap-2 mt-4">
      <Button disabled={page === 1} onClick={() => onPageChange(1)}>
        First
      </Button>

      <Button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Prev
      </Button>

      <span className="px-3 py-1 border rounded">
        {page} / {totalPages}
      </span>

      <Button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>

      <Button
        disabled={page === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        Last
      </Button>
    </div>
  );
}
