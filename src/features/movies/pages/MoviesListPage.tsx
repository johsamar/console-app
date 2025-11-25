import React, { useState, useCallback } from "react";
import { useQuery } from "@apollo/client/react";
import { SEARCH_MOVIES } from "../graphql/queries";
import { DataTablePage } from "@/ui/patterns/DataTablePage";
import { DataTable } from "@/ui/components/DataTable";
import { MovieFilters } from "../components/MovieFilters";
type SearchMoviesResult = {
  searchMovies: {
    page: number;
    total: number;
    results: Array<{
      id: number;
      title: string;
      year: number;
      rating: number;
    }>;
  };
};

export default function MoviesListPage() {
  const [queryText, setQueryText] = useState("");
  const [page, setPage] = useState(1);
  const [year, setYear] = useState<number | undefined>();
  const [genreId, setGenreId] = useState<number | undefined>();
  const [sort, setSort] = useState<{ key?: string; dir?: "asc" | "desc" }>({});

  const { data, loading, refetch } = useQuery<SearchMoviesResult>(
    SEARCH_MOVIES,
    {
      variables: {
        query: queryText || "",
        page,
        year,
        genreIds: genreId ? [genreId] : [],
        sortBy: sort.key ? { field: sort.key, direction: sort.dir } : null,
      },
      fetchPolicy: "network-only",
    }
  );

  const onSearch = useCallback(() => {
    setPage(1);
    refetch();
  }, [refetch]);

  const columns = [
    { key: "title", label: "Title", sortable: true },
    { key: "year", label: "Year", sortable: true },
    { key: "rating", label: "Rating", sortable: true },
  ];

  return (
    <DataTablePage
      title="Movies"
      description="Search movies from TMDB"
      table={
        <>
          <div className="flex items-center gap-3 mb-4">
            <input
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              className="p-2 border rounded flex-1"
              placeholder="Search by title..."
            />
            <button
              onClick={onSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Search
            </button>
          </div>

          <MovieFilters
            genres={[
              { id: 28, name: "Action" },
              { id: 35, name: "Comedy" },
            ]}
            onChange={({ genreId, year }) => {
              setGenreId(genreId);
              setYear(year);
            }}
          />

          <div className="mt-4">
            <DataTable
              data={data?.searchMovies?.results ?? []}
              loading={loading}
              columns={columns}
              page={data?.searchMovies?.page ?? page}
              pageSize={20}
              total={data?.searchMovies?.total ?? 0}
              onPageChange={(p) => {
                setPage(p);
                refetch({ page: p });
              }}
              onSort={(k, dir) => {
                setSort({ key: k, dir });
                refetch({ sortBy: { field: k, direction: dir } });
              }}
            />
          </div>
        </>
      }
    />
  );
}
