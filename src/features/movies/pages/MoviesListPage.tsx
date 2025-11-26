import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { SEARCH_MOVIES } from "../graphql/queries";

import { ListPagePattern } from "@/ui/patterns/ListPagePattern";
import { TextInput } from "@/ui/primitives/TextInput";
import { Button } from "@/ui/primitives/Button";

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
        query: queryText,
        page,
        year,
        genreIds: genreId ? [genreId] : [],
        sortBy: sort.key ? { field: sort.key, direction: sort.dir } : null,
      },
      fetchPolicy: "network-only",
    }
  );

  // 🔥 Reset de página al borrar búsqueda
  const handleSearchInput = (value: string) => {
    setQueryText(value);

    // Siempre cambiamos page → esto dispara loading automáticamente
    setPage(1);

    // Cuando borran todo
    if (value.trim() === "") {
      refetch({
        query: "",
        page: 1,
        year,
        genreIds: genreId ? [genreId] : [],
        sortBy: sort.key ? { field: sort.key, direction: sort.dir } : null,
      });
      return;
    }

    // Cuando escriben
    refetch({
      query: value,
      page: 1,
      year,
      genreIds: genreId ? [genreId] : [],
      sortBy: sort.key ? { field: sort.key, direction: sort.dir } : null,
    });
  };

  // Sorting
  const handleSortChange = (column: string) => {
    setSort((prev) => {
      const dir: "asc" | "desc" =
        prev.key === column && prev.dir === "asc" ? "desc" : "asc";

      const newSort = { key: column, dir };

      refetch({
        page: 1,
        sortBy: { field: column, direction: dir },
        query: queryText,
        year,
        genreIds: genreId ? [genreId] : [],
      });

      return newSort;
    });

    setPage(1);
  };

  const columns = [
    { header: "Title", accessor: "title", sortable: true },
    { header: "Year", accessor: "year", sortable: true },
    { header: "Rating", accessor: "rating", sortable: true },
  ];

  return (
    <ListPagePattern
      title="Movies"
      description="Search movies from TMDB"
      filters={
        <>
          <TextInput
            label="Search"
            value={queryText}
            placeholder="Search by title..."
            onChange={handleSearchInput}
          />

          <Button onClick={() => refetch({ page: 1 })}>Search</Button>

          <MovieFilters
            genres={[
              { id: 28, name: "Action" },
              { id: 35, name: "Comedy" },
            ]}
            onChange={({ genreId, year }) => {
              setGenreId(genreId);
              setYear(year);
              setPage(1);
              refetch();
            }}
          />
        </>
      }
      data={data?.searchMovies?.results ?? []}
      loading={loading}
      columns={columns}
      page={page}
      totalPages={data?.searchMovies?.total ?? 1}
      onPageChange={(p) => {
        setPage(p);
        refetch({ page: p });
      }}
      sortBy={sort.key}
      sortDir={sort.dir}
      onSortChange={handleSortChange}
    />
  );
}
