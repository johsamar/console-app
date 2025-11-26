import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/auth/pages/LoginPage";
import MoviesListPage from "@/features/movies/pages/MoviesListPage";
import ProtectedRoute from "../ProtectedRoute";
import { ConsoleLayout } from "@/layout/ConsoleLayout";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <ConsoleLayout />,
    children: [
      { path: "movies", element: <ProtectedRoute><MoviesListPage/></ProtectedRoute> },
      // otras rutas...
    ],
  },
]);
