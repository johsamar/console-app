import React from "react";

type FilterBarProps = {
  children: React.ReactNode;
};

export function FilterBar({ children }: FilterBarProps) {
  return (
    <div className="w-full flex flex-wrap gap-4 items-end border-b pb-4 mb-4">
      {children}
    </div>
  );
}
