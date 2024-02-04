/** @format */
import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import HubLogo from "../assets/student-hub.png";
export default function RootLayout() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "5px",
        }}>
        {" "}
        <img
          src={HubLogo}
          alt="Student Hub Logo"
          style={{ width: "100px", height: "100px", marginLeft: "20px" }}
        />
        <h1 style={{ textAlign: "center", color: "white" }}>
          Welcome Solent Student Hub
        </h1>
      </div>

      <MainNavigation />
      <Outlet />
    </>
  );
}
