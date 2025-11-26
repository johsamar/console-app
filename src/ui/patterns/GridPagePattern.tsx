import React from "react";
import { FilterBar } from "../components/FilterBar";
import { Pagination } from "../components/Pagination";

type GridPagePatternProps<T> = {
  filters?: React.ReactNode;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  page: number;
  totalPages: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
};

export function GridPagePattern<T>({
  filters,
  items,
  renderItem,
  page,
  totalPages,
  loading,
  onPageChange,
}: GridPagePatternProps<T>) {
  return (
    <div className="flex flex-col gap-6">
      {filters && <FilterBar>{filters}</FilterBar>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, i) => renderItem(item))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
