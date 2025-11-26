import React from "react";
import { FilterBar } from "../components/FilterBar";
import { DataTable, Column } from "../components/DataTable";
import { Pagination } from "../components/Pagination";

type ListPagePatternProps<T> = {
  title: string;
  description?: string;
  filters?: React.ReactNode;
  data: T[];
  columns: Column<T>[];
  loading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  onSortChange?: (c: string) => void;
};

export function ListPagePattern<T>({
  title,
  description,
  filters,
  data,
  columns,
  loading,
  page,
  totalPages,
  onPageChange,
  sortBy,
  sortDir,
  onSortChange,
}: ListPagePatternProps<T>) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">{title}</h1>
      {description && <p className="mb-4 text-gray-600">{description}</p>}

      {filters && <FilterBar>{filters}</FilterBar>}

      <DataTable
        data={data}
        columns={columns}
        loading={loading}
        sortBy={sortBy}
        sortDir={sortDir}
        onSortChange={onSortChange}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
