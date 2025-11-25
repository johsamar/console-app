import { gql } from "@apollo/client";

export const SEARCH_MOVIES = gql`
  query SearchMovies($query: String!, $page: Int, $year: Int, $genreIds: [Int!], $sortBy: MovieSortInput) {
    searchMovies(query: $query, page: $page, year: $year, genreIds: $genreIds, sortBy: $sortBy) {
      total
      page
      results {
        id
        title
        year
        poster
        genres
        overview
        rating
      }
    }
  }
`;

export const GET_MOVIE = gql`
  query GetMovie($id: ID!) {
    movie(id: $id) {
      id
      title
      year
      poster
      genres
      overview
      rating
      runtime
      releaseDate
    }
  }
`;
