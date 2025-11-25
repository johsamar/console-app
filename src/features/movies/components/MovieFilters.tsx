import React from "react";

export function MovieFilters({ genres, onChange }: { genres: { id: number; name: string }[]; onChange: (opts: { genreId?: number; year?: number }) => void }) {
  return (
    <div className="flex gap-3 items-end">
      <div>
        <label className="text-sm">Genre</label>
        <select className="block mt-1 p-2 border rounded" onChange={(e) => onChange({ genreId: e.target.value ? Number(e.target.value) : undefined })}>
          <option value="">All</option>
          {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </div>

      <div>
        <label className="text-sm">Year</label>
        <input type="number" className="block mt-1 p-2 border rounded" onBlur={(e) => onChange({ year: e.currentTarget.value ? Number(e.currentTarget.value) : undefined })} />
      </div>
    </div>
  );
}
