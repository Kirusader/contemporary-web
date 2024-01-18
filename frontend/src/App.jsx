/** @format */
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameApp from "./pages/GameApp";
import QuizApp from "./pages/QuizApp";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ChatApp from "./pages/ChatApp";
import Home from "./postcomponents/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/quiz", element: <QuizApp /> },
      { path: "/chat", element: <ChatApp /> },
      { path: "/game", element: <GameApp /> },
      { path: "/login", element: <Login /> },
      { path: "/logout", element: <Logout /> },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
