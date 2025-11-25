import React from "react";

type Column = { key: string; label: string; sortable?: boolean; render?: (row: any) => React.ReactNode };

interface Props {
  data: any[];
  columns: Column[];
  loading?: boolean;
  page: number;
  pageSize: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onSort?: (key: string, dir: "asc" | "desc") => void;
}

export function DataTable({ data, columns, loading, page, pageSize, total = 0, onPageChange, onSort }: Props) {
  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!data || data.length === 0) return <div className="p-6 text-center">No results</div>;

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="p-3 text-left">
                <div className="flex items-center gap-2">
                  <span>{col.label}</span>
                  {col.sortable && (
                    <SortButtons onSort={(dir) => onSort && onSort(col.key, dir)} />
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
                <td key={col.key} className="p-3 align-top">
                  {col.render ? col.render(row) : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between py-3 px-2">
        <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded" onClick={() => onPageChange && onPageChange(Math.max(1, page - 1))} disabled={page <= 1}>Prev</button>
          <button className="px-3 py-1 border rounded" onClick={() => onPageChange && onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
}

function SortButtons({ onSort }: { onSort: (dir: "asc" | "desc") => void }) {
  return (
    <div className="flex flex-col">
      <button onClick={() => onSort("asc")} className="text-xs leading-none">▲</button>
      <button onClick={() => onSort("desc")} className="text-xs leading-none">▼</button>
    </div>
  );
}
