/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Loader } from "../primitives/Loader";

export type Column<T> = {
  header: string;
  accessor: keyof T | string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;

  sortBy?: string;
  sortDir?: "asc" | "desc";
  onSortChange?: (column: string) => void;
};

export function DataTable<T>({ data, columns, loading, sortBy, sortDir, onSortChange }: DataTableProps<T>) {
  if (loading) return <Loader />;

  if (!data.length)
    return <div className="text-gray-500 py-4">No results found</div>;

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          {columns.map((col) => (
            <th
              key={col.header}
              className="text-left p-2 font-semibold cursor-pointer select-none"
              onClick={() =>
                col.sortable && onSortChange?.(col.accessor as string)
              }
            >
              <div className="flex items-center gap-1">
                {col.header}

                {col.sortable && sortBy === col.accessor && (
                  <span>{sortDir === "asc" ? "▲" : "▼"}</span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b hover:bg-gray-50">
            {columns.map((col) => (
              <td key={col.header} className="p-2">
                {col.render ? col.render(row) : (row as any)[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
