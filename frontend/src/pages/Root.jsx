/** @format */
import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";
export default function RootLayout() {
  return (
    <>
      <h1 style={{ textAlign: "center", color: "white" }}>
        Welcome Solent Student Hub
      </h1>
      <MainNavigation />
      <Outlet />
    </>
  );
}
