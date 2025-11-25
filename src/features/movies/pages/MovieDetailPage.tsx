import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_MOVIE } from "../graphql/queries";
import { Page } from "@/ui/patterns/Page";
import { PageHeader } from "@/ui/patterns/PageHeader";

type Movie = {
  movie: {
    id: number;
    title: string;
    year: number;
    poster: string;
    genres: string[];
    overview: string;
    rating: number;
    runtime: number;
    releaseDate: string;
  };
};

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useQuery<Movie>(GET_MOVIE, { variables: { id } });

  if (loading) return <div>Loading...</div>;

  const movie = data?.movie;

  return (
    <Page>
      <PageHeader title={movie?.title || ""} description={`Released: ${movie?.releaseDate}`} />
      <div className="grid grid-cols-3 gap-6">
        <img src={movie?.poster} alt={movie?.title} className="col-span-1 rounded" />
        <div className="col-span-2">
          <p className="mb-3 text-gray-700">{movie?.overview}</p>
          <div>Genres: {movie?.genres?.join(", ")}</div>
          <div>Runtime: {movie?.runtime} min</div>
          <div>Rating: {movie?.rating}</div>
        </div>
      </div>
    </Page>
  );
}
