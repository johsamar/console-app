import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";

dotenv.config();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
if (!TMDB_API_KEY) throw new Error("TMDB_API_KEY missing");

// Node 18+ trae fetch nativo, no necesitas node-fetch
const fetch = globalThis.fetch;

const typeDefs = `
  type Movie {
    id: ID!
    title: String
    year: Int
    poster: String
    genres: [String]
    overview: String
    rating: Float
    runtime: Int
    releaseDate: String
  }

  input MovieSortInput {
    field: String
    direction: String
  }

  type SearchMoviesResult {
    total: Int
    page: Int
    results: [Movie]
  }

  type Query {
    searchMovies(query: String!, page: Int, year: Int, genreIds: [Int], sortBy: MovieSortInput): SearchMoviesResult
    movie(id: ID!): Movie
  }
`;

const headers = {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTA3ODVmNjE2YmU4YjVlODYxN2I4MTFiNjEzMGRiNyIsIm5iZiI6MTc2MzUyNDE2OC4zOTgwMDAyLCJzdWIiOiI2OTFkM2U0OGEyYWRmOThlN2VmYzFkNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.DI23tbdnJs0-WYECPqyC_sLDxZTiue4UsBL0CrN49cs",
  "Content-Type": "application/json"
};

function tmdbFetch(path: string) {
  return fetch(`https://api.themoviedb.org/3${path}`, { headers })
    .then((r) => r.json());
}

const resolvers = {
  Query: {
    searchMovies: async (_: any, { query, page = 1, year, genreIds }: any) => {
      const yearParam = year ? `&primary_release_year=${year}` : "";
      const genreParam =
        genreIds && genreIds.length ? `&with_genres=${genreIds.join(",")}` : "";

      const data: any = await tmdbFetch(
        `/search/movie?query=${encodeURIComponent(query)}&page=${page}${yearParam}${genreParam}`
      );

      return {
        total: data.total_results,
        page: data.page,
        results: data.results.map((m: any) => ({
          id: m.id,
          title: m.title,
          year: m.release_date ? Number(m.release_date.split("-")[0]) : null,
          poster: m.poster_path
            ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
            : null,
          genres: [], // opcional
          overview: m.overview,
          rating: m.vote_average,
        })),
      };
    },

    movie: async (_: any, { id }: any) => {
      const m: any = await tmdbFetch(`/movie/${id}?append_to_response=credits`);

      return {
        id: m.id,
        title: m.title,
        year: m.release_date ? Number(m.release_date.split("-")[0]) : null,
        poster: m.poster_path
          ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
          : null,
        genres: m.genres?.map((g: any) => g.name) ?? [],
        overview: m.overview,
        rating: m.vote_average,
        runtime: m.runtime,
        releaseDate: m.release_date,
      };
    },
  },
};

async function start() {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app: app as any, path: "/graphql" });

  const port = process.env.PORT || 4000;
  app.listen(port, () =>
    console.log(`BFF running at http://localhost:${port}/graphql`)
  );
}

start().catch(console.error);
