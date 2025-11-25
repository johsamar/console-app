import { createBrowserRouter } from "react-router-dom";
import { ConsoleLayout } from "@/layout/ConsoleLayout";
import MoviesListPage from "@/features/movies/pages/MoviesListPage";
import MovieDetailPage from "@/features/movies/pages/MovieDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ConsoleLayout />,
    children: [
      { index: true, element: <div className="p-4">Welcome</div> },
      { path: "movies", element: <MoviesListPage /> },
      { path: "movies/:id", element: <MovieDetailPage /> },
    ],
  },
]);
