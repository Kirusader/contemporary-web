/** @format */
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameApp from "./pages/GameApp";
import QuizApp from "./pages/QuizApp";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <GameApp /> },
      { path: "/quiz", element: <QuizApp /> },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
